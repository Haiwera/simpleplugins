'use strict';


var jpreview = function(img)
{
	$('#jpreview').remove();
	var panel = $('<div id="jpreview"></div>');
	panel.css({
		"width" : $(window).width() + 'px',
		"height" : $(window).height() + 'px',
		'left': '0px',
		'top' : '0px',
		'position' : 'fixed',
		'background' : 'rgba(0,0,0,.5)',
		'zIndex' : '99998'
	});
	var box = $('<div ></div>');
	var img = $('<img src="'+img+'" >');
	img[0].onload = function(){
		box.css({
			'position' : 'fixed',
			'width' : img.width()<$(window).width() ? img.width() : $(window).width(),
			'top' : $(window).height() / 2 - ($(this).height() / 2),
			'left' : $(window).width() / 2- ($(this).width() / 2),
			'zIndex' : '99999',

		});
	}
	box.append(img);
	var close = $('<div >x<div>');
	close.css({
		'width' : '40px',
		'height' : '40px',
		'position' : 'absolute',
		'right' : '-20px',
		'top' : '-20px',
		'border' : '1px solid #fff',
		'borderRadius' : '20px',
		'textAlign' : 'center',
		'lineHeight' : '32px',
		'fontSize' : '28px',
		'color' : '#fff',
		'cursor' : 'pointer',
		'background' : 'rgba(0,0,0,.8)',
		'textWeight' : 'bold',
	});

	close.click(function(){
		$('#jpreview').remove();
	}).mouseenter(function(){
		$(this).css('background' , '#000');
	}).mouseout(function(){
		$(this).css('background' , 'rgba(0,0,0,0.8)');
	});
	box.append(close);
	panel.append(box);
	$('body').append(panel);
}

