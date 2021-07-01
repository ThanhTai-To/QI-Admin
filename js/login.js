const DOMAIN = 'https://qi-management.herokuapp.com/admin';
const LOGIN_PATH = '/auth';

let response;

var xhr = new XMLHttpRequest();
var loginHandler = document.getElementById("login-btn");
var error = document.getElementById('error-msg');
var loader = document.getElementById("loader-icon");


loginHandler.addEventListener("click", function(event){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (isUserNamePasswordEmpty(username, password)) {
        return;
    }

    const data = JSON.stringify({
        username: username,
        password: password
    });

    // Add loader
    loader.setAttribute('class', 'fa fa-spinner fa-spin');

    xhr.open('POST',  DOMAIN + LOGIN_PATH, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) { 
            response = JSON.parse(this.response);
            // Save token to session
            sessionStorage.setItem("token", response.accessToken);
            location.replace('../pages/create-qi.html');
        } else if (this.status == 401) {
            // remove loader
            loader.removeAttribute('class', 'fa fa-spinner fa-spin');
            error.innerText = 'Invalid username/password';
        } 
    };
    xhr.send(data);

});

function isUserNamePasswordEmpty(username, password) {
    if (username.length === 0 || password.length === 0) {
        error.innerText = 'Username/password can not empty';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return true;
    }
    return false;
}