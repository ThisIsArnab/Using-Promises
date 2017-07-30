/**
 * Implementing Promise callback mechanism. Trial is on...
 */
var HttpFetch = (function () {
    function HttpFetch() {
    }
    HttpFetch.prototype.getValue = function (url) {
        this.url = url;
        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", url);
        return this; // Return whatever invoked this method.
    };
    HttpFetch.prototype.successResult = function (callback) {
        this.xhr.addEventListener("load", callback);
        this.xhr.addEventListener("error", this.errorCallback);
        // this.xhr.open("GET", this.url);
        this.xhr.send();
        return this;
    };
    HttpFetch.prototype.errorResult = function (callback) {
        this.errorCallback = callback;
        return this;
    };
    return HttpFetch;
}());
var url = "http://www.hdwallpapers.in/walls/autumn_bench-HD.jpg";
var myHttpFetch = new HttpFetch();
myHttpFetch.getValue("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY1234").successResult(function (img) {
    var imgElement = document.getElementById("myImg");
    imgElement.setAttribute("src", url);
})
    .errorResult(function (err) {
    var errorDiv = document.createElement("div");
    errorDiv.innerHTML = "<p>Some error while retrieving the image. Details: " + err + "</p>";
    document.getElementById('myImg').appendChild(errorDiv);
});
//# sourceMappingURL=myScript.js.map