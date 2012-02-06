/*
 * jQuery Vertical Parallax Scrolling plugin.
 *
 * @copyright Jack Brewer 2012
 * @license http://opensource.org/licenses/bsd-license.php New BSD License
 * @author Jack Brewer <jack@jackbrewer.co.uk>
 * @version 1.0
 */

(function ($) {

	$.fn.yScroll = function (parameters) {

		var properties,
				element = $(this),
				elementPos,
				yPos,
				yUnit,
				progess,
				yOffset;

		// Set Default Values
		var defaults = {
			speed: 2,
			invert: false
		};

		properties = $.extend(defaults, parameters);

		// Get background position and split x and y values
		elementPos = element.css('background-position').split(' ');

		// Separate y value from unit
		yPos = parseInt(elementPos[1], 10);
		yUnit = elementPos[1].replace(/[0-9.-]/g, '');

		// When the page is scrolled
		$(window).scroll( function(){

			var $this = $(this),
					progress,
					yOffset;

			// Record how far the page has scrolled
			progress = $this.scrollTop();

			// Calculate how far to move background position based on distance scrolled and chosen speed
			if( properties.invert ){
				// Move background-position down
				yOffset = yPos + (progress * properties.speed);
			} else {
				// Move background-position up
				yOffset = yPos - (progress * properties.speed);
			}

			// Recreate new y value and unit, reintroduce existing x position
			element.css('background-position', elementPos[0] + ' ' + yOffset + yUnit);

		});
	};

})($);