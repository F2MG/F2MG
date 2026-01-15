/**
 * 메뉴 드롭다운 겹침 방지 및 빠른 사라짐 효과
 */

(function() {
    'use strict';
    
    // 모든 드롭다운을 관리하는 함수
    function hideAllDropdowns() {
        const allDropdowns = document.querySelectorAll('.page-nav .uk-navbar-dropdown');
        allDropdowns.forEach(function(dropdown) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.pointerEvents = 'none';
            dropdown.style.display = 'none';
        });
    }
    
    // 메뉴 항목에 이벤트 리스너 추가
    function initMenuDropdowns() {
        const menuItems = document.querySelectorAll('.page-nav .uk-navbar-nav > li');
        
        menuItems.forEach(function(menuItem) {
            const dropdown = menuItem.querySelector('.uk-navbar-dropdown');
            if (!dropdown) return;
            
            // 마우스 진입 시
            menuItem.addEventListener('mouseenter', function() {
                // 다른 모든 드롭다운 즉시 숨김
                hideAllDropdowns();
                
                // 현재 드롭다운 표시
                setTimeout(function() {
                    dropdown.style.display = 'block';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.opacity = '1';
                    dropdown.style.pointerEvents = 'auto';
                }, 10);
            });
            
            // 마우스 벗어남 시
            menuItem.addEventListener('mouseleave', function() {
                // 즉시 숨김
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.pointerEvents = 'none';
                setTimeout(function() {
                    dropdown.style.display = 'none';
                }, 10);
            });
            
            // 드롭다운 자체에 마우스가 있을 때도 유지
            dropdown.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.pointerEvents = 'auto';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.pointerEvents = 'none';
                setTimeout(function() {
                    dropdown.style.display = 'none';
                }, 10);
            });
        });
    }
    
    // DOM 로드 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initMenuDropdowns, 100);
        });
    } else {
        setTimeout(initMenuDropdowns, 100);
    }
    
    // 페이지 로드 후에도 초기화
    window.addEventListener('load', function() {
        setTimeout(initMenuDropdowns, 200);
    });
    
})();

