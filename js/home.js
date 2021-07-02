const DOMAIN = 'https://qi-management.herokuapp.com/admin';
const GET_QI_PATH = '/quarantine-information';
const token = sessionStorage.getItem('token');
sessionStorage.setItem('token', token);
console.log(token);
let currentPageOfAPI = sessionStorage.getItem('currentPage');
console.log('currentPage of API: ' + currentPageOfAPI);

// https://vi.wikipedia.org/wiki/T%E1%BB%89nh_th%C3%A0nh_Vi%E1%BB%87t_Nam
const PROVINCE = {
    'AN_GIANG' : {'vi': 'An Giang', 'enum': "AN_GIANG"}, 
    'BA_RIA_VUNG_TAU': {'vi': 'Bà Rịa – Vũng Tàu', 'enum': 'BA_RIA_VUNG_TAU'},
    'BAC_LIEU': {'vi':'Bạc Liêu', 'enum': 'BAC_LIEU'},
    'BAC_GIANG': {'vi':'Bắc Giang', 'enum': 'BAC_GIANG'},
    'BAC_KAN': {'vi':'Bắc Kạn', 'enum': 'BAC_KAN'},
    'BAC_NINH': {'vi':'Bắc Ninh', 'enum': 'BAC_NINH'},
    'BEN_TRE': {'vi':'Bến Tre', 'enum': 'BEN_TRE'},
    'BINH_DUONG': {'vi':'Bình Dương', 'enum': 'BINH_DUONG'},
    'BINH_DINH': {'vi':'Bình Định', 'enum': 'BINH_DINH'},
    'BINH_PHUOC': {'vi':'Bình Phước', 'enum': 'BINH_PHUOC'},
    'BINH_THUAN': {'vi':'Bình Thuận', 'enum': 'BINH_THUAN'},
    'CA_MAU': {'vi':'Cà Mau', 'enum': 'CA_MAU'},
    'CAO_BANG': {'vi':'Cao Bằng', 'enum': 'CAO_BANG'},
    'CAN_THO': {'vi':'Cần Thơ', 'enum': 'CAN_THO'},
    'DA_NANG': {'vi':'Đà Nẵng', 'enum': 'DA_NANG'},
    'DAK_LAK': {'vi':'Đắk Lắk', 'enum': 'DAK_LAK'},
    'DAK_NONG': {'vi':'Đắk Nông', 'enum': 'DAK_NONG'},
    'DIEN_BIEN': {'vi':'Điện Biên', 'enum': 'DIEN_BIEN'},
    'DONG_NAI': {'vi':'Đồng Nai', 'enum': 'DONG_NAI'},
    'DONG_THAP': {'vi':'Đồng Tháp', 'enum': 'DONG_THAP'},
    'GIA_LAI': {'vi':'Gia Lai', 'enum': 'GIA_LAI'},
    'HA_GIANG': {'vi':'Hà Giang', 'enum': 'HA_GIANG'},
    'HA_NAM': {'vi':'Hà Nam', 'enum': 'HA_NAM'},
    'HA_NOI': {'vi':'Hà Nội', 'enum': 'HA_NOI'},
    'HA_TINH': {'vi':'Hà Tĩnh', 'enum': 'HA_TINH'},
    'HAI_DUONG': {'vi':'Hải Dương', 'enum': 'HAI_DUONG'},
    'HAI_PHONG': {'vi':'Hải Phòng', 'enum': 'HAI_PHONG'},
    'HAU_GIANG': {'vi':'Hậu Giang', 'enum': 'HAU_GIANG'},
    'HOA_BINH': {'vi':'Hòa Bình', 'enum': 'HOA_BINH'},
    'HO_CHI_MINH': {'vi':'Hồ Chí Minh', 'enum': 'HO_CHI_MINH'},
    'HUNG_YEN': {'vi':'Hưng Yên', 'enum': 'HUNG_YEN'},
    'KHANH_HOA': {'vi':'Khánh Hòa', 'enum': 'KHANH_HOA'},
    'KIEN_GIANG': {'vi':'Kiên Giang', 'enum': 'KIEN_GIANG'},
    'KON_TUM': {'vi':'Kon Tum', 'enum': 'KON_TUM'},
    'LAI_CHAU': {'vi':'Lai Châu', 'enum': 'LAI_CHAU'},
    'LAM_DONG': {'vi':'Lâm Đồng', 'enum': 'LAM_DONG'},
    'LANG_SON': {'vi':'Lạng Sơn', 'enum': 'LANG_SON'},
    'LAO_CAI': {'vi':'Lào Cai', 'enum': 'LAO_CAI'},
    'LONG_AN': {'vi':'Long An', 'enum': 'LONG_AN'},
    'NAM_DINH': {'vi':'Nam Định', 'enum': 'NAM_DINH'},
    'NGHE_AN': {'vi':'Nghệ An', 'enum': 'NGHE_AN'},
    'NINH_BINH': {'vi':'Ninh Bình', 'enum': 'NINH_BINH'},
    'NINH_THUAN': {'vi':'Ninh Thuận', 'enum': 'NINH_THUAN'},
    'PHU_THO': {'vi':'Phú Thọ', 'enum': 'PHU_THO'},
    'PHU_YEN': {'vi':'Phú Yên', 'enum': 'PHU_YEN'},
    'QUANG_BINH': {'vi':'Quảng Bình', 'enum': 'QUANG_BINH'},
    'QUANG_NAM': {'vi':'Quảng Nam', 'enum': 'QUANG_NAM'},
    'QUANG_NGAI': {'vi':'Quảng Ngãi', 'enum': 'QUANG_NGAI'},
    'QUANG_NINH': {'vi':'Quảng Ninh', 'enum': 'QUANG_NINH'},
    'QUANG_TRI': {'vi':'Quảng Trị', 'enum': 'QUANG_TRI'},
    'SOC_TRANG': {'vi':'Sóc Trăng', 'enum': 'SOC_TRANG'},
    'SON_LA': {'vi':'Sơn La', 'enum': 'SON_LA'},
    'TAY_NINH': {'vi':'Tây Ninh', 'enum': 'TAY_NINH'},
    'THAI_BINH': {'vi':'Thái Bình', 'enum': 'THAI_BINH'},
    'THAI_NGUYEN': {'vi':'Thái Nguyên', 'enum': 'THAI_NGUYEN'},
    'THANH_HOA': {'vi':'Thanh Hóa', 'enum': 'THANH_HOA'},
    'THUA_THIEN_HUE': {'vi':'Thừa Thiên Huế', 'enum': 'THUA_THIEN_HUE'},
    'TIEN_GIANG': {'vi':'Tiền Giang', 'enum': 'TIEN_GIANG'},
    'TRA_VINH': {'vi':'Trà Vinh', 'enum': 'TRA_VINH'},
    'TUYEN_QUANG': {'vi':'Tuyên Quang', 'enum': 'TUYEN_QUANG'},
    'VINH_LONG': {'vi':'Vĩnh Long', 'enum': 'VINH_LONG'},
    'VINH_PHUC': {'vi':'Vĩnh Phúc', 'enum': 'VINH_PHUC'},
    'YEN_BAI': {'vi':'Yên Bái', 'enum': 'YEN_BAI'}
};

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
    if (page==null) {
        page = 0;
    }
    let params, response;
    params = '?page=' + page;
    console.log('params: ' + params);

    xhr.open('GET',  DOMAIN + GET_QI_PATH + params, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) { 
            response = JSON.parse(this.response);
            console.log(response);
            displayPagination(response.totalPage);
            response.quarantineInformationList.forEach(element => displayBlockQuarantineInformation(element));
            loadEventListeners();
            loadPaginationIndexActive(currentPageOfAPI, response.totalPage);
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
    console.log("End of request get");

}


