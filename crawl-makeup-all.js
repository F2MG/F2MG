const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 크롤링할 페이지 목록
const pages = [
    { num: '002', name: '공연분장사', url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup002.asp' },
    { num: '003', name: '특수분장', url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup003.asp' },
    { num: '004', name: '에어브러쉬', url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup004.asp' },
    { num: '005', name: '플라잉아티스트', url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup005.asp' },
    { num: '006', name: '바디페인팅', url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup006.asp' },
    { num: '007', name: '메이크업대회반', url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup007.asp' },
];

async function crawlPage(browser, pageInfo) {
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        
        console.log(`\n크롤링 시작: ${pageInfo.name} - ${pageInfo.url}`);
        await page.goto(pageInfo.url, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // 텍스트 콘텐츠 추출
        const content = await page.evaluate(() => {
            const title = document.querySelector('h1, .title, .page-title, h2')?.innerText?.trim() || '';
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => h.innerText.trim()).filter(t => t);
            const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(t => t);
            const lists = Array.from(document.querySelectorAll('ul li, ol li')).map(li => li.innerText.trim()).filter(t => t);
            const divs = Array.from(document.querySelectorAll('div[class*="content"], div[class*="desc"], div[class*="text"]')).map(d => d.innerText.trim()).filter(t => t && t.length > 20);

            return {
                title: title,
                headings: headings,
                paragraphs: paragraphs,
                lists: lists,
                divs: divs,
                fullText: document.body.innerText
            };
        });

        await page.close();

        // 결과 저장
        const outputDir = path.join(__dirname, 'crawled-content');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = {
            url: pageInfo.url,
            name: pageInfo.name,
            crawledAt: new Date().toISOString(),
            content: content
        };

        fs.writeFileSync(
            path.join(outputDir, `makeup${pageInfo.num}.txt`),
            JSON.stringify(output, null, 2),
            'utf8'
        );

        // 텍스트만 추출한 파일도 생성
        let textContent = '';
        textContent += `제목: ${content.title}\n\n`;
        textContent += `헤딩:\n${content.headings.join('\n')}\n\n`;
        textContent += `문단:\n${content.paragraphs.join('\n\n')}\n\n`;
        textContent += `리스트:\n${content.lists.join('\n')}\n\n`;
        textContent += `기타 콘텐츠:\n${content.divs.join('\n\n')}\n`;

        fs.writeFileSync(
            path.join(outputDir, `makeup${pageInfo.num}-content.txt`),
            textContent,
            'utf8'
        );

        console.log(`✅ ${pageInfo.name} 크롤링 완료!`);
        console.log(`   제목: ${content.title}`);
        console.log(`   헤딩: ${content.headings.length}개, 문단: ${content.paragraphs.length}개`);

        return content;
    } catch (error) {
        console.error(`❌ ${pageInfo.name} 크롤링 에러:`, error.message);
        return null;
    }
}

async function crawlAll() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const results = [];
        for (const pageInfo of pages) {
            const content = await crawlPage(browser, pageInfo);
            if (content) {
                results.push({ ...pageInfo, content });
            }
            // 페이지 간 딜레이
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        console.log(`\n✅ 전체 크롤링 완료! (${results.length}/${pages.length}개 성공)`);
        return results;
    } catch (error) {
        console.error('크롤링 에러:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

crawlAll().catch(console.error);

