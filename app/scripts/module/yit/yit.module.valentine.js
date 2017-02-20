define(
  'yit.module.valentine', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm',
    'yit.api.seriesSpu.getChildSpuList',
    'yit.api.seriesSpu.getValidChildSpu'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, YitSpuList, YitValidSpu) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var valentine = can.Control.extend({

      init: function(element, options) {
        $(".app-download").css("display", "none");
        this.numberList = "";
        this.getAllSpuList();
        this.dealInput();
      },

      clearData: function(el){
        if($(el).val().length > 0){
          if($(el).hasClass("first")){
            $(".cms-lover .second").val("");
            $(".cms-lover .third").val("");
            $(".cms-lover .fourth").val("");
          }else if($(el).hasClass("second")){
            $(".cms-lover .third").val("");
            $(".cms-lover .fourth").val("");
          }else if($(el).hasClass("third")){
            $(".cms-lover .fourth").val("");
          }
        }
        
      },

      //根据输入情况获取焦点，只能从左到右依次输入
      // "input focus": function(el, event){
      //   var f1 = $(".cms-lover .first").val();
      //   if(!(f1 && f1.length > 0)){
      //     $(".cms-lover .first").focus();
      //     return;
      //   }
      //   var f2 = $(".cms-lover .second").val();
      //   if(!(f2 && f2.length > 0)){
      //     $(".cms-lover .second").focus();
      //     return;
      //   }
      //   var f3 = $(".cms-lover .third").val();
      //   if(!(f3 && f3.length > 0)){
      //     $(".cms-lover .third").focus();
      //     $(".choice").css("display", "none");
      //     return;
      //   }

      //   if(!($(el).hasClass(".fourth") || $(el).hasClass(".third"))){
      //     $(".useless").css("display", "none");
      //     $(".choice").css("display", "none");
      //   }

      //   if($(el).hasClass(".fourth")){
      //     $(".useless").css("display", "none");
      //     $(".choice").css("display", "block");
      //   }
      // },

      //根据输入的值校验数据是否超出范围，以及是否可用
      // "input keyup": function(el, event){
      //   var that = this;
      //   var temp = $(el).val();
      //   var tempReg;
      //   this.clearData(el);
      //   if($(el).hasClass("first")){
      //     if(temp.length == 0){
      //       return;
      //     }
      //     if(parseInt(temp) == 0 || parseInt(temp) == 1){
      //       tempReg = new RegExp(temp + "[0-9]{3}", "g");
      //       var tempList = this.numberList.match(tempReg);
      //       if(tempList && tempList.length > 0){
      //         $(".cms-lover .second").focus();
      //         $(".useless").css("display", "none");
      //       }else{
      //         $(".useless").css("display", "block");
      //       }
      //     }else{
      //       $(el).val("");
      //     }
      //   }

      //   if($(el).hasClass("second")){
      //     if(temp.length == 0){
      //       return;
      //     }
      //     temp = $(".cms-lover .first").val() + temp;
      //     if(parseInt(temp) < 14 && parseInt(temp) >= 0){
      //       tempReg = new RegExp(temp + "[0-9]{2}", "g");
      //       var tempList = this.numberList.match(tempReg);
      //       if(tempList && tempList.length > 0){
      //         $(".cms-lover .third").focus();
      //         $(".useless").css("display", "none");
      //       }else{
      //         $(".useless").css("display", "block");
      //       }
      //     }else{
      //       $(el).val("");
      //     }
      //   }

      //   if($(el).hasClass("third")){
      //     if(temp.length == 0){
      //       return;
      //     }
      //     temp = $(".cms-lover .first").val() + $(".cms-lover .second").val() +temp;
      //     if(parseInt(temp) < 132 && parseInt(temp) > 0){
      //       tempReg = new RegExp(temp + "[0-9]{1}", "g");
      //       var tempList = this.numberList.match(tempReg);
      //       if(tempList && tempList.length > 0){
      //         $(".cms-lover .fourth").focus();
      //         $(".useless").css("display", "none");
      //         $(".choice").css("display", "block");
      //         _.each(tempList, function(item){
      //           $($(that.element).find(".number")[(item.substr(3,1))]).removeClass("disabled");
      //         });
      //       }else{
      //         $(".useless").css("display", "block");
      //         $(".choice").css("display", "none");
      //       }
      //     }else{
      //       $(el).val("");
      //     }
      //   }

      //   if($(el).hasClass("fourth")){
      //     temp = $(".cms-lover .first").val() + $(".cms-lover .second").val() + $(".cms-lover .third").val()+temp;
      //     if(parseInt(temp) > 1314){
      //       $(".useless").css("display", "block");
      //       $(".choice").css("display", "none");
      //     }else{
      //       if(temp.length == 4){
      //         if(this.numberList.indexOf(temp) > -1){
      //           $(".cms-lover .self .button").addClass("active");
      //         }else{
      //           $(".useless").css("display", "block");
      //           $(".choice").css("display", "none");
      //         }
      //       }else{
      //         $(".useless").css("display", "none");
      //           $(".choice").css("display", "block");
      //       }
      //     }
      //   }
      // },
      // "input keyup": function(el, event){
      //   var that = this;
      //   var temp = $(el).val();
      //   var spanList = $(".number-container .br");
      //   if(temp.length > 0){
      //     $(spanList).removeClass("active");
      //     $(spanList[Math.min(3,temp.length)]).addClass("active");
      //     for(var i = 0; i < 4; i++){
      //       $(spanList[i]).text(temp[i] || "");
      //     }
      //   }else{
      //     $(temp[0]).addClass("active");
      //   }
      // },

      checkNumber: function(temp){
        var that = this;
        if(temp.length < 3){
          $(".choice").css("display", "none");
        }
        if(temp.length == 1){
          if(parseInt(temp) == 0 || parseInt(temp) == 1){
            tempReg = new RegExp(temp + "[0-9]{3}", "g");
            var tempList = this.numberList.match(tempReg);
            if(tempList && tempList.length > 0){
              $(".useless").css("display", "none");
            }else{
              $(".useless").css("display", "block");
            }
          }else{
            $(".useless").css("display", "block");
          }
        }else if(temp.length == 2){
          if(parseInt(temp) < 14 && parseInt(temp) >= 0){
            tempReg = new RegExp(temp + "[0-9]{2}", "g");
            var tempList = this.numberList.match(tempReg);
            if(tempList && tempList.length > 0){
              $(".useless").css("display", "none");
            }else{
              $(".useless").css("display", "block");
            }
          }else{
            $(".useless").css("display", "block");
          }
        }else if(temp.length == 3){
          if(parseInt(temp) < 132 && parseInt(temp) > 0){
            tempReg = new RegExp(temp + "[0-9]{1}", "g");
            var tempList = this.numberList.match(tempReg);
            if(tempList && tempList.length > 0){
              $(".useless").css("display", "none");
              $(".choice").css("display", "block");
              $(that.element).find(".number").addClass("disabled");
              _.each(tempList, function(item){
                $($(that.element).find(".number")[(item.substr(3,1))]).removeClass("disabled");
              });
            }else{
              $(".useless").css("display", "block");
              $(".choice").css("display", "none");
            }
          }else{
            $(".choice").css("display", "none");
            $(".useless").css("display", "block");
          }
        }else if(temp.length == 4){
          if(parseInt(temp) > 1314){
            $(".useless").css("display", "block");
            $(".choice").css("display", "none");
          }else{
            if(this.numberList.indexOf(temp) > -1){
              $(".cms-lover .self .button").addClass("active");
            }else{
              $(".useless").css("display", "block");
              $(".choice").css("display", "none");
            }
          }
        }
      },

      dealInput: function(){
        var input = document.getElementsByClassName("self-number")[0];
        var spans = $(".number-container .br");
        var that = this;
        $(spans[0]).addClass("active");
        input.addEventListener('input', function(){
            var value = this.value, l = value.length;
            that.checkNumber(value);
            for( var i = 0; i < 4; i++){
                spans[i].innerHTML = value[i] || '';
                // spans[i].style.borderColor = '';
                $(spans[i]).removeClass("active");
            }
            if( l>0 ) {
                $(spans[Math.min(3,l)]).addClass("active");
            }else{
                $(spans[0]).addClass("active");
            }
        }, false);
      },

      getAllSpuList: function(tag1){
        var param = {"parentSpuId":"13413", "onlyValid": true};
        if(tag1){
          param.tag1=tag1;
        }
        var that = this;
        var spuList = new YitSpuList(param);
        can.when(spuList.sendRequestRestful()).done(function(data) {
            data = data.value;
            if(data && data.length > 0){
              if(tag1 && data[0].spu_id){
                location.href = window.location.protocol + "//" + window.location.host + "/product.html?product_id=" + data[0].spu_id;
              }else{
                _.each(data, function(item){
                  if(item.tag1){
                    that.numberList && that.numberList.length > 0 ? that.numberList += "," + item.tag1 : that.numberList =  item.tag1;
                  }
                });
              }
            }else if(tag1){
              $(".cms-lover .nextinfo").css("display", "block");
              $(".cms-lover .fail").css("display", "block");
              that.getAllSpuList();
            }else{
              $(".cms-lover .nextinfo").css("display", "block");
              $(".cms-lover .soldout").css("display", "block");
              $(that.element).find(".sys button").removeClass("active");
            }
        }).fail(function(error) {
            console.log(error);
        });
      },

      getRandomOne: function(){
        var param = {"parentSpuId":"13413"};
        var randomOne = new YitValidSpu(param);
        can.when(randomOne.sendRequestRestful()).done(function(data) {
          if(data.spu_id){
            location.href = window.location.protocol + "//" + window.location.host + "/product.html?product_id=" + data.spu_id;
          }else{
            $(".cms-lover .nextinfo").css("display", "block");
            $(".cms-lover .soldout").css("display", "block");
          }
        }).fail(function(error) {
            console.log(error);
        });
      },

      ".button click": function(el, event){
        var parentNode = $(el).parent();
        //自选好
        if(parentNode.hasClass("self")){//请求借口
          var tag1 =  $(".self-number").val();
          if(this.numberList.length == 0){//售罄提示
            $(".cms-lover .nextinfo").css("display", "block");
            $(".cms-lover .soldout").css("display", "block");
          }else if(tag1.length == 4 && parseInt(tag1) < 1315){
            $(".self-number").val();
            $(".cms-lover .br").text();
            this.getAllSpuList(tag1);
          }
        }else if(parentNode.hasClass("sys")){ //直接购买，请求借口
          if($(el).hasClass("active")){
            this.getRandomOne();
          }else{
            $(".cms-lover .nextinfo").css("display", "block");
            $(".cms-lover .soldout").css("display", "block");
          }
        }else{
          $(".nextinfo").css("display", "none");
          $(".warn-info").css("display", "none");
        }
      }
    })

    var modules = $('.cms-lover');

    if(modules && modules.length > 0){
        new valentine(modules[0]);
    }
  })