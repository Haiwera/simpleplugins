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
	img.load(function(){
		var width  = $(this).width();
		var height = $(this).height();
		var wH = $(window).height() - 40;
		var wW = $(window).width() - 40;
		var sW = width;
		var sH = height;
		var l = 0;
		var t = 0;
		if(width > wW || height > wH){
		
			if(width / height > wW / wH)
			{
				sW = wW;
				sH =   wW / width  * height;
				l = 20;
				t = (wH - sH) /  2;
			}
			else{
				sH = wH;
				sW =  wH / height  * width;
				t = 20;
				l = (wW - sW) / 2;
			}
		}
		else{
			t = (wH - sH) /  2;
			l = (wW - sW) / 2;
		}
		
		box.css({
			'position' : 'fixed',
			'height' : sH,
			'width' : sW,
			'top' :  t,
			'left' : l,
			'zIndex' : '99999',

		});
		img.css({
			'height' : sH,
			'width' : sW,
		});
	});
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

