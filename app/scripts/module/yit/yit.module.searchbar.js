define(
  'yit.module.searchbar', [
    'can',
    'zepto',
    'fastclick',
    'lodash',
    'yit.business.config',
    'yit.framework.comm',
    'yit.api.cart.getCartTotalQty'
  ],
  function(can, $, Fastclick, _, SFConfig, SFFrameworkComm, GetCartTotalQty) {
    Fastclick.attach(document.body);
    SFFrameworkComm.register(1);

    var searchModule = can.Control.extend({

      init: function(element, options) {
        var cartNum = new GetCartTotalQty();
        cartNum.sendRequestByType(function(data){
           if(data){
              $(".cartnumber").css("display", "block");
              var num = 0;
              if(data.value > 99){
                 num = "99+";
                 $(".cartnumber").text(num);
              }else{
                $(".cartnumber").text(data.value);
              }
           }
         }, function(error){
            console.log(error);
        });
      },

      ".searchwords focus": function(el, event){
        $(".cms-search").addClass("focus");
      },

      ".cart img click": function(){
          window.location = "/shopping.html";
          return false;
      },
      ".cms-search .searchclear click": function(){
        $(".searchwords").val("");
        $(".searchclear").css("display", "none")
      },

      ".cms-search .searchwords keyup": function(){
        $(".searchwords").val().length > 0 ? $(".searchclear").css("display", "block") : $(".searchclear").css("display", "none");
      },

      "#searchfm submit": function(el, event){
        var searchwords = $(".searchwords").val();
        var url = "/search_list.html?";
        var pageId = $("[data-cms-pageid]") && $("[data-cms-pageid]").length > 0 ? $($("[data-cms-pageid]")[0]).attr("data-cms-pageid") : 0;
        url += "_spm=1.t" + pageId + ".search.0&";
        url += "q=";
        if(searchwords.replace(/%/g, "%25").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B")){
          window.location.href = window.location.protocol  + "//" + window.location.hostname + url + searchwords;
          // window.location = url + searchwords;
        }
      }
    })

    var modules = $('.cms-search');

    if(modules && modules.length > 0){
        new searchModule(modules[0]);
    }
  })