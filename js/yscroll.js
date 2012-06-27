/*
 * jQuery Vertical Parallax Scrolling plugin.
 *
 * @copyright Jack Brewer 2012
 * @license http://opensource.org/licenses/bsd-license.php New BSD License
 * @author Jack Brewer <jack@jackbrewer.co.uk> and Oliver Joseph Ash <oliverash@me.com>
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
      , prevPosition = $this.css('backgroundPosition')
      , prevPositionX
      , prevPositionY
      , prevPositionXUnit
      , prevPositionYUnit
      ;

    // If backgroundPosition was not found, then we assume that non-standard
    // x and y values can be found instead.

    if (!prevPosition) {
      prevPosition = $this.css('backgroundPositionX') + ' ' + $this.css('backgroundPositionY');
    }

    // Seperate the background position by x and y
    prevPosition = prevPosition.split(' ');
    prevPositionX = prevPosition[0];
    prevPositionY = prevPosition[1];

    // Find the units
    prevPositionXUnit = (prevPositionX) ? prevPositionX.match(/px|%|pt|em|rem/)[0] : 'px';
    prevPositionYUnit = (prevPositionY) ? prevPositionY.match(/px|%|pt|em|rem/)[0] : 'px';

    // Find the integers
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
      var currentScrollY = latestKnownScrollY
        , newPositionY;

      // Reset the tick so we can capture the next onScroll
      ticking = false;

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

      // jQuery is clever enough to apply the x and y using just
      // backgroundPosition, despite browsers that don't support this
      $this.css({
        backgroundPosition: function () {
          return ((prevPositionX + prevPositionXUnit) + ' ' + (newPositionY + prevPositionYUnit));
        }
      });
    }

    $(window).scroll(onScroll);

  });

}(jQuery));