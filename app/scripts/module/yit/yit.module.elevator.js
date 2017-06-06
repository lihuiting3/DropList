(function(){
  //判断app1.8.0以上
  function isSupportAppApi(){
      var appVersion = navigator.appVersion;
      var vIndex = appVersion.indexOf("version");
      var appVersionValue ;
      if(appVersionValue >= "1.8.0"){
          return true;
      }else{
        return false;
      }
  }

  var isApp = isSupportAppApi();
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
  if($(".cms-elevator") && $(".cms-elevator").length <= 0){
    return;
  }

  var topList = [];
  var elevatorLi = $(".cms-elevator").find("li");
  var eleOffset = $(".cms-elevator").offset().top;
    var eleHeight = $(".cms-elevator").offset().height; 
  //计算位置
  function getPositionHeight(){
    for(var i = 0; i < elevatorLi.length; i++){
       var tempCmsId = $(elevatorLi[i]).attr("cms-id");
       if(tempCmsId){
         if(tempCmsId.indexOf("http") > -1){
            continue;
         }
         var temp = $(tempCmsId);
         if(temp && temp.length > 0){
            topList[i] = {
               "id" : tempCmsId,
               "top": $(temp).offset().top,
               "bottom": $(temp).offset().top + $(temp).offset().height
             };
         }
       }
    }
  }
  getPositionHeight();
  //选中标签
  function getActive(topList, elevatorLi){
    var scrolltop = $(window).scrollTop();
    if(scrolltop > eleOffset){
        $(".cms-elevator").find("nav").addClass("fixed");
    }else{
       $(".cms-elevator").find("nav").removeClass("fixed");
    }
    var flag = false;
      for(var i = 0; i < topList.length; i++){
        if(topList[i]){
          if(!flag && scrolltop >= (topList[i].top-eleHeight) && scrolltop < topList[i].bottom-eleHeight){
            $(elevatorLi[i]).find("a").addClass("active");
            flag = true;
          }else{
            $(elevatorLi[i]).find("a").removeClass("active");
          }
        }
    }
  }
  getActive(topList, elevatorLi);
  function scroll(){
    setTimeout(function(){
      getPositionHeight();
      getActive(topList, elevatorLi);
    },100);
  }
  $(window).scroll(scroll);

  function getPoint(event){
    var temp = event.targetTouches[0];
    if(temp){
        var data = {};
        data.ts = new Date().getTime();
        data.url = window.location.href;
        var width = $(window).width() || document.body.scrollWidth;
        data.op = temp.pageX + "," + temp.clientX + "," + temp.pageY + "," + temp.clientY + "电梯," + new Date().getTime() + "," + width;
        if(isApp && window.yit && window.yit.callApp){
            window.yit.callApp({
              name: 'yit_statistics_event_callback',
              data: data,
              cb: function(response) {
                  
              }
          });
        }
    }

    
    
  }
  $(".cms-elevator li").click(function(){
      var tempId = $(this).attr("cms-id");
      if(tempId && tempId.indexOf("http") > -1){
        window.location.href = tempId;
      }else if(tempId){
        $(".cms-elevator li").find("a").removeClass("active");
        $(this).find("a").addClass("active");
        for(var i = 0; i < topList.length; i++){
          if(topList[i] && topList[i].id == tempId){
              // $(window).unbind("scroll");
              $(window).scrollTop(topList[i].top-eleHeight);
              // setTimeout(function(){
              //   $(window).scroll(scroll);
              // }, 100);
          }
        }
      }
  });
})();