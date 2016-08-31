var SUT = {};

SUT.scrollCode = (function () {
  var pub = {};

  //window.scrollTo(0, 300);

  pub.animatedScrollToFirst = function () {
    $('html, body').animate({
        scrollTop: $("#qqq").offset().top
    }, 1000);
  };

  return pub;
}());
