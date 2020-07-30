/*

        This script lets you automatically show some internal descriptions on your list of campaigns in Campaignion.
        You'll need a browser extension like Tampermonkey to use it. Change the URL in the @match section on line 34 below to the Campaignion URL you use

        In the campaignDescriptions section below that starts on line 40, put a list of pathnames (the text in the URL after the action.domain.org.uk address) and your internal description

        The pathname, for example, in https://google.com/search, is the "/search" bit

        This is what your campaignDescriptions section should look like. The backslash at the start of the pathname is optional.

        const campaignDescriptions = {
            "/campaign-pathname": "internal description that you want to appear in the campaign list",
            "/another-campaign-pathname": "another internal description"
         }

         To make the formatting of this a bit easier, go down to line 51. Then switch `const collectPathnamesMode = false;` to `const collectPathnamesMode = true;`

         Then you can click on the campaigns you want to describe and it will make a list of them in the right format at the top of the screen.
         Paste that into your campaignDescriptions section and add the description after each one.

         It won't save that list when you switch pages. Copy the text before you go to Page 2.

         Remember to switch collectPathnamesMode back to false when you're finished

    */

// ==UserScript==
// @name         Show campaign descriptions on Campaignion
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author
// @match        https://action.traidcraft.org.uk/admin/manage/content_and_actions
// @grant        none
// ==/UserScript==
(function () {
    "use strict";

    const campaignDescriptions = {
        // Put campaign descriptions here

        "/2-minute-3-question-survey-garment-workers-campaign": "The survey for the garment workers campaign",
        "/2-minute-3-question-survey": "The survey for Our Land Our Rights",
        "/our-land-our-rights-number-ten": "Click edit to see the original Our Land Our Rights Number 10 action before it redirected",
        "/tell-government-no-time-for-us-trade-deal": "US-UK stop the deal action",
        "2-minute-4-question-survey-us-uk-not-now": "Survey for US-UK action. Includes phone question",

    };

    const collectPathnamesMode = false;

    // You shouldn't need to edit anything below this


    
    if (collectPathnamesMode === true) {
        runCollectPathnamesMode();
    }

    function runCollectPathnamesMode() {
        const pathnamesSoFar = [];

        document.addEventListener("click", function (event) {

            if (!document.querySelector("textarea.pathnames")) {
                const pageTitle = document.querySelector("div#page-title");

                const pathNameCollectorWrapper = document.createElement("form");
                const pathNameCollector = `
                <textarea class="pathnames" style="margin-left: 50px" rows="2" cols="50"></textarea>
                `;
                pathNameCollectorWrapper.innerHTML = pathNameCollector;
                pageTitle.appendChild(pathNameCollectorWrapper);
            }

            if (event.target.matches("div.heading > span.title > a")) {
                event.preventDefault();
                const pathname = event.target.pathname;
                const pathNameCollector = document.querySelector("textarea.pathnames");


                if (!pathnamesSoFar.includes(pathname)) {
                    const currentRowNumber = pathNameCollector.getAttribute("rows");
                    const newRowNumber = Number(currentRowNumber) + 1;
                    pathNameCollector.setAttribute("rows", newRowNumber);
                    pathnamesSoFar.push(pathname);
                    pathNameCollector.value = pathNameCollector.value + `\t\t"${pathname}": "",\n`;
                }

            }

        }, false);

    }



    function insertCampaignDescription(campaign, description) {
        const div = document.createElement("div");
        div.setAttribute("class", "internal-campaign-description")
        div.innerHTML = `
        <span><strong>${description}</strong></span>
        `
        campaign.appendChild(div);
    }

    function getCampaignsWithDescriptions() {
        const allCampaigns = Array.from(document.querySelectorAll("td.campaignion-manage"));

        allCampaigns.forEach((campaign) => {

            const campaignLink = campaign.querySelector(".heading > .title > a").href;

            const campaignPathname = new URL(campaignLink).pathname;
            const campaignPathnameWithoutLeadingSlash = campaignPathname.replace("/", "");

            if (campaignDescriptions.hasOwnProperty(campaignPathname)) {

                const description = campaignDescriptions[campaignPathname];
                insertCampaignDescription(campaign, description);
            }

            else if (campaignDescriptions.hasOwnProperty(campaignPathnameWithoutLeadingSlash)) {

                const description = campaignDescriptions[campaignPathnameWithoutLeadingSlash];
                insertCampaignDescription(campaign, description);
            }

        });
    }

    getCampaignsWithDescriptions();

})();