//search section
//initial flatpickr calendar 
document.addEventListener('DOMContentLoaded',()=>{
    const today = new Date();
    //tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    //transfer date to year-month-day 
    function convertDate(date){
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    const todayDate = convertDate(today);
    const tomorrowDate = convertDate(tomorrow);
     document.querySelector("#check-in .value").textContent = todayDate;
      document.querySelector("#check-out .value").textContent = tomorrowDate;
    //check in 
    flatpickr("#checkin-input",{
        dateFormat: "Y-m-d",
        defaultDate:todayDate,
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance){
            document.querySelector("#check-in .value").textContent = dateStr; 
            // Update the minimum date for checkout calendar
            if (checkoutPicker) {
            checkoutPicker.set('minDate', dateStr);
    
        // If the selected checkout date is earlier than the checkin date, automatically adjust it to the checkin date
        const currentCheckout = checkoutPicker.selectedDates[0];
        if (currentCheckout && currentCheckout < new Date(dateStr)) {
            checkoutPicker.setDate(dateStr);
            document.querySelector("#check-out .value").textContent = dateStr;
    }
}
        }
    }); 
    //check out
    let checkoutPicker = flatpickr("#checkout-input",{
        dateFormat: "Y-m-d",
        defaultDate: tomorrowDate,
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance){
            document.querySelector("#check-out .value").textContent = dateStr; 
        }
    });
    //trigger check-in 
    document.querySelector("#check-in .search-item").addEventListener("click",()=>{
        document.querySelector("#checkin-input")._flatpickr.open();
    })
    //trigger check-out
     document.querySelector("#check-out .search-item").addEventListener("click",()=>{
        document.querySelector("#checkout-input")._flatpickr.open();
    })
})

//modify the number of rooms
//add 
const roomMax = 5;
const roomMin = 2;
let roomNum = 1;
document.querySelector(".room-plus").addEventListener("click",(e)=>{
     e.stopPropagation(); 
    if(roomNum <= roomMax){
        roomNum++;
        document.querySelector(".inner-room-number").textContent = roomNum;
        document.querySelector(".error").textContent = "";
    } else{
        document.querySelector(".error").textContent = "max 6 rooms";
    }
})
//subtract
document.querySelector(".room-minus").addEventListener("click",(e)=>{
     e.stopPropagation(); 
    if(roomNum >= roomMin){
        roomNum--;
        document.querySelector(".inner-room-number").textContent = roomNum;
        document.querySelector(".error").textContent = "";
    } else{
        document.querySelector(".error").textContent = "Min 1 room";
    }
})  
document.querySelector(".rooms-btn").addEventListener("click",()=>{
    document.querySelector("#rooms .value").textContent = roomNum;
    document.querySelector(".error").textContent = "";
})

//modify the number of guests
const maxAdults = 7;
const maxChildren = 5;
const minAdults = 2;
const minChildren = 1;
let adultNum = 1;
let childNum = 1;
//adults
//add
document.querySelector(".adult-plus").addEventListener("click",(e)=>{
     e.stopPropagation(); 
    if(adultNum <= maxAdults){
        adultNum++;
        document.querySelector(".adult-num").textContent = adultNum;
        document.querySelector(".error-adult").textContent = "";
    } else{
        document.querySelector(".error-adult").textContent = "max 8 adults";
    }
})
//subtract
document.querySelector(".adult-minus").addEventListener("click",(e)=>{
     e.stopPropagation(); 
    if(adultNum >= minAdults){
        adultNum--;
        document.querySelector(".adult-num").textContent = adultNum;
        document.querySelector(".error-adult").textContent = "";
    } else{
        document.querySelector(".error-adult").textContent = "Min 1 adult";
    }
})
//children
//add
document.querySelector(".child-plus").addEventListener("click",(e)=>{
     e.stopPropagation(); 
    if(childNum <= maxChildren){
        childNum++;
        document.querySelector(".child-num").textContent = childNum;
        document.querySelector(".error-child").textContent = "";
    } else{
        document.querySelector(".error-child").textContent = "Max 6 children";
    }
})
//subtract
document.querySelector(".child-minus").addEventListener("click",(e)=>{
     e.stopPropagation(); 
    if(childNum >= minChildren){
        childNum--;
        document.querySelector(".child-num").textContent = childNum;
        document.querySelector(".error-child").textContent = "";
    } else{
        document.querySelector(".error-child").textContent = "Min 0 child";
    }
})

