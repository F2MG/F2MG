const fs = require('fs');
const path = require('path');

// 크롤링된 데이터 읽기
const crawledData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'crawled-content/allthat-comprehensive.json'), 'utf8')
);

// 템플릿 읽기
const template = fs.readFileSync(path.join(__dirname, 'html/template.html'), 'utf8');

// 페이지 제목 매핑
const pageTitles = {
    'f2mg001': '프리미엄강사진',
    'f2mg002': '아카데미소개',
    'f2mg003': '교육시설안내',
    'f2mg004': '오시는길',
    'f2mg006': '연혁',
    'community001': '공지사항',
    'community002': '현장스토리',
    'community003': '수강생인터뷰',
    'community004': '수강생리얼후기',
    'customer-center001': '수강료조회',
    'customer-center002': '실시간상담예약',
    'customer-center003': '위치조회',
    'customer-center004': '온라인상담신청',
    'customer-center005': '카톡상담',
    'customer-center006': '시간표조회',
    'aptus-story001': '성공스토리',
    'aptus-story003': '취업현황',
    'aptus-story004': '취업전문과정',
    'aptus-story005': '창업전문과정',
    'government-support002': '국민취업제도',
    'special-course001': '스페셜과정'
};

// 텍스트에서 "올댓뷰티"를 "F2MG"로 변경
function replaceBrandName(text) {
    return text
        .replace(/올댓뷰티/gi, 'F2MG')
        .replace(/올뷰/gi, 'F2MG')
        .replace(/ALL THAT BEAUTY/gi, 'F2MG')
        .replace(/allthat-beauty/gi, 'F2MG');
}

// 크롤링된 텍스트를 HTML 콘텐츠로 변환
function convertToHTML(content) {
    if (!content || !content.text) return '';
    
    let html = '';
    const text = replaceBrandName(content.text);
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    // 헤딩 처리
    if (content.headings && content.headings.length > 0) {
        content.headings.forEach(heading => {
            if (heading.text && heading.text.length > 3 && 
                !heading.text.includes('HTTP 오류') &&
                !heading.text.includes('Not Found')) {
                const level = heading.level.toLowerCase();
                html += `<${level}>${replaceBrandName(heading.text)}</${level}>\n`;
            }
        });
    }
    
    // 리스트 처리
    if (content.lists && content.lists.length > 0) {
        content.lists.forEach(list => {
            if (list.items && list.items.length > 0) {
                html += '<ul>\n';
                list.items.forEach(item => {
                    if (item.length > 3) {
                        html += `  <li>${replaceBrandName(item)}</li>\n`;
                    }
                });
                html += '</ul>\n';
            }
        });
    }
    
    // 테이블 처리
    if (content.tables && content.tables.length > 0) {
        content.tables.forEach(table => {
            if (table.rows && table.rows.length > 0) {
                html += '<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">\n';
                table.rows.forEach((row, idx) => {
                    html += '  <tr>\n';
                    row.forEach(cell => {
                        const tag = idx === 0 ? 'th' : 'td';
                        html += `    <${tag} style="padding: 10px; border: 1px solid #ddd;">${replaceBrandName(cell)}</${tag}>\n`;
                    });
                    html += '  </tr>\n';
                });
                html += '</table>\n';
            }
        });
    }
    
    // 일반 텍스트 처리 (간단한 문단으로)
    const paragraphs = lines.filter(line => 
        line.length > 20 && 
        !line.includes('HTTP 오류') &&
        !line.includes('Not Found') &&
        !line.includes('cookie') &&
        !line.includes('Cookie')
    );
    
    paragraphs.forEach((para, idx) => {
        if (idx < 20) { // 최대 20개 문단만
            html += `<p style="margin-bottom: 15px; line-height: 1.8; color: #333;">${replaceBrandName(para)}</p>\n`;
        }
    });
    
    return html;
}

