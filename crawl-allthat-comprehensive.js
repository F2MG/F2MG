const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// F2MG 메뉴 매핑
const menuMapping = {
    '아카데미소개': 'f2mg',
    '히스토리': 'f2mg',
    '강사소개': 'f2mg',
    '교육시설안내': 'f2mg',
    '오시는길': 'f2mg',
    '메이크업': 'makeup',
    '헤어디자인': 'hair',
    '네일아트': 'nail',
    '에스테틱': 'aesthetic',
    '스페셜': 'special-course',
    '입시과정': 'beauty-admission-center',
    '취업전문과정': 'aptus-story',
    '창업전문과정': 'aptus-story',
    '취업현황': 'aptus-story',
    '성공 스토리': 'aptus-story',
    '국민취업지원제도': 'government-support',
    '공지사항': 'community',
    '수강생작품&현장스토리': 'community',
    '수강생인터뷰': 'community',
    '수강생 리얼 후기': 'community',
    '합격현황': 'community',
    '수강료조회': 'customer-center',
    '실시간 상담예약': 'customer-center',
    '위치조회': 'customer-center',
    '온라인상담신청': 'customer-center',
    '카톡상담': 'customer-center',
    '시간표조회': 'customer-center'
};

// 크롤링할 URL 목록
const urlsToCrawl = [
    // 아카데미소개
    { url: 'https://www.allthat-beauty.com/web/2022/academy/about.asp', category: 'f2mg', name: 'f2mg002' },
    { url: 'https://www.allthat-beauty.com/web/2022/academy/history.asp', category: 'f2mg', name: 'f2mg006' },
    { url: 'https://www.allthat-beauty.com/web/2022/academy/teacher.asp', category: 'f2mg', name: 'f2mg001' },
    { url: 'https://www.allthat-beauty.com/web/2022/academy/facility.asp', category: 'f2mg', name: 'f2mg003' },
    { url: 'https://www.allthat-beauty.com/web/2022/academy/location.asp', category: 'f2mg', name: 'f2mg004' },
    
    // 커뮤니티
    { url: 'https://www.allthat-beauty.com/web/2022/community/noticeList.asp', category: 'community', name: 'community001' },
    { url: 'https://www.allthat-beauty.com/web/2022/community/storyList.asp', category: 'community', name: 'community002' },
    { url: 'https://www.allthat-beauty.com/web/2022/community/interviewList.asp', category: 'community', name: 'community003' },
    { url: 'https://www.allthat-beauty.com/web/2022/community/postList.asp', category: 'community', name: 'community004' },
    
    // 고객상담센터
    { url: 'https://www.allthat-beauty.com/web/2022/customer/tuition.asp', category: 'customer-center', name: 'customer-center001' },
    { url: 'https://www.allthat-beauty.com/web/2022/customer/visit.asp', category: 'customer-center', name: 'customer-center002' },
    { url: 'https://www.allthat-beauty.com/web/2022/customer/location.asp', category: 'customer-center', name: 'customer-center003' },
    { url: 'https://www.allthat-beauty.com/web/2022/customer/online.asp', category: 'customer-center', name: 'customer-center004' },
    { url: 'https://www.allthat-beauty.com/web/2022/customer/kakao.asp', category: 'customer-center', name: 'customer-center005' },
    { url: 'https://www.allthat-beauty.com/web/2022/customer/timetable.asp', category: 'customer-center', name: 'customer-center006' },
    
    // 엡투스토리
    { url: 'https://www.allthat-beauty.com/web/2022/consulting/job.asp', category: 'aptus-story', name: 'aptus-story004' },
    { url: 'https://www.allthat-beauty.com/web/2022/consulting/foundation.asp', category: 'aptus-story', name: 'aptus-story005' },
    { url: 'https://www.allthat-beauty.com/web/2022/consulting/employList.asp', category: 'aptus-story', name: 'aptus-story003' },
    { url: 'https://www.allthat-beauty.com/web/2022/consulting/winList.asp', category: 'aptus-story', name: 'aptus-story001' },
    
    // 국가지원제도
    { url: 'https://www.allthat-beauty.com/web/2022/ncs/gookbi_employ.asp', category: 'government-support', name: 'government-support002' },
    
    // 스페셜과정
    { url: 'https://www.allthat-beauty.com/web/2022/curriculum/special001.asp', category: 'special-course', name: 'special-course001' },
];

async function crawlPage(page, url) {
    try {
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 20000
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const content = await page.evaluate(() => {
            const mainContent = document.querySelector('main') || 
                               document.querySelector('.main-content') ||
                               document.querySelector('#content') ||
                               document.querySelector('.content') ||
                               document.querySelector('.container') ||
                               document.body;
            
            const scripts = mainContent.querySelectorAll('script');
            scripts.forEach(s => s.remove());
            const styles = mainContent.querySelectorAll('style');
            styles.forEach(s => s.remove());
            
            const getTextContent = (element) => {
                let text = '';
                const walker = document.createTreeWalker(
                    element,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );
                
                let node;
                while (node = walker.nextNode()) {
                    const parent = node.parentElement;
                    if (parent && parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
                        const trimmed = node.textContent.trim();
                        if (trimmed && trimmed.length > 2 && 
                            !trimmed.includes('HTTP 오류') &&
                            !trimmed.includes('Not Found')) {
                            text += trimmed + '\n';
                        }
                    }
                }
                return text;
            };
            
            const headings = [];
            const headingsEl = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headingsEl.forEach(h => {
                const text = h.textContent.trim();
                if (text && !text.includes('HTTP 오류')) {
                    headings.push({
                        level: h.tagName,
                        text: text
                    });
                }
            });
            
            const lists = [];
            const listsEl = mainContent.querySelectorAll('ul, ol');
            listsEl.forEach((l, i) => {
                const items = Array.from(l.querySelectorAll('li'))
                    .map(li => li.textContent.trim())
                    .filter(item => item.length > 0 && !item.includes('HTTP 오류'));
                if (items.length > 0) {
                    lists.push({
                        index: i,
                        items: items
                    });
                }
            });
            
            const tables = [];
            const tablesEl = mainContent.querySelectorAll('table');
            tablesEl.forEach((t, i) => {
                const rows = [];
                const trs = t.querySelectorAll('tr');
                trs.forEach(tr => {
                    const cells = Array.from(tr.querySelectorAll('td, th'))
                        .map(cell => cell.textContent.trim())
                        .filter(cell => cell.length > 0);
                    if (cells.length > 0) {
                        rows.push(cells);
                    }
                });
                if (rows.length > 0) {
                    tables.push({
                        index: i,
                        rows: rows
                    });
                }
            });
            
            return {
                text: getTextContent(mainContent),
                headings: headings,
                lists: lists,
                tables: tables
            };
        });
        
        return content;
    } catch (error) {
        console.log(`  ⚠️  크롤링 실패: ${error.message}`);
        return null;
    }
}

async function crawlAllThatComprehensive() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        const outputDir = path.join(__dirname, 'crawled-content');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const crawledData = {};
        
        for (const item of urlsToCrawl) {
            console.log(`\n📄 ${item.name} 크롤링 중... (${item.url})`);
            const content = await crawlPage(page, item.url);
            
            if (content && content.text.length > 100) {
                crawledData[item.name] = {
                    url: item.url,
                    category: item.category,
                    content: content
                };
                
                // 개별 파일로 저장
                fs.writeFileSync(
                    path.join(outputDir, `${item.name}_content.txt`),
                    content.text,
                    'utf8'
                );
                
                console.log(`  ✅ 크롤링 완료: ${content.text.length}자`);
            } else {
                console.log(`  ⚠️  내용이 없거나 너무 짧음`);
            }
        }
        
        // 전체 데이터 저장
        fs.writeFileSync(
            path.join(outputDir, 'allthat-comprehensive.json'),
            JSON.stringify(crawledData, null, 2),
            'utf8'
        );
        
        console.log(`\n✅ 크롤링 완료! 총 ${Object.keys(crawledData).length}개 페이지`);

    } catch (error) {
        console.error('크롤링 에러:', error);
    } finally {
        await browser.close();
    }
}

crawlAllThatComprehensive();

