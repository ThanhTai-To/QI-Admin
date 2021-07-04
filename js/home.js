const DOMAIN = 'https://qi-management.herokuapp.com/admin';
const QI_PATH = '/quarantine-information';
const token = sessionStorage.getItem('token');
sessionStorage.setItem('token', token);
console.log(token);

if (token == null) {
    location.replace('../pages/login.html');
}

let currentPageOfAPI = sessionStorage.getItem('currentPage');
console.log('currentPage of API: ' + currentPageOfAPI);



let xhr = new XMLHttpRequest();
let homeNav = document.getElementById('home-nav');
let createQINav = document.getElementById('create-qi-nav');
let content = document.getElementById('block-content');
let pagination = document.getElementById('home-page-pagination');


function loadBody() {
    createQINav.removeAttribute('class', 'active')
    homeNav.setAttribute('class', 'active');
    getQuarantineInformationList(currentPageOfAPI);
    console.log("loaded body");
}


function getQuarantineInformationList(page) {
    if (page == null) {
        page = 0;
    }
    let params, response;
    params = '?page=' + page;
    console.log('params: ' + params);

    xhr.open('GET', DOMAIN + QI_PATH + params, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.response);
            console.log(response);
            displayPagination(response.totalPage);
            response.quarantineInformationList.forEach(element => displayBlockQuarantineInformation(element));
            loadEventListeners(response.quarantineInformationList);
            loadPaginationIndexActive(currentPageOfAPI, response.totalPage);
            removeLoaderAfterLoadedBody();


        } else if (this.status == 401 || this.status == 400) {
            console.log(this.status);
            alert("Technical error");
            return;
        } else if (this.status == 208) {
            console.log(this.status);
            alert("Already created the quarantine information, please update it.");
            return;
        }
    };
    xhr.send();
}

function displayBlockQuarantineInformation(element) {
    content.innerHTML +=
        `<div class="row block-qi" id="` + element.id + `">
        <div class="container inside-block-qi">
            <div class="row date-valid-block-qi">
                <div class="col-8 date-text">
                    <p class="text">From ` + element.startAt + returnEndDate(element.endAt) + `: this information will valid</p>
                    ` + checkQuarantineInformationStatus(element.status) + `
                </div>
                <div class="col-4 utils">
                    <button type="button" class="utils-icon delete-btn float-right" id="delete-` + element.id + `"><i class="fa fa-close"></i></button>
                    <button type="button" class="utils-icon update-btn float-right" id="update-` + element.id + `" data-toggle="modal" data-target="#updateQIModal"><i class="fa fa-pencil"></i></button>
                </div>
            </div>
            <hr>
            <div class="row content-block-qi">
                <p class="text from-place">` + PROVINCE[element.originFrom].vi + `</p>
                <p class="text fixed-text">will isolate people come from</p>
                <p class="text destination-place">` + PROVINCE[element.destination].vi + `</p>
            </div>
            <div class="row reason-updated">
                ` + checkReasonUpdated(element.status, element.reasonUpdated) + `
            </div>
            <div class="row float-right date-created-block-qi">
                <div class="col">
                    <p class="text">Created At:</p>
                    <p class="text">` + element.createdAt + `</p>
                </div>
            </div>
        </div>
    </div>`;
}
// body.innerHTML +=

function returnEndDate(endDate) {
    if (endDate == null) {
        return ``;
    }
    return ` To ` + endDate;
}

function checkQuarantineInformationStatus(status = 'NEW') {
    if (isUpdatedStatus(status)) {
        return `<p class="text" style="color:red;font-size:13px;">` + status + `</p>`;
    }
    return ``;
}

function checkReasonUpdated(status, reasonUpdated) {
    if (isUpdatedStatus(status)) {
        return `<p class="text">Reason Updated: </p>
                <p class="text">` + reasonUpdated + `</p>`;
    }
    return ``;
}

function isUpdatedStatus(status) {
    if (status == 'UPDATED') {
        return true;
    }
    return false;
}

function displayPagination(totalPage) {
    pagination.innerHTML +=
        `
    <li class="page-item" id="previous">
        <a class="page-link" href="#" aria-label="Previous" id="previous-item">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    ` + displayPageNumber(totalPage) + `
    <li class="page-item" id="next">
        <a class="page-link" href="#" aria-label="Next" id="next-item">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
    `;
}

function displayPageNumber(totalPage) {
    let pages = `<li class="page-item" id="page-item-1"><a class="page-link" href="#" id="page-1">1</a></li>`;
    for (let i = 2; i <= totalPage; i++) {
        pages += `<li class="page-item" id="page-item-` + i + `"><a class="page-link" href="#" id="page-` + i + `">` + i + `</a></li>`;
    }
    return pages;
}

function loadEventListeners(quarantineInformationList) {
    // pagination items listener
    addPaginationItemsListener();
    // delete buttons listener
    addDeleteButtonsListener();

    loadUpdateModal();
    loadOptionsOfSelects();
    // update buttons listener
    addUpdateButtonsListener(quarantineInformationList);
}

