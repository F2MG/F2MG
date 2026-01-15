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

        await new Promise(resolve => setTimeout(resolve, 3000));

        // 메뉴 구조 추출
        const menuStructure = await page.evaluate(() => {
            const menus = [];
            
            // 메인 메뉴 찾기
            const mainMenus = document.querySelectorAll('nav ul li, .nav ul li, .menu ul li, [class*="menu"] ul li');
            
            mainMenus.forEach((menuItem, index) => {
                const link = menuItem.querySelector('a');
                const subMenu = menuItem.querySelector('ul');
                
                if (link) {
                    const menuData = {
                        index: index,
                        text: link.textContent.trim(),
                        href: link.href,
                        subMenus: []
                    };
                    
                    if (subMenu) {
                        const subLinks = subMenu.querySelectorAll('a');
                        subLinks.forEach(subLink => {
                            menuData.subMenus.push({
                                text: subLink.textContent.trim(),
                                href: subLink.href
                            });
                        });
                    }
                    
                    if (menuData.text) {
                        menus.push(menuData);
                    }
                }
            });
            
            return menus;
        });

        // 메뉴 구조 저장
        const outputDir = path.join(__dirname, 'crawled-content');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(outputDir, 'allthat-menu-structure.json'),
            JSON.stringify(menuStructure, null, 2),
            'utf8'
        );

        console.log(`✅ 메뉴 구조 추출 완료: ${menuStructure.length}개 메뉴`);

        // 각 서브메뉴 페이지 크롤링
        const crawledPages = {};
        
        for (const menu of menuStructure) {
            if (menu.subMenus && menu.subMenus.length > 0) {
                console.log(`\n📂 ${menu.text} 서브메뉴 크롤링 중...`);
                
                for (const subMenu of menu.subMenus) {
                    if (!subMenu.href || subMenu.href === '#' || subMenu.href.includes('javascript:')) {
                        continue;
                    }
                    
                    try {
                        console.log(`  - ${subMenu.text} 크롤링 중...`);
                        await page.goto(subMenu.href, {
                            waitUntil: 'networkidle2',
                            timeout: 15000
                        });
                        
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        
                        const content = await page.evaluate(() => {
                            const mainContent = document.querySelector('main') || 
                                               document.querySelector('.main-content') ||
                                               document.querySelector('#content') ||
                                               document.querySelector('.content') ||
                                               document.body;
                            
                            // 스크립트와 스타일 제거
                            const scripts = mainContent.querySelectorAll('script');
                            scripts.forEach(s => s.remove());
                            const styles = mainContent.querySelectorAll('style');
                            styles.forEach(s => s.remove());
                            
                            // 텍스트 추출
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
                            
                            // 구조 정보 추출
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
                            
                            // 리스트 추출
                            const lists = [];
                            const listsEl = mainContent.querySelectorAll('ul, ol');
                            listsEl.forEach((l, i) => {
                                const items = Array.from(l.querySelectorAll('li'))
                                    .map(li => li.textContent.trim())
                                    .filter(item => item.length > 0);
                                if (items.length > 0) {
                                    lists.push({
                                        index: i,
                                        items: items
                                    });
                                }
                            });
                            
                            return {
                                text: getTextContent(mainContent),
                                html: mainContent.innerHTML.substring(0, 50000), // 처음 50KB만
                                headings: headings,
                                lists: lists
                            };
                        });
                        
                        crawledPages[subMenu.href] = {
                            menu: menu.text,
                            subMenu: subMenu.text,
                            content: content
                        };
                        
                        // 개별 파일로도 저장
                        const safeFileName = subMenu.text.replace(/[^a-zA-Z0-9가-힣]/g, '_');
                        fs.writeFileSync(
                            path.join(outputDir, `${menu.text}_${safeFileName}_content.txt`),
                            content.text,
                            'utf8'
                        );
                        
                    } catch (error) {
                        console.log(`    ⚠️  ${subMenu.text} 크롤링 실패: ${error.message}`);
                    }
                }
            }
        }
        
        // 전체 크롤링 결과 저장
        fs.writeFileSync(
            path.join(outputDir, 'allthat-crawled-pages.json'),
            JSON.stringify(crawledPages, null, 2),
            'utf8'
        );
        
        console.log(`\n✅ 크롤링 완료! 총 ${Object.keys(crawledPages).length}개 페이지 크롤링됨`);

    } catch (error) {
        console.error('크롤링 에러:', error);
    } finally {
        await browser.close();
    }
}

crawlAllThatMenu();

