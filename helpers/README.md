# Helper scripts to make some things easier

So far, these are for Campaignion but they could be used on any webpage.

Add the helper scripts you need into the HTML of your page within \<script\> tags. Then add a script that makes use of that helper script. The examples in use show how to do that.

It's using old-school Javascript (ES5) so you can use it without worrying about it not working on Internet Explorer.

- [Generate A or B for split test](#generate-a-or-b-for-split-test)
- [Get query strings from a URL](#get-query-strings-from-a-url)
- [Detect screen width](#detect-screen-width)
- [Saving split-test group to hidden field](#saving-split-test-group-to-hidden-field)
- [Easy selector](#easy-selector)
- [Reveal / Show a hidden element](#reveal--show-a-hidden-element)
- [Hide a visible element](#hide-a-visible-element)
- [Change or Set text of an element](#change-or-set-text-of-an-element)
- [Change or Set the content of a form field](#change-or-set-the-content-of-a-form-field)
- [Change an image (and optionally the alt text)](#change-an-image-and-optionally-the-alt-text)
- [Do different AB tests within query string audiences on the same page](#do-different-ab-tests-within-query-string-audiences-on-the-same-page)

## Generate A or B for split test

Use this to assign A or B to every visitor to a webpage.

```javascript
var AorB = generateAB();
function generateAB() {
    return (Math.random() > 0.5) ? "A" : "B";
}
```

**Example in use**

```javascript

if (AorB === "A") {
    // Put what to do for Group A here
    // Probably one of the things lower down on this page
} else {
    // Put what to do for Group B here
}
```

## Get query strings from a URL

Use this to get the query string from the end of a url. There are 3 query strings in this URL: *<https://action.traidcraft.org.uk/our-land-our-rights?utm_source=FB_ads&utm_medium=green_vs_nature&utm_campaign=em>*

- utm_source is FB_ads
- utm_medium is green_vs_nature
- utm_campaign is em

```javascript
function getQueryString(name) {
    var result = location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return decodeURIComponent(result[1]);
};
```

**Example in use**

```javascript
var utm_campaign = getQueryStrings("utm_campaign");

if (utm_campaign === "em") {
    // Put what to do for 'em' here
    // Probably one of the things lower down on this page

} else {
    // Put what to do for not 'em' here
}
```

## Detect screen width

The two-column desktop layout on Campaignion starts at 780px.

```javascript
var screenWidth = window.innerWidth < 780 ? "mobile" : "desktop";
```

**Example in use**

```javascript
var screenWidth = window.innerWidth < 780 ? "mobile" : "desktop";

if (screenWidth === "mobile") {
    // Put what to do for 'mobile' here
    // Probably one of the things lower down on this page
} else {
    // Put what to do for 'desktop' here
}
```

## Saving split-test group to hidden field

Save the split-test group into a hidden field.

```javascript
var abField = select('input[name="submitted[form_key_of_hidden_field]"]');
var splitTestGroupIdentifier = "identifier for split-test group";
fillField(abField, splitTestGroupIdentifier);
```

## Easy selector

Use this to select elements using their CSS selector

```javascript
function select(css_selector) {
    return document.querySelector(css_selector);
}
```

**Example in use**

```javascript
var audience_category_input = select(".any-css-selector");
```

## Reveal / Show a hidden element

```javascript
function show(element) {
    return element.style.display = "";
}
```

**Example in use**

```javascript
var someElement = select(".css-selector");
show(someElement);
```

## Hide a visible element

```javascript
function hide(element) {
    return element.style.display = "none";
}
```

**Example in use**

```javascript
var someElement = select(".css-selector");
hide(someElement);
```

## Change or Set text of an element

```javascript
function setText(textElement, newString) {
    return textElement.innerText = newString;
}
```

**Example in use**

```javascript
var someTextElement = select(".title");
setText(someTextElement, "New text");
```

## Change or Set the content of a form field

```javascript
function fillField(inputElement, stringToAdd) {
    return inputElement.value = stringToAdd;
}
```

**Example in use**

```javascript
var someInputElement = select("input");
fillField(someInputElement, "New text in field");
```

## Change an image (and optionally the alt text)

```javascript
function swapImage(currentImage, newImageSource) {
  var newImageAltText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  currentImage.setAttribute("src", newImageSource);
  currentImage.setAttribute("alt", newImageAltText);
}
```

**Example in use**

```javascript
var someImage = select("#main-image");
swapImage(img, "linktoyournewimage.com", "optional new alt text")
```

## Insert styles

Use this to insert new CSS styles using Javascript.

```javascript
function insertStyles(styleblock) {
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styleblock;
    document.head.appendChild(styleSheet);
}
```

**Example in use**

The styles that go in the *styleblock* variable should be minified using a service like <https://css.github.io/csso/csso.html>

```javascript
var styleblock = "h1{color:blue}.class-name{color:green}#id-name{color:red}";
insertStyles(styleblock);
```


## Do different AB tests within query string audiences on the same page

Sometimes, you'll want to run a different split test within different audiences on the same page.

A (eg, AorB = A) and group 1 (eg, utm_campaign = em) triggers v1 of the page

B + group 1 => v2

A + group 2 => v3

B + group 2 => v4

A + group 3 => v5

B + group 3 => v6

```javascript
function generateAB() {
    return (Math.random() > 0.5) ? "A" : "B";
}

function getQueryStrings(query_string_name) {
    var all_query_strings = new URL(window.location).search;
    var searchParams = new URLSearchParams(all_query_strings);
    return searchParams.get(query_string_name);
}

var AorB = generateAB();
var utm_campaign = getQueryStrings("utm_campaign");

var AorB_Campaign = `${AorB}_${utm_campaign}`

switch (AorB_Campaign) {
    case A_em:
        // Do what you want with Group A and utm_campaign of 'em'
        break;

    case B_em:
        // Do what you want with Group B and utm_campaign of 'em'
        break;

    case A_ch:
        // Do what you want with Group A and utm_campaign of 'ch'
        break;

    case B_ch:
        // Do what you want with Group B and utm_campaign of 'ch'
        break;

    case A_hf:
        // Do what you want with Group A and utm_campaign of 'hf'
        break;

    case B_hf:
        // Do what you want with Group B and utm_campaign of 'hf'
        break;

    case A_:
        // Do what you want with Group A and no utm_campaign
        break;

    case B_:
        // Do what you want with Group B and no utm_campaign
        break;

    default:
        // Do something to record something didn't work. Nothing matched
        // Record the AorB_Campaign variable
        break;
}
```