function addPaginationItemsListener() {
    var pageLinks = document.getElementsByClassName('page-link');
    for (var i = 0; i < pageLinks.length; i++) {
        let pageLinkId = pageLinks[i].id;
        console.log('pageLinkId ' + pageLinkId);
        let pageNumber = spliterator(pageLinkId)[1];
        if (Number.isNaN(Number(pageNumber))) {
            switch (pageLinkId) {
                case 'previous-item': {
                    var previousButton = document.getElementById('previous-item');
                    previousButton.addEventListener('click', function (event) {
                        event.preventDefault();
                        var previousPage = Number(currentPageOfAPI) - 1;
                        console.log('previous item, current page of API: ' + currentPageOfAPI + 'previousPage: ' + previousPage);
                        sessionStorage.setItem("currentPage", previousPage);
                        location.reload();
                    })
                    break;
                }
                case 'next-item': {
                    var nextButton = document.getElementById('next-item');
                    nextButton.addEventListener('click', function (event) {
                        event.preventDefault();
                        var nextPage = Number(currentPageOfAPI) + 1;
                        console.log('next item, current page of API: ' + currentPageOfAPI + ' nextPage: ' + nextPage);
                        sessionStorage.setItem("currentPage", nextPage);
                        location.reload();
                    })
                    break;
                }
            }
        } else {
            let pageItem = document.getElementById('page-' + pageNumber);
            pageItem.addEventListener('click', function () {
                console.log('clicked ');
                currentPageOfAPI = Number(pageNumber) - 1;
                sessionStorage.setItem("currentPage", currentPageOfAPI);
                location.reload();
            })
        }
    }
}

function addDeleteButtonsListener() {
    var deleteButtons = content.getElementsByClassName('delete-btn');
    for (var i = 0; i < deleteButtons.length; i++) {
        let deleteButtonId = spliterator(deleteButtons[i].id)[1];

        deleteButtons[i].addEventListener('click', function (event) {
            event.preventDefault();
            // add loader to delete icon on click
            console.log(deleteButtonId);
            var deleteLoader = document.createElement('em');
            deleteLoader.setAttribute('class', 'fa fa-spinner fa-spin');
            var deleteButtonIcon = document.getElementById('delete-' + deleteButtonId);
            deleteButtonIcon.replaceChild(deleteLoader, deleteButtonIcon.childNodes[0]);

            // call api to delete qi block
            xhr.open('DELETE', DOMAIN + QI_PATH + '/' + deleteButtonId, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.onreadystatechange = function (e) {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.response);
                    console.log(response);
                    // delete html div
                    var deleteBlock = document.getElementById(deleteButtonId);
                    deleteBlock.remove();
                    alert(response.message);
                    // if length of list item = 0 => move on to previous page
                    if (deleteButtons.length == 0) {
                        var previousPage = Number(currentPageOfAPI) - 1;
                        sessionStorage.setItem("currentPage", previousPage);
                        location.reload();
                    }
                } else if (this.status == 401 || this.status == 400) {
                    console.log(this.status);
                    alert("Technical error");
                    return;
                }
            }
            xhr.send();
        })
    }
}

