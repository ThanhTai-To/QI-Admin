const DOMAIN = 'https://qi-management.herokuapp.com/admin';
const CREATE_QI_PATH = '/quarantine-information';
const token = sessionStorage.getItem("token");
console.log(token);

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

var xhr = new XMLHttpRequest();
var fromProvince = document.getElementById('from');
var destination = document.getElementById('destination');
var createQI = document.getElementById('create-qi-btn');
var error = document.getElementById('error-msg');
var loader = document.getElementById("loader-icon");

let response;


function addOptionsToSelect() {
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



createQI.addEventListener('click', function(event) {
    event.preventDefault();
    // Add loader
    loader.setAttribute('class', 'fa fa-spinner fa-spin');
    error.innerText = '';
    var originPlace = from.value;
    var destinationPlace = destination.value;
    var startDate = document.getElementById('start-date').value;
    var endDate = document.getElementById('end-date').value;
    console.log(originPlace);
    console.log(destinationPlace);
    console.log(startDate);
    console.log(endDate);

    if (isEmpty(originPlace) || isEmpty(destinationPlace) 
        || isEmpty(startDate)) {
        error.innerText = 'Start date can not empty';
        // remove loader
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return;
    }

    if (originPlace == destinationPlace) {
        error.innerText = 'From province and destination can not be the same';
        // remove loader
        loader.removeAttribute('class', 'fa fa-spinner fa-spin');
        return;
    }
    
    if (!isEmpty(endDate)) {
        if (startDate > endDate) {
            error.innerText = 'End date must greater than start date';
            // remove loader
            loader.removeAttribute('class', 'fa fa-spinner fa-spin');
            return;
        }
    } else if (isEmpty(endDate)) {endDate = null;}

    const data = JSON.stringify({
        originFrom: originPlace,
        destination: destinationPlace,
        startAt: reformatDate(startDate),
        endAt: reformatDate(endDate)
    });

    xhr.open('POST',  DOMAIN + CREATE_QI_PATH, true);
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
    console.log("end");
    


})

function isEmpty(input) {
    if (input.length == 0) {
        return true;
    }
    return false;
} 

function reformatDate(dateStr) {
    if(dateStr.length != 0) {
        dArr = dateStr.split("-");  // ex input "2010-01-18"
        console.log(dArr);
        return dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]; //ex out: "18/01/10"
    }
}
// onclick navbar



