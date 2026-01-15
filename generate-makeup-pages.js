const fs = require('fs');
const path = require('path');

// 페이지 정보
const pages = [
    {
        num: '002',
        name: '공연분장사',
        title: '메이크업 민간자격증',
        subtitle: '1급·2급·3급',
        intro: '메이크업에 대한 전체적인 이론적 지식과 테마에 따른 뷰티메이크업 실무 능력을 교육하고 자격증 취득을 위한 전반적인 교육을 실시합니다.',
        mainContent: '메이크업 자격증에 관한 이론과 실무',
        certificate: '메이크업 3급, 메이크업 2급, 메이크업 1급',
        career: ['방송국 에이전시 및 광고회사', '화장품 회사', '미용실', '뷰티샵', '교육 강사', '웨딩샵', '영화', '연예인 기획사', '연극', '뮤지컬', '오페라 기획사', '뷰티컨설턴트', '특수 분장사', '프리랜서'],
        curriculum: [
            { level: '메이크업 3급', months: [
                { month: '1개월', content: 'Skin에 따른 피부표현 기법과 lip&eye 메이크업 표현방법 eye shadow 다양한 패턴과 기본테크닉 컬러믹스 내추럴 메이크업 교육' },
                { month: '2개월', content: '계절에 따른 시즌 메이크업과 다양한 컨셉에 응용되는 메이크업 테크닉 파티, 광고, 큐티, 스모키, 글로시 물광 메이크업 실무 테크닉 교육' },
                { month: '3개월', content: '방송 연예인 트렌드 메이크업 글램펑키, 스모키 메이크업 및 shadow eye hole 기법 실무 테크닉 교육' },
                { month: '4개월', content: '에스닉, 오리엔탈 메이크업 & 포토흑백, 신랑, 혼주, 한복 다양한 웨딩 메이크업교육' }
            ]},
            { level: '메이크업 2급', content: '무대분장을 기본으로 다양한 캐릭터 분장, 사극 분장, 특수 분장 효과 전반적인 교육. 남, 여 노역분장 및 수염 작업, 호러, 동물, 멍, 상처분장과 환타지 메이크업 교육' },
            { level: '메이크업 1급', content: '무대분장과 아트 메이크업을 기초로 시대 메이크업과 캐릭터 분장 기법. 바디페이팅 기본테크닉 면, 선 그라데이션 표현과 회화적 표현과 그래픽 표현 기법' }
        ],
        note: '* 상기 메이크업 민간자격증 1~3급 자격은 자격기본법 규정에 따라 등록한 민간자격으로, 국가로부터 인정 받은 공인자격이 아닙니다.'
    },
    {
        num: '003',
        name: '특수분장',
        title: '웨딩 메이크업',
        subtitle: '',
        intro: '웨딩을 주제로 한 모든 메이크업 테크닉 웨딩의 전반적인 테크닉과 신부 이미지에 따른웨딩메이크업, 한복 메이크업, 본식과 포토 메이크업, 테마별 신랑, 신부 메이크업 응용 테크닉 교육을 실시합니다.',
        mainContent: '기초 뷰티 , 웨딩, 패션, 방송연예, 광고 메이크업',
        certificate: '메이크업 3급 취득',
        career: ['방송국 에이전시 및 광고회사', '화장품 회사', '미용실', '뷰티샵', '교육 강사', '웨딩샵', '영화', '연예인 기획사', '연극', '뮤지컬', '오페라 기획사', '뷰티컨설턴트', '특수 분장사', '프리랜서'],
        curriculum: [
            { content: '웨딩을 주제로 한 모든 메이크업 테크닉 웨딩의 전반적인 테크닉과 신부 이미지에 따른 웨딩메이크업, 한복 메이크업 본식과 포토 메이크업, 테마별 신랑, 신부 메이크업 응용 테크닉 교육실시' }
        ]
    },
    {
        num: '004',
        name: '에어브러쉬',
        title: '에어브러쉬',
        subtitle: '',
        intro: '에어브러쉬 사용법과 컬러 표현기법을 학습합니다. 공기의 압력을 이용하여 다양하고 미세한 색채 표현법과 에어브러쉬를이용하여 현장 전문 메이크업 테크닉 교육을 실시합니다.',
        mainContent: '기초 뷰티 , 웨딩, 패션, 방송연예, 광고 메이크업',
        certificate: '에어브러쉬 1,2급 자격증',
        career: ['방송국 에이전시 및 광고회사', '화장품 회사', '미용실', '뷰티샵', '교육 강사', '웨딩샵', '영화', '연예인 기획사', '연극', '뮤지컬', '오페라 기획사', '뷰티컨설턴트', '특수 분장사', '프리랜서'],
        curriculum: [
            { content: '에어브러쉬 사용법과 컬러 표현기법 공기의 압력을 이용하여 다양하고 미세한 색채 표현법, 에어브러쉬 이용하여 현장 전문 메이크업 테크닉 교육실시' }
        ],
        note: '* 상기 메이크업 민간자격증 1~2급 자격은 자격기본법 규정에 따라 등록한 민간자격으로, 국가로부터 인정 받은 공인자격이 아닙니다.'
    },
    {
        num: '005',
        name: '플라잉아티스트',
        title: '아트 메이크업',
        subtitle: '',
        intro: '메이크업과 아트적 요소가 가미된 무대분장, 사극분장, 캐릭터, 판타지 메이크업 과정입니다. 메이크업 아티스트로서 기본적으로 익혀야할 다양한 메이크업 테크닉과 메이크업 아티스트의 활동 영역 전반에 걸친 교육을 실시합니다.',
        mainContent: '무대, 캐릭터, 영상, 사극분장으로 기초뷰티, 웨딩, 패션, 광고등',
        certificate: '프로 메이크업 Diploma 수료증',
        career: ['방송국 에이전시 및 광고회사', '화장품 회사', '미용실', '뷰티샵', '교육 강사', '웨딩샵', '영화', '연예인 기획사', '연극', '뮤지컬', '오페라 기획사', '뷰티컨설턴트', '특수 분장사', '프리랜서'],
        curriculum: [
            { content: '아트 메이크업 발상의 기초부터 전문적인 디자인 표현기법 교육, 독창적이고 창의적인 아트메이크업 구상 디자인하여 아트작품 표현' }
        ],
        note: '* 상기 아트마스크는 자격기본법 규정에 따라 등록한 민간자격으로, 국가로부터 인정 받은 공인자격이 아닙니다.'
    },
    {
        num: '006',
        name: '바디페인팅',
        title: '메이크업 아티스트',
        subtitle: '',
        intro: '메이크업 아티스트로서 기본적으로 익혀야 할 기초 베이스 표현, 시즌별 트렌드, 웨딩 본식과 촬영, 아나운서, 스튜어디스 메이크업 등 다양한 메이크업 테크닉과 메이크업 아티스트의 활동 영역 전반에 걸친 교육을 실시합니다.',
        mainContent: '기초 뷰티 , 웨딩, 패션, 방송연예, 광고 메이크업',
        certificate: '프로 메이크업 Diploma 수료증',
        career: ['방송국 에이전시 및 광고회사', '화장품 회사', '미용실', '뷰티샵', '교육 강사', '웨딩샵', '영화', '연예인 기획사', '연극', '뮤지컬', '오페라 기획사', '뷰티컨설턴트', '특수 분장사', '프리랜서', '뷰티 유튜버'],
        curriculum: [
            { month: '1개월', content: '기초 베이스, 계절별 시즌 트렌드, 아트, 가닥 속눈썹 활용 아이 메이크업' },
            { month: '2개월', content: '세미스모키, 스모키, 아나운서, 스튜어디스, 웨딩 촬영, 웨딩 본식 메이크업' },
            { month: '3개월', content: '브론즈, 글리터, 화보, 런웨이, 트렌드 메이크업' }
        ]
    },
    {
        num: '007',
        name: '메이크업대회반',
        title: '메이크업 대회반',
        subtitle: '',
        intro: '메이크업과 아트적 요소가 가미된 판타지 메이크업, 의상&오브제 제작으로 각종 미용대회에 출전하며 수상경력을 쌓기 위한 과정입니다. 메이크업 아티스트로서 기본적으로 익혀야 할 다양한 메이크업 테크닉과 메이크업 아티스트의 활동 영역 전반에 걸친 교육을 실시합니다.',
        mainContent: '판타지 메이크업, 의상, 헤어&오브제 제작',
        certificate: '각종 미용대회 출전&수상',
        career: ['방송국 에이전시 및 광고회사', '화장품 회사', '미용실', '뷰티샵', '교육 강사', '웨딩샵', '영화', '연예인 기획사', '연극', '뮤지컬', '오페라 기획사', '뷰티컨설턴트', '특수 분장사', '프리랜서', '뷰티 유튜버'],
        curriculum: [
            { month: '1개월', content: '작품 시안&판타지 메이크업 도안 작업, 상의 의상 제작' },
            { month: '2개월', content: '헤어/네일 오브제&전체 오브제 디테일 작업' },
            { month: '3개월', content: '전체 리허설, 보완작업, 작품 마무리, 대회출전' }
        ]
    }
];