function addUpdateButtonsListener(quarantineInformationList) {
    var updateButtons = document.getElementsByClassName('update-btn');
    for (var i = 0; i < updateButtons.length; i++) {
        let updateButtonId = spliterator(updateButtons[i].id)[1];

        var updateButton = document.getElementById('update-' + updateButtonId);
        updateButton.addEventListener('click', function () {
            // display data of get query to update from
            var fromProvince = document.getElementById('from');
            var destination = document.getElementById('destination');
            var startDate = document.getElementById('start-date');
            var endDate = document.getElementById('end-date');
            var reasonUpdated = document.getElementById('reason-updated');
            var error = document.getElementById('error-msg');
            error.innerText = '';

            console.log("clicked updateButton " + updateButtonId);
            quarantineInformationList.forEach(qi => {
                if (qi.id == updateButtonId) {
                    fromProvince.value = qi.originFrom;
                    destination.value = qi.destination;
                    startDate.value = reformatDate(qi.startAt);
                    endDate.value = reformatDate(qi.endAt);
                    reasonUpdated.value = qi.reasonUpdated;
                }
            })

            let updateQI = document.getElementById('update-qi-btn');
            updateQI.addEventListener('click', function () {
                var loader = document.getElementById('loader-icon');
                loader.setAttribute('class', 'fa fa-spinner fa-spin');
                // catch data and validate 
                var originPlace = fromProvince.value;
                var destinationPlace = destination.value;
                var endDateValue = endDate.value;
                var reasonUpdatedValue = reasonUpdated.value;
                console.log(originPlace);
                console.log(destinationPlace);
                console.log(endDateValue);
                console.log(reasonUpdatedValue);
                // validate form: false = error
                if (!validateUpdateForm(endDateValue, reasonUpdatedValue, originPlace, 
                    destinationPlace, startDate, error, loader)) {
                        console.log("error: invalid input");
                        return;
                }

                const data = JSON.stringify({
                    originFrom: originPlace,
                    destination: destinationPlace,
                    endAt: reformatDate(endDateValue),
                    reasonUpdated: reasonUpdatedValue
                });
                console.log(data);

                xhr.open('PUT', DOMAIN + QI_PATH + '/' + updateButtonId, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                xhr.onreadystatechange = function (e) {
                    if (this.readyState == 4 && this.status == 200) {
                        let response = JSON.parse(this.response);
                        console.log(response);
                        alert("Update successfully");
                        location.reload();
                    } else if (this.status == 401) {
                        console.log(this.status);
                        alert("Unauthorize error");
                        return;
                    } else if (this.status == 400) {
                        console.log(this.status);
                        alert("Bad request");
                        return;
                    } else if (this.status == 500) {
                        console.log(this.status);
                        alert("Technical error");
                        return;
                    }
                };
                xhr.send(data);
            });
        })
    }
}

function validateUpdateForm(endDateValue, reasonUpdatedValue, originPlace, destinationPlace, startDate, error, loader) {
    if (isEmpty(endDateValue) || isEmpty(reasonUpdatedValue)) {
        error.innerText = 'End date/reason update can not empty';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return false;
    }
    if (reasonUpdatedValue != null && reasonUpdatedValue.length < 8) {
        error.innerText = 'Reason Update >= 8 characters';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return false;
    }
    if (originPlace == destinationPlace) {
        error.innerText = 'From province and destination can not be the same';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return false;
    }
    if (startDate.value > endDateValue) {
        error.innerText = 'End date must greater than start date';
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return false;
    }
    return true;
}

function loadUpdateModal() {
    var updateModal = document.getElementById('update-modal');
    updateModal.innerHTML +=
        `
    <div class="modal" id="updateQIModal" tabindex="-1" role="dialog" aria-labelledby="updateQIModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateQIModalLabel">Update Quarantine Information Form</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm">
                                    <label for="From">From:</label>
                                </div>
                                <div class="col-sm">
                                    <select name="from" id="from">
                                    </select>
                                </div>
                            </div>
                            <!--End of .row-->
                            <div class="row">
                                <div class="col-sm">
                                    <label for="">Destination will be quarantine:</label>
                                </div>
                                <div class="col-sm">
                                    <select name="Destination will be quarantine" id="destination">
                                    </select>
                                </div>
                            </div>
                            <!--End of .row-->
                            <div class="row">
                                <div class="col-sm">
                                    <label for="Start Date">Start Date:</label>
                                </div>
                                <div class="col-sm">
                                    <input type="date" disabled="disabled" id="start-date" name="Start Date">
                                </div>
                            </div>
                            <!--End of .row-->
                            <div class="row">
                                <div class="col-sm">
                                    <label for="End Date">End Date:</label>
                                </div>
                                <div class="col-sm">
                                    <input type="date" id="end-date" name="End Date">
                                </div>
                            </div>
                            <!--End of .row-->
                            <div class="row">
                                <div class="col-sm">
                                    <label for="Reason Update">Reason Update:</label>
                                </div>
                                <div class="col-sm">
                                    <textarea class="form-control" id="reason-updated"></textarea>
                                </div>
                            </div>
                            <!--End of .row-->
                            <pre id="error-msg"></pre>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="update-qi-btn">Update
                        <em id='loader-icon'></em>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function loadOptionsOfSelects() {
    var fromProvince = document.getElementById('from');
    var destination = document.getElementById('destination');
    // Add options to selects
    for (const key of Object.keys(PROVINCE)) {
        addOptionsToSelectFrom(fromProvince, key);
        addOptionsToSelectDestination(destination, key);
    }
}

function addOptionsToSelectFrom(fromProvince, key) {
    var option = document.createElement("option");
    option.text = PROVINCE[key].vi;
    option.setAttribute('value', PROVINCE[key].enum);
    fromProvince.add(option, fromProvince[-1]);
}

function addOptionsToSelectDestination(destination, key) {
    var option = document.createElement("option");
    option.text = PROVINCE[key].vi;
    option.setAttribute('value', PROVINCE[key].enum);
    destination.add(option, destination[-1]);
}

function spliterator(input) {
    return input.split('-');
}

function loadPaginationIndexActive(currentPageIndexOfAPI, totalPage) {
    if (currentPageIndexOfAPI == null) {
        currentPageIndexOfAPI = 0;
    }
    var currentPageOfPagination = Number(currentPageIndexOfAPI) + 1;
    if (currentPageOfPagination == 1) {
        var previous = document.getElementById('previous');
        previous.classList.add('disabled');
    } else if (currentPageOfPagination == totalPage) {
        var next = document.getElementById('next');
        next.classList.add('disabled');
    }

    var paginationIndex = document.getElementById('page-item-' + currentPageOfPagination);
    paginationIndex.classList.add('active');
}

function removeLoaderAfterLoadedBody() {
    var loader = document.getElementById('loader');
    loader.remove();
}




// Detect click on html element
// document.onclick= function(event) {
//     if (event===undefined) event= window.event;
//     var target= 'target' in event? event.target : event.srcElement;
//     console.log('clicked on '+target.tagName);
// };