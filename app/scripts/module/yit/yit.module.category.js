define(
  'yit.module.category', [
    'can',
    'zepto',
    'lodash',
    'yit.business.config',
    'yit.framework.comm'  ],
  function(can, $, _, SFConfig, SFFrameworkComm) {
    var category = can.Control.extend({

      init: function(element, options) {
        $($(".fcatagory li")[0]).addClass("active");
        $($(".fcontent")[0]).css("display", "block");
      },

      ".fcatagory li click": function(el){
           $(el).addClass("active").siblings().removeClass("active");
          var cate = $(el).attr("cms-catagory");
          $(".fcontent").css("display", "none");
          $("div[cms-catagory='" + cate + "']").css("display", "block");
      },
    })

    new category("body");
  })