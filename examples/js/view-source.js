$(function(){
  var code = $('body').html().replace(/<h1>.*<\/h1>\s*/, '');
  // Make compatible with htmlpreview.github.com
  code = code.replace(/(\/script\S+)(\s|.)*/, '$1');
  $('<pre />').text( code ).appendTo('body');
});