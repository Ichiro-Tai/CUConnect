/* eslint-env node */
/* eslint no-console: 0, one-var: 0, vars-on-top: 0 */
/* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }] */

var app = require( 'express' )(),
	http = require( 'http' ),
	io = require( 'socket.io' )(),
	port = 8718;

io.on( 'connection', function ( socket ) {
	// console.log( `[${new Date()}] Connected: ${socket.id}` );

	// var color, size, mode;
	const container = {};

	socket.on( 'join', v => {
		if ( v ) {
			container.room = v;
			socket.join( v );
		}
	} );

	for ( let event of [ 'reset', 'draw', 'save' ] ) {
		socket.on( event, ( ...args ) => {
			// console.log( `[${new Date()}] ${socket.id}: ${event}: ${JSON.stringify( args )}` );
			if ( container.room ) {
				socket.to( container.room ).emit( event, ...args );
			}
		} );
	}

	// socket.on( 'mode', v => { mode = v; } );
	// socket.on( 'color', v => { color = v; } );
	// socket.on( 'size', v => { color = v; } );

	socket.on( 'disconnect', function () {
		// console.log( `[${new Date()}] Disconnected: ${socket.id}` );
	} );
} );

io.listen( http.createServer( app ).listen( port ) );
