jQuery DOM Actions
=================

This plugin is mostly oriented to complex web applications.
It allows you to a set of actions that you will handle and then easily apply them to elements turning them into buttons.

As seen on the [first example](https://github.com/flesler/jquery.domActions/tree/master/examples/single-action.html):
<pre>
$.actions('say', function(msg){
	alert(msg);
});
</pre>

We define an action "say" and provide a function that handles it. It expects one argument.
Now anywhere on the html we can add the following to a div and when clicked, it will trigger this function.
<pre>
&lt;div data-action="say/hi">Say Hi&lt;/div>
</pre>

I'm currently working on the documentation so check all the [examples](https://github.com/flesler/jquery.domActions/tree/master/examples/) to see it in action.
You can view the examples live [here](http://htmlpreview.github.io/?https://github.com/flesler/jquery.domActions/blob/master/examples/index.html).
Any input is appreciated (create [an issue](https://github.com/flesler/jquery.domActions/issues/new)).