document.querySelector(".guests-btn").addEventListener("click",()=>{
    document.querySelector("#guests .value").textContent = adultNum + childNum;
    document.querySelector(".error-adult").textContent = "";
    document.querySelector(".error-child").textContent = "";

})

//clicking search button will redirect to room page and dispaly available rooms
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener("click",()=>{
    window.location.href="pages/room-selection.html?filter=available#roomsContainer"
})

    
//fixed sidebar
//display sidebar menu
const mediaList = document.querySelector(".media-list");
const fixedBtn = document.querySelector(".fixed-btn");
const closeBtn = document.querySelector(".close-btn");
const fixedsidebar = document.querySelector(".fixed-sidebar");
fixedBtn.addEventListener('click',() => {
    mediaList.classList.remove("d-none");
})
//close sidebar
closeBtn.addEventListener('click',() => {
    fixedsidebar.classList.add("d-none");
})


//the products data of best seller
const rooms = [
    {
        "id": 10001,
        "title": "Standard Single Room",
        "image1": "img/roomtypes/1.jpg",
        "image2": "img/roomtypes/2.jpg",
        "image3": "img/roomtypes/3.jpg",
        "price" : 200,
        "available": true,
        "area": 18,
        "bed": "1 single",
        "adults": 1,
        "children": 1,
        "description": "All of our standard sing room cover an area of 18 square metres,with a maximun capacity for one adult and one child under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
        "amenities": [
        "Bathroom amenities",
        "Bathrobe and slippers",
        "Free Wi-Fi"
        ]
    },
    {
        "id": 10002,
        "title": "Superior Single Room",
        "image1": "img/roomtypes/4.jpg",
        "image2": "img/roomtypes/5.jpg",
        "image3": "img/roomtypes/6.jpg",
        "price" : 300,
        "available": true,
        "area": 25,
        "bed": "1 single",
        "adults": 1,
        "children": 1,
        "description": "All of our superior sing room cover an area of 20 square metres,with a maximun capacity for one adult and one child under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
        "amenities": [
        "Bathroom amenities",
        "Bathrobe and slippers",
        "Free Wi-Fi"
        ]
    },
    {
        "id": 10003,
        "title": "Superior Twin Room",
        "image1": "img/roomtypes/7.jpg",
        "image2": "img/roomtypes/8.jpg",
        "image3": "img/roomtypes/9.jpg",
        "price" : 400,
        "available": true,
        "area": 25,
        "bed": "2 twin",
        "adults": 2 ,
        "children": 2,
        "description": "All of our superior twin room cover an area of 25 square metres,with a maximun capacity for two adults and two children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
        "amenities": [
        "Bathroom amenities",
        "Bathrobe and slippers",
        "Free Wi-Fi",
        "Magnifying mirror",
        "Television",
        "Professional hair dryer"
        ]
    },
    {
        "id": 10004,
        "title": "Superior Double Room",
        "image1": "img/roomtypes/10.jpg",
        "image2": "img/roomtypes/11.jpg",
        "image3": "img/roomtypes/12.jpg",
        "price" : 500,
        "available": true,
        "area": 25,
        "bed": "1 king",
        "adults": 2 ,
        "children": 1,
        "description": "All of our superior double room cover an area of 25 square metres,with a maximun capacity for two adults and two children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
        "amenities": [
        "Bathroom amenities",
        "Bathrobe and slippers",
        "Free Wi-Fi",
        "Magnifying mirror",
        "Television",
        "Professional hair dryer"
        ]
    },
    {
    "id": 10005,
    "title": "Deluxe Double Room",
    "image1": "img/roomtypes/13.jpg",
    "image2": "img/roomtypes/14.jpg",
    "image3": "img/roomtypes/15.jpg",
    "price" : 600,
    "available": true,
    "area": 30,
    "bed": "1 king",
    "adults": 2,
    "children": 1,
    "description": "All of our deluxe double room cover an area of 30 square metres,with a maximun capacity for two adults and one children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
    "amenities": [
      "Bathroom amenities",
      "Coffee and tea facilities",
      "Free Wi-Fi",
      "Magnifying mirror",
      "Television",
      "Professional hair dryer",
      "Mini bar",
      "Bathrobe and slippers"
    ]
  },
  {
    "id": 10006,
    "title": "Studio Twin Room",
    "image1": "img/roomtypes/16.jpg",
    "image2": "img/roomtypes/17.jpg",
    "image3": "img/roomtypes/18.jpg",
    "price" : 700,
    "available": true,
    "area": 38,
    "bed": "2 twin and 1 sofabed",
    "adults": 2,
    "children": 2,
    "description": "All of our studio twin room cover an area of 38 square metres,with a maximun capacity for two adults and two children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
    "amenities": [
      "Bathroom amenities",
      "Coffee and tea facilities",
      "Free Wi-Fi",
      "Magnifying mirror",
      "Television",
      "Professional hair dryer",
      "Kitchenette",
      "Microwave",
      "Refrigerator",
    ]
  },
  {
    "id": 10007,
    "title": "Studio Double Room",
    "image1": "img/roomtypes/19.jpg",
    "image2": "img/roomtypes/20.jpg",
    "image3": "img/roomtypes/21.jpg",
    "price" : 800,
    "available": true,
    "area": 36,
    "bed": "1 king and 1 sofabed",
    "adults": 2,
    "children": 2,
    "description": "All of our studio double room cover an area of 36 square metres,with a maximun capacity for two adults and two children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
    "amenities": [
      "Bathroom amenities",
      "Coffee and tea facilities",
      "Free Wi-Fi",
      "Magnifying mirror",
      "Television",
      "Professional hair dryer",
      "Kitchenette",
      "Microwave",
      "Refrigerator",
    ]
  },
   {
    "id": 10008,
    "title": "1 Bedroom Suite",
    "image1": "img/roomtypes/22.jpg",
    "image2": "img/roomtypes/23.jpg",
    "image3": "img/roomtypes/24.jpg",
    "price" : 900,
    "available": true,
    "area": 55,
    "bed": "1 super king and 1 sofabed and 1 single",
    "adults": 3,
    "children": 2,
    "description": "All of our 1 bedroom suite cover an area of 55 square metres,with a maximun capacity for three adults and two children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
    "amenities": [
      "Bathroom amenities",
      "Coffee and tea facilities",
      "Free Wi-Fi",
      "Magnifying mirror",
      "Television",
      "Professional hair dryer",
      "Bathrobe and slippers",
      "Kitchenette",
      "Separate living room",
      "Nespresso coffee machine",
      "Wine selection"
    ]
  },
    {
    "id": 10009,
    "title": "2 Bedroom Suite",
    "image1": "img/roomtypes/25.jpg",
    "image2": "img/roomtypes/26.jpg",
    "image3": "img/roomtypes/27.jpg",
    "price" : 1000,
    "available": true,
    "area": 90,
    "bed": "1 super king and 2 single and 1 sofabed",
    "adults": 4,
    "children": 2,
    "description": "All of our 2 bedroom suite cover an area of 90 square metres,with a maximun capacity for four adults and two children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
    "amenities": [
      "Bathroom amenities",
      "Coffee and tea facilities",
      "Free Wi-Fi",
      "Magnifying mirror",
      "Television",
      "Professional hair dryer",
      "Bathrobe and slippers",
      "Kitchenette",
      "Separate living room",
      "Nespresso coffee machine",
      "Wine selection"
    ]
  },{
     "id": 10010,
    "title": "Presidential Suite",
    "image1": "img/roomtypes/28.jpg",
    "image2": "img/roomtypes/29.jpg",
    "image3": "img/roomtypes/30.jpg",
    "price" : 1200,
    "available": true,
    "area": 140,
    "bed": "1 king and 2 single and 1 sofabed",
    "adults": 4,
    "children": 3,
    "description": "All of our presidential suite cover an area of 140 square metres,with a maximun capacity for four adults and three children under 10 years old and 10 inclusive,we offer comfortable service and modern facilities.The room is equipped with the following amenities.",
    "amenities": [
      "Bathroom amenities",
      "Coffee and tea facilities",
      "Free Wi-Fi",
      "Magnifying mirror",
      "Television",
      "Professional hair dryer",
      "Mini bar",
      "Bathrobe and slippers",
      "Living room",
      "Dining area",
      "Espresso machine",
      "Wine cooler",
      "Jacuzzi",
      "Butler service"
    ]
  }
]
//iconfont match the data of amenities
const iconwithamenities = {
      "Bathroom amenities":"icon-a-BathroomAmenities",
      "Coffee and tea facilities":"icon-coffee",
      "Free Wi-Fi":"icon-mianfeiWIFI",
      "Magnifying mirror":"icon-mirror",
      "Television":"icon-television",
      "Professional hair dryer":"icon-hair-dryer",
      "Mini bar":"icon-Mini-Bar",
      "Bathrobe and slippers":"icon-slippers",
      "Living room":"icon-scene_keting",
      "Dining area":"icon-Dining_area",
      "Espresso machine":"icon-espressomachine",
      "Wine cooler":"icon-wine-coolers",
      "Jacuzzi":"icon-Jacuzzi",
      "Butler service":"icon-Butler_service",
      "Kitchenette":"icon-kitchenette",
      "Separate living room":"icon-scene_keting",
      "Nespresso coffee machine":"icon-coffee-machine",
      "Wine selection":"icon-bar-",
      "Microwave":"icon-microwave",
      "Refrigerator":"icon-refrigerator",
};

