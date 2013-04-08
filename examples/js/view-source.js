$(function(){
	$('<pre />').text( $('body').html().replace(/<h1>.*<\/h1>\s*/, '') ).appendTo('body');
});