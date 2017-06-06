function initNavigateHeader() {
  var currentHref = window.location.href;
  var search = window.location.search;
  if (search) {
    currentHref = currentHref.split(search)[0];
  }
  var aList = $(".cms-nav a");
  var hasActive = false;
  for (var i = 0; i < aList.length; i++) {
    if (hasActive) $(aList[i]).removeClass("active");
    var target = $(aList[i]).attr("href");
    var tempHref = target.split("?")[0];
    // 当前页面是 index.html 的时候 target是网站地址
    if (location.pathname == "/index.html" && target.indexOf(".html") == -1) {
      $(aList[i]).addClass("active");
      hasActive = true;
    } else if (target.indexOf("#") == 0) {
      $(aList[i]).removeClass("active");
    } else if (tempHref.indexOf(currentHref) > -1 && currentHref.indexOf(".html") > -1) {
      $(aList[i]).addClass("active");
      hasActive = true;
    } else if (currentHref.indexOf(".html") == -1 && (tempHref == currentHref || (tempHref + "/") == currentHref)) {
      $(aList[i]).addClass("active");
      hasActive = true;
    } else {
      $(aList[i]).removeClass("active");
    }
  }
}

$(document).ready(function() {
  initNavigateHeader();

  var navDom = $(".cms-nav nav");
  if(!navDom || navDom.length == 0) return;
  var navOffset = $('.cms-nav nav').offset().top;

  setTimeout(function() {
    navOffset = $('.cms-nav nav').offset().top;
  }, 1000);

  function isSupportSticky() {
    var vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
      vendorListLength = vendorList.length,
      stickyElement = document.createElement('div');

    for (var i = 0; i < vendorListLength; i++) {
      stickyElement.style.position = vendorList[i] + 'sticky';
      if (stickyElement.style.position != '') {
        return true;
      }
    }
    return false;
  }

  var support = isSupportSticky();
  var header = function() {
    var cartDom = $(".cms-search");
    var hasCart = cartDom && cartDom.length > 0 ? true : false;  //判断是否有购物车模块
    var scrolltop = $(window).scrollTop();
    if (scrolltop > navOffset) {
        if (!($('.cms-nav nav').hasClass("fixed") || $('.cms-nav nav').hasClass("fixed80"))) {
          if(hasCart){
            $('.cms-nav nav').addClass("fixed80");
          }else{
            $('.cms-nav nav').addClass("fixed");
          }
          
        }
    } else {
        if ($('.cms-nav nav').hasClass("fixed") || $('.cms-nav nav').hasClass("fixed80")) {
          if(hasCart){
            $('.cms-nav nav').removeClass("fixed80");
          }else{
            $('.cms-nav nav').removeClass("fixed");
          }
          
        }
    }
  };

  var arr = []
  $(window).scroll(function () {
    arr.push(header);
    setTimeout(function() {
      if (arr.length > 0) {
        var action = arr.pop();
        action();
        arr = []
      }
    }, 300);
  });
});