/**
 * Function to call NASA Assets api
 * @param latitude
 * @param longitude
 * @param startDt the date from which a list of images will be fetched for that particular latitude and longitude
 */
function getImageList(latitude, longitude, startDt) {
    return new Promise(function (resolve, reject) {
        var requestUrl = "https://api.nasa.gov/planetary/earth/assets?lon=" + longitude + "&lat=" + latitude + "&begin=" + startDt + "&api_key=DEMO_KEY";
        var xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response);
            }
            else {
                reject(Error("Error encountered. Error code: " + xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("Error encountered. Error code: " + xhr.statusText));
        };
        xhr.open("GET", requestUrl);
        // xhr.setRequestHeader("string", SomeValue);
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
function getImage(latitude, longitude, date) {
    return new Promise(function (resolve, reject) {
        var requestUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + longitude + "&lat=" + latitude + "&date=" + date + "&cloud_score=True&api_key=DEMO_KEY";
        var xhr = new XMLHttpRequest();
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
        // xhr.setRequestHeader("string", SomeValue);
        xhr.send();
    });
}
function loadImage(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = url;
        image.onload = function (event) { return resolve(image); };
        image.onerror = function (event) { return reject(image); };
    });
}
function onClickFunction(latitude, longitude, startdt) {
    // TODO change the hard codings
    /*
    getImageList().then(getImage)
        .then(loadImage);
    */
    getImageList(latitude, longitude, startdt).then(function (value) {
        //console.log(value);
        var promise = Promise.resolve();
        var count = value.count;
        var _loop_1 = function (i) {
            var dt = value.results[i].date.split('T')[0];
            // Do another API call to the NASA Imagery api with this dt
            // TODO. see the open tab in google chrome
            promise.then(function () { getImage(latitude, longitude, dt).then(function (url) { }); })
                .catch(function (val) { console.log("Error" + val); });
        };
        for (var i = 0; i < count; i++) {
            _loop_1(i);
        }
    }).catch(function (value) {
        console.log(value);
    });
}
//# sourceMappingURL=PromiseStructure.js.map