const fs = require('fs');
const path = require('path');

// 템플릿 읽기
const template = fs.readFileSync(path.join(__dirname, 'html/template.html'), 'utf8');

// 참고 사이트의 실제 강사 정보
const teachers = [
    {
        id: 'teacher1',
        name: '김선미',
        title: '대표 CEO',
        category: 'admission',
        summary: [
            '한려대학교 미술학과 학사 졸업',
            '조선대학교 항장미용학 석사 졸업',
            '조선대학교 대학원 화학공학과 박사',
            '2003. 12~ 현재 F2MG글로벌뷰티아카데미 금남/상무캠퍼스 대표'
        ],
        detail: {
            학력: [
                '한려대학교 미술학과 학사 졸업',
                '조선대학교 항장미용학 석사 졸업',
                '조선대학교 대학원 화학공학과 박사',
                '프랑스 미쉘뒤마 뜰루즈 수료',
                'ECOLE DE MARGE VERLAIR 수료'
            ],
            경력: [
                '1996~1998 모디쉬뷰티스쿨 원장',
                '1998~2001 도도아카데미 원장',
                '2003. 12~ 현재 F2MG글로벌뷰티아카데미 금남/상무캠퍼스 대표',
                '2003~2015 한국메이크업 협회 이사',
                '2004~2016 대한미용사회 미용예술경기대회 심사위원',
                '2008 대한미용사회 중앙배 미용예술경기대회 심사위원',
                '전남도립대 토탈 코디네이션 강의',
                '전남과학대학 미용경영, 토탈연구 강의',
                '조선이공대학교 토탈코디네이션 강의'
            ],
            수상및활동: [
                '2011 보건복지부 경영자 장관상 수상',
                '2013 국회의원표창 수상 (미용인재발굴 및 지도우수)',
                '2014 퍼스널컬러 자격시험 심사위원',
                '2014 국회의원표창 수상 (미용인재발굴 및 지도우수)',
                '2016 슈퍼파워 오디션 심사위원',
                '2016 국회의원표창 수상 (미용인재방굴 및 지도우수)',
                '2017 한국메이크업전문가 작업교류협회 우수지도자대상 수상',
                '2017 대한민국 가치경영대상 뷰티교육부문 대상 수상',
                '2017 스포츠서울 글로벌뷰티아카데미브랜드 대상 수상',
                '2017 ARTS UNIVERSITY BOURNEMOUTH "CREARIVE MAKE-UP" 수료',
                '2018 Shanghai,China Asia First Brand Awards',
                '2018 미스코리아 광주.전남 심사위원',
                '2018 미스코리아 중국 심사위원',
                '2018 미스인터콘티넨탈 광주.호남 심사위원',
                '2018 미스인터콘티넨탈 서울 심사위원',
                '2018 미스인터콘티넨탈 서울수도권 심사위원',
                '2018 미스인터콘티넨탈 한국 심사위원',
                '2018 미스아시아어워즈 심사위원',
                '2018 중국닝보 웰니스 엑스포 최고의 인물대상수상',
                '2018 아시아퍼스트 브랜드 뷰티교육브랜드 대상',
                '2019 아나테이너 심사위원',
                '2019 MISS AUSTRALASIA 심사위원',
                '2019 미스인터콘티넨탈 서울 심사위원',
                '2019 미스인터콘티넨탈 일본오사카 심사위원',
                '2019 미시즈퍼스트 퀸오브더코리아 심사위원'
            ]
        }
    },
    {
        id: 'teacher2',
        name: '진아현',
        title: '교수',
        category: 'aesthetic',
        summary: [
            '미용사(일반), 미용사(피부), 두피 2급',
            '헤어메이크업 2급, 아로마테라피스트',
            '현 송원대학교 외래교수',
            'F2MG아카데미 / 피부, 이용사반'
        ],
        detail: {
            자격사항: [
                '미용사(일반)',
                '미용사(피부)',
                '두피 2급',
                '헤어메이크업 2급',
                '아로마테라피스트',
                '방과후 미용ncs지도사'
            ],
            경력사항: [
                '다수 뷰티아카데미 두피, 피부, 헤어, 서경대 실기, 이용사 강의',
                '직업훈련교사',
                '현 송원대학교 외래교수',
                'F2MG아카데미 / 피부, 이용사반'
            ],
            수상내역: [
                '국제뷰티산업개발협회주체 BIS컵 미용경기대회(국회의원상)',
                '한국뷰티산업개발협회주체 BIS컵(세트롤 은상)',
                'IBEA 국제미용교류협회 국제미용대회(펌부분 테크닉 대상)',
                'IBEA 국제미용교류협회 국제미용대회(패션커트 금상)',
                '국제미용교류협회(레게머리 대상)',
                'BIS컵스트럭춰드 (은상)',
                'BIS컵(교육지도자상)',
                'BIS컵(레게머리 대상)',
                '사단법인)한국전통문화연구진흥원(장려상)',
                '사단법인)한국전통문화연구진흥원(입선)',
                '사단법인)한국전통문화연구진흥원(국제작품전시전)',
                '광주광역시시장배 미용예술 경기대회 겉마름 금상',
                '광주광역시시장배 미용예술 경기대회 헤어아트 장려상',
                '광주광역시시장배 미용예술 경기대회 교육지도자상',
                '광주광역시 시장배 미용예술 경기대회 우수지도자상',
                '사단법인 한국뷰티산업개발 국회의원 표창장'
            ],
            학술도서출간및사회활동: [
                '광주 광역시 시장배 대회 심사위원 다수',
                'BIS컵 사단법인 한국 뷰티 산업개발 심사위원 다수',
                '사단법인 한국 디지털 정책 학회',
                "'여헝 암환우들의 탈모용 가발 착용 불편에 따른 개선 방안' 연구 학술지",
                '송원대학원 휴먼 산업대학원 뷰티 예술학과 석사학위 논문',
                "'여성 암(癌) 환우의 탈모용 가발 착용과 미모(尾毛) 반영구 화장의 실태 및 불편 사항의 관한 연구'(2018)",
                "도서 출간 '한중일 미용 히스토리', '남성커트', '두피관리', '퍼머넌트'"
            ]
        }
    },
    {
        id: 'teacher3',
        name: '박세리',
        title: '교수',
        category: 'makeup',
        summary: [
            '아트마스크 전문',
            '조선대학교 미술대학 디자인과 재학',
            '포토샵, 일러스트, 인디자인 자격증',
            '현 아트마스크 강사'
        ],
        detail: {
            이력: [
                '2023 청소년 문화도시 기획학교 과정 수료',
                '조선대학교 미술대학 디자인과 재학',
                '포토샵, 일러스트, 인디자인 자격증',
                '전 나무그림미술학원 강사',
                '현 아트마스크 강사'
            ]
        }
    }
];

