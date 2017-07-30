function slideShowFactory(imagesURL) {
    var prevImg = document.createElement("img");
    prevImg.style.height = "480px";
    prevImg.style.width = Math.floor(480 * 16 / 9).toString() + "px";
    prevImg.style.position = 'absolute';
    var curImg = document.createElement("img");
    curImg.style.height = "480px";
    curImg.style.width = Math.floor(480 * 16 / 9).toString() + "px";
    curImg.style.position = 'absolute';
    var imgframe = document.getElementById('imgFrame');
    imgframe.appendChild(prevImg);
    imgframe.appendChild(curImg);
    /**
     * This function shows the image with the transition class applied only when the image has been completely loaded.
     * The slide is set for 4 second duration.
     */
    function showSlide(slideNo, imagesURL, currentImg, previousImg) {
        var totalSlides = imagesURL.length || 2;
        currentImg.src = imagesURL[slideNo] || ''; // TODO: Need to error handle    
        var loadingSpinner = document.getElementById('loading');
        loadingSpinner.hidden = false;
        var action = function (event) {
            loadingSpinner.hidden = (event.type == 'error') ? false : true;
            previousImg.className += ' slide-next';
            currentImg.className = 'slide-initial';
            setTimeout(function () {
                showSlide((slideNo + 1) % totalSlides, imagesURL, previousImg, currentImg);
            }, 4000);
        };
        currentImg.onload = action;
        currentImg.onerror = action;
    }
    showSlide(0, imagesURL, curImg, prevImg);
}
//# sourceMappingURL=ImageSlideShow.js.map