// makeup001.html 템플릿 읽기
const templatePath = path.join(__dirname, 'html/makeup/makeup001.html');
const template = fs.readFileSync(templatePath, 'utf8');

// 각 페이지 생성
pages.forEach(page => {
    let html = template;
    
    // 제목 변경
    html = html.replace(/<title>.*?<\/title>/, `<title>${page.name} - F2MG GLOBAL BEAUTY ACADEMY</title>`);
    
    // 헤더 제목 변경
    html = html.replace(/<h1>메이크업<\/h1>/, `<h1>${page.title}</h1>`);
    if (page.subtitle) {
        html = html.replace(/<h2>국가자격증<\/h2>/, `<h2>${page.subtitle}</h2>`);
    } else {
        html = html.replace(/<h2>국가자격증<\/h2>/, '');
    }
    
    // 소개 문구 변경
    html = html.replace(/한국산업인력 관리공단에서 시행하는 미용사\(메이크업\)국가기술 자격증 취득을 준비하는 과정으로 자격 검정 기준에 준하는 필기와 실기 과제에 대한 교육을 실시합니다\./, page.intro);
    
    // 과정안내 섹션 변경
    const mainContentHtml = page.mainContent.split(',').map(item => `<li>${item.trim()}</li>`).join('\n                        ');
    html = html.replace(/<li>필기검정이론<\/li>[\s\S]*?<li>속눈썹 익스텐션&수염<\/li>/, mainContentHtml);
    
    // 취득자격증 변경
    html = html.replace(/미용사\(메이크업\) 국가자격증/, page.certificate);
    
    // 진출분야 변경
    const careerHtml = page.career.map(item => `<li>${item}</li>`).join('\n                        ');
    html = html.replace(/<li>메이크업샵<\/li>[\s\S]*?<li>연극, 뮤지컬, 오페라 분장사<\/li>/, careerHtml);
    
    // 커리큘럼 변경
    let curriculumHtml = '';
    if (page.curriculum[0].level) {
        // 등급별 커리큘럼 (makeup002)
        page.curriculum.forEach(level => {
            if (level.months) {
                curriculumHtml += `<h4 style="margin-top: 30px; margin-bottom: 15px; color: #EB5A31; font-size: 22px;">${level.level}</h4>`;
                level.months.forEach(m => {
                    curriculumHtml += `<tr>
                            <td><strong>${m.month}</strong></td>
                            <td>${m.content}</td>
                        </tr>`;
                });
            } else {
                curriculumHtml += `<h4 style="margin-top: 30px; margin-bottom: 15px; color: #EB5A31; font-size: 22px;">${level.level}</h4>`;
                curriculumHtml += `<tr>
                        <td colspan="2">${level.content}</td>
                    </tr>`;
            }
        });
    } else if (page.curriculum[0].month) {
        // 월별 커리큘럼
        page.curriculum.forEach(m => {
            curriculumHtml += `<tr>
                    <td><strong>${m.month}</strong></td>
                    <td>${m.content}</td>
                </tr>`;
        });
    } else {
        // 단일 커리큘럼
        curriculumHtml = `<tr>
                <td colspan="2">${page.curriculum[0].content}</td>
            </tr>`;
    }
    
    html = html.replace(/<tr>[\s\S]*?<td>속눈썹 익스텐션&수염 및 실전 모의고사<\/td>[\s\S]*?<\/tr>/, curriculumHtml);
    
    // 합격률 섹션 제거 (일부 페이지만)
    if (!page.showPassRate) {
        html = html.replace(/<div class="course-section pass-rate-section">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/, '</main>');
    }
    
    // 특별함 섹션의 "올댓뷰티"를 "F2MG"로 변경
    html = html.replace(/올댓뷰티/g, 'F2MG');
    
    // 메뉴 링크 업데이트
    const menuLinks = {
        '002': 'makeup002.html',
        '003': 'makeup003.html',
        '004': 'makeup004.html',
        '005': 'makeup005.html',
        '006': 'makeup006.html',
        '007': 'makeup007.html'
    };
    
    Object.entries(menuLinks).forEach(([num, link]) => {
        const menuNames = {
            '002': '공연분장사',
            '003': '특수분장',
            '004': '에어브러쉬',
            '005': '플라잉아티스트',
            '006': '바디페인팅',
            '007': '메이크업대회반'
        };
        
        if (num === page.num) {
            html = html.replace(new RegExp(`<li><a href="../makeup.html#[^"]*">${menuNames[num]}</a></li>`, 'g'), `<li><a href="${link}">${menuNames[num]}</a></li>`);
            html = html.replace(new RegExp(`<li><a href="#">${menuNames[num]}</a></li>`, 'g'), `<li><a href="${link}">${menuNames[num]}</a></li>`);
        }
    });
    
    // 파일 저장
    const outputPath = path.join(__dirname, `html/makeup/makeup${page.num}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✅ makeup${page.num}.html 생성 완료: ${page.name}`);
});

console.log('\n✅ 모든 페이지 생성 완료!');

