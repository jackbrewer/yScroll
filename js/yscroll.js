/*
 * jQuery Vertical Parallax Scrolling plugin.
 *
 * @copyright Jack Brewer 2012
 * @license http://opensource.org/licenses/bsd-license.php New BSD License
 * @author Jack Brewer <jack@jackbrewer.co.uk> (improved by Oliver Joseph Ash <oliverash@me.com>)
 * @version 1.0
 */

(function ($) {

  $('.ys').each(function () {

    var $this = $(this)
      , options =
        { speed: $this.data('ys-speed') || 0.5
        , invert: $this.data('ys-invert') || false }
      , latestKnownScrollY = 0
      , ticking = false
      , prevPosition
      , prevPositionX
      , prevPositionY
      , prevPositionXUnit
      , prevPositionYUnit
      ;

    if (Modernizr.bgpositionxy) {
      prevPositionX = $this.css('backgroundPositionX');
      prevPositionY = $this.css('backgroundPositionY');
    } else {
      prevPosition = $this.css('backgroundPosition').split(' ');
      prevPositionX = prevPosition[0];
      prevPositionY = prevPosition[1];
    }

    prevPositionXUnit = (prevPositionX) ? prevPositionX.match(/px|%|pt|em|rem/)[0] : 'px';
    prevPositionYUnit = (prevPositionY) ? prevPositionY.match(/px|%|pt|em|rem/)[0] : 'px';

    prevPositionX = parseInt(prevPositionX, 10);
    prevPositionY = parseInt(prevPositionY, 10);

    // On scroll, reset the scrollY value and request tick
    function onScroll() {
      latestKnownScrollY = $(window).scrollTop();
      requestTick();
    }

    // We check
    function requestTick() {
      // This ticking system prevents animation frames from triggering our
      // update event when the scrollY value has not changed.
      if(!ticking) {
        window.requestAnimationFrame(update);
      }

      ticking = true;
    }

    function update() {
      // Reset the tick so we can capture the next onScroll
      ticking = false;

      var currentScrollY = latestKnownScrollY;

      $this.css({
        backgroundPosition: function () {

          var newPositionY;

          // If the background position unit is percentages, we must calculate
          // the currentScrollY relative to the height of the document.
          if (prevPositionYUnit === '%') {
            currentScrollY = ((currentScrollY / ($('body').height() - $(window).height())) * 100);
          }

          // Calculate the new position
          newPositionY = (currentScrollY * options.speed);

          // Reverse the value if invert is true
          if (options.invert === true) {
           newPositionY = newPositionY * -1;
          }

          // Negative margins actually work opposite to negative pixels, so we
          // have to reverse them.
          if (prevPositionYUnit === '%') {
            newPositionY = newPositionY * -1;
          }

          // If there is a predefined background position on the Y axis for
          // this element, make sure we include it into the calculation.
          if (prevPositionY) {
            newPositionY = prevPositionY + newPositionY;
          } else {
            prevPositionYUnit = 'px';
          }

          return ((prevPositionX + prevPositionXUnit) + ' ' + (newPositionY + prevPositionYUnit));

        }
      });
    }

    $(window).on('scroll', onScroll);

  });

}(jQuery));