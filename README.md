# F2MG Global Beauty Academy - Static Site Builder

정적 HTML 사이트를 Nunjucks 템플릿으로 관리하는 프로젝트입니다.

## 프로젝트 구조

```
F2MG/
├── src/
│   ├── templates/          # 페이지 템플릿 파일들
│   ├── partials/           # 공통 컴포넌트 (header, footer, base)
│   └── data/               # 데이터 파일 (menu.json, slug-mapping.json)
├── dist/                   # 빌드 결과물 (정적 HTML 파일)
├── html/                   # 기존 HTML 파일 (참고용)
├── build.js                # 빌드 스크립트
└── package.json
```

## 설치

```bash
npm install
```

## 사용법

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 개발 모드 (파일 변경 감지)

```bash
npm run dev
```

템플릿 파일이나 데이터 파일이 변경되면 자동으로 재빌드됩니다.

### 로컬 서버 실행

```bash
npm run serve
```

또는

```bash
cd dist && python3 -m http.server 8000
```

## 메뉴 관리

메뉴 구조는 `src/data/menu.json` 파일에서 관리합니다.

```json
{
  "items": [
    {
      "label": "메뉴명",
      "slug": "menu-slug",
      "url": "/menu-slug",
      "children": [
        {
          "label": "서브메뉴명",
          "slug": "submenu-slug",
          "url": "/menu-slug/submenu-slug"
        }
      ]
    }
  ]
}
```

## 템플릿 작성

### 기본 템플릿 구조

```nunjucks
{% extends "partials/base.html" %}

{% block title %}페이지 제목{% endblock %}

{% block body_class %}page-custom{% endblock %}

{% block content %}
<!-- 페이지 내용 -->
{% endblock %}
```

### 헤더/푸터

모든 페이지는 자동으로 공통 헤더와 푸터가 포함됩니다.

- 헤더: `src/partials/header.html`
- 푸터: `src/partials/footer.html`
- 베이스 템플릿: `src/partials/base.html`

### 메뉴 렌더링

헤더와 푸터에서 메뉴는 자동으로 `menu.json`에서 로드되어 렌더링됩니다.

- PC: 메가메뉴 (멀티컬럼 드롭다운)
- 모바일: 아코디언/오프캔버스 메뉴

## URL 구조

모든 URL은 영문 slug로 통일되어 있습니다.

- 메뉴 항목별 slug는 `src/data/slug-mapping.json`에서 확인할 수 있습니다.
- 기존 파일명과의 매핑도 `slug-mapping.json`의 `legacy_mapping` 섹션에 있습니다.

## 새 페이지 추가하기

1. `src/templates/` 폴더에 새 템플릿 파일 생성 (예: `new-page.html`)
2. 템플릿 작성:

```nunjucks
{% extends "partials/base.html" %}

{% block title %}새 페이지{% endblock %}

{% block content %}
<h1>새 페이지 내용</h1>
{% endblock %}
```

3. 빌드 실행: `npm run build`
4. `dist/` 폴더에 HTML 파일이 생성됩니다.

## 메뉴에 새 항목 추가하기

1. `src/data/menu.json` 파일 열기
2. `items` 배열에 새 항목 추가:

```json
{
  "label": "새 메뉴",
  "slug": "new-menu",
  "url": "/new-menu",
  "children": []
}
```

3. 빌드 실행: `npm run build`

## 주의사항

- 빌드 전에 `dist/` 폴더는 자동으로 생성되지만, 기존 파일은 덮어씌워집니다.
- `html/assets/` 폴더의 내용은 자동으로 `dist/assets/`로 복사됩니다.
- 템플릿 파일은 `.html` 확장자를 사용해야 합니다.

