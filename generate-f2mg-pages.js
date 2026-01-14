const fs = require('fs');
const path = require('path');

// 템플릿 읽기
const template = fs.readFileSync(path.join(__dirname, 'html/template.html'), 'utf8');

// F2MG 서브메뉴 페이지 내용 정의
const f2mgPages = {
    'f2mg001': {
        title: '프리미엄강사진',
        content: `
            <div class="course-header">
                <h1>프리미엄강사진</h1>
                <p class="course-intro">
                    F2MG는 업계 최고의 강사진으로 구성되어 있습니다.<br>
                    실무 경험이 풍부한 전문가들이 여러분의 꿈을 실현시켜드립니다.
                </p>
            </div>

            <div class="course-section">
                <h3>강사진 소개</h3>
                <div class="teacher-grid">
                    <div class="teacher-card">
                        <div class="teacher-info">
                            <h4>김○○ 강사</h4>
                            <p class="teacher-specialty">메이크업 전문</p>
                            <ul>
                                <li>20년 이상 실무 경력</li>
                                <li>다수 연예인 메이크업 담당</li>
                                <li>국제 메이크업 대회 수상</li>
                            </ul>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-info">
                            <h4>이○○ 강사</h4>
                            <p class="teacher-specialty">헤어디자인 전문</p>
                            <ul>
                                <li>15년 이상 실무 경력</li>
                                <li>유명 뷰티살롱 원장</li>
                                <li>헤어디자인 대회 심사위원</li>
                            </ul>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-info">
                            <h4>박○○ 강사</h4>
                            <p class="teacher-specialty">네일아트 전문</p>
                            <ul>
                                <li>10년 이상 실무 경력</li>
                                <li>네일아트 자격증 심사위원</li>
                                <li>국제 네일 대회 수상</li>
                            </ul>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-info">
                            <h4>정○○ 강사</h4>
                            <p class="teacher-specialty">에스테틱 전문</p>
                            <ul>
                                <li>12년 이상 실무 경력</li>
                                <li>스킨케어 전문가</li>
                                <li>에스테틱 자격증 보유</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="course-section">
                <h3>강사진의 특별함</h3>
                <div class="features-list">
                    <div class="feature-item">
                        <strong>01.</strong>
                        <p>실무 경험이 풍부한 업계 최고의 강사진</p>
                    </div>
                    <div class="feature-item">
                        <strong>02.</strong>
                        <p>개인별 맞춤형 지도로 실력 향상</p>
                    </div>
                    <div class="feature-item">
                        <strong>03.</strong>
                        <p>최신 트렌드와 기술을 반영한 교육</p>
                    </div>
                    <div class="feature-item">
                        <strong>04.</strong>
                        <p>취업 및 창업까지 지속적인 멘토링</p>
                    </div>
                </div>
            </div>
        `
    },
    'f2mg002': {
        title: '아카데미소개',
        content: `
            <div class="course-header">
                <h1>아카데미소개</h1>
                <p class="course-intro">
                    F2MG는 '사람을 디자인하다'는 교육철학으로<br>
                    최고의 뷰티 전문가를 양성합니다.
                </p>
            </div>

            <div class="course-section">
                <h3>교육특징</h3>
                <div class="info-grid">
                    <div class="info-card">
                        <h4>Another Level</h4>
                        <p class="info-subtitle">클래스가 다른 교육수준</p>
                        <ul>
                            <li>학사관리 및 강사와 개별 멘토 이원 관리체제</li>
                            <li>실무 및 교육 경험 풍부한 업계 최고 강사진</li>
                            <li>학생의 개성과 특징을 살려 세분화하는 레벨 향상 프로그램</li>
                            <li>해외 기술교류 등을 통한 다양한 초청 세미나, 국제대회 참여</li>
                        </ul>
                    </div>
                    <div class="info-card">
                        <h4>Consulting</h4>
                        <p class="info-subtitle">취업에서 창업까지 컨설팅</p>
                        <ul>
                            <li>현장과 동일한 교육시설과 면접에 필요한 개인별 이력서 교정</li>
                            <li>모의 면접등의 컨설팅 진행</li>
                            <li>인턴쉽 제도를 통해 차별화된 인재양성</li>
                            <li>방송사, 영화제작사, 전문 뷰티샵 협력을 통해 취업 네트워크 구축</li>
                            <li>상시 취업과 창업에 대한 상담이 가능한 취업지원센터 운영</li>
                        </ul>
                    </div>
                    <div class="info-card">
                        <h4>Education</h4>
                        <p class="info-subtitle">높은 수준의 교육환경</p>
                        <ul>
                            <li>전국지점 역세권 도보 5분거리 위치</li>
                            <li>전국지점 평균 200평 이상 규모와 수 많은 강의장 보유</li>
                            <li>원내 토탈샵 및 토탈클래스 운영하여 자습 및 실습 환경조성</li>
                            <li>최첨단 기자재구비 완료</li>
                            <li>체계적인 학사관리 프로세스 운영</li>
                        </ul>
                    </div>
                    <div class="info-card">
                        <h4>Facilities</h4>
                        <p class="info-subtitle">차별화된 교육 시스템</p>
                        <ul>
                            <li>4대 학과 실무 과정, 창업 과정, 단과 과정 전문적인 운영</li>
                            <li>전문 입시 컨설팅 및 스페셜리스트을 위한 특수과정 운영</li>
                            <li>연계 산학 프로젝트, 업체 실습, 행사 지원 등 실무능력 습득</li>
                            <li>아티스트 및 교수진 초청 무료 특강 및 세미나 진행</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
    'f2mg003': {
        title: '교육시설안내',
        content: `
            <div class="course-header">
                <h1>교육시설안내</h1>
                <p class="course-intro">
                    최첨단 교육시설과 최적의 학습환경을 제공합니다.
                </p>
            </div>

            <div class="course-section">
                <h3>시설 개요</h3>
                <div class="facility-grid">
                    <div class="facility-item">
                        <h4>강의실</h4>
                        <p>최신 기자재를 갖춘 전문 강의실</p>
                        <ul>
                            <li>대형 스크린 및 프로젝터</li>
                            <li>개인별 실습 공간</li>
                            <li>최신 뷰티 기자재</li>
                        </ul>
                    </div>
                    <div class="facility-item">
                        <h4>실습실</h4>
                        <p>현장과 동일한 실습 환경</p>
                        <ul>
                            <li>전문 뷰티 살롱 시설</li>
                            <li>최신 장비 및 도구</li>
                            <li>안전한 실습 환경</li>
                        </ul>
                    </div>
                    <div class="facility-item">
                        <h4>토탈샵</h4>
                        <p>자습 및 실습을 위한 공간</p>
                        <ul>
                            <li>24시간 이용 가능</li>
                            <li>전문 도구 대여</li>
                            <li>개인별 락커 제공</li>
                        </ul>
                    </div>
                    <div class="facility-item">
                        <h4>휴게공간</h4>
                        <p>편안한 휴식 공간</p>
                        <ul>
                            <li>카페테리아</li>
                            <li>라운지</li>
                            <li>독서실</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="course-section">
                <h3>시설 규모</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">200평+</div>
                        <div class="stat-label">교육 공간</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">10+</div>
                        <div class="stat-label">강의실</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">5+</div>
                        <div class="stat-label">실습실</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">최신 기자재</div>
                    </div>
                </div>
            </div>
        `
    },
    'f2mg004': {
        title: '오시는길',
        content: `
            <div class="course-header">
                <h1>오시는길</h1>
                <p class="course-intro">
                    역세권에 위치한 F2MG로 편리하게 오실 수 있습니다.
                </p>
            </div>

            <div class="course-section">
                <h3>위치 안내</h3>
                <div class="location-info">
                    <div class="location-item">
                        <h4>서울 캠퍼스</h4>
                        <p><strong>주소:</strong> 서울특별시 노원구 노원로 449, 6층</p>
                        <p><strong>전화:</strong> 02-1234-5678</p>
                        <p><strong>교통:</strong> 지하철 4호선 노원역 도보 5분</p>
                    </div>
                    <div class="location-item">
                        <h4>청담 캠퍼스</h4>
                        <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 123</p>
                        <p><strong>전화:</strong> 02-1234-5679</p>
                        <p><strong>교통:</strong> 지하철 2호선 강남역 도보 7분</p>
                    </div>
                    <div class="location-item">
                        <h4>노원 캠퍼스</h4>
                        <p><strong>주소:</strong> 서울특별시 노원구 상계로 108, 3층</p>
                        <p><strong>전화:</strong> 02-1234-5680</p>
                        <p><strong>교통:</strong> 지하철 4호선 상계역 도보 3분</p>
                    </div>
                </div>
            </div>

            <div class="course-section">
                <h3>교통편 안내</h3>
                <div class="transport-info">
                    <div class="transport-item">
                        <h4>지하철</h4>
                        <p>각 캠퍼스 인근 지하철역에서 도보 3-7분 거리</p>
                    </div>
                    <div class="transport-item">
                        <h4>버스</h4>
                        <p>주요 버스 정류장에서 도보 5분 이내</p>
                    </div>
                    <div class="transport-item">
                        <h4>주차</h4>
                        <p>건물 내 주차장 이용 가능 (유료)</p>
                    </div>
                </div>
            </div>
        `
    },
    'f2mg006': {
        title: '연혁',
        content: `
            <div class="course-header">
                <h1>연혁</h1>
                <p class="course-intro">
                    F2MG는 지속적인 성장과 발전을 통해<br>
                    뷰티 교육의 선두주자로 자리매김하고 있습니다.
                </p>
            </div>

            <div class="course-section">
                <h3>주요 연혁</h3>
                <div class="history-timeline">
                    <div class="timeline-item">
                        <div class="timeline-year">2024</div>
                        <div class="timeline-content">
                            <h4>청담 캠퍼스 오픈</h4>
                            <p>프리미엄 교육 공간으로 청담 캠퍼스 신규 오픈</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2023</div>
                        <div class="timeline-content">
                            <h4>국제 대회 수상</h4>
                            <p>학생 및 강사진 다수 국제 뷰티 대회 수상</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2022</div>
                        <div class="timeline-content">
                            <h4>교육시설 확장</h4>
                            <p>200평 이상의 대규모 교육시설로 확장</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2021</div>
                        <div class="timeline-content">
                            <h4>온라인 교육 시스템 구축</h4>
                            <p>최신화된 온라인 수업 플랫폼 오픈</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2020</div>
                        <div class="timeline-content">
                            <h4>F2MG 설립</h4>
                            <p>F2MG 글로벌 뷰티 아카데미 설립</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="course-section">
                <h3>주요 성과</h3>
                <div class="achievements-grid">
                    <div class="achievement-item">
                        <div class="achievement-number">97%</div>
                        <div class="achievement-label">대학 진학 합격률</div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-number">2배+</div>
                        <div class="achievement-label">전국 평균 대비 합격률</div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-number">1000+</div>
                        <div class="achievement-label">졸업생 수</div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-number">50+</div>
                        <div class="achievement-label">프리미엄 강사진</div>
                    </div>
                </div>
            </div>
        `
    }
};

// 스타일 추가
const additionalStyles = `
    <style>
        .teacher-grid, .info-grid, .facility-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        .teacher-card, .info-card, .facility-item {
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .teacher-card:hover, .info-card:hover, .facility-item:hover {
            transform: translateY(-5px);
        }
        .teacher-info h4, .info-card h4, .facility-item h4 {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #222;
        }
        .teacher-specialty, .info-subtitle {
            color: #EB5A31;
            font-weight: 500;
            margin-bottom: 15px;
        }
        .stats-grid, .achievements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        .stat-item, .achievement-item {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, #f5f0e8 0%, #fff 100%);
            border-radius: 12px;
        }
        .stat-number, .achievement-number {
            font-size: 48px;
            font-weight: 700;
            color: #EB5A31;
            margin-bottom: 10px;
        }
        .stat-label, .achievement-label {
            font-size: 16px;
            color: #666;
        }
        .location-info, .transport-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .location-item, .transport-item {
            background: #f8f8f8;
            padding: 30px;
            border-radius: 8px;
        }
        .location-item h4, .transport-item h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #222;
        }
        .history-timeline {
            position: relative;
            padding-left: 40px;
        }
        .history-timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #EB5A31;
        }
        .timeline-item {
            position: relative;
            margin-bottom: 40px;
        }
        .timeline-year {
            position: absolute;
            left: -50px;
            top: 0;
            width: 40px;
            height: 40px;
            background: #EB5A31;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
        }
        .timeline-content {
            background: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .timeline-content h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #222;
        }
    </style>
`;

// 페이지 생성 함수
function generatePage(pageName, pageData) {
    let pageHTML = template
        .replace('<!-- PAGE TITLE -->', `${pageData.title} - F2MG GLOBAL BEAUTY ACADEMY`)
        .replace('<!-- PAGE SPECIFIC CSS -->', additionalStyles)
        .replace('<!-- PAGE CONTENT START -->', `
        <!-- PAGE CONTENT START -->
        <main class="page-main">
            ${pageData.content}
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
    
    return pageHTML;
}

// 각 페이지 생성
Object.keys(f2mgPages).forEach(pageName => {
    const pageData = f2mgPages[pageName];
    const pageHTML = generatePage(pageName, pageData);
    const filePath = path.join(__dirname, 'html/f2mg', `${pageName}.html`);
    
    fs.writeFileSync(filePath, pageHTML, 'utf8');
    console.log(`✅ 생성 완료: ${filePath}`);
});

console.log(`\n✅ 총 ${Object.keys(f2mgPages).length}개 F2MG 페이지 생성 완료!`);

