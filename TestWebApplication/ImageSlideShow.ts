function slideShowFactory(imagesURL: Array<any>) {
    let prevImg = document.createElement("img") as HTMLImageElement;
    prevImg.style.height = "480px";
    prevImg.style.width = Math.floor(480 * 16 / 9).toString() + "px";
    prevImg.style.position = 'absolute';

    let curImg = document.createElement("img") as HTMLImageElement;
    curImg.style.height = "480px";
    curImg.style.width = Math.floor(480 * 16 / 9).toString() + "px";
    curImg.style.position = 'absolute';

    let imgframe = document.getElementById('imgFrame');

    imgframe.appendChild(prevImg);
    imgframe.appendChild(curImg);

    /**
     * This function shows the image with the transition class applied only when the image has been completely loaded.
     * The slide is set for 4 second duration.
     */
    function showSlide(slideNo: number, imagesURL: Array<any>, currentImg, previousImg) {
        let totalSlides = imagesURL.length || 2;
        currentImg.src = imagesURL[slideNo] || '';   // TODO: Need to error handle    
        let loadingSpinner = document.getElementById('loading');
        loadingSpinner.hidden = false;

        let action = (event) => {
            loadingSpinner.hidden = (event.type == 'error') ? false : true;
            previousImg.className += ' slide-next';
            currentImg.className = 'slide-initial';
            setTimeout(() => {
                showSlide((slideNo + 1) % totalSlides, imagesURL, previousImg, currentImg);
            }, 4000);
        };

        currentImg.onload = action;
        currentImg.onerror = action;
    }

    showSlide(0, imagesURL, curImg, prevImg);
}