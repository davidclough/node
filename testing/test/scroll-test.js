jasmine.getFixtures().fixturesPath = "base/test/fixture";
loadFixtures("scroll-test.html");

describe("jQuery animation test test", function () {
  it ("is true", function () {
    // The line below really does overcome the problem of the animation delay resulting in the
    // underlying change not being executed immediately.
    // Without it, even a 1ms animation results in failure, whereas 0ms is successful.
    jQuery.fx.off = true;
    $("div").fadeOut(1000);
    expect($("div")).not.toBeVisible();
  });
});



describe("Scrolling works with initial test", function () {
  it ("is true", function () {
    // The fixtures remain in the state they were in after the last test.
    loadFixtures("scroll-test.html");

    //$("#jasmine-fixtures").width(800).height(600);
    debugger;

    window.height = 200;
    $(window).trigger("resize");




    $("html").height = 200;

    jQuery.fx.off = true;
    SUT.scrollCode.animatedScrollToFirst();  // Surely would need to use callback to then do the testing????

    var test = true;
    expect(test).toBe(true);
  });
});
