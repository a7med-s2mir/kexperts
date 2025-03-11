let selectedCourse = 0;
let selectedAccommodation = 0;
let currentSelectedCourse = null;


document.querySelector('.btn-danger').addEventListener('click', function() {
    // جمع البيانات من النموذج
    let course = document.getElementById('course-input').value;
    let startDate = document.getElementById('start-date').value; // تاريخ بداية الكورس
    let weeks = document.getElementById('weeks').value;
    let accommodation = document.getElementById('accommodation-input').value;
    let airport = document.getElementById('airport').value;
    let insurance = document.getElementById('insurance').value;

    // حفظ البيانات في localStorage
    localStorage.setItem('selectedCourse', course);
    localStorage.setItem('selectedStartDate', startDate); // حفظ تاريخ بداية الكورس
    localStorage.setItem('selectedWeeks', weeks);
    localStorage.setItem('selectedAccommodation', accommodation);
    localStorage.setItem('selectedAirport', airport);
    localStorage.setItem('selectedInsurance', insurance);

    // تحويل المستخدم لصفحة التسجيل
    window.location.href = "student-register.html";
});
function openNav(type) {
    let panelId = type === 'course' ? 'nav-panel-course' : 'nav-panel-accommodation';
    document.getElementById(panelId).classList.add('active');
    document.getElementById(panelId).style.overflowY = 'scroll';
    document.getElementById(panelId).style.maxHeight = '800px';
}

function closeNav(type) {
    let panelId = type === 'course' ? 'nav-panel-course' : 'nav-panel-accommodation';
    document.getElementById(panelId).classList.remove('active');
}

function selectOption(type, element) {
let name = element.querySelector('h5').innerText;
let price = parseInt(element.querySelector('.fw-bold').innerText.replace(/,/g, ''));

if (type === 'course') {
    document.getElementById('course-input').value = name;
    selectedCourse = price;
    
    if (currentSelectedCourse) {
        currentSelectedCourse.classList.remove('border-primary', 'border-2');
        currentSelectedCourse.querySelector('button').classList.replace('btn-primary', 'btn-outline-danger');
        currentSelectedCourse.querySelector('button').innerText = 'اختر هذا الكورس';
    }
    
    element.classList.add('border-primary', 'border-2');
    element.querySelector('button').classList.replace('btn-outline-danger', 'btn-primary');
    element.querySelector('button').innerText = 'خيارك الحالي';
    currentSelectedCourse = element;
} else {
    document.getElementById('accommodation-input').value = name;
    selectedAccommodation = price;
}
closeNav(type);
calculateTotal();
}

document.querySelectorAll('.course-option').forEach(option => {
    option.addEventListener('click', function () {
        selectOption('course', this);
    });
});

function calculateTotal() {
    let weeks = parseInt(document.getElementById('weeks').value);
    let airport = parseInt(document.getElementById('airport').value);
    let insurance = parseInt(document.getElementById('insurance').value);
    let registrationFee = 294;
    let bookFee = 34;
    
    let totalCost = (selectedCourse * weeks) + selectedAccommodation + airport + insurance + registrationFee + bookFee;
    
    document.getElementById('final-cost').innerText = totalCost;
}
// إضافة خيارات الأسابيع باستخدام حلقة for
const weeksSelect = document.getElementById('weeks');