//generate all product items
document.querySelector('.products').innerHTML = rooms.map(room => {
        return `    <li class="product-item">
                        <div class="product-img-part">
                            <div id="carousel${room.id}" class="carousel slide">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carousel${room.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carousel${room.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carousel${room.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                    <img src="${room.image1}" class="d-block w-100">
                                    </div>
                                    <div class="carousel-item">
                                    <img src="${room.image2}" class="d-block w-100">
                                    </div>
                                    <div class="carousel-item">
                                    <img src="${room.image3}"class="d-block w-100">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carousel${room.id}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carousel${room.id}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                                </div>
                        <div class="product-content-part mt-3 w-100">
                            <div class="room-name text-center"><h5>${room.title}</h5></div>
                            <div class="room-labels">
                                <span class="area">${room.area} m²</span>
                                <span class="adults-number">${room.adults} adults</span>
                                <span class="children-number" >${room.children} children(0-10)</span>
                                <span class="bed-number">${room.bed}</span>  
                            </div>
                            <div class="room-price bg-warning">€ ${room.price} / night</div>
                            <button class="more-info d-block mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal" data-room-id="${room.id}">More Info &rarr;</button>
                            
                            <button class="btn btn-warning book-btn w-75 d-block mx-auto" data-room-id="${room.id}">Book Now</button>
                        </div>
                    </li>
        `}).join('');



