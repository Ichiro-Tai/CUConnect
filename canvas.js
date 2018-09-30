window.cuconnectGlobal = {
	defaultColor: '#000000',
	roomID: 'ce7572c3-a63f-4432-874e-c26f5ac5e04a'
};

( function () {
	var $canvas = $( '#canvas' ),
		socket = window.io( 'http://localhost:8718' ),
		resetEmitter = () => socket.emit( 'reset' ),
		board,
		width = 0,
		height = 0,
		getInfo = () => {
			return {
				size: board.ctx.lineWidth / width,
				op: board.ctx.globalCompositeOperation,
				color: board.ctx.strokeStyle
			};
		};

	$canvas.width( $canvas.width() )
		.height( $canvas.width() * 3 / 4 );

	const DEFAULT_SIZE = '2';

	window.board = board = new DrawingBoard.Board( 'canvas', {
		controls: [
			'Color',
			{ DrawingMode: { filler: false } },
			'Size',
			{ Navigation: { back: false, forward: false } },
			'Download'
		],
		color: window.cuconnectGlobal.defaultColor,
		size: DEFAULT_SIZE
	} );

	width = $( '.drawing-board-canvas' ).width();
	height = $( '.drawing-board-canvas' ).height();

	// Fix for https://github.com/jeromeetienne/microevent.js/issues/19
	Object.getPrototypeOf( board.ev ).unbind = function ( event, fct ) {
		/* eslint-disable no-underscore-dangle */
		this._events = this._events || {};
		if ( event in this._events === false ) { return; }
		let index = this._events[ event ].indexOf( fct );
		if ( index < 0 ) { return; }
		this._events[ event ].splice( index, 1 );
		/* eslint-enable no-underscore-dangle */
	};

	board.ev.bind( 'board:reset', resetEmitter );

	// mode is either 'pencil' or 'eraser'
	// board.ev.bind( 'color:changed', e => socket.emit( 'color', e ) );
	// board.ev.bind( 'size:changed', e => socket.emit( 'size', e ) );

	let oldcoords = { x: 0, y: 0 },
		relCoord = ( e ) => {
			return {
				coords: { x: e.coords.x / width, y: e.coords.y / height },
				oldcoords: { x: oldcoords.x / width, y: oldcoords.y / height }
			};
		};
	board.ev.bind( 'board:startDrawing', function ( e ) {
		oldcoords = e.coords;
		socket.emit( 'draw', Object.assign( {}, getInfo(), relCoord( e ) ) );
	} );
	board.ev.bind( 'board:drawing', function ( e ) {
		if ( board.isDrawing ) {
			socket.emit( 'draw', Object.assign( {}, getInfo(), relCoord( e ) ) );
			oldcoords = e.coords;
		}
	} );
	board.ev.bind( 'board:stopDrawing', () => socket.emit( 'save' ) );

	// board.ev.trigger( 'color:changed', window.cuconnectGlobal.defaultColor );
	// board.ev.trigger( 'size:changed', DEFAULT_SIZE );
	// board.ev.trigger( 'board:mode', 'pencil' );

	socket.on( 'connect', () => {
		socket.emit( 'join', window.cuconnectGlobal.roomID );
		$canvas.css( 'pointer-events', 'auto' );
	} );
	socket.on( 'disconnect', () => {
		$canvas.css( 'pointer-events', 'none' );
	} );

	socket.on( 'reset', () => {
		board.ev.unbind( 'board:reset', resetEmitter );
		board.reset( { background: true } );
		board.ev.bind( 'board:reset', resetEmitter );
	} );

	socket.on( 'draw', ( info ) => requestAnimationFrame( () => {
		var oldinfo = getInfo();

		board.ctx.lineWidth = Math.max( 1, Math.ceil( info.size * width ) );
		board.ctx.globalCompositeOperation = info.op;
		board.ctx.strokeStyle = info.color;

		board.ctx.beginPath();
		board.ctx.moveTo( info.oldcoords.x * width, info.oldcoords.y * height );
		board.ctx.lineTo( info.coords.x * width, info.coords.y * height );
		board.ctx.stroke();

		board.ctx.lineWidth = oldinfo.size * width;
		board.ctx.globalCompositeOperation = oldinfo.op;
		board.ctx.strokeStyle = oldinfo.color;
	} ) );
	socket.on( 'save', () => board.saveWebStorage() );
}() );
