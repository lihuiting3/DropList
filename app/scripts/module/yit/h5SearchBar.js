var W = $("#sr_fm"),
  k = $(".sr_inp"),
  q = $(".sr_inp_bg"),
  clear = $(".search-clear");
  $(".sr_inp_bg .search-center").click(function(){
    if(k.val().length == 0){
      q.removeClass("focus");
    }
  });
k.val() && k.val(""),
  k.focus(function(event) {
    q.addClass("focus");
    // clear.css("display", "block");
  }).blur(function() {
    0 == k.val().length && q.removeClass("focus");
    0 != k.val().length && clear.css("display", "block");
  }),
  clear.click(function() {
    k.val("");
    q.removeClass("focus");
    clear.css("display", "none");
  }),
  W.submit(function(t) {
    var e = k.val();
    var url = "/search_list.html?";
    var start = window.location.pathname.indexOf("/activity/");
    var end = window.location.pathname.indexOf(".html");
    if (start > -1 && end > start) {
      var pageId = $("[data-cms-pageid]") && $("[data-cms-pageid]").length > 0 ? $($("[data-cms-pageid]")[0]).attr("data-cms-pageid") : 0;
      url += "_spm=1.t" + pageId + ".search.0&";
    } else if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
      url += "_spm=3.index.search.0&";
    }
    url += "q=";
    return (e = e.replace(/%/g, "%25").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B")) ? (window.location =
      url + e, !1) : !1
  })

$('.sr_inp').on('keyup', function() {
  var value = $(this).val();
  if (value.length > 0) {
    clear.css("display", "block");
  } else {
    clear.css("display", "none");
  }
});