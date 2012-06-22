/*
 * jQuery Vertical Parallax Scrolling plugin.
 *
 * @copyright Jack Brewer 2012
 * @license http://opensource.org/licenses/bsd-license.php New BSD License
 * @author Jack Brewer <jack@jackbrewer.co.uk>
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
      , prevPosition = $this.css('backgroundPosition').split(' ')
      , prevPositionY = parseInt(prevPosition[1], 10)
      , prevPositionYUnit = prevPosition[1].match(/px|%|pt|em|rem/)[0];

    // On scroll, reset the scrollY value and request tick
    function onScroll() {
      latestKnownScrollY = window.scrollY;
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
          if (prevPositionY && prevPositionYUnit === '%') {
            currentScrollY = ((currentScrollY / ($('body').height() - $(window).height())) * 100);
          }

          // Calculate the new position
          newPositionY = (currentScrollY * options.speed);

          // Reverse the value if invert is true
          if (options.invert === true) {
           newPositionY = newPositionY * -1;
          }

          if (prevPositionY) {
            // Negative margins actually work opposite to negative pixels, so we
            // have to reverse them.
            if (prevPositionYUnit === '%') {
              newPositionY = newPositionY * -1;
            }

            // If there is a predefined background position on the Y axis for
            // this element, make sure we include it into the calculation.
            newPositionY = prevPositionY + newPositionY;
          }

          return (prevPosition[0] + ' ' + (newPositionY + prevPositionYUnit));

        }
      });
    }

    window.addEventListener('scroll', onScroll, false);

  });

}(jQuery));