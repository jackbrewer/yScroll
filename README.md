# yScroll

yScroll scrolls a background image at a speed relative to the page scroll to create a vertical parallax effect. This effect can be applied to multiple elements.

Unlike other parallax scrollers, this module uses `requestAnimationFrame` (http://paulirish.com/2011/requestanimationframe-for-smart-animating/) in place of scroll events for huge performance benefits.

[See an example](http://oliverjash.github.com/yScroll/).

## Usage

Apply your background image using CSS:

    body {
      background-image: url('../images/body.svg');
      background-attachment: fixed;
    }

Then add the `ys` class to your HTML element, and then any of the following settings (namespaced with `ys`):

    <body class="ys" data-ys-speed="0.5" data-ys-invert="true">
      …
    </body>

**Speed** is relative to the user's scrolling (default is `0.5`). **Invert** is a boolean which specifies whether the effect should be inverted (default is `false`).

## Requirements

* jQuery
* `requestAnimationFrame` polyfill (https://gist.github.com/2948322) to work in older browsers