const leftBtn = document.querySelector(".arrow-left");
const rightBtn = document.querySelector(".arrow-right");
const track = document.querySelector(".track-container");
const cardWidth = 420;
//click left button to move prloduct item left
leftBtn.addEventListener('click',(e)=>{
    e.stopPropagation();
    e.preventDefault();
    track.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
    })
})
//click right button to move prloduct item right
rightBtn.addEventListener('click',(e)=>{
    e.stopPropagation();
    e.preventDefault(); 
    track.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
    })
})


//open modal card and overlay
const modalOverlay = document.querySelector(".modal-overlay");
const modalCard = document.querySelector(".modal-card");
const infoBtns = document.querySelectorAll(".more-info");
infoBtns.forEach(infoBtn =>{
    infoBtn.addEventListener('click',()=>{
    modalOverlay.style.display = 'block';
    modalCard.style.display = 'block';
    const roomId = infoBtn.dataset.roomId
    const currentRoom = rooms.find(room=>room.id==roomId)
    const bookBtn2 = document.querySelector(".book-btn2");
        if (bookBtn2) {
            bookBtn2.setAttribute("data-room-id", roomId);
        }
        document.querySelector(".carousel-imgs").innerHTML =
         ` <div class="carousel-item active">
                <img src="${currentRoom.image1}" class="card-img">
           </div>
           <div class="carousel-item">
                <img src="${currentRoom.image2}" class="card-img">
            </div>
            <div class="carousel-item">
                <img src="${currentRoom.image3}" class="card-img">
            </div>`;

   //create amenities elememts
     const amenitiesHtml = currentRoom.amenities.map(amenity=>{
      return ` <div class="col">
                <span class="iconfont ${iconwithamenities[amenity] || ""}"></span>
                <span class="label">${amenity}</span>   
              </div>`
        }).join('');

   //assemble complete text
        document.querySelector(".text-col .text-content").innerHTML =
        `<h5 class="ms-1">${currentRoom.title}</h5>
        <div class="inner-labels">
            <span class="area">${currentRoom.area} m²</span>
            <span class="adults-number">${currentRoom.adults} adults</span>
            <span class="children-number">${currentRoom.children} children(0-10)</span>
            <span class="bed-number">${currentRoom.bed}</span>
            <span class="rooms-price bg-warning">€ ${currentRoom.price} / night</span>
        </div>
        <p class="mb-3 description">${currentRoom.description}</p>
        <h5 class="mb-2">Main amenities</h5>
        <div class="row row-cols-3 g-2 amenities-col">
        ${amenitiesHtml} 
        </div>`
        })
    
       
    })

