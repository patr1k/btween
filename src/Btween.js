/**
 * @author patrik / http://metacrunch.org
 */

var BTWEEN = BTWEEN || ( function () {

    var _curves = [];

    return {

        VERSION: 0.1,

        add: function ( curve ) {

            _curves.push( curve );

        },

        update: function () {

            if ( _curves.length === 0 )
                return false;

            var i = 0;
            var numCurves = _curves.length;

            while ( i < numCurves ) {

                if ( _curves[ i ].update() ) {

                    i++;

                } else {

                    _curves.splice( i, 1 );
                    numCurves--;

                }

            }

            return true;

        }

    };

} )();

BTWEEN.Btween = function ( object ) {

    var _object = object;
    var _curves = [];
    var _dimensions;
    var _power;
    var _startTime;
    var _delay = 0;
    var _durations = [];
    var _usingCurve = 0;
    var _onUpdateCallback;
    var _onCompleteCallback;
    var _onCompleteCallbackFired = false;

    this.addCurve = function ( points, duration ) {

        var curCurve = _curves.length;

        _curves[ curCurve ] = [];

        _power = points.length;

        for ( var i = 0; i < points.length; i++ ) {

            if ( i == 0 && curCurve == 0 )
                _dimensions = Object.keys(points[ i ]).length;

            _curves[ curCurve ].push( points[ i ] );

        }

        if ( duration === undefined )
            _durations[ curCurve ] = 1000;
        else
            _durations[ curCurve ] = duration;

        return this;

    };

    this.start = function () {

        BTWEEN.add( this );

        _startTime = Date.now();

        return this;

    };

    this.delay = function ( delay ) {

        _delay = delay;
        return this;

    };

    this.update = function () {

        var curTime = Date.now();

        if ( curTime < ( _startTime + _delay ) )
            return true;

        if ( curTime > ( _startTime + _delay + _durations[ _usingCurve ] ) ) {

            if ( _usingCurve == _curves.length - 1 ) {

                if ( _onCompleteCallbackFired === false && _onCompleteCallback !== undefined ) {

                    _onCompleteCallback.call( _object );

                    _onCompleteCallbackFired = true;

                }

                return false;

            } else {

                _usingCurve++;
                _startTime = Date.now();

            }
        }

        _object = this._runEquation( _curves[ _usingCurve ] );

        if ( _onUpdateCallback !== undefined )
            _onUpdateCallback.call( _object );

        return true;

    };

    this.onUpdate = function ( callback ) {

        _onUpdateCallback = callback;
        return this;

    };

    this.onComplete = function ( callback ) {

        _onCompleteCallback = callback;
        return this;

    };

    this._getProgress = function () {

        var curTime = Date.now();

        return ( curTime - ( _startTime + _delay ) ) / _durations[ _usingCurve ];

    };

    this._runEquation = function ( points ) {

        var xVal, yVal, zVal;

        var progress = this._getProgress();

        if ( _power == 2 ) {

            xVal = this._curveLinear( points[ 0 ].x, points[ 1 ].x, progress );
            yVal = this._curveLinear( points[ 0 ].y, points[ 1 ].y, progress );

            if ( _dimensions == 3 )
                zVal = this._curveLinear( points[ 0 ].z, points[ 1 ].z, progress );

        } else if ( _power == 3 ) {

            xVal = this._curveQuadratic( points[ 0 ].x, points[ 1 ].x, points[ 2 ].x, progress );
            yVal = this._curveQuadratic( points[ 0 ].y, points[ 1 ].y, points[ 2 ].y, progress );

            if ( _dimensions == 3 )
                zVal = this._curveQuadratic( points[ 0 ].z, points[ 1 ].z, points[ 2 ].z, progress );

        } else if ( _power == 4 ) {

            xVal = this._curveCubic( points[ 0 ].x, points[ 1 ].x, points[ 2 ].x, points[ 3 ].x, progress );
            yVal = this._curveCubic( points[ 0 ].y, points[ 1 ].y, points[ 2 ].y, points[ 3 ].y, progress );

            if ( _dimensions == 3 )
                zVal = this._curveCubic( points[ 0 ].z, points[ 1 ].z, points[ 2 ].z, points[ 3 ].z, progress );

        }

        var newPoints = {
            x: xVal,
            y: yVal
        };

        if ( _dimensions == 3 )
            newPoints.z = zVal;

        return newPoints;

    }

    this._curveLinear = function ( p0, p1, time ) {

        return ( (1 - time) * p0 ) + ( time * p1 );

    };

    this._curveQuadratic = function ( p0, p1, p2, time ) {

        return ( Math.pow( 1 - time, 2 ) * p0 ) + ( 2 * ( 1 - time ) * time * p1 ) + ( Math.pow( time, 2 ) * p2 );

    };

    this._curveCubic = function ( p0, p1, p2, p3, time ) {

        return ( Math.pow( 1 - time, 3 ) * p0 ) + ( 3 * Math.pow( 1 - time, 2 ) * time * p1 ) + ( 3 * ( 1 - time ) * Math.pow( time, 2 ) * p2) + ( Math.pow( time, 3 ) * p3 );

    };

};