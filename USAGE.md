# 사용 가이드

## 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 3. 로컬 서버 실행

```bash
npm run serve
```

또는

```bash
cd dist && python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

## 주요 기능

### ✅ 완료된 기능

1. **헤더/푸터 템플릿화**
   - `src/partials/header.html` - 공통 헤더
   - `src/partials/footer.html` - 공통 푸터
   - 모든 페이지에서 자동으로 include

2. **메뉴 관리**
   - `src/data/menu.json`에서 중앙 관리
   - PC: 메가메뉴 (멀티컬럼 드롭다운)
   - 모바일: 아코디언/오프캔버스 메뉴

3. **URL/Slug 통일**
   - 모든 URL은 영문 slug로 통일
   - `src/data/slug-mapping.json`에서 매핑 관리

4. **빌드 시스템**
   - Nunjucks 템플릿 엔진 사용
   - 정적 HTML 파일 생성
   - 파일 변경 감지 (watch 모드)

## 파일 구조

```
src/
├── templates/          # 페이지 템플릿
│   ├── base.html      # 기본 레이아웃
│   └── index.html     # 홈 페이지
├── partials/          # 공통 컴포넌트
│   ├── header.html    # 헤더 (메뉴 포함)
│   └── footer.html    # 푸터
└── data/              # 데이터 파일
    ├── menu.json      # 메뉴 구조
    └── slug-mapping.json  # URL 매핑표
```

## 새 페이지 추가하기

1. `src/templates/` 폴더에 새 파일 생성 (예: `about.html`)

2. 템플릿 작성:

```nunjucks
{% extends "base.html" %}

{% block title %}About - F2MG{% endblock %}

{% block body_class %}page-about{% endblock %}

{% block content %}
<div class="section-hero">
    <h1>About Us</h1>
    <p>내용...</p>
</div>
{% endblock %}
```

3. 빌드: `npm run build`

4. 결과: `dist/about.html` 생성

## 메뉴 수정하기

`src/data/menu.json` 파일을 수정:

```json
{
  "items": [
    {
      "label": "메뉴명",
      "slug": "menu-slug",
      "url": "/menu-slug",
      "children": [
        {
          "label": "서브메뉴",
          "slug": "submenu-slug",
          "url": "/menu-slug/submenu-slug"
        }
      ]
    }
  ]
}
```

수정 후 빌드하면 자동으로 헤더와 모바일 메뉴에 반영됩니다.

## 개발 모드

파일 변경 시 자동 빌드:

```bash
npm run dev
```

템플릿 파일이나 데이터 파일을 수정하면 자동으로 재빌드됩니다.

## 주의사항

- 빌드 전 `dist/` 폴더는 자동으로 정리됩니다
- `html/assets/` 폴더는 자동으로 `dist/assets/`로 복사됩니다
- 템플릿 파일은 반드시 `.html` 확장자를 사용해야 합니다