//close rooms modal card and overlay
const closeBtn2 = document.querySelector(".room-card-header .close-btn2");
closeBtn2.addEventListener('click',()=>{
    modalOverlay.style.display = 'none';
    modalCard.style.display = 'none';
})


//bind flatpickr with book button
const confirmBtn = document.querySelector("#confirm-booking-btn");
let bookingPicker = null;
let selectedCheckin = null;
let selectedCheckout = null;
document.addEventListener('DOMContentLoaded', () => {
   bookingPicker = flatpickr("#booking-dates", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    inline: true,
    onChange: function(selectedDates, dateStr, instance) {
        const resultDiv = document.getElementById("date-result");
        if (selectedDates.length === 2) {
            selectedCheckin = instance.formatDate(selectedDates[0], "Y-m-d");
            selectedCheckout = instance.formatDate(selectedDates[1], "Y-m-d");
            
            resultDiv.innerHTML = `
                <div class="d-flex flex-wrap justify-content-center gap-1">
                    <span><strong>check-in</strong>: ${selectedCheckin}</span>
                    <span><strong>check-out</strong>: ${selectedCheckout}</span>
                </div>
            `;
        checkAllConditions();
        }
    }
});

});

const bookBtns = document.querySelectorAll(".book-btn, .book-btn2");
const closeBtn3=document.querySelector(".close-btn3");
const bookingModalOverlay = document.querySelector(".booking-modal-overlay");
const bookingModalCard = document.querySelector(".booking-modal-card");
let currentBookingRoom = null;
//open booking modal card
bookBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        bookingModalOverlay.style.display = "block"; 
        bookingModalCard.style.display = "block";
        document.querySelector("#booking-dates")._flatpickr.open();
        const roomId = btn.dataset.roomId;
        currentBookingRoom = rooms.find(room => room.id == roomId); 
    });
});
//close booking modal card
closeBtn3.addEventListener("click",(e)=>{
    e.preventDefault();
    bookingModalOverlay.style.display="none";
    bookingModalCard.style.display = "none";
    //clear date
    if (bookingPicker) {
        bookingPicker.clear();  
    }
    
    // clear check-in/out text
    const resultDiv = document.getElementById("date-result");
    if (resultDiv) {
        resultDiv.innerHTML = "";
    }
    if(errorMsgSpan){
        errorMsgSpan.innerText="";
    }
     // Reset adults and children inputs to default values
     if (adultsInput) {
        adultsInput.value = "1";
    }
    if (childrenInput) {
        childrenInput.value = "0";
    }
    
});

//check if the selected room is available
const adultsInput = document.querySelector(".adults-input");
const childrenInput = document.querySelector(".children-input");
const errorMsgSpan = document.getElementById("err-msg");
function checkCapacity() {
    if (!currentBookingRoom) return;  // no room date will exit
    
    let adults = parseInt(adultsInput.value);
    let children = parseInt(childrenInput.value);
    
    if (children > currentBookingRoom.children && adults > currentBookingRoom.adults) {
        errorMsgSpan.innerHTML = `Over room capacity`;
    } else if (children > currentBookingRoom.children) {
        errorMsgSpan.innerHTML = `Max ${currentBookingRoom.children} children`;
    } else if (adults > currentBookingRoom.adults) {
        errorMsgSpan.innerHTML = `Max ${currentBookingRoom.adults} adults`;
    } else {
        errorMsgSpan.innerHTML = "";
    }
    checkAllConditions();
}
adultsInput.addEventListener("input", checkCapacity);
childrenInput.addEventListener("input", checkCapacity);
function checkAllConditions() {
    confirmBtn.disabled = !(selectedCheckin && selectedCheckout && !errorMsgSpan.innerHTML);
}
//click BOOK btn
const confirmBookBtn = document.getElementById("confirm-booking-btn");
confirmBookBtn.addEventListener("click",()=>{
     const currentUser = localStorage.getItem("currentUser")
     if (!currentUser){
        alert("Please login first to book a room");
        window.location.href = "pages/login.html";
        return;
     }
    const checkinDate = bookingPicker.formatDate(bookingPicker.selectedDates[0], "Y-m-d");
    const checkoutDate = bookingPicker.formatDate(bookingPicker.selectedDates[1], "Y-m-d");
    const adults = parseInt(adultsInput.value);
    const children = parseInt(childrenInput.value);
    const selectedBooking = {
            roomId: currentBookingRoom.id,
            roomName: currentBookingRoom.title,
            roomDescription: currentBookingRoom.description,
            roomPrice: currentBookingRoom.price,
            roomImage: "../" + currentBookingRoom.image1,
            checkInDate: checkinDate,
            checkOutDate: checkoutDate,
            guests: `${adults} adults, ${children} children`
        };
    sessionStorage.setItem('selectedBooking', JSON.stringify(selectedBooking));
    window.location.href="pages/booking.html"
})

