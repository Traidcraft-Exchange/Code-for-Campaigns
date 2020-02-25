# Helper scripts to make some things easier

Add the helper scripts you need into the HTML of your page within \<script\> tags. Also add the script to make use of that helper script. The examples in use show how to do that.

- [Helper scripts to make some things easier](#helper-scripts-to-make-some-things-easier)
  - [Generate A or B for split test](#generate-a-or-b-for-split-test)
  - [Get query strings from a URL](#get-query-strings-from-a-url)
  - [Detect screen width](#detect-screen-width)
  - [Easy selector](#easy-selector)
  - [Reveal / Show a hidden element](#reveal--show-a-hidden-element)
  - [Hide a visible element](#hide-a-visible-element)
  - [Change or Set text of an element](#change-or-set-text-of-an-element)
  - [Change or Set the content of a form field](#change-or-set-the-content-of-a-form-field)
  - [Change an image (and optionally the alt text)](#change-an-image-and-optionally-the-alt-text)

## Generate A or B for split test

Use this to assign A or B to every visitor to a webpage.

```javascript
let AorB = generateAB();
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
function getQueryStrings(query_string_name) {
    const all_query_strings = new URL(window.location).search;
    const searchParams = new URLSearchParams(all_query_strings);
    return searchParams.get(query_string_name);
}
```

**Example in use**

```javascript
const utm_campaign = getQueryStrings("utm_campaign");

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
let screenWidth = (window.innerWidth < 780) ? "mobile" : "desktop";
```

**Example in use**

```javascript
let screenWidth = (window.innerWidth < 780) ? "mobile" : "desktop";

if (screenWidth === "mobile") {
    // Put what to do for 'mobile' here
    // Probably one of the things lower down on this page

} else {
    // Put what to do for 'desktop' here
}
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
const audience_category_input = select(".any-css-selector");
```

## Reveal / Show a hidden element

```javascript
function show(element) {
    return element.style.display = "";
}
```

**Example in use**

```javascript
const someElement = select(".css-selector");
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
const someElement = select(".css-selector");
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
const someTextElement = select(".title");
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
const someInputElement = select("input");
fillField(someInputElement, "New text in field");
```

## Change an image (and optionally the alt text)

```javascript
function swapImage(currentImage, newImageSource, newImageAltText = "") {
    currentImage.setAttribute("src", newImageSource);  
    currentImage.setAttribute("alt", newImageAltText);
}
```

**Example in use**

```javascript
const someImage = select("#main-image");
swapImage(img, "linktoyournewimage.com", "optional new alt text")
```