// 페이지 생성 함수
function generatePage(pageName, category, content) {
    const pageTitle = pageTitles[pageName] || pageName;
    const htmlContent = convertToHTML(content);
    
    // 템플릿에서 페이지 제목과 콘텐츠 교체
    let pageHTML = template
        .replace('<!-- PAGE TITLE -->', `${pageTitle} - F2MG GLOBAL BEAUTY ACADEMY`)
        .replace('<!-- PAGE CONTENT START -->', `
        <!-- PAGE CONTENT START -->
        <main class="page-main">
            <!-- Hero Section -->
            <div class="section-hero" style="background: linear-gradient(135deg, #f5f0e8 0%, #fff 100%); padding: 100px 20px; text-align: center; margin-bottom: 80px;">
                <div class="course-header">
                    <h1 style="font-size: 56px; font-weight: 700; margin-bottom: 20px; color: #222;">F2MG GLOBAL BEAUTY ACADEMY</h1>
                    <h2 style="font-size: 42px; font-weight: 600; margin-bottom: 30px; color: #333;">${pageTitle}</h2>
                </div>
            </div>

            <!-- Content Section -->
            <div class="course-section" style="max-width: 1200px; margin: 0 auto; padding: 0 20px 80px;">
                <div style="background: #fff; padding: 60px 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    ${htmlContent || `<p style="text-align: center; color: #666; font-size: 18px;">콘텐츠를 준비 중입니다.</p>`}
                </div>
            </div>
        </main>
        `);
    
    // 상대 경로 조정 (서브폴더인 경우)
    const depth = category.split('/').length;
    const assetPrefix = depth > 0 ? '../'.repeat(depth) : '';
    
    if (depth > 0) {
        pageHTML = pageHTML.replace(/href="assets\//g, `href="${assetPrefix}assets/`);
        pageHTML = pageHTML.replace(/src="assets\//g, `src="${assetPrefix}assets/`);
        pageHTML = pageHTML.replace(/href="makeup\//g, `href="${assetPrefix}makeup/`);
        pageHTML = pageHTML.replace(/href="hair\//g, `href="${assetPrefix}hair/`);
        pageHTML = pageHTML.replace(/href="nail\//g, `href="${assetPrefix}nail/`);
        pageHTML = pageHTML.replace(/href="aesthetic\//g, `href="${assetPrefix}aesthetic/`);
        pageHTML = pageHTML.replace(/href="special-course\//g, `href="${assetPrefix}special-course/`);
        pageHTML = pageHTML.replace(/href="beauty-admission-center\//g, `href="${assetPrefix}beauty-admission-center/`);
        pageHTML = pageHTML.replace(/href="aptus-story\//g, `href="${assetPrefix}aptus-story/`);
        pageHTML = pageHTML.replace(/href="f2mg\//g, `href="${assetPrefix}f2mg/`);
        pageHTML = pageHTML.replace(/href="government-support\//g, `href="${assetPrefix}government-support/`);
        pageHTML = pageHTML.replace(/href="customer-center\//g, `href="${assetPrefix}customer-center/`);
        pageHTML = pageHTML.replace(/href="community\//g, `href="${assetPrefix}community/`);
        pageHTML = pageHTML.replace(/href="01_home-cosmetic.html/g, `href="${assetPrefix}01_home-cosmetic.html`);
        pageHTML = pageHTML.replace(/href="makeup.html/g, `href="${assetPrefix}makeup.html`);
        pageHTML = pageHTML.replace(/href="hair.html/g, `href="${assetPrefix}hair.html`);
        pageHTML = pageHTML.replace(/href="nail-art.html/g, `href="${assetPrefix}nail-art.html`);
    }
    
    return pageHTML;
}

// 각 페이지 생성
Object.keys(crawledData).forEach(pageName => {
    const data = crawledData[pageName];
    const category = data.category;
    const content = data.content;
    
    const categoryDir = path.join(__dirname, 'html', category);
    if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    const pageHTML = generatePage(pageName, category, content);
    const filePath = path.join(categoryDir, `${pageName}.html`);
    
    fs.writeFileSync(filePath, pageHTML, 'utf8');
    console.log(`✅ 생성 완료: ${filePath}`);
});

console.log(`\n✅ 총 ${Object.keys(crawledData).length}개 페이지 생성 완료!`);

