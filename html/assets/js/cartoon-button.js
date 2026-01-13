/**
 * Cartoon Button 스타일 적용 스크립트
 * 원본 버튼을 그대로 유지하고 스타일만 추가
 * Hero Section 내부 버튼은 제외
 */

(function() {
    'use strict';

    // 기존 버튼에 Cartoon 스타일 클래스만 추가
    function applyCartoonStyle(element) {
        // 이미 적용된 경우 스킵
        if (element.classList.contains('cartoon-btn-applied')) {
            return;
        }
        
        // Hero Section 내부 버튼은 제외
        if (element.closest('.section-hero') || 
            element.classList.contains('hero-cta-btn') ||
            element.closest('.section-hero__cta')) {
            return;
        }
        
        // 특수 버튼은 제외
        if (element.classList.contains('uk-offcanvas-close') ||
            element.classList.contains('uk-modal-close') ||
            element.classList.contains('uk-close') ||
            element.classList.contains('hero-slider-button')) {
            return;
        }
        
        // Cartoon 버튼 클래스 추가
        element.classList.add('cartoon-btn-applied');
        
        // 크기 클래스 추가
        if (element.classList.contains('uk-button-large')) {
            element.classList.add('cartoon-btn-large');
        } else if (element.classList.contains('uk-button-small')) {
            element.classList.add('cartoon-btn-small');
        }
        
        // 기본 색상 클래스 추가
        if (element.classList.contains('uk-button-danger')) {
            element.classList.add('cartoon-btn-orange');
        } else if (element.classList.contains('uk-button-default')) {
            element.classList.add('cartoon-btn-orange');
        }
    }

    // 페이지 로드 시 모든 버튼에 스타일 적용 (Hero Section 제외)
    function initCartoonButtons() {
        console.log('Cartoon Button 스타일 적용 시작 (Hero Section 제외)...');
        
        // 모든 UIKit 버튼 찾기
        const allButtons = document.querySelectorAll('.uk-button-danger, .uk-button-default, .uk-button-link, .uk-button');
        let appliedCount = 0;
        
        allButtons.forEach(function(btn) {
            // Hero Section 내부 버튼은 제외
            if (btn.closest('.section-hero') || 
                btn.classList.contains('hero-cta-btn') ||
                btn.closest('.section-hero__cta')) {
                return;
            }
            
            // 이미 적용되었거나 특수 버튼은 제외
            if (btn.classList.contains('cartoon-btn-applied') ||
                btn.classList.contains('uk-offcanvas-close') ||
                btn.classList.contains('uk-modal-close') ||
                btn.classList.contains('uk-close') ||
                btn.classList.contains('hero-slider-button') ||
                btn.classList.contains('cartoon-btn-inner')) {
                return;
            }
            
            applyCartoonStyle(btn);
            appliedCount++;
        });
        
        console.log('적용된 버튼 개수:', appliedCount);
    }

    // 즉시 실행
    initCartoonButtons();
    
    // DOMContentLoaded 시 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initCartoonButtons, 100);
            setTimeout(initCartoonButtons, 300);
        });
    } else {
        setTimeout(initCartoonButtons, 100);
        setTimeout(initCartoonButtons, 300);
    }
    
    // UIkit이 DOM을 조작할 수 있으므로, UIkit 로드 후에도 다시 초기화 시도
    window.addEventListener('load', function() {
        setTimeout(initCartoonButtons, 100);
        setTimeout(initCartoonButtons, 500);
        setTimeout(initCartoonButtons, 1000);
    });
    
    // MutationObserver로 DOM 변경 감지
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            let shouldReinit = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if (node.classList && (node.classList.contains('uk-button') || node.querySelector('.uk-button'))) {
                                if (!node.closest('.section-hero')) {
                                    shouldReinit = true;
                                }
                            }
                        }
                    });
                }
            });
            if (shouldReinit) {
                setTimeout(initCartoonButtons, 100);
            }
        });
        
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // 전역 함수로 export
    window.initCartoonButtons = initCartoonButtons;

})();
