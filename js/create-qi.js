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


function addOptionsToSelect() {
    for (const key of Object.keys(PROVINCE)) {
        // console.log(key, PROVINCE[key]);
        addOptionsToSelectFrom(key);
        addOptionsToSelectDestination(key);
    }
}

function addOptionsToSelectFrom(key) {
    var option = document.createElement("option");
    option.text = PROVINCE[key].vi;
    option.setAttribute('value', PROVINCE[key].enum);
    var fromProvince = document.getElementById('from');
    fromProvince.add(option, fromProvince[-1]);
}

function addOptionsToSelectDestination(key) {
    var option = document.createElement("option");
    option.text = PROVINCE[key].vi;
    option.setAttribute('value', PROVINCE[key].enum);
    var destination = document.getElementById('destination');
    destination.add(option, destination[-1]);
}

// onclick navbar

// validate create qi
// can not same province
// start date >= now


