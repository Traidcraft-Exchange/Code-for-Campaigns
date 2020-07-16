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

    /*

        This script lets you automatically show some internal descriptions on your list of campaigns in Campaignion.
        You'll need a browser extension like Tampermonkey to use it. Change the URL in the @match section on line 7 above to the Campaignion URL you use

        In the campaignDescriptions section below, put a list of pathnames (the text in the URL after the action.domain.org.uk address) and your internal description

        For example, in https://google.com/search, the pathname is "/search"

        This is what it should look like.

        const campaignDescriptions = {
            "/campaign-pathname": "internal description that you want to appear in the campaign list",
            "/another-campaign-pathname": "another internal description"
         }

         To make this easy, go down a few lines on this script. Then switch `const collectPathnamesMode = false;` to `const collectPathnamesMode = true;`

         Then you can click on the campaigns you want to describe and it will make a list of them in the right format at the top of the screen.
         It won't save that list when you switch pages. Copy the text before you go to Page 2.

         Remember to switch collectPathnamesMode back to false when you're finished

    */

    const collectPathnamesMode = true;


    const campaignDescriptions = {
        // Put campaign descriptions here

        "/donate": "Our standard donate page",
        "/free-will-month-form": "Free Will signup page",

    };


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
                    pathNameCollector.value = pathNameCollector.value + `"${pathname}": "",\n`;
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

            const campaignLink = campaign.children[1].children[0].children[0].href;

            const campaignPathname = new URL(campaignLink).pathname;

            if (campaignDescriptions.hasOwnProperty(campaignPathname)) {

                const description = campaignDescriptions[campaignPathname];

                insertCampaignDescription(campaign, description);

            }

        });
    }

    getCampaignsWithDescriptions();




})();
