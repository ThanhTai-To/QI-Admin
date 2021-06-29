const DOMAIN = 'https://qi-management.herokuapp.com';
const LOGIN_PATH = '/admin/auth';

let token;

var xhr = new XMLHttpRequest();
var loginHandler = document.getElementById("login-btn");

loginHandler.addEventListener("click", function(event){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const data = JSON.stringify({
        username: username,
        password: password
    });

    xhr.open('POST',  DOMAIN + LOGIN_PATH, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function (e) {
        if (this.status == 200) { 
            token = JSON.parse(this.response);
            // Save token to session
            sessionStorage.setItem("token", token.accessToken);
            location.replace('../pages/create-qi.html');
        }
    };
    xhr.send(data);
});