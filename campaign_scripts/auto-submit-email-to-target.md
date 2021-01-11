# Automatically submit page 2 of an email to target action

Sometimes, you want to put the email text of a campaign on page one of an action. Campaignion forces you to have the campaign text on page 2 of the action.

Putting this script in the source of your Content submits the form on page two automatically. It has the effect of making the first page of the action into the only page of the action. The user is redirected automatically to the Thank You Page.

Instead of the `clickSubmitButton` function, you could put any other Javascript that you want to load only on page 2 of the action.

```html
<script>
    // Put the node ID of the campaign here
    var nodeID = "173";

    function clickSubmitButton() {
        var submitButton = document.querySelector("#edit-submit");
        submitButton.click();
    }
    window.addEventListener("DOMContentLoaded", function () {
        var mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
            // childList only happens once
                if (mutation.type === "childList") {
                    // What do do on page 2
                    clickSubmitButton();
                    mutationObserver.disconnect();
                }

            });
        });
        var targetNode = document.querySelector(
            "#webform-ajax-wrapper-".concat(nodeID)
        );
        mutationObserver.observe(targetNode, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });
    });

</script>

```
