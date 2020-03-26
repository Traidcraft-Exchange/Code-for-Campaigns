This is how to use a GIF as your campaign image in Campaignion.

If you try to add a moving GIF as your campaign image in Campaignion, it wont' work. Campaignion converts moving GIFs into static GIFs when you upload it. (I think.)

So just add any image and then put the code below in the Source of the main content of your campaign.

You will need to upload the GIF you want to use to an image hosting website. I recommend [Cloudinary](https://cloudinary.com). 

<small>Cloudinary will automatically serve an optimised GIF that works on every type of browser without any work. You want to select Format to Auto in the Transformation settings on your GIF to get that. It's the `f_auto` in the URL below.</small>

Then replace the URL in newImageSource below with the URL of your hosted image. If you want blind people to be able to hear what is in the GIF, replace the newImageAltText text with a description of your GIF. You should 100% do this!!

```
<style type="text/css">div.content > img {display: none;}
</style>
<script>
window.addEventListener("DOMContentLoaded", function () {

    var newImageSource = "https://res.cloudinary.com/traidcraftexchange/image/upload/f_auto/v1585146387/this-is-the-kind-of-story-we-need-right-now.gif";
    
    var newImageAltText = "Seth Meyers, a US late host host, saying the words, 'This is the kind of story we need right now.'";


    function swapImage(currentImage, newImageSource) {
        var newImageAltText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        currentImage.setAttribute("src", newImageSource);
        currentImage.setAttribute("alt", newImageAltText);
    }

    function insertStyles(styleblock) {
        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styleblock;
        document.head.appendChild(styleSheet);
    }

    var currentImage = document.querySelector("div.content > img");

    swapImage(currentImage, newImageSource, newImageAltText);

    var styleblock = "div.content > img {height: auto; width: 430px; display: block !important}";
    insertStyles(styleblock);

});
</script>
```
