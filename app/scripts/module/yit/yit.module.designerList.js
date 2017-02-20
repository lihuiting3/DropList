define(
  'yit.module.designerList', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(3);

    var desigerModule = can.Control.extend({

      init: function(element, options) {
        this.allDesigners = $(".designer");
        if(!this.allDesigners || this.allDesigners.length == 0){
          return ;
        }
        this.render(element);
      },

      render: function(element) {
        
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
              $($(this.element).find(".tab-title1 span")[0]).text("全部设计分类（已选" + len + "个）");
            }else{
              $(this.element).find(".all").addClass("active");
              $($(this.element).find(".tab-title1 span")[0]).text("全部设计分类（可多选）");
            }
          }else{
            if(!$(currentNode).hasClass("active")){
              $(this.element).find(".item").removeClass("active");
              $(currentNode).addClass("active");
              $($(this.element).find(".tab-title1 span")[0]).text("全部设计分类（可多选）");
            }
          }  
      },

      //收起类型，进行过滤展示
      ".tab-title1,.mask click": function(el, event){
        var nodeList = $(this.element).find(".item.active");
        $(this.element).find(".tab-down").css("display", "none");
        if(nodeList.length == 1 && $(nodeList[0]).hasClass("all")){
          $(this.allDesigners).css("display", "block");
          $($(this.element).find(".tab-title span")[0]).text("全部");
        }else{
          var tagList = "";
          var tagText = "";
          _.each(nodeList, function(item){
            tagList += "," + $(item).data("tag");
            tagText.length > 0 ? tagText +=  " " + $(item).text() : tagText = $(item).text();
          });
          var that = this;
          _.each(that.allDesigners, function(item){
            if(tagList.indexOf($(item).data("tag")) > -1){
              $(item).css("display", "block");
            }else{
              $(item).css("display", "none");
            }
          });
          $($(this.element).find(".tab-title span")[0]).text(tagText);
        }
      }

    })

    var modules = $('.cms-designer');

    if(modules && modules.length > 0){
        new desigerModule(modules[0]);
    }
  })