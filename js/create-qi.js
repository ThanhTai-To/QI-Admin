const DOMAIN = 'https://qi-management.herokuapp.com/admin';
const CREATE_QI_PATH = '/quarantine-information';
const token = sessionStorage.getItem('token');
sessionStorage.setItem('token', token);
console.log(token);

sessionStorage.removeItem('currentPage');


var xhr = new XMLHttpRequest();
var fromProvince = document.getElementById('from');
var destination = document.getElementById('destination');
var createQI = document.getElementById('create-qi-btn');
var error = document.getElementById('error-msg');
var loader = document.getElementById('loader-icon');
var homeNav = document.getElementById('home-nav');
var createQINav = document.getElementById('create-qi-nav');
let response;


function loadBody() {
    homeNav.removeAttribute('class', 'active')
    createQINav.setAttribute('class', 'active');
    // Add options to selects
    for (const key of Object.keys(PROVINCE)) {
        addOptionsToSelectFrom(key);
        addOptionsToSelectDestination(key);
    }
}

function addOptionsToSelectFrom(key) {
    var option = document.createElement("option");
    option.text = PROVINCE[key].vi;
    option.setAttribute('value', PROVINCE[key].enum);
    fromProvince.add(option, fromProvince[-1]);
}

function addOptionsToSelectDestination(key) {
    var option = document.createElement("option");
    option.text = PROVINCE[key].vi;
    option.setAttribute('value', PROVINCE[key].enum);
    destination.add(option, destination[-1]);
}



createQI.addEventListener('click', function (event) {
    event.preventDefault();
    // Add loader
    loader.setAttribute('class', 'fa fa-spinner fa-spin');
    error.innerText = '';
    var originPlace = fromProvince.value;
    var destinationPlace = destination.value;
    var startDate = document.getElementById('start-date').value;
    var endDate = document.getElementById('end-date').value;
    console.log(originPlace);
    console.log(destinationPlace);
    console.log(startDate);
    console.log(endDate);

    if (isEmpty(originPlace) || isEmpty(destinationPlace) ||
        isEmpty(startDate)) {
        error.innerText = 'Start date can not empty';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return;
    }
    if (originPlace == destinationPlace) {
        error.innerText = 'From province and destination can not be the same';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return;
    }

    if (!isEmpty(endDate)) {
        if (startDate > endDate) {
            error.innerText = 'End date must greater than start date';
            loader.removeAttribute('class', 'fa fa-spinner fa-spin');
            return;
        }
    } else if (isEmpty(endDate)) {
        endDate = null;
    }

    const data = JSON.stringify({
        originFrom: originPlace,
        destination: destinationPlace,
        startAt: reformatDate(startDate),
        endAt: reformatDate(endDate)
    });

    xhr.open('POST', DOMAIN + CREATE_QI_PATH, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 201) {
            response = JSON.parse(this.response);
            alert("Created  Quarantine information successfully");
            location.replace('../pages/create-qi.html');
        } else if (this.status == 401 || this.status == 400) {
            console.log(response);
            // remove loader
            loader.removeAttribute('class', 'fa fa-spinner fa-spin');
            alert("Technical error");
        }
    };
    xhr.send(data);
})

function isEmpty(input) {
    if (input == null || input.length == 0) {
        return true;
    }
    return false;
}

