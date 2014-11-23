//
// Darken.js
// By Justin Bisignano
// 
// This javascript widget will
// insert a header to the page
// allowing the user to enable a
// dark mode where all colors are
// darkened for easier night reading
//

/*
 Rules to follow:
 All background-colors should be darkened by 80%
 All text colors should be brightened by 80%
 Links, if blue, can stay as they are
 Do not affect images, only affect text
*/


/**
 * Inserts a header at the top of the page asking the user
 * if they want to enable night mode
 */
function insertHeader()
{
	var html = "";

}


/**
 * Darken the whole page from the <body> tag down
 */
function darken() {
	// Start at the top element, body
	darkenElements( $("body") );
}

/**
 * Recursivly darken the passed element and its children
 */
function darkenElements(jQueryElement) {
	// Apply this function to all children
	jQueryElement.children().each(function(){
		darkenElements( $(this) );
	});

	// Get the text color of this element (Using the DOM element, not jQuery)
	var textcolor = getStyle(jQueryElement[0], "color");
	var bgcolor = getStyle(jQueryElement[0], "background-color");

	// Use tinycolor to darken the background and lighten the foreground
	textcolor = tinycolor(textcolor);
	bgcolor = tinycolor(bgcolor);

	// Only lighten the text if it is dark
	if(textcolor.isDark())
	{
		// Lighten 80%
		textcolor = textcolor.brighten(80);
	}
	// Only darken the BG if it is light
	if(bgcolor.isLight())
	{
		// Darken 80%
		// Or, really, take away brightness
		// This is because darken works on HSL and human color preception
		// which makes green brighter than other colors after the change
		bgcolor = bgcolor.brighten(-80);
	}

	// Apply the new colors
	jQueryElement.css("color", textcolor.toHexString());
	jQueryElement.css("background-color", bgcolor.toHexString());
}


/**
 * Finds the style given by name at the passed element
 */
function getStyle(elem, name) {
    // From John Resig's J/S Pro Techniques p136
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}