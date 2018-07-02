function getParameterByName(e, a) {
  a || (a = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
  var t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
    o = t.exec(a);
  return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null
}
$(document).ready(function() {
  switch ($(window).scroll(function() {
    var e = $(window).scrollTop(),
      a = $(document).height() - 1130;
    $(document).height();
    e >= 200 && e <= a ? $(".sidebar").addClass("fixed-sidebar") : $(".sidebar").removeClass("fixed-sidebar")
  }), getParameterByName("ref")) {
    case "maxcdn":
      $("#max-modal").modal("show");
      break;
    case "fireblade":
      $("#fireblade-modal").modal("show")
  }
  $("#chat-button, #table-chat-button, #Modal-Chat, #sidebar-chat-button-1, #sidebar-chat-button-2").click(function(e) {
    return e.preventDefault(), Intercom("show"), !1
  })
});
