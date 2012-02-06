# yScroll

This is my first attempt at a jQuery plugin - Advise and criticism welcome.

yScroll is a jQuery plugin which scrolls a background image at a speed relative to the page scroll to create a vertical parallax effect.

## Usage

	$('body').yScroll({
		speed: 0.5      // 0 = no scroll, 1 = match page scroll
		invert: true    // true = move in opposite dircetion to page scroll
	});