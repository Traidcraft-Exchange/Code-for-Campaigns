// Generate A or B for A/B tests
const AorB = function () {
    return (Math.random() > 0.5) ? "A" : "B";
}
/*
if (AorB = "A") {
    // Put what to do for Group A here
} else {
    // Put what to do for Group B here
}
*/


// Query strings from a URL
function getQueryStrings(query_string_name) {
    const all_query_strings = new URL(window.location).search;
    const searchParams = new URLSearchParams(all_query_strings);
    return searchParams.get(query_string_name);
}
// const audience_category = getQueryStrings("group");


// Simplify selecting an element by CSS selector
function select(css_selector) {
    return document.querySelector(css_selector);
}
// const audience_category_input = select("#hidden-yui_3_17_2_1_1582120639035_73217");


// Show a hidden element
function show(element) {
    return element.style.display = "";
}

// Hide a visible element
function hide(element) {
    return element.style.display = "none";
}

// Change or Set text of an element
function setText(str) {
    return this.textContent = str;
}

const someText = select(".title");
someText.setText("New text");

// Change or Set the content of a form field
function fillField(str) {
    return this.value = str;
}

function logThis() {
    console.log(this)
}