for (let i = 1; i <= 48; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} أسبوع`;
    weeksSelect.appendChild(option);
}
document.querySelectorAll('.accommodation-option').forEach(option => {
option.addEventListener('click', function () {
selectOption('accommodation', this);
calculateTotal(); // حساب السعر فور اختيار السكن
});
});

function selectOption(type, element) {
let name = element.querySelector('h5').innerText;
let price = parseInt(element.querySelector('.fw-bold').innerText.replace(/,/g, ''));

if (type === 'course') {
document.getElementById('course-input').value = name;
selectedCourse = price;

if (currentSelectedCourse) {
    currentSelectedCourse.classList.remove('border-primary', 'border-2');
    currentSelectedCourse.querySelector('button').classList.replace('btn-primary', 'btn-outline-danger');
    currentSelectedCourse.querySelector('button').innerText = 'اختر هذا الكورس';
}

element.classList.add('border-primary', 'border-2');
element.querySelector('button').classList.replace('btn-outline-danger', 'btn-primary');
element.querySelector('button').innerText = 'خيارك الحالي';
currentSelectedCourse = element;
} else {
document.getElementById('accommodation-input').value = name;
selectedAccommodation = price;
}

closeNav(type);
calculateTotal(); // تحديث التكلفة بعد اختيار السكن
}
function noAccommodation() {
document.getElementById('accommodation-input').value = 'لا أحتاج لخدمة سكن';
selectedAccommodation = 0;
closeNav('accommodation');
calculateTotal();
}

function toggleText() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btn = document.querySelector(".toggle-button");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        btn.textContent = "تفاصيل اضافية";
    } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        btn.textContent = "تفاصيل اقل";
    }
}
function makeCall() {
    var phoneNumber = "0500552934";  // الرقم الذي سيتم الاتصال به
    window.location.href = "tel:" + phoneNumber;
}
document.addEventListener("DOMContentLoaded", function() {
// تحديد الكورس الافتراضي عند تحميل الصفحة
const defaultCoursePrice = 2550; // السعر الافتراضي للكورس
const registrationFee = 294; // رسوم التسجيل
const bookFee = 34; // رسوم الكتب

// تحديد السعر الإجمالي عند تحميل الصفحة
updateTotalCost(defaultCoursePrice);

// عند تغيير الكورس أو أي خيار آخر يتم حساب التكلفة
document.getElementById('course-input').addEventListener('click', function() {
openNav('course');  // فتح نافذة اختيار الكورس
});

document.getElementById('weeks').addEventListener('change', calculateTotal);
document.getElementById('airport').addEventListener('change', calculateTotal);
document.getElementById('insurance').addEventListener('change', calculateTotal);
});

function calculateTotal() {
const coursePrice = getCoursePrice(); // استرجاع السعر بناءً على الكورس المحدد
const weeks = parseInt(document.getElementById('weeks').value) || 1; // عدد الأسابيع
const accommodationPrice = getAccommodationPrice(); // استرجاع السعر بناءً على السكن المحدد
const airportPrice = parseInt(document.getElementById('airport').value) || 0; // سعر استقبال المطار
const insurancePrice = parseInt(document.getElementById('insurance').value) || 0; // سعر التأمين الصحي

const registrationFee = 375; // رسوم التسجيل
const bookFee = 500; // رسوم الكتب

// حساب التكلفة الإجمالية
let totalCost = (coursePrice * weeks) + accommodationPrice + airportPrice + insurancePrice + registrationFee + bookFee;

// تحديث التكلفة في الصفحة
updateTotalCost(totalCost);
}

function getCoursePrice() {
// استرجاع السعر بناءً على الكورس المحدد
if (document.getElementById('course-input').value === "لغة إنجليزية عام - صباحي") {
return 2550;
}
if (document.getElementById('course-input').value === "لغة إنجليزية مكثف - صباحي") {
return 3100;
}
if (document.getElementById('course-input').value === "دورة تحضيرية ايلتس - صباحي") {
return 3500;
}
return 0;
}

function getAccommodationPrice() {
// استرجاع السعر بناءً على السكن المحدد
if (document.getElementById('accommodation-input').value === "سكن مع عائلة - غرفة فردية - الإفطار والعشاء") {
return 1150;
}
if (document.getElementById('accommodation-input').value === "سكن مع عائلة - مشترك - الإفطار والعشاء") {
return 1000;
}
if (document.getElementById('accommodation-input').value === "سكن جامعي - فردية - الإفطار والعشاء") {
return 1150;
}
if (document.getElementById('accommodation-input').value === "سكن جامعي - مشترك - الإفطار والعشاء") {
return 850;
}
return 0;
}

function updateTotalCost(totalCost) {
// تحديث التكلفة الإجمالية في الصفحة
document.getElementById('final-cost').textContent = totalCost;
document.getElementById('registration-fee').textContent = "375 ريال سعودي";
document.getElementById('book-fee').textContent = "500 ريال سعودي";
}

function openWhatsApp() {
    let phoneNumber = "966500552934"; // رقم الهاتف بدون علامة "+"
    let message = "مرحبًا، أريد الحجز عبر الهاتف."; // الرسالة الافتراضية
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank'); // فتح الرابط في نافذة جديدة
}

