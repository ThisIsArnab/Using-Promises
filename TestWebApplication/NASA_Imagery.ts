declare let Promise: any;

/**
 * Function to call NASA Assets api
 * @param latitude
 * @param longitude
 * @param startDt the date from which a list of images will be fetched for that particular latitude and longitude
 */
function getImageList(latitude, longitude, startDt):Promise<any> {
    return new Promise(function(resolve, reject){
        let requestUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&begin=${startDt}&api_key=DEMO_KEY`;

        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.onload = function(){
            if(xhr.status == 200){
                resolve(xhr.response);
            }
            else{
                reject(Error("Error encountered. Error code: " + xhr.statusText));
            }
        };

        xhr.onerror = function(){
            reject(Error("Error encountered. Error code: " + xhr.statusText));
        };

        xhr.open("GET", requestUrl);
        xhr.send();
    });
}

/**
 * This function makes API call to the NASA Imagery api and returns the image url of the latitude and longitude
 * in the date specified.
 * @param latitude
 * @param longitude
 * @param date picture on that date
 */
function getImage(latitude, longitude, date): Promise<any> {
    return new Promise((resolve, reject) => {
        let requestUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&cloud_score=True&api_key=DEMO_KEY`;

        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response.url);
            }
            else {
                reject(Error("Error encountered. Error code: " + xhr.statusText));
            }
        };

        xhr.onerror = function () {
            reject(Error("Error encountered. Error code: " + xhr.statusText));
        };

        xhr.open("GET", requestUrl);
        xhr.send();
    })
}

//function loadImage(url: string): Promise<any> {
//    return new Promise((resolve, reject) => {
//        let image = new Image();
//        image.src = url;
//        image.onload = (event) => resolve(image);
//        image.onerror = (event) => reject(image);
//    });
//}

let imageUrlArray = [];

/**
 * Store the results of API calls in an array
 */
function onClickFunction(latitude, longitude, startdt) {
    getImageList(latitude, longitude, startdt).then(function (value) {
        //console.log(value);
        let promise = Promise.resolve();
        let count = value.count;
        for (let i = 0; i < count; i++) {
            let dt = (value.results[i].date as string).split('T')[0];

            getImage(latitude, longitude, dt).then((value) => {
                imageUrlArray[i] = value;
            }).catch((value) => console.log(value));
        }
    }).catch(function (value) {
        console.log(value);
    });
}