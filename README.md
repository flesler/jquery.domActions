jQuery DOM Actions
=================

This plugin is mostly oriented to complex web applications.
It allows you to a set of actions that you will handle and then easily apply them to elements turning them into buttons.

As a small example:
<pre>
$('body').actions('say', function(msg){
	alert(msg);
});
</pre>

We define an action "say" and provide a function that handles it. It expects one argument.
Now anywhere on the html we can add the following to an element and when clicked, it will trigger this function.
<pre>
&lt;body>
	&lt;div data-action="say/hi">Say Hi&lt;/div>
&lt;/body>
</pre>

I'm currently working on the documentation so check all the [examples](https://github.com/flesler/jquery.domActions/tree/master/examples/) to see it in action. You can test them [LIVE](http://htmlpreview.github.io/?https://github.com/flesler/jquery.domActions/blob/master/examples/index.html).<br />
Any input is appreciated, create [an issue](https://github.com/flesler/jquery.domActions/issues/new) and tell me what you think.
