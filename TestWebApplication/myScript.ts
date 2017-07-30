/**
 * Implementing Promise callback mechanism. Trial is on...
 */

class HttpFetch{
    xhr: XMLHttpRequest;
    errorCallback: (error) => any;
    url: string;

    getValue(url:string): HttpFetch{
        this.url = url;
        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", url);

        return this;    // Return whatever invoked this method.
    }

    successResult(callback: (success) => any): HttpFetch {
        this.xhr.addEventListener("load", callback);
        this.xhr.addEventListener("error", this.errorCallback);
        // this.xhr.open("GET", this.url);
        this.xhr.send();

        return this;
    }

    errorResult(callback:(error)=>any): HttpFetch{
        this.errorCallback = callback;        
        return this;
    }
}

let url = "http://www.hdwallpapers.in/walls/autumn_bench-HD.jpg";

let myHttpFetch = new HttpFetch();

myHttpFetch.getValue("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY1234").successResult(function(img){
    let imgElement = document.getElementById("myImg");
    imgElement.setAttribute("src", url);
})
.errorResult(function(err){
    let errorDiv= document.createElement("div");
    errorDiv.innerHTML = `<p>Some error while retrieving the image. Details: ${err}</p>`;
    document.getElementById('myImg').appendChild(errorDiv);
});