define(
  'yit.module.designerList', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm', 
    'yit.api.b2cmall.getSubMData'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, GetSubMData) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var desigerModule = can.Control.extend({
      hasMore:true, 
      init: function(element, options) {
        this.allDesigners = $(".designer");
        if(!this.allDesigners || this.allDesigners.length == 0){
          return ;
        }
        var pageDom = $(".designer-list");
        var hasMore = pageDom.attr("cms-has-more");
        if(hasMore){
            pageDom.setAttribute("data-cms-page-index", 1);
        }
        this.render(element);
      },

      render: function(element) {
        var that = this;
          $(window).scroll(function() {
              if(that.hasMore){
                //翻页操作判断
                if (that.options.scrollTimer) {
                    clearTimeout(that.options.scrollTimer);
                }
                that.options.scrollTimer = setTimeout(function() {
                    var srollPos = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var dbHiht = $(element).height();
                    if ((windowHeight + srollPos + 200) >= ($(element).offset().top + dbHiht)) {
                        that.getPerPageData(that.element);
                    }
                }, 300);
              }
              
          });
      },

      //获取分页数据
      getPerPageData: function(element) {
          var that = this;
          var parentNode = element.parents('[data-cms-pageid]');
          var param = {
              pageId: parentNode.attr("data-cms-pageid"),
              listId: parentNode.attr("data-cms-paginationlist"),
              pageNumber: parseInt($(".designer-list").getAttribute("data-cms-page-index")) + 1,
          }
          var findNewGoods = new GetSubMData(param);
          can.when(findNewGoods.sendRequestRestful()).done(function(data) {
              that.hasMore = data.hasMore;
              if (data && data.datas) {
                  $(".designer-list").setAttribute("data-cms-page-index", param.pageNumber);
                  //组装html
                  that.buildHtml(data.datas);
              }
          }).fail(function(error) {
              console.log(error);
          });
      },


      //组装html
      buildHtml: function(data) {
          var htmlValue = "";
          _.each(data, function(item) {
                  var tagList = this.getTagList();
                  if(tagList.indexOf(item.tag) > -1){
                    htmlValue += '<li class="designer" data-tag="'  ;
                  }else{
                    htmlValue += '<li class="designer" style="display:none" data-tag="'  ;
                  }
                   
                   htmlValue += item.tag + '"><a href="'
                          + item.h5link + '"><img class="lazyload banner" src="'
                          + item.imgUrl + '"><div class="brand-name">'
                          + item.name + '</div><div class="brand-subname">'
                          + item.subName + '</div></a></li>';
                        
          })
          $(".designer-list").append(htmlValue);
      },

      //展示设计师类型
      ".tab-title click": function(el){
          $(this.element).find(".tab-down").css("display", "block");
      },

      //复选设计师类型
      ".item  click": function(el, event){
         var currentNode = event.target;
          if(!$(currentNode).hasClass("all")){
            $(currentNode).toggleClass("active");
            var activeList = $(this.element).find(".item.active");
            if(activeList.length > 0){
              var temp = $(this.element).find(".all.active");
              var len = activeList.length; 
              if(temp && temp.length > 0){
                len -= 1;
              }
              $(this.element).find(".all").removeClass("active");
              $($(this.element).find(".tab-title1 span")[0]).text("分类（已选" + len + "个）");
            }else{
              $(this.element).find(".all").addClass("active");
              $($(this.element).find(".tab-title1 span")[0]).text("分类（可多选）");
            }
          }else{
            if(!$(currentNode).hasClass("active")){
              $(this.element).find(".item").removeClass("active");
              $(currentNode).addClass("active");
              $($(this.element).find(".tab-title1 span")[0]).text("分类（可多选）");
            }
          }  
      },

      getTagList: function(){
          var nodeList = $(this.element).find(".item.active");
          var tagList = "";
          _.each(nodeList, function(item){
            tagList += "," + $(item).data("tag");
          });
          return tagList;
      },

      //收起类型，进行过滤展示
      ".up,.mask click": function(el, event){
        var nodeList = $(this.element).find(".item.active");
        $(this.element).find(".tab-down").css("display", "none");
        if(nodeList.length == 1 && $(nodeList[0]).hasClass("all")){
          $(this.allDesigners).css("display", "block");
          $($(this.element).find(".selected li")[0]).text("全部");
        }else{
          var tagList = this.getTagList();
          // var tagText = "";
          // _.each(nodeList, function(item){
          //   tagList += "," + $(item).data("tag");
          //   tagText.length > 0 ? tagText +=  " " + $(item).text() : tagText = $(item).text();
          // });
          var that = this;
          _.each(that.allDesigners, function(item){
            if(tagList.indexOf($(item).data("tag")) > -1){
              $(item).css("display", "block");
            }else{
              $(item).css("display", "none");
            }
          });
        }
      }

    })

    var modules = $('.cms-designer');

    if(modules && modules.length > 0){
        new desigerModule(modules[0]);
    }
  });

require(["yit.module.designerList"]);