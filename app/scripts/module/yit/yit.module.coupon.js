define(
  'yit.module.coupon', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm',
    "store",
    'yit.api.coupon.shouldPopup'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, Store, CouponInfo) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(1);

    var couponModule = can.Control.extend({
      giftsInfo: null, 

      init: function(element, options) {
        var appVersion = this.appVersionSupport();
        var that = this;
        if(appVersion == 2 && window.yit && window.yit.callApp){
          window.yit.callApp({
                name: 'yit_localdata',
                data: {key:"yitls1"},
                cb: function(response) {
                    if(response){
                     that.giftsInfo = response.giftsInfo;
                    }
                    that.queryInfo(appVersion);
                }
            });
        }else if(appVersion != 1){
          this.giftsInfo = window.localStorage.getItem("yitiao_giftsInfo");
          that.queryInfo(appVersion);
        }
      },
      
      queryInfo: function(appVersion){
        var that = this;
        if(appVersion != 1){
          var coupon = new CouponInfo();
          coupon.sendRequestByType(function(data){
             if(data){
                 alert(JSON.stringify(data));
                that.giftsInfo = typeof that.giftsInfo == "object"? that.giftsInfo : (that.giftsInfo ? JSON.parse(that.giftsInfo) : null);
                var closeTimes = that.giftsInfo ? that.giftsInfo.closeTimes : null;
                that.giftsInfo = {
                  effective:data.effective,
                  qualify:data.qualify,
                  received:data.received,
                  closeTimes:closeTimes
                };

                if(appVersion == 2 && window.yit && window.yit.callApp){
                  window.yit.callApp({
                        name: 'yit_localdata',
                        data: {
                          key:"yitls1",
                          value:JSON.stringify({giftsInfo:that.giftsInfo}),
                          },
                        cb: function(response) {

                        }
                    });
                }else{
                  window.localStorage.setItem("yitiao_giftsInfo", JSON.stringify(that.giftsInfo));
                }
                that.displayIcon(data.effective, data.qualify, data.received);
             }
           }, function(error){
              console.log(error);
            });
        }else{
          $(".cms-coupon").css("display", "none");
          $(".cms-coupon-icon").css("display", "none");
        } 
      },

      appVersionSupport: function(){
          var appVersion = navigator.userAgent;
          var vIndex = appVersion.indexOf('version"');
          var appVersionValue ;
          if(vIndex > -1){
              appVersionValue = appVersion.substring(vIndex+10, appVersion.indexOf('"', vIndex+11));
            if(appVersionValue == "1.8.0" || appVersionValue == "1.8.2"){
                return 1;
            }else{
              var params = appVersionValue.split(".");
              if(params && params.length == 3 && (params[0] - 1 > 0 || params[1] - 9 >= 0)){
                return 2;
              }
            }

          }
          return 0;
      },

      //根据状态来进行页面的展现
      displayIcon: function(global, qualify, received){
        var intervalTime = 3*60*1000;  // 24*60*60*1000
        if(global == "0"){
          //总开关为关闭状态
          $(".cms-coupon").css("display", "none");
          $(".cms-coupon-icon").css("display", "none");
        }else if(global == "1" && qualify == "1"){
          //总开关为打开状态，有领取资格，但是未领取，还要根据上次的关闭时间来判断展现大图标还是小图标
          if(received != "1"){
            var closeTimes = this.giftsInfo.closeTimes;
            if(!closeTimes || new Date() - closeTimes > intervalTime){
              $(".cms-coupon").css("display", "block");
              $(".cms-coupon-icon").css("display", "none");
            }else{
              $(".cms-coupon").css("display", "none");
              $(".cms-coupon-icon").css("display", "block");
            }
          }else{
            //总开关为打开状态，有领取资格，但是已领取
            $(".cms-coupon").css("display", "none");
            $(".cms-coupon-icon").css("display", "block");
          }
        }else if(global == "1" && qualify == "0"){
          //总开关为打开状态，没有领取资格
          $(".cms-coupon").css("display", "none");
          $(".cms-coupon-icon").css("display", "none");
        }
      },

      //关闭大图标，展现小图标
      // ".cms-coupon .close click": function(el, event){
      //   $(".cms-coupon").css("display", "none");
      //   $(".cms-coupon-icon").css("display", "block");
      //   this.giftsInfo.closeTimes = new Date().getTime();
      //   window.localStorage.setItem("yitiao_giftsInfo", JSON.stringify(this.giftsInfo));
      // },

      //点击小图标去的页面
      ".cms-coupon-icon,.cms-coupon click": function(el, event){
          this.giftsInfo.closeTimes = new Date().getTime();
          var appVersion = this.appVersionSupport();
          var that = this;
          if(appVersion == 2 && window.yit && window.yit.callApp){
            window.yit.callApp({
                  name: 'yit_localdata',
                  data: {
                    key:"yitls1",
                    value:JSON.stringify({giftsInfo:that.giftsInfo}),
                    },
                  cb: function(response) {
                      if(response && response.value){
                         // that.giftsInfo = response.value;
                      }
                  }
              });
          }else{
            window.localStorage.setItem("yitiao_giftsInfo", JSON.stringify(that.giftsInfo));
          }
          if($(event.target).hasClass("close") || $(event.target).hasClass("cms-coupon")){
            $(".cms-coupon").css("display", "none");
            $(".cms-coupon-icon").css("display", "block");
          }else{
            var el = document.createElement("a");
            $(el).attr("id", "coupon");
            $(el).attr("href", "/coupon.html");
            $(el).click();
            //window.location = "/coupon.html";
            return false;
          }
      },
    })
    new couponModule($("body"));
  })