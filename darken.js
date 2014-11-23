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
// Requires jQuery and tinycolor.js
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
	// First, inject the CSS styles
	var cssStyleElement = document.createElement('style')
	cssStyleElement.innerHTML = getHeaderCss();
	document.body.appendChild(cssStyleElement);

	// Next, get the HTML string and append it as the first child of the <body> tag
	// This is easier to do with jQuery than with standard JS
	$('body').prepend( getHeaderHtml() );

	// Attach a click handler to the 'Darken' button
	$("#darkenjs-yes").click(function(){
		darken();
		// Remove the header with a slide up animation
		$(".darkenjs-header").slideUp().remove();
	})

	// Atach a click handler to the 'No' button
	$("#darkenjs-no").click(function(){
		// Remove the header with a slide up animation
		$(".darkenjs-header").slideUp().remove();
	})
}

/**
 * Returns the html string for the header
 */
function getHeaderHtml()
{
	var html = "";
	html += '<div class="darkenjs-header">';
	html += '	<span class="darkenjs-name">Darken.js</span>';
  	html += '	This site seems bright. Enable night mode?';
  	html += '	<div class="darkenjs-button" id="darkenjs-yes">';
   	html += '		Darken';
  	html += '	</div>';
  	html += '	<div class="darkenjs-button" id="darkenjs-no">';
    html += '		Not this time';
    html += '	</div>';
    html += '</div>';

    return html;
}

/**
 * Returns the css string for the header styles
 */
function getHeaderCss()
{
	var css="";
	css += ".darkenjs-header {";
	css += "  width: 100%;";
	css += "  margin: 0px auto;";
	css += "  padding: 10px 0;";
	css += "  text-align: center;";
	css += "  color: #F2F8E2;";
	css += "  background-color: #080212;";
	css += "}";

	css += ".darkenjs-name {";
	css += "  display: inline-block;";
	css += "  margin: 0 30px 0 -30px;";
	css += "  font-style: italic;";
	css += "}";

	css += ".darkenjs-button {";
	css += "  display: inline-block;";
	css += "  margin: 0 0 0 15px;";
	css += "  padding: 5px 10px;";
	css += "  border: 1px solid #F2F8E2;";
	css += "}";

	css += ".darkenjs-button:hover {";
	css += "  border: 1px solid #E48A3C;";
	css += "}";

	return css;
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

// Initialize Darken.js by inserting the header
insertHeader();
