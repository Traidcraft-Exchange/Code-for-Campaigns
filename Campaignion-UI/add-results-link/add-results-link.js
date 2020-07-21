// ==UserScript==
// @name         Show results pages in dropdown menu in Campaignion
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author
// @match        https://action.traidcraft.org.uk/admin/manage/content_and_actions
// @grant        none
// ==/UserScript==
(function () {
    "use strict";

    function insertStyles(styleblock) {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styleblock;
        document.head.appendChild(styleSheet);
    }
    const styleblock = "div.ctools-dropbutton.open li.results-button{display:block}div.ctools-dropbutton li.results-button{display:none}";
    insertStyles(styleblock);


    const dropdownContainers = Array.from(document.querySelectorAll("td.manage-links"));

    dropdownContainers.forEach((container) => {

        const nodeHref = container.querySelector("li.wizard.first > a").href;

        const nodeID = nodeHref.replace("/wizard?destination=admin/manage/content_and_actions", "");

        const resultsPageHref = `${nodeID}/webform-results`;

        const newResultsButton = `
            <li class="view results-button">
                <a href="${resultsPageHref}">Results</a>
            </li>
        `;

        const firstDropdownButton = container.querySelector("li.wizard.first");
        firstDropdownButton.insertAdjacentHTML("afterend", newResultsButton);

    })

})();