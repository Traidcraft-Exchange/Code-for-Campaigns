// A script to fill in hidden fields in a Squarespace form using utm values in a URL
// Run this through Babel
// Might be able to do DOMContentloaded instead of these hacking waits
<script defer>
    addClickListener();
    async function addClickListener() {
        await new Promise(r => setTimeout(r, 1000));

        let form_button = document.querySelector(".open-form-button");
        form_button.addEventListener('click', () => {
            fillHiddenFields();
        });
    }

    async function fillHiddenFields() {

        var url = new URL(window.location);
        var query_string = url.search;
        var searchParams = new URLSearchParams(query_string);

        var audience_category = searchParams.get("utm_medium");
        var message_category = searchParams.get("utm_campaign");


        await new Promise(r => setTimeout(r, 1000));

        var message_category_input = document.querySelector("#hidden-yui_3_17_2_1_1582120639035_73217");
        var audience_category_input = document.querySelector("#hidden-yui_3_17_2_1_1582120639035_78568");

        audience_category_input.value = audience_category;
        message_category_input.value = message_category;

    }

</script>