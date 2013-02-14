btween.js
=========

#### Bézier TWEENing (BTWEEN) Javascript Engine ####

A quick and easy library for creating smooth animation paths along Bézier curves. It is recommended that you be [familiar with Bézier curves] (http://en.wikipedia.org/wiki/B%C3%A9zier_curve) before trying to use the library.

### Usage ###

Download the minified library and include it in your html.

```html
<script src="js/btween.min.js" type="text/javascript"></script>
```

The following code creates a Bézier path which a div block will travel along. The path anchors are specified in the addCurve method, and the onUpdate callback function will fire every time the [x,y] values changes.

```html
<script>

        // Call init() when document body is loaded
        // jQuery: $(document).ready(init);
        // HTML: <body onload="init();">

        // Must include RequestAnimationFrame.js
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function init() {

		var output = document.createElement( 'div' );
		output.style.cssText = 'position: absolute; left: 200px; top: 200px; font-size: 40px';
		document.body.appendChild( output );

                var startPosition = { x: 200, y: 200 };
                var curvePoints = [
                    { x: 200, y: 200  },
                    { x: 500, y: 600  },
                    { x: 500, y: -200 },
                    { x: 800, y: 200  }
                ];
		var tween = new BTWEEN.Btween( startPosition )
			.addCurve( curvePoints, 5000 )
			.onUpdate( function () {

				output.innerHTML = '{x:' + Math.round( this.x ) + ',y:' + Math.round( this.y ) + '}';
				output.style.left = this.x + 'px';
                                output.style.top = this.y + 'px';

			} )
			.start();

                animate();

	}

	function animate() {

		requestAnimationFrame( animate );
		BTWEEN.update();

	}

</script>
```

A tutorial and set of documentation is in the works. Please be patient!

### FAQ ###

**Why is this the only answer?**

No one has asked any questions yet!

### Change log ###

2013 02 14 - **r0**

* Initial commit ([patr1k](https://github.com/patr1k))