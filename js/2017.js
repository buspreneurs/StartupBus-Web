$(window).load(function() {
  $("#the-pudding").sticky({ topSpacing: 50, getWidthFrom: '#nav' });
});

var highlighers = $('.highligher');
$(window).scroll(function() {
  var st = $(this).scrollTop();
  highlighers.each(function(_, h) {
    var highlighter = $(h);
    var itsFor      = $(highlighter.data('for'));
    var top         = itsFor.position().top;
    if (st > top) {
      highlighter.addClass('lit');
    }
  });
});
