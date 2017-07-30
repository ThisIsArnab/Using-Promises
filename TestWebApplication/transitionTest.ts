let frame = document.getElementById("imgFrame");

let logbox = document.getElementById('logBox');
let count = 0;

function initialConfig() {
    frame.className = 'box-initial';
    logbox.insertAdjacentHTML('beforeend', ` <b>(${++count}</b> - box-initial)`);
    setTimeout(finalConfig, 5000);
}

function finalConfig() {
    frame.className += ' box-rotate';
    logbox.insertAdjacentHTML('beforeend', ` <b>(${++count}</b> - box-rotate)`);
    setTimeout(initialConfig, 3000);
}

initialConfig();