// 강사 카드 HTML 생성
function generateTeacherCards() {
    return teachers.map(teacher => `
        <div class="teacher-card" data-category="${teacher.category}">
            <div class="teacher-image">
                <div class="teacher-placeholder">${teacher.name}</div>
            </div>
            <div class="teacher-info">
                <h4>${teacher.name}</h4>
                <p class="teacher-title">${teacher.title}</p>
                <div class="teacher-summary">
                    ${teacher.summary.map(item => `<p>${item}</p>`).join('')}
                </div>
                <button class="teacher-detail-btn" onclick="showTeacherDetail('${teacher.id}')">상세보기</button>
            </div>
        </div>
    `).join('');
}

// 강사 상세 정보 HTML 생성
function generateTeacherDetailHTML(teacher) {
    let html = `<h2>${teacher.name} ${teacher.title}</h2><h3>주요활동</h3>`;
    
    Object.keys(teacher.detail).forEach(key => {
        html += `<h4>${key}</h4><ul>`;
        teacher.detail[key].forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += `</ul>`;
    });
    
    return html;
}

// JavaScript 데이터 생성
function generateTeacherDataJS() {
    const data = {};
    teachers.forEach(teacher => {
        data[teacher.id] = {
            name: teacher.name,
            title: teacher.title,
            content: generateTeacherDetailHTML(teacher)
        };
    });
    return JSON.stringify(data, null, 2);
}

// 강사진 페이지 콘텐츠
const teacherPageContent = `
    <div class="course-header">
        <h1>프리미엄강사진</h1>
        <p class="course-intro">
            F2MG는 업계 최고의 강사진으로 구성되어 있습니다.<br>
            실무 경험이 풍부한 전문가들이 여러분의 꿈을 실현시켜드립니다.
        </p>
    </div>

    <!-- 카테고리 필터 -->
    <div class="course-section">
        <div class="teacher-filter">
            <button class="filter-btn active" data-filter="all">전체</button>
            <button class="filter-btn" data-filter="makeup">메이크업</button>
            <button class="filter-btn" data-filter="hair">헤어</button>
            <button class="filter-btn" data-filter="nail">네일아트</button>
            <button class="filter-btn" data-filter="aesthetic">에스테틱</button>
            <button class="filter-btn" data-filter="special">스페셜</button>
            <button class="filter-btn" data-filter="admission">진학과정</button>
        </div>
    </div>

    <!-- 강사진 그리드 -->
    <div class="course-section">
        <div class="teacher-grid" id="teacherGrid">
            ${generateTeacherCards()}
        </div>
    </div>

    <!-- 강사 상세 모달 -->
    <div id="teacherModal" class="teacher-modal" style="display: none;">
        <div class="teacher-modal-content">
            <span class="teacher-modal-close" onclick="closeTeacherDetail()">&times;</span>
            <div id="teacherModalBody"></div>
        </div>
    </div>
`;

// 스타일 추가
const teacherStyles = `
    <style>
        .page-main {
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .course-header {
            text-align: center;
            margin-bottom: 60px;
        }
        .course-header h1 {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #222;
        }
        .course-intro {
            font-size: 18px;
            line-height: 1.8;
            color: #444;
            margin-bottom: 60px;
            text-align: center;
        }
        .course-section {
            margin-bottom: 60px;
        }
        .teacher-filter {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 40px;
            padding: 20px;
            background: #f8f8f8;
            border-radius: 8px;
        }
        .filter-btn {
            padding: 10px 25px;
            border: 2px solid #EB5A31;
            background: #fff;
            color: #EB5A31;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .filter-btn:hover,
        .filter-btn.active {
            background: #EB5A31;
            color: #fff;
        }
        .teacher-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
        }
        .teacher-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .teacher-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .teacher-card.hidden {
            display: none;
        }
        .teacher-image {
            width: 100%;
            height: 250px;
            background: linear-gradient(135deg, #EB5A31 0%, #ff7a4d 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .teacher-placeholder {
            font-size: 48px;
            font-weight: 700;
            color: #fff;
        }
        .teacher-info {
            padding: 25px;
        }
        .teacher-info h4 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #222;
        }
        .teacher-title {
            color: #EB5A31;
            font-weight: 500;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .teacher-summary {
            margin-bottom: 20px;
        }
        .teacher-summary p {
            font-size: 14px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 8px;
        }
        .teacher-detail-btn {
            width: 100%;
            padding: 12px;
            background: #EB5A31;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .teacher-detail-btn:hover {
            background: #d04a21;
        }
        .teacher-modal {
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            overflow: auto;
        }
        .teacher-modal-content {
            background-color: #fff;
            margin: 5% auto;
            padding: 40px;
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        .teacher-modal-close {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 32px;
            font-weight: bold;
            color: #999;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        .teacher-modal-close:hover {
            color: #222;
        }
        #teacherModalBody h2 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #222;
        }
        #teacherModalBody h3 {
            font-size: 24px;
            font-weight: 600;
            margin-top: 30px;
            margin-bottom: 15px;
            color: #222;
            border-bottom: 2px solid #EB5A31;
            padding-bottom: 10px;
        }
        #teacherModalBody h4 {
            font-size: 18px;
            font-weight: 600;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #333;
        }
        #teacherModalBody ul {
            list-style: none;
            padding: 0;
        }
        #teacherModalBody ul li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
            color: #444;
            line-height: 1.6;
        }
        #teacherModalBody ul li:before {
            content: "·";
            position: absolute;
            left: 0;
            font-weight: bold;
            color: #EB5A31;
        }
    </style>
`;

// JavaScript 추가
const teacherScript = `
    <script>
        const teacherData = ${generateTeacherDataJS()};
        
        // 필터 기능
        document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const teacherCards = document.querySelectorAll('.teacher-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // 활성 버튼 변경
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 카드 필터링
                    teacherCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                });
            });
        });
        
        // 강사 상세 정보 표시
        function showTeacherDetail(teacherId) {
            const teacher = teacherData[teacherId];
            if (teacher) {
                document.getElementById('teacherModalBody').innerHTML = teacher.content;
                document.getElementById('teacherModal').style.display = 'block';
            }
        }
        
        // 모달 닫기
        function closeTeacherDetail() {
            document.getElementById('teacherModal').style.display = 'none';
        }
        
        // 모달 외부 클릭 시 닫기
        window.onclick = function(event) {
            const modal = document.getElementById('teacherModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    </script>
`;

// 페이지 생성
let pageHTML = template
    .replace('<!-- PAGE TITLE -->', '프리미엄강사진 - F2MG GLOBAL BEAUTY ACADEMY')
    .replace('<!-- PAGE SPECIFIC CSS -->', teacherStyles)
    .replace('<!-- PAGE CONTENT START -->', `
    <!-- PAGE CONTENT START -->
    <main class="page-main">
        ${teacherPageContent}
    </main>
    `);

// 상대 경로 조정
pageHTML = pageHTML.replace(/href="assets\//g, `href="../assets/`);
pageHTML = pageHTML.replace(/src="assets\//g, `src="../assets/`);
pageHTML = pageHTML.replace(/href="makeup\//g, `href="../makeup/`);
pageHTML = pageHTML.replace(/href="hair\//g, `href="../hair/`);
pageHTML = pageHTML.replace(/href="nail\//g, `href="../nail/`);
pageHTML = pageHTML.replace(/href="aesthetic\//g, `href="../aesthetic/`);
pageHTML = pageHTML.replace(/href="special-course\//g, `href="../special-course/`);
pageHTML = pageHTML.replace(/href="beauty-admission-center\//g, `href="../beauty-admission-center/`);
pageHTML = pageHTML.replace(/href="aptus-story\//g, `href="../aptus-story/`);
pageHTML = pageHTML.replace(/href="f2mg\//g, `href="`);
pageHTML = pageHTML.replace(/href="government-support\//g, `href="../government-support/`);
pageHTML = pageHTML.replace(/href="customer-center\//g, `href="../customer-center/`);
pageHTML = pageHTML.replace(/href="community\//g, `href="../community/`);
pageHTML = pageHTML.replace(/href="01_home-cosmetic.html/g, `href="../01_home-cosmetic.html`);
pageHTML = pageHTML.replace(/href="makeup.html/g, `href="../makeup.html`);
pageHTML = pageHTML.replace(/href="hair.html/g, `href="../hair.html`);
pageHTML = pageHTML.replace(/href="nail-art.html/g, `href="../nail-art.html`);

// JavaScript 추가 (</body> 태그 앞에)
pageHTML = pageHTML.replace('</body>', `${teacherScript}</body>`);

// 파일 저장
fs.writeFileSync(path.join(__dirname, 'html/f2mg/f2mg001.html'), pageHTML, 'utf8');
console.log('✅ f2mg001.html 재생성 완료!');
console.log(`✅ 총 ${teachers.length}명의 강사 정보가 포함되었습니다.`);

