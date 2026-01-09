jQuery(document).ready(function ($) {
    
    "use strict";
    
    
  $('.js-select').niceSelect(); // Input + -

  $('body').on('click', '.jq-number .minus', function (event) {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
    
     var $preloader = $('#page-preloader'),
    $spinner   = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(50).fadeOut('slow');
    
    
  $('body').on('click', '.jq-number .plus', function (event) {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  }); // Slider 

  const sliderFirstScreen = new Swiper('.slider-first-screen .swiper-container', {
    loop: true,
    speed: 4000,
    slidesPerView: 2,
    spaceBetween: 0,
    freeMode: true,
    observeParents: true,
    observer: true,
    autoplay: {
      delay: 0
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 0
      },
      959: {
        slidesPerView: 4,
        spaceBetween: 0
      }
    }
  });
  const sliderInfo = new Swiper('.slider-info .swiper-container', {
    loop: true,
    speed: 3000,
    slidesPerView: 1.8,
    spaceBetween: 20,
    freeMode: true,
    observeParents: true,
    observer: true,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  function rargePrice() {
    var $range = $("#range-price");
    var $inputFrom = $("#range-price-from");
    var $inputTo = $("#range-price-to");
    var instance;
    var min = 0;
    var max = 5000;
    var from = 0;
    var to = 5000;
    $range.ionRangeSlider({
      skin: "round",
      type: "double",
      min: min,
      max: max,
      from: from,
      to: to,
      hide_min_max: true,
      hide_from_to: true,
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;
      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
    }

    $inputFrom.on("change", function () {
      var val = $(this).prop("value"); // validate

      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }

      instance.update({
        from: val
      });
      $(this).prop("value", val);
    });
    $inputTo.on("change", function () {
      var val = $(this).prop("value"); // validate

      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        to: val
      });
      $(this).prop("value", val);
    });
  }

  rargePrice();
  $(document).ready(function () {
    //E-mail Ajax Send
    $("form").submit(function () {
      //Change
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "assets/mail/mail.php",
        //Change
        data: th.serialize()
      }).done(function () {
        UIkit.notification({
          message: 'Form sent successfully!',
          status: 'success',
          pos: 'top-center',
          timeout: 5000
        });
        setTimeout(function () {
          // Done Functions
          th.trigger("reset");
        }, 1000);
      });
      return false;
    });
  });
});
const animItems = document.querySelectorAll('._anim');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnSroll);

  function animOnSroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-repeat')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + screenLeft
    };
  }

  setTimeout(() => {
    animOnSroll();
  }, 300);
}

// 드롭다운 호버 기능 - 강력한 오버라이드
(function() {
  function forceShowDropdown(dropdown) {
    if (!dropdown) return;
    dropdown.removeAttribute('hidden');
    dropdown.removeAttribute('aria-hidden');
    dropdown.style.setProperty('display', 'block', 'important');
    dropdown.style.setProperty('visibility', 'visible', 'important');
    dropdown.style.setProperty('opacity', '1', 'important');
    dropdown.style.setProperty('pointer-events', 'auto', 'important');
  }
  
  function forceHideDropdown(dropdown) {
    if (!dropdown) return;
    dropdown.style.setProperty('display', 'none', 'important');
    dropdown.style.setProperty('visibility', 'hidden', 'important');
    dropdown.style.setProperty('opacity', '0', 'important');
    dropdown.style.setProperty('pointer-events', 'none', 'important');
  }
  
  function initDropdowns() {
    var menuItems = document.querySelectorAll('.page-nav .uk-navbar-nav > li');
    
    menuItems.forEach(function(li) {
      var dropdown = li.querySelector('.uk-navbar-dropdown');
      if (!dropdown) return;
      
      // 초기 상태: 숨김
      forceHideDropdown(dropdown);
      
      // 마우스 진입 - 즉시 표시
      li.addEventListener('mouseenter', function() {
        forceShowDropdown(dropdown);
      }, true);
      
      // 마우스 이탈
      li.addEventListener('mouseleave', function(e) {
        var relatedTarget = e.relatedTarget;
        setTimeout(function() {
          if (!dropdown.matches(':hover') && (!relatedTarget || (!li.contains(relatedTarget) && !dropdown.contains(relatedTarget)))) {
            forceHideDropdown(dropdown);
          }
        }, 200);
      }, true);
      
      // 드롭다운에 마우스 진입 - 유지
      dropdown.addEventListener('mouseenter', function() {
        forceShowDropdown(dropdown);
      }, true);
      
      // 드롭다운에서 마우스 이탈
      dropdown.addEventListener('mouseleave', function(e) {
        var relatedTarget = e.relatedTarget;
        if (!relatedTarget || !li.contains(relatedTarget)) {
          forceHideDropdown(dropdown);
        }
      }, true);
    });
  }
  
  // 즉시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
  
  // 지연 실행 (UIkit 로드 후)
  window.addEventListener('load', function() {
    setTimeout(initDropdowns, 300);
    setTimeout(initDropdowns, 800);
    setTimeout(initDropdowns, 1500);
  });
  
  // jQuery도 사용
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function() {
      setTimeout(initDropdowns, 200);
      setTimeout(initDropdowns, 600);
      setTimeout(initDropdowns, 1200);
    });
  }
  
  // 주기적으로 확인 (UIkit이 계속 숨기는 경우 대비)
  setInterval(function() {
    var hoveredItems = document.querySelectorAll('.page-nav .uk-navbar-nav > li:hover');
    hoveredItems.forEach(function(li) {
      var dropdown = li.querySelector('.uk-navbar-dropdown');
      if (dropdown) {
        forceShowDropdown(dropdown);
      }
    });
  }, 50);
})();


