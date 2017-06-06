define(
  'yit.module.ThirdCategoryByFirst', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm',
    "text!template_yit_thirdcategoryproducts",
    'yit.api.fcategoryentity.getFCategoryEntityHomePageProducts'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, template_yit_thirdcategoryproducts, GetProductsByCatagoryId) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(1);

    var indexData = can.Control.extend({
      firstCategory:0,
      threeCategory:0,
      maxNum: 0, 
      prefixSpm:null,
      flag:true, 
      init: function(element, options) {
        document.title = $(".cms-nav").attr("cms-title") || "一条生活馆";
         var pathTemp = window.location.pathname.split("category");
         var that = this;
         if(pathTemp && pathTemp.length > 1){
            this.firstCategory = pathTemp[1].substring(1, pathTemp[1].indexOf("."));
            var searchParams = window.location.search.substring(1).split("&");
            if(searchParams && searchParams.length > 0){
              _.each(searchParams, function(item){
                if(item.indexOf("tcate=") > -1){
                  that.threeCategory = item.substring(6);
                } 
              });
            }
         }
         that.getMaxNum();
         var navigatorDom = $(".cms-nav nav");
         var offsetTop = 0;
         if(navigatorDom){
            offsetTop = $('.cms-nav nav').offset().top;
            that.navigatorFixed(navigatorDom, offsetTop);
         }
         
        //首次进来根据参数判断选中状态
        $("[cms-catagory='" + this.threeCategory + "']").addClass("active");
        that.getMoreProducts(this.threeCategory, 1, $("li[cms-catagory='" + this.threeCategory + "']"));
        $(window).scroll(function(){
            that.navigatorFixed(navigatorDom, offsetTop);
            setTimeout(that.getNextPageData.bind(that), 300);
        });
      },

      //导航悬浮
      navigatorFixed: function(el, offsetTop){
        if(el && el.length > 0){
            var cartDom = $(".cms-search");
            var hasCart = cartDom && cartDom.length > 0 ? true : false;  //判断是否有购物车模块
            var scrolltop = $(window).scrollTop();
            if (scrolltop > offsetTop) {
                if (!($(el).hasClass("fixed") || $(el).hasClass("fixed80"))) {
                  if(hasCart){
                    $(el).addClass("fixed80");
                  }else{
                    $(el).addClass("fixed");
                  }
                  
                }
            } else {
                if ($(el).hasClass("fixed") || $(el).hasClass("fixed80")) {
                  if(hasCart){
                    $(el).removeClass("fixed80");
                  }else{
                    $(el).removeClass("fixed");
                  }
                }
            }
        }
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
                  return 1;
                }
              }
          }
          return 0;
      },

      //获取spm中最后一位的最大值
      getMaxNum: function(){
         var alist = $(".cms-two a");
         var that = this;
         if(alist && alist.length > 0){
            _.each(alist, function(item){
             if($(item).attr("href")){
                var itemV = $(item).attr("href");
                var params = itemV.split("&");
                  if(params && params.length > 0){
                    _.each(params, function(info){
                      if(info.indexOf("_spm") > -1){
                        var spm = info.substring(5).split(".");
                        if(!that.prefixSpm){
                          that.prefixSpm = spm[0] + "." + spm[1] + "." + spm[2] + ".";
                        }
                        if(spm[3] > that.maxNum){
                          that.maxNum = spm[3];
                        }
                      }
                    });
                  }
             }
              
            });
         }
      },

      //滚动懒加载
      getNextPageData: function(){
        var activePosition = $("div[cms-catagory='" + this.threeCategory + "']")[0].getBoundingClientRect();
        if(activePosition.bottom < (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 600){
          var el = $("li[cms-catagory='" + this.threeCategory + "']");
          var offset = $(el).attr("cms-offset");
          if(!offset){
            offset = 1;
          }else if(offset != -1){
            this.getMoreProducts(this.threeCategory, offset, el);
          }
          
        }
      },

      //切换类目
     ".cms-firstc click": function(el, event){
        this.threeCategory = $(el).attr("cms-catagory");
        $(el).addClass("active").siblings().removeClass("active");
        var offset = $(el).attr("cms-offset");
        $("div[cms-catagory='" + this.threeCategory + "']").addClass("active").siblings().removeClass("active");
        $("body").scrollTop(0);
        if(!offset){
          offset = 1;
        } 

        if(offset != -1){
          this.getMoreProducts(this.threeCategory, offset, el);
        }
     },

     //根据三级目录，偏移量进行请求数据
     getMoreProducts: function(tcategory, offset, el){
        if(!this.flag){
            return ;
        }
        this.flag = false;
        var moreProducts = new GetProductsByCatagoryId({
          fcategoryId: tcategory, 
          page: JSON.stringify({offset:offset, limit:20})
        });
        var that = this;
        var productDetail = window.location.protocol + "//" + window.location.hostname + "/product.html?product_id="
        moreProducts.sendRequestByType(function(data){
          if(offset * 20 >= data.totalRows){
            $(el).attr("cms-offset", "-1");
          }else{
            $(el).attr("cms-offset", parseInt(offset) + 1);
          }

          if(data.products && data.products.length > 0){
            var renderFn = can.mustache(template_yit_thirdcategoryproducts);
            var temp = {
              products:[]
            };
           _.each(data.products, function(productInfo, index){
              if(offset == 1 && index >= 6 || offset > 1){
                productInfo.price = parseFloat(productInfo.price)/100;
                that.maxNum = (that.maxNum - 0) + 1;
                productInfo.h5link = productDetail + productInfo.spuId + "&_spm=" + that.prefixSpm + that.maxNum;
                temp.products.push(productInfo);
              }
           });

            var html = renderFn(temp);
            $("div[cms-catagory='" + tcategory + "']").find("ul").append(html);
          }
          that.flag =true;
        }, function(error){
            console.log("请求数据失败。。。");
        });
     },
    })
    $(document).ready(function(){
        new indexData($("body"));
    });
  })