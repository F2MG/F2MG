const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function crawlAllThatMenu() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        console.log('메인 페이지 크롤링 시작...');
        await page.goto('https://www.allthat-beauty.com/web/2022/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        // 전체 HTML 저장 (분석용)
        const html = await page.content();
        const outputDir = path.join(__dirname, 'crawled-content');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(
            path.join(outputDir, 'allthat-main-page.html'),
            html,
            'utf8'
        );

        // 모든 링크 추출
        const allLinks = await page.evaluate(() => {
            const links = [];
            const linkElements = document.querySelectorAll('a[href]');
            
            linkElements.forEach(link => {
                const href = link.href;
                const text = link.textContent.trim();
                
                if (href && text && 
                    !href.startsWith('javascript:') && 
                    !href.startsWith('#') &&
                    href.includes('allthat-beauty.com')) {
                    links.push({
                        text: text,
                        href: href,
                        parentText: link.closest('li, div, nav')?.textContent?.trim() || ''
                    });
                }
            });
            
            return links;
        });

        // 메뉴 관련 링크 필터링
        const menuLinks = allLinks.filter(link => {
            const href = link.href.toLowerCase();
            return href.includes('/curriculum/') || 
                   href.includes('/academy/') ||
                   href.includes('/customer/') ||
                   href.includes('/community/') ||
                   href.includes('/2022/');
        });

        fs.writeFileSync(
            path.join(outputDir, 'allthat-all-links.json'),
            JSON.stringify({ all: allLinks, menu: menuLinks }, null, 2),
            'utf8'
        );

        console.log(`✅ 전체 링크: ${allLinks.length}개`);
        console.log(`✅ 메뉴 링크: ${menuLinks.length}개`);

        // 텍스트 콘텐츠 추출
        const textContent = await page.evaluate(() => {
            const mainContent = document.querySelector('main') || 
                               document.querySelector('.main-content') ||
                               document.querySelector('#content') ||
                               document.querySelector('.content') ||
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
                        if (trimmed && trimmed.length > 2) {
                            text += trimmed + '\n';
                        }
                    }
                }
                return text;
            };
            
            return getTextContent(mainContent);
        });

        fs.writeFileSync(
            path.join(outputDir, 'allthat-main-content.txt'),
            textContent,
            'utf8'
        );

        console.log(`✅ 메인 페이지 텍스트 추출 완료: ${textContent.length}자`);

        // 주요 서브메뉴 페이지 크롤링 (예상 URL 패턴)
        const subMenuUrls = [
            'https://www.allthat-beauty.com/web/2022/curriculum/makeup/makeup001.asp',
            'https://www.allthat-beauty.com/web/2022/curriculum/hair/hair001.asp',
            'https://www.allthat-beauty.com/web/2022/curriculum/nail/nail001.asp',
            'https://www.allthat-beauty.com/web/2022/curriculum/aesthetic/aesthetic001.asp',
            'https://www.allthat-beauty.com/web/2022/academy/intro.asp',
            'https://www.allthat-beauty.com/web/2022/customer/online.asp',
        ];

        const crawledPages = {};
        
        for (const url of subMenuUrls) {
            try {
                console.log(`\n📄 ${url} 크롤링 중...`);
                await page.goto(url, {
                    waitUntil: 'networkidle2',
                    timeout: 15000
                });
                
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                const content = await page.evaluate(() => {
                    const mainContent = document.querySelector('main') || 
                                       document.querySelector('.main-content') ||
                                       document.querySelector('#content') ||
                                       document.querySelector('.content') ||
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
                                if (trimmed && trimmed.length > 3) {
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
                        if (text) {
                            headings.push({
                                level: h.tagName,
                                text: text
                            });
                        }
                    });
                    
                    return {
                        text: getTextContent(mainContent),
                        headings: headings
                    };
                });
                
                crawledPages[url] = content;
                
                const fileName = url.split('/').pop().replace('.asp', '');
                fs.writeFileSync(
                    path.join(outputDir, `${fileName}_content.txt`),
                    content.text,
                    'utf8'
                );
                
                console.log(`  ✅ 크롤링 완료: ${content.text.length}자`);
                
            } catch (error) {
                console.log(`  ⚠️  크롤링 실패: ${error.message}`);
            }
        }
        
        fs.writeFileSync(
            path.join(outputDir, 'allthat-crawled-pages.json'),
            JSON.stringify(crawledPages, null, 2),
            'utf8'
        );
        
        console.log(`\n✅ 크롤링 완료!`);

    } catch (error) {
        console.error('크롤링 에러:', error);
    } finally {
        await browser.close();
    }
}

crawlAllThatMenu();