function displayBlockQuarantineInformation(element) {
    content.innerHTML += 
    `<div class="row block-qi" id="` + element.id + `">
        <div class="container inside-block-qi">
            <div class="row date-valid-block-qi">
                <div class="col-8 date-text">
                    <p class="text">From ` + element.startAt + ` To ` + element.endAt + `, this information will valid</p>
                    ` + checkQuarantineInformationStatus(element.status) + `
                </div>
                <div class="col-4 utils">
                    <button class="utils-icon float-right" id="delete-` + element.id + `"><i class="fa fa-close"></i></button>
                    <button class="utils-icon float-right" id="update-` + element.id + `"><i class="fa fa-pencil"></i></button>
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


function checkQuarantineInformationStatus(status='NEW') {
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

function loadEventListeners() {
    // pagination listeners
    var pageLinks = pagination.getElementsByClassName('page-link');
    for (let pageLink of pageLinks) {
        pageLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('clicked page: ' + pageLink.id);
            let pageNumber = spliterator(pageLink.id)[1];

            if (Number.isNaN(Number(pageNumber))) {
                switch (pageLink.id) {
                    case 'previous-item': {
                        var previousPage = Number(currentPageOfAPI) - 1;
                        console.log('previous item, current page of API: ' + currentPageOfAPI + 'previousPage: ' + previousPage);
                        sessionStorage.setItem("currentPage", previousPage);
                        location.reload();
                        break;
                    }
                    case 'next-item': {
                        var nextPage = Number(currentPageOfAPI) + 1;
                        console.log('next item, current page of API: ' + currentPageOfAPI + ' nextPage: ' + nextPage);
                        sessionStorage.setItem("currentPage", nextPage);
                        location.reload();
                        break;
                    }
                }
            } else {
                let currentPageOfPagination = Number(pageNumber);
                currentPageOfAPI = currentPageOfPagination - 1;
                sessionStorage.setItem("currentPage", currentPageOfAPI);
                location.reload();// location.replace('../pages/home.html'); refresh page to reload body              
            }
        })
    }    
}

function spliterator(input) {
    return input.split('-');
}

function loadPaginationIndexActive(currentPageIndexOfAPI, totalPage) {
    console.log('loadPaginationIndexActive = ' + currentPageIndexOfAPI);
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


// onclick navbar
homeNav.addEventListener('click', function(event) {
    event.preventDefault();
    createQINav.removeAttribute('class', 'active')
    homeNav.setAttribute('class', 'active');
    location.replace('../pages/home.html');
})
createQINav.addEventListener('click', function(event) {
    event.preventDefault();
    homeNav.removeAttribute('class', 'active')
    createQINav.setAttribute('class', 'active');
    location.replace('../pages/create-qi.html');
})


// Detect click on html element
// document.onclick= function(event) {
//     if (event===undefined) event= window.event;
//     var target= 'target' in event? event.target : event.srcElement;
//     console.log('clicked on '+target.tagName);
// };






