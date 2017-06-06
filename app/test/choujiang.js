define(
  'yit.api.queryUserActivity', [
    'zepto',
    'can',
    'lodash',
    'yit.framework.comm'
  ],
  function($, can, _, Comm) {
    'use strict';

    return Comm.extend({
      api: {
        COMMON: {
          _mt: 'activity.queryUserActivity',
          _ts: Date.now(),
          _aid: 1
        },
        HTTP_METHOD: 'post',
        REQUIRED: {
          'activityId': 'string'
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    });
  });

// Auto Generated.  DO NOT EDIT!
/**
 * @class youa.api.getPrices
 * @param  {Object} $
 * @param  {Object} can
 * @param  {Object} _
 * @param  {can.Construct} Comm
 * @param  {Object} SecurityType
 * @return {can.Construct}
 */
define(
  'yit.api.signupActivity', [
    'zepto',
    'can',
    'lodash',
    'yit.framework.comm'
  ],
  function($, can, _, Comm) {
    'use strict';

    return Comm.extend({
      api: {
        COMMON: {
          _mt: 'activity.signupActivity',
          _ts: Date.now(),
          _aid: 1
        },
        // PATH_NAME: 'shop/prostock/findSimpleInfo.api',
        HTTP_METHOD: 'post',
        REQUIRED: {
          'activityId': 'string',
          'tempToken': 'string'
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    });
  });

// Auto Generated.  DO NOT EDIT!
/**
 * @class youa.api.getPrices
 * @param  {Object} $
 * @param  {Object} can
 * @param  {Object} _
 * @param  {can.Construct} Comm
 * @param  {Object} SecurityType
 * @return {can.Construct}
 */
define(
  'yit.api.fillRecAddress', [
    'zepto',
    'can',
    'lodash',
    'yit.framework.comm'
  ],
  function($, can, _, Comm) {
    'use strict';

    return Comm.extend({
      api: {
        COMMON: {
          _mt: 'activity.fillRecAddress',
          _ts: Date.now(),
          _aid: 1
        },
        HTTP_METHOD: 'post',
        REQUIRED: {
          'activityId': 'int',
          'nationName': 'string',
          'provinceName': 'string',
          'cityName': 'string',
          'regionName': 'string',
          'detail': 'string',
          'recName': 'string',
          'mobile': 'string'
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    });
  });

// Auto Generated.  DO NOT EDIT!
/**
 * @class youa.api.getPrices
 * @param  {Object} $
 * @param  {Object} can
 * @param  {Object} _
 * @param  {can.Construct} Comm
 * @param  {Object} SecurityType
 * @return {can.Construct}
 */
define(
  'yit.api.downSmsCode', [
    'zepto',
    'can',
    'lodash',
    'yit.framework.comm'
  ],
  function($, can, _, Comm) {
    'use strict';

    return Comm.extend({
      api: {
        COMMON: {
          _mt: 'user.downSmsCode',
          _ts: Date.now(),
          _aid: 1
        },
        HTTP_METHOD: 'post',
        REQUIRED: {
          'mobile': 'string',
          'askType': 'string'
        },
        OPTIONAL: {},
        VERIFY: {},
        ERROR_CODE: {}
      }
    });
  });
define(
  'yit.module.choujiang', [
    'can',
    'zepto',
    'fastclick',
    'yit.business.config',
    'yit.framework.comm',
    'yit.api.queryUserActivity',
    'yit.api.signupActivity',
    'yit.api.fillRecAddress',
    'yit.api.downSmsCode'
  ],
  function(can, $, Fastclick, SFConfig, SFFrameworkComm, QueryUserActivity, SignupActivity, FillAddress, SendSmsCode) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var Choujiang = can.Control.extend({
      codeInterval:null, 
      counter:60,
      init: function(element, options) {
        
      },

      showDom: function(type, isRight){
        $(".question-info").css("display", "none");
        $(".reward-info").css("display", "none");
        $(".answer-info").css("display", "none");
        $(".submit-info").css("display", "none");
        $(".prize-info").css("display", "none");
        $(".prize-already").css("display", "none");
        $(".prize-get").css("display", "none");
        $(".prize-fail").css("display", "none");
        $(".address-info").css("display", "none");
        $(".d-emtpy").css("display", "none");
        $(".reward-detail").css("display", "none");
        $(".title-info").css("display", "block");
         //sumit answer
         if(type == 1){
            $(".question-info").css("display", "block");
            $(".reward-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
         }else if(type == 2){  //answer right
            $(".answer-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
            this.isAnswerRight(isRight);
         }else if(type == 3){ //submit success
            $(".submit-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
         }else if(type == 4){ //check prize info
            $(".prize-info").css("display", "none");
            $(".reward-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
         }else if(type == 5){ //prized
            $(".prize-already").css("display", "none");
            $(".reward-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
         }else if(type == 6){ //fail to get prize
            $(".prize-fail").css("display", "block");
            $(".reward-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
         }else if(type == 7){ //to get prize
            $(".prize-get").css("display", "block");
            $(".reward-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
         }else if(type == 8){ //address fullfill
            $(".address-info").css("display", "block");
            $(".d-emtpy").css("display", "block");
            $(".reward-detail").css("display", "block");
            $(".title-info").css("display", "none");
         }
      },

      isAnswerRight: function(isRight){
        if(isRight){
          $(".a-success").css("display", "block");
          $(".a-fail").css("display", "none");
        }else{
          $(".a-success").css("display", "none");
          $(".a-fail").css("display", "block");
        }
      },

      //send check code
      ".answer-info .check click": function(e){
        this.checkCode();
        if($(e.target).hasClass("disabled")){
           return;
        }else{
          if(this.codeInterval){
            return;
          }else{
            this.counter = 60;
            var that = this;
            //interface
            var smsCode = new SendSmsCode({
              "mobile": $(".a-success .answer").val(),
              "askType": "LOGORREGI"
            });
            can.when(smsCode.sendRequestRestful()).done(function(data){
                that.codeInterval = setInterval(function(){
                if(that.counter < 1){
                  clearInterval(that.codeTime);
                  $(".answer-info .check").val("发送验证码");
                }else{
                  $(".answer-info .check").val(that.counter);
                  that.counter--;
                }
              }, 1000);
            }).fail(function(error){
               console.log(error);
            });
          }
        }
      },

      //to get prize submit
      ".a-act click": function(){
        if(this.checkCode && $(".answer-info .a-input").val()){
          //interface

        }
      },
      //retry
      ".a-retry click": function(){
        this.showDom(1);
      },
      //get prize
      ".a-act click": function(){
        this.showDom(7);
      },

      //goto address fullfill
      ".p-modify click": function(){
        this.showDom(8);
      },

      //save address info
      ".ad-save click": function(){
        //interface
        
      }, 

      checkCode: function(){
          var phone = $(".a-success .answer").val();
          if(this.validateMobile(phone)){
            $(".answer-info .check").removeClass("disabled");
            return ture;
          }else{
            this.alertInfo("无效手机号");
            return false;
          }
      },

      //校验手机号码
      validateMobile: function(e) {
        return e = $.trim(e + "").replace(/\s/g, ""), !!
          /^(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/.test($.trim(e))
      },

      //tips
      alertInfo: function(content, time) {
        $(".alert").text(content).css("display", "block");
        setTimeout(function() {
          $(".alert").css("display", "none");
        }, time || 2000);
      },

      render: function(element) {}
    })

    // 查到所有需要渲染价格的模块
    new Choujiang();
    setTimeout(function() {
      $(".swiper-pagination-bullet:first").css("display", "none")
    }, 500);
  });

require(["yit.module.choujiang"]);