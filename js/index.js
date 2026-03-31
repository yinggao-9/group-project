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
        }
    }); 
    //check out
    flatpickr("#checkout-input",{
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
    window.location.href="pages/rooms.html?filter=available#roomsContainer"
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
        "id": 1,
        "title": "Standard Single Room",
        "image1": "../img/roomtypes/1.jpg",
        "image2": "../img/roomtypes/2.jpg",
        "image3": "../img/roomtypes/3.jpg",
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
        "id": 2,
        "title": "Superior Single Room",
        "image1": "../img/roomtypes/4.jpg",
        "image2": "../img/roomtypes/5.jpg",
        "image3": "../img/roomtypes/6.jpg",
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
        "id": 3,
        "title": "Superior Twin Room",
        "image1": "../img/roomtypes/7.jpg",
        "image2": "../img/roomtypes/8.jpg",
        "image3": "../img/roomtypes/9.jpg",
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
        "television",
        "Professional hair dryer"
        ]
    },
    {
        "id": 4,
        "title": "Superior Double Room",
        "image1": "../img/roomtypes/10.jpg",
        "image2": "../img/roomtypes/11.jpg",
        "image3": "../img/roomtypes/12.jpg",
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
        "television",
        "Professional hair dryer"
        ]
    },
    {
    "id": 5,
    "title": "Deluxe Double Room",
    "image1": "../img/roomtypes/13.jpg",
    "image2": "../img/roomtypes/14.jpg",
    "image3": "../img/roomtypes/15.jpg",
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
    "id": 6,
    "title": "Studio Twin Room",
    "image1": "../img/roomtypes/16.jpg",
    "image2": "../img/roomtypes/17.jpg",
    "image3": "../img/roomtypes/18.jpg",
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
    "id": 7,
    "title": "Studio Double Room",
    "image1": "../img/roomtypes/19.jpg",
    "image2": "../img/roomtypes/20.jpg",
    "image3": "../img/roomtypes/21.jpg",
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
    "id": 8,
    "title": "1 Bedroom Suite",
    "image1": "../img/roomtypes/22.jpg",
    "image2": "../img/roomtypes/23.jpg",
    "image3": "../img/roomtypes/24.jpg",
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
    "id": 9,
    "title": "2 Bedroom Suite",
    "image1": "../img/roomtypes/25.jpg",
    "image2": "../img/roomtypes/26.jpg",
    "image3": "../img/roomtypes/27.jpg",
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
     "id": 10,
    "title": "Presidential Suite",
    "image1": "../img/roomtypes/28.jpg",
    "image2": "../img/roomtypes/29.jpg",
    "image3": "../img/roomtypes/30.jpg",
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
                            <button class="more-info d-block mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal" data-room-id="${room.id}">More Info &rarr;</button>
                            
                            <button class="btn btn-danger book-btn w-75 d-block mx-auto">Book Now</button>
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
        </div>
        <p class="mb-3 description">${currentRoom.description}</p>
        <h5 class="mb-2">Main amenities</h5>
        <div class="row row-cols-3 g-2 amenities-col">
        ${amenitiesHtml} 
        </div>`
        })
    
       
    })


//close modal card and overlay
const closeBtn2 = document.querySelector(".room-card-header .close-btn2");
closeBtn2.addEventListener('click',()=>{
    modalOverlay.style.display = 'none';
    modalCard.style.display = 'none';
})







