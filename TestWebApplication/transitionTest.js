var frame = document.getElementById("imgFrame");
var logbox = document.getElementById('logBox');
var count = 0;
function initialConfig() {
    frame.className = 'box-initial';
    logbox.insertAdjacentHTML('beforeend', " <b>(" + ++count + "</b> - box-initial)");
    setTimeout(finalConfig, 5000);
}
function finalConfig() {
    frame.className += ' box-rotate';
    logbox.insertAdjacentHTML('beforeend', " <b>(" + ++count + "</b> - box-rotate)");
    setTimeout(initialConfig, 3000);
}
initialConfig();
//# sourceMappingURL=transitionTest.js.map