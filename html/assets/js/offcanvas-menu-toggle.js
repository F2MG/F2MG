// 오프캔버스 메뉴 토글 기능
(function() {
    'use strict';

    let initialized = false;

    function initOffcanvasMenuToggle() {
        // 오프캔버스 메뉴의 모든 메인 메뉴 항목 찾기
        const offcanvas = document.getElementById('offcanvas');
        if (!offcanvas) {
            return;
        }

        const menuItems = offcanvas.querySelectorAll('.uk-nav > li');

        menuItems.forEach(function(li) {
            // 직계 자식 a 태그 찾기
            let link = null;
            let submenu = null;
            
            // children을 사용하여 직계 자식만 확인
            for (let i = 0; i < li.children.length; i++) {
                const child = li.children[i];
                if (child.tagName === 'A' && !link) {
                    link = child;
                } else if (child.classList && child.classList.contains('uk-nav-sub')) {
                    submenu = child;
                }
            }

            if (!link) return;
            
            // 서브메뉴가 없는 경우 건너뛰기
            if (!submenu) {
                return;
            }

            // 기존 이벤트 리스너가 있는지 확인하고 제거
            const existingHandler = link.getAttribute('data-toggle-handler');
            if (existingHandler === 'true') {
                // 이미 설정됨
                return;
            }

            // 클릭 이벤트 추가
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // 다른 모든 메뉴 닫기
                menuItems.forEach(function(otherLi) {
                    if (otherLi !== li) {
                        otherLi.classList.remove('uk-open', 'uk-active');
                        // 직계 자식 서브메뉴 찾기
                        for (let j = 0; j < otherLi.children.length; j++) {
                            const child = otherLi.children[j];
                            if (child.classList && child.classList.contains('uk-nav-sub')) {
                                child.style.setProperty('display', 'none', 'important');
                                child.style.setProperty('visibility', 'hidden', 'important');
                                break;
                            }
                        }
                    }
                });

                // 현재 메뉴의 서브메뉴 찾기 (다시 찾기)
                let currentSubmenu = null;
                for (let k = 0; k < li.children.length; k++) {
                    const child = li.children[k];
                    if (child.classList && child.classList.contains('uk-nav-sub')) {
                        currentSubmenu = child;
                        break;
                    }
                }
                
                if (!currentSubmenu) return;

                // 현재 메뉴 토글
                const isOpen = li.classList.contains('uk-open') || li.classList.contains('uk-active');
                
                if (isOpen) {
                    // 닫기
                    li.classList.remove('uk-open', 'uk-active');
                    currentSubmenu.style.setProperty('display', 'none', 'important');
                    currentSubmenu.style.setProperty('visibility', 'hidden', 'important');
                } else {
                    // 열기
                    li.classList.add('uk-open', 'uk-active');
                    currentSubmenu.style.setProperty('display', 'block', 'important');
                    currentSubmenu.style.setProperty('visibility', 'visible', 'important');
                }
            });

            // 핸들러가 설정되었음을 표시
            link.setAttribute('data-toggle-handler', 'true');
        });

        initialized = true;
    }

    // 초기화 함수
    function initialize() {
        if (initialized) return;
        
        // 여러 시점에서 초기화 시도
        setTimeout(function() {
            initOffcanvasMenuToggle();
        }, 100);
        
        setTimeout(function() {
            initOffcanvasMenuToggle();
        }, 500);
    }

    // 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // UIkit 이벤트 리스너 (오프캔버스가 열릴 때)
    if (typeof UIkit !== 'undefined') {
        UIkit.util.on('#offcanvas', 'show', function() {
            initialized = false; // 오프캔버스가 열릴 때마다 다시 초기화
            setTimeout(function() {
                initOffcanvasMenuToggle();
            }, 200);
        });
    }

    // MutationObserver로 동적으로 추가되는 메뉴 처리
    const observer = new MutationObserver(function(mutations) {
        let shouldInit = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldInit = true;
            }
        });
        if (shouldInit && !initialized) {
            setTimeout(initOffcanvasMenuToggle, 100);
        }
    });

    const offcanvasElement = document.getElementById('offcanvas');
    if (offcanvasElement) {
        observer.observe(offcanvasElement, { childList: true, subtree: true });
    }

    // window load 이벤트에도 초기화
    window.addEventListener('load', function() {
        if (!initialized) {
            setTimeout(initOffcanvasMenuToggle, 1000);
        }
    });

    // jQuery도 확인 (UIkit이 jQuery를 사용할 수 있음)
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function() {
            if (!initialized) {
                setTimeout(initOffcanvasMenuToggle, 300);
            }
        });
    }

    // 전역 함수로 export (디버깅용)
    window.initOffcanvasMenuToggle = initOffcanvasMenuToggle;

})();