//review section
//fake comment data
const comment = [
  {"name": "Emma Watson", "text": "Great value for money, totally worth it"},
  {"name": "Liam Chen", "text": "Warm and attentive service, very satisfied"},
  {"name": "Sophia Rodriguez", "text": "Friendly staff, felt like home"},
  {"name": "Noah Kim", "text": "Clean room, excellent breakfast"},
  {"name": "Olivia Smith", "text": "Convenient location, staff is super nice"},
  {"name": "Mason Brown", "text": "Great facilities, wonderful experience"},
  {"name": "Isabella Garcia", "text": "Perfect cleanliness, thoughtful service"},
  {"name": "Ethan Johnson", "text": "Best bang for your buck, highly recommend"},
  {"name": "Ava Martinez", "text": "Warm welcome, always ready to help"},
  {"name": "Logan Davis", "text": "Comfortable stay, exceeded expectations"},
  {"name": "Mia Wilson", "text": "Great attention to detail, very professional"},
  {"name": "Lucas Miller", "text": "Excellent value, would come again"},
  {"name": "Amelia Taylor", "text": "Top-notch service, highly impressed"},
  {"name": "Alexander Moore", "text": "Beautiful room, amazing hospitality"},
  {"name": "Charlotte Jackson", "text": "Quick check-in, very accommodating"},
  {"name": "Benjamin White", "text": "Cozy atmosphere, staff went above and beyond"},
  {"name": "Evelyn Harris", "text": "Spotless and comfortable, great experience"},
  {"name": "James Thompson", "text": "Fantastic stay, will definitely return"},
  {"name": "Abigail Martin", "text": "Super friendly team, highly recommended"},
  {"name": "Daniel Robinson", "text": "Affordable luxury, exceeded all expectations"}
];
//get tracks
const trackTop = document.getElementById('track-top');
const trackMiddle = document.getElementById('track-middle');
const trackBottom = document.getElementById('track-bottom');
const tracks = [trackTop, trackMiddle, trackBottom];
// Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fly {
            0% {
                left: 100%;
                opacity: 1;
            }
            100% {
                left: -300px;
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);

 //create avatar
    function getAvatarUrl(userName) {
        //cut space
        const seed = userName.replace(/\s/g, '');
        return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&size=80`;
    }

 // Create comment
    function createComment(commentData, trackIndex) {
    const card = document.createElement('div');
    card.className = 'comment';
    const avatarUrl = getAvatarUrl(commentData.name);   
        // Add content 
        card.innerHTML = `
            <img class="comment-avatar" src="${avatarUrl}">
            <div class="comment-content">
                <div class="name">${commentData.name}</div>
                <div class="text">${commentData.text}</div>
            </div>
        `;
        
        // Add to track
        tracks[trackIndex].appendChild(card);

        card.addEventListener('animationend', () => {
            card.remove();});
    }

    let commentIndex = 0;
    let currentTrack = 0;
    const totalTracks = 3;
    function addCommentToTrack() {
    const commentData = comment[commentIndex % comment.length];
    createComment(commentData, currentTrack);
    commentIndex++;
    currentTrack = (currentTrack + 1) % totalTracks;
    const delay = 1500 + Math.random() * 3000;
    setTimeout(addCommentToTrack, delay);
    }

    addCommentToTrack();



