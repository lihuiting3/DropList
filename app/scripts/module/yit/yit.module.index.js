define(
  'yit.module.index', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm',
    "text!template_yit_thirdcategory",
    'yit.api.fcategoryentity.getFCategoryEntityForHomePageById'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, template_yit_thirdcategory, GetProductsByCatagoryId) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(1);

    var indexData = can.Control.extend({
      maxNum:0,
      preSpm:null,
      isAppSupport:0,
      className: "fixed",
      timeoutName:null,
      topValueTime:0,
      topValue:0,
      topValueTime2:0,
      topValue2:0,
      init: function(element, options) {
        //首次进来判断选中状态
        var list = $(".cms-firstc");
        var that = this;
        _.each(list, function(item){
            var temp = $(item).attr("cms-catagory");
            if(that.isCurrentPage(temp)){
              $(item).addClass("active");
            }else{
              $(item).removeClass("active");
            }
        });
        this.isSupportAppApi();
        // if(this.isSupportSticky()){
        //     that.className = "sticky";
        //     if(that.isAppSupport){
        //         $("[data-cms-modulename='h5SearchBar']").css("display", "none");
        //     }
        // }
        if(that.isAppSupport){
            that.className = "appfixed";
            $("[data-cms-modulename='h5SearchBar']").css("display", "none");
            $("[data-cms-modulename='h5SearchBarNew']").css("display", "none");
        }
        that.getMaxSpm();
        $(window).scroll(function(){
            that.timeoutName = setTimeout(that.scroll.bind(that), 300);
        });
        setInterval(function(){
            that.topValue2 = that.topValue;
            that.topValueTime2 = that.topValueTime;
            that.topValue = $("body").scrollTop();
            that.topValueTime = new Date();
        }, 500);
        $("body").click(function(){
            if(that.topValue2 > 0){
                if(Math.abs(($("body").scrollTop() - that.topValue2)/(new Date() - that.topValueTime2))>0.75){
                    return false;
                }
            }else{
                return false;
            }
        });
      },

      //判断是否支持sticky
      isSupportSticky: function() {
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
      },

      //获取最大的spm的最后一段的值
      getMaxSpm: function(){
        var alist = $("[data-cms-modulename='h5IndexData']").find(".cms-box a");
        var that = this;
        _.each(alist, function(item){
            var href = $(item).attr("href");
            if(href){
                var hrefParams = href.split("_spm=");
                if(hrefParams && hrefParams.length == 2){
                    var spm = hrefParams[1];
                    if(spm){
                        var spmV = spm.split(".");
                        if(spmV && spmV.length == 4){
                            if(!that.preSpm){
                                that.preSpm = spmV[0] + "." + spmV[1] + "." + spmV[2] + "." ;
                            }
                            if(spmV[3] > that.maxNum){
                                that.maxNum = spmV[3];
                            }
                        }
                    }
                }
            }
        });

      },

      //判断是否在当前的可视范围内
      scroll: function(){
        clearTimeout(this.timeoutName);
        var positionInfo = $(".cms-nav .nav-static")[0].getBoundingClientRect();
        if(positionInfo && positionInfo.bottom < 0){//不在视口
            $(".cms-nav .nav-line").addClass(this.className);
            var distance = 0;
            var index = $(".cms-nav .nav-line li.active").index();
            if(index > 3){
                distance = 107 * (index- 3);
            }
            $(".nav-line ul").scrollLeft(distance);
        }else{
            $(".cms-nav .nav-line").removeClass(this.className);
        }
      },

      //点击下拉按钮，弹出所有的item
      ".cms-nav .nav-down tap": function(el){
        $(".cms-nav .nav-all").addClass(this.className);
        $(".cms-nav .mask").css("display", "block");
      },

      ".cms-nav .nav-up tap": function(el){
        $(".cms-nav .nav-all").removeClass(this.className);
        $(".cms-nav .mask").css("display", "none");
      },

      ".cms-nav .mask tap": function(el){
        if($(el).hasClass("mask")){
            $(".cms-nav .nav-all").removeClass(this.className);
            $(".cms-nav .mask").css("display", "none");
        }
      },

      //参数为点击的节点中的url或者categoryid，判断点击的节点是否是当前页面的链接
      isCurrentPage: function(param){
        if(param.indexOf("http") > -1){
          if(param.indexOf("activity") > -1){
            if(param.indexOf(window.location.pathname) > -1 && !(window.location.pathname.indexOf("index") > -1 || window.location.pathname == "/")){
              return true;
            }else{
              return false;
            }
          }else{//点击为首页
            if((window.location.pathname.indexOf("index") > -1 || window.location.pathname == "/") && (param.indexOf("index.html") > -1 || (param.split(".com").length > 1 &&  param.split(".com")[1].length == 0))){
              return true;
            }else{
              return false;
            }
          }
        }else{
          return false;
        }
      },

      //切换选中状态
      getSelectedItem: function(index){
         $($(".cms-nav .nav-static li")[index]).addClass("active").siblings().removeClass("active");
         $($(".cms-nav .nav-line li")[index]).addClass("active").siblings().removeClass("active");
         $($(".cms-nav .nav-all li")[index]).addClass("active").siblings().removeClass("active");
         var distance = 0;
        if(index > 3){
            distance = 107 * (index- 3);
        }
        $(".nav-line ul").scrollLeft(distance);
      },

      ".cms-two .more click": function(el){
         var firstCategory = $(el).attr("cms-fcatagory");
         var thirdCategory = $(el).attr("cms-tcatagory");
         var tempel = document.createElement("a");
         var hrefV = window.location.protocol + "//" + window.location.hostname + "/category/" + firstCategory + ".html?tcate=" + thirdCategory;
         $(tempel).attr("href", hrefV);
         $(tempel).click();
         return false;
      },

      //判断是否是app1.8版本
      isSupportAppApi: function(){
          var appVersion = navigator.userAgent;
          var vIndex = appVersion.indexOf('version"');
          var appVersionValue ;
          if(vIndex > -1){
              appVersionValue = appVersion.substring(vIndex+10, appVersion.indexOf("\"", vIndex+11));
              if(appVersionValue){
                var temp = appVersionValue.split(".");
                if(temp && temp.length > 2 && appVersionValue.split(".")[0] - 1 > 0 || appVersionValue.split(".")[1] -8 >= 0){
                  this.isAppSupport = 1;
                }
              }
          }
      },

      //切换类目
     ".cms-firstc tap": function(el, event){
        var fcatagoryId = $(el).attr("cms-catagory");
        if($(".cms-nav .nav-all").hasClass(this.className)){
            $(".cms-nav .nav-all").removeClass(this.className)
            $(".cms-nav .mask").css("display", "none");
        }
        var that = this;
        //首先判断，点击的节点是否是当前页面的链接，如果是则不要刷新页面，只进行dom节点的显示与隐藏
        //如果不是当前页面，并且是页面链接，则跳转页面
        //如果是前端类目，则在当前页面进行dom节点的显示与隐藏
        if(this.isCurrentPage(fcatagoryId)){ 
          $("body").scrollTop(0);
          $(".cms-box").removeClass("active");  //类目所在的div全部不展示
          $($(".layout")[0]).children().css("display", "block"); //回到当前页面
          if(that.isAppSupport){   //h5页面增加显示toolbar，以及搜索组件
            $("[id^=h5SearchBarNew]").css("display", "none");
            $("[data-cms-modulename='h5SearchBar']").css("display", "none");
            $("[data-cms-modulename='h5TableBarNew']").css("display", "none");
          }
          // $(el).addClass("active").siblings().removeClass("active");
          this.getSelectedItem($(el).index());
        }else if(fcatagoryId.indexOf("http") > -1){
            var tempDiv = document.createElement("a");
            $(tempDiv).attr("href", fcatagoryId);
            $(tempDiv).click();
          // window.location = fcatagoryId;
        }else{
          $("body").scrollTop(0);
          $($(".layout")[0]).children().css("display", "none"); //页面的其他节点隐藏，只展示搜索模块以及该模块
          $("[id^=h5IndexData]").css("display", "block");
          if(!that.isAppSupport){   //h5页面增加显示toolbar，以及搜索组件
            $("[id^=h5SearchBarNew]").css("display", "block");
            $("[data-cms-modulename='h5SearchBar']").css("display", "block");
            $("[data-cms-modulename='h5TableBarNew']").css("display", "block");
          }
          
          // $(el).addClass("active").siblings().removeClass("active");
          this.getSelectedItem($(el).index());
          $(".cms-box[cms-catagory='" + fcatagoryId + "']").addClass("active").siblings().removeClass("active");
          $($(".layout")[0]).children();
          var hasmore = $(el).attr("cms-hasmore");
          if(!hasmore){
            var GetProducts = new GetProductsByCatagoryId({
              fcategoryId:fcatagoryId,
              page:JSON.stringify({offset:0, limit:100})
            });
            GetProducts.sendRequestByType(function(data){
              if(data.children && data.children.length > 1){
                var renderFn = can.mustache(template_yit_thirdcategory);
                var temp = {
                  children:[]
                };
                var productDetail = window.location.protocol + "//" + window.location.hostname + "/product.html?product_id="
                _.each(data.children, function(item, index){
                    if(index > 0){
                      if(item.products && item.products.length > 0){
                         _.each(item.products, function(productInfo){
                            productInfo.price = parseFloat(productInfo.price)/100;
                            that.maxNum = (that.maxNum - 0) + 1;
                            productInfo.h5link = productDetail + productInfo.spuId + "&_spm=" + that.preSpm + that.maxNum;
                         });
                         item.firstCategory = fcatagoryId;
                         temp.children.push(item);
                      }
                    }
                });
                var html = renderFn(temp);
                $(".cms-box.active").append(html);
              }
              $(el).attr("cms-hasmore", "true");
            }, function(error){
                console.log("请求数据失败。。。");
            });
          }
        }
     },
    })

    new indexData($("body"));
  })