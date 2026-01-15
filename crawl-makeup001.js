const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function crawlMakeup001() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        
        console.log('크롤링 시작: https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup001.asp');
        await page.goto('https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup001.asp', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // 텍스트 콘텐츠 추출
        const content = await page.evaluate(() => {
            // 제목, 본문, 리스트 등 모든 텍스트 추출
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

        // 결과 저장
        const outputDir = path.join(__dirname, 'crawled-content');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = {
            url: 'https://www.allthat-beauty.com/m/2022/curriculum/makeup/makeup001.asp',
            crawledAt: new Date().toISOString(),
            content: content
        };

        fs.writeFileSync(
            path.join(outputDir, 'makeup001.txt'),
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
            path.join(outputDir, 'makeup001-content.txt'),
            textContent,
            'utf8'
        );

        console.log('크롤링 완료!');
        console.log('제목:', content.title);
        console.log('헤딩 개수:', content.headings.length);
        console.log('문단 개수:', content.paragraphs.length);
        console.log('리스트 항목 개수:', content.lists.length);

        return content;
    } catch (error) {
        console.error('크롤링 에러:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

crawlMakeup001().catch(console.error);

