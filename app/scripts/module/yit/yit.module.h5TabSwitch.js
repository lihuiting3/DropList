$(document).ready(function(){
  var currentHref = location.href.split("?")[0];
  var list = $(".cms-tabtitleS .item");
  _.each(list, function(item){
    if($(item)[0].getAttribute("href").split("?")[0] == currentHref){
        $(list).removeClass("active");
        $(item).addClass("active");
    }
  });
  var nodeDom = $(".cms-tabtitleS")[0];
  var height = $(nodeDom).offset().top
  function tabFixed(nodeDom){
    if($(window).scrollTop() > height + $(nodeDom).height()){
        if(!$(nodeDom).hasClass("cms-tabtitle-fixed")){
          $(nodeDom).addClass("cms-tabtitle-fixed");
        }
      }else{
        if($(nodeDom).hasClass("cms-tabtitle-fixed")){
          $(nodeDom).removeClass("cms-tabtitle-fixed");
        }
      }
  }
  tabFixed(nodeDom);
  $(window).scroll(function(){
    clearTimeout(fixedFlag);
    var fixedFlag = setTimeout(function(){
      tabFixed(nodeDom);
    }, 300);
    
  });
});