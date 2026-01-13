const fs = require('fs');
const path = require('path');

// 링크 매핑
const linkMap = {
    '공연분장사': 'makeup/makeup002.html',
    '특수분장': 'makeup/makeup003.html',
    '에어브러쉬': 'makeup/makeup004.html',
    '플라잉아티스트': 'makeup/makeup005.html',
    '바디페인팅': 'makeup/makeup006.html',
    '메이크업대회반': 'makeup/makeup007.html'
};

// 업데이트할 파일 목록
const filesToUpdate = [
    'html/01_home-cosmetic.html',
    'html/makeup.html',
    'html/template.html'
];

filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  파일 없음: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let updated = false;
    
    // 메뉴바 링크 업데이트
    Object.entries(linkMap).forEach(([name, link]) => {
        // 메뉴바 드롭다운 링크
        const pattern1 = new RegExp(`<li><a href="[^"]*">${name}</a></li>`, 'g');
        const replacement1 = `<li><a href="${link}">${name}</a></li>`;
        if (content.match(pattern1)) {
            content = content.replace(pattern1, replacement1);
            updated = true;
        }
        
        // 오프캔버스 메뉴 링크
        const pattern2 = new RegExp(`<li><a href="#">${name}</a></li>`, 'g');
        const replacement2 = `<li><a href="${link}">${name}</a></li>`;
        if (content.match(pattern2)) {
            content = content.replace(pattern2, replacement2);
            updated = true;
        }
    });
    
    if (updated) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ ${filePath} 업데이트 완료`);
    } else {
        console.log(`ℹ️  ${filePath} 변경사항 없음`);
    }
});

// makeup 폴더 내의 각 페이지도 업데이트
const makeupFiles = [
    'html/makeup/makeup001.html',
    'html/makeup/makeup002.html',
    'html/makeup/makeup003.html',
    'html/makeup/makeup004.html',
    'html/makeup/makeup005.html',
    'html/makeup/makeup006.html',
    'html/makeup/makeup007.html'
];

makeupFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let updated = false;
    
    // makeup 폴더 내에서는 상대 경로가 다름
    Object.entries(linkMap).forEach(([name, link]) => {
        // 오프캔버스 메뉴 링크 (makeup 폴더 내에서는 상대 경로)
        const pattern = new RegExp(`<li><a href="#">${name}</a></li>`, 'g');
        const replacement = `<li><a href="${link.replace('makeup/', '')}">${name}</a></li>`;
        if (content.match(pattern)) {
            content = content.replace(pattern, replacement);
            updated = true;
        }
    });
    
    if (updated) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ ${filePath} 업데이트 완료`);
    }
});

console.log('\n✅ 모든 메뉴 링크 업데이트 완료!');

