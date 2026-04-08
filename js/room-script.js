/* =========================================
   ROOM INVENTORY DATA
   Base room list used to build the display
========================================= */
const baseRooms = [
    {
        id: 1,
        name: "Deluxe Room",
        type: "deluxe",
        price: 700,
        capacity: 2,
        available: true,
        rating: 5,
        description: "Spacious comfort with a king-sized bed and balcony view.",
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        bookings: []
    },
    {
        id: 2,
        name: "Executive Suite",
        type: "executive",
        price: 900,
        capacity: 2,
        available: true,
        rating: 5,
        description: "Luxury suite with private lounge and premium service.",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        bookings: []
    },
    {
        id: 3,
        name: "Family Room",
        type: "family",
        price: 1100,
        capacity: 6,
        available: true,
        rating: 4,
        description: "Perfect for families travelling together.",
        image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
        bookings: []
    },
    {
        id: 4,
        name: "Presidential Suite",
        type: "presidential",
        price: 2000,
        capacity: 2,
        available: true,
        rating: 5,
        description: "Top-tier luxury with private living area and premium services.",
        image: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg",
        bookings: []
    },
    {
        id: 5,
        name: "Honeymoon Suite",
        type: "honeymoon",
        price: 1000,
        capacity: 2,
        available: true,
        rating: 5,
        description: "Romantic suite designed for couples and special occasions.",
        image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
        bookings: []
    },
    {
        id: 6,
        name: "Ocean View Room",
        type: "ocean-view",
        price: 1000,
        capacity: 4,
        available: true,
        rating: 5,
        description: "Relax with breathtaking ocean scenery from your balcony.",
        image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
        bookings: []
    },
    {
        id: 7,
        name: "Garden View Room",
        type: "garden-view",
        price: 900,
        capacity: 4,
        available: true,
        rating: 5,
        description: "Peaceful rooms overlooking the hotel gardens.",
        image: "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
        bookings: []
    },
    {
        id: 8,
        name: "Business Suite",
        type: "business",
        price: 1200,
        capacity: 2,
        available: true,
        rating: 5,
        description: "Perfect for business travellers with workspace and WiFi.",
        image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
        bookings: []
    },
    {
        id: 9,
        name: "Penthouse Suite",
        type: "penthouse",
        price: 3000,
        capacity: 1,
        available: true,
        rating: 5,
        description: "Ultimate luxury located on the top floor.",
        image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
        bookings: []
    },
    {
        id: 10,
        name: "Budget Room",
        type: "budget",
        price: 300,
        capacity: 1,
        available: true,
        rating: 5,
        description: "Comfortable stay with all essential amenities.",
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        bookings: []
    },
    {
        id: 11,
        name: "Accessible Room",
        type: "accessible",
        price: 200,
        capacity: 2,
        available: true,
        rating: 4,
        description: "Designed for guests requiring accessible facilities.",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        bookings: []
    },
    {
        id: 12,
        name: "Studio Room",
        type: "studio",
        price: 200,
        capacity: 1,
        available: true,
        rating: 4,
        description: "Modern compact design ideal for short stays.",
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        bookings: []
    }
];

/* =========================================
   INVENTORY EXTENSION
   Creates additional rooms for pagination
========================================= */
const rooms = [...baseRooms];
let nextId = baseRooms.length + 1;

for (let i = 0; i < 48; i++) {
    const template = baseRooms[i % baseRooms.length];

    rooms.push({
        ...template,
        id: nextId++,
        name: `${template.name} ${Math.floor(i / baseRooms.length) + 2}`,
        bookings: []
    });
}

/* =========================================
   PAGINATION STATE
========================================= */
const roomsPerPage = 9;
let currentPage = 1;
let filteredRooms = [...rooms];

/* =========================================
   PAGE START
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const roomsContainer = document.getElementById("roomsContainer");
    const paginationContainer = document.getElementById("pagination");
    const searchInput = document.getElementById("searchInput");
    const stayDates = document.getElementById("stayDates");
    const capacityFilter = document.getElementById("capacityFilter");
    const priceFilter = document.getElementById("priceFilter");
    const searchBtn = document.getElementById("searchBtn");

    let stayPicker = null;

    if (
        !roomsContainer ||
        !paginationContainer ||
        !searchInput ||
        !stayDates ||
        !capacityFilter ||
        !priceFilter ||
        !searchBtn
    ) {
        console.error("One or more required HTML elements are missing.");
        return;
    }

    /**
     * Reads all confirmed bookings from localStorage.
     * Returns an array of successfully confirmed bookings.
     */
    function getConfirmedBookings() {
        return JSON.parse(localStorage.getItem("confirmedBookings")) || [];
    }

    /**
     * Loads saved bookings into room objects in memory.
     * This keeps room availability accurate when the page reloads.
     */
    function syncBookingsIntoRooms() {
        const confirmedBookings = getConfirmedBookings();

        rooms.forEach(room => {
            room.bookings = [];
        });

        confirmedBookings.forEach(booking => {
            const room = rooms.find(item => item.id === booking.roomId);
            if (room) {
                room.bookings.push({
                    checkIn: booking.checkInDate,
                    checkOut: booking.checkOutDate
                });
            }
        });
    }

    /**
     * Reads the selected date range from the stay input.
     * Flatpickr stores it as: YYYY-MM-DD to YYYY-MM-DD
     */
    function getSelectedStayDates() {
        const value = stayDates.value.trim();

        if (!value || !value.includes(" to ")) {
            return {
                checkInDate: "",
                checkOutDate: ""
            };
        }

        const [checkInDate, checkOutDate] = value.split(" to ");

        return {
            checkInDate,
            checkOutDate
        };
    }

    /**
     * Checks if a room is available for the selected stay.
     * Returns false if the selected range overlaps any existing booking.
     */
    function isRoomAvailable(room, selectedCheckIn, selectedCheckOut) {
        if (!selectedCheckIn || !selectedCheckOut) {
            return true;
        }

        const newCheckIn = new Date(selectedCheckIn);
        const newCheckOut = new Date(selectedCheckOut);

        for (const booking of room.bookings) {
            const bookedCheckIn = new Date(booking.checkIn);
            const bookedCheckOut = new Date(booking.checkOut);

            const overlaps = newCheckIn < bookedCheckOut && newCheckOut > bookedCheckIn;

            if (overlaps) {
                return false;
            }
        }

        return true;
    }

    /**
     * Converts a numeric rating into a 5-star text display.
     */
    function getStars(rating) {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? "★" : "☆";
        }
        return stars;
    }

    /**
     * Converts room type slugs such as "ocean-view"
     * into display text like "Ocean View".
     */
    function formatRoomType(type) {
        return type
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    /**
     * Renders the current page of filtered rooms.
     * Availability labels update based on the selected stay dates.
     */
    function renderRooms() {
        roomsContainer.innerHTML = "";

        const start = (currentPage - 1) * roomsPerPage;
        const end = start + roomsPerPage;
        const paginatedRooms = filteredRooms.slice(start, end);

        if (paginatedRooms.length === 0) {
            roomsContainer.innerHTML = "<p>No rooms match your search.</p>";
            return;
        }

        const { checkInDate, checkOutDate } = getSelectedStayDates();

        paginatedRooms.forEach(room => {
            const availableByDate = isRoomAvailable(room, checkInDate, checkOutDate);
            const available = room.available && availableByDate;

            const roomCard = document.createElement("div");
            roomCard.className = "room";

            roomCard.innerHTML = `
                <img src="${room.image}" alt="${room.name}">
                <div class="price-tag">€${room.price} / night</div>
                <div class="room-content">
                    <h3>${room.name}</h3>
                    <div class="stars">${getStars(room.rating)}</div>
                    <p>${room.description}</p>
                    <p><strong>Capacity:</strong> ${room.capacity} guest(s)</p>
                    <p><strong>Type:</strong> ${formatRoomType(room.type)}</p>
                    <span class="status ${available ? "available" : "unavailable"}">
                        ${available ? "Available" : "Unavailable"}
                    </span>
                    <button class="book-btn" data-room-id="${room.id}">
                        Book Now
                    </button>
                </div>
            `;

            roomsContainer.appendChild(roomCard);
        });

        roomsContainer.querySelectorAll(".book-btn").forEach(button => {
            button.addEventListener("click", () => {
                const roomId = Number(button.dataset.roomId);
                handleBookButtonClick(roomId);
            });
        });
    }

    /**
     * Builds and displays pagination controls.
     */
    function renderPagination() {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;

            if (i === currentPage) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                currentPage = i;
                renderRooms();
                renderPagination();

                window.scrollTo({
                    top: roomsContainer.offsetTop - 100,
                    behavior: "smooth"
                });
            });

            paginationContainer.appendChild(button);
        }
    }

    /**
     * Sets up a single Flatpickr range picker for the full stay.
     * The first date is check-in, the second date is check-out.
     */
    function setupDatePicker() {
        if (typeof flatpickr !== "function") {
            console.error("Flatpickr is not loaded.");
            return;
        }

        stayPicker = flatpickr(stayDates, {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "F j, Y",
            disableMobile: true,
            onChange() {
                filterRooms();
            }
        });
    }

    /**
     * Filters rooms by search term, capacity, price, and selected date range.
     * Rooms are kept visible, but their status changes when booked.
     */
    function filterRooms() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCapacity = capacityFilter.value;
        const selectedPrice = priceFilter.value;
        const { checkInDate: selectedCheckIn, checkOutDate: selectedCheckOut } = getSelectedStayDates();

        if (selectedCheckIn && selectedCheckOut) {
            const inDate = new Date(selectedCheckIn);
            const outDate = new Date(selectedCheckOut);

            if (outDate <= inDate) {
                alert("Check-out date must be after check-in date.");
                return;
            }
        }

        syncBookingsIntoRooms();

        filteredRooms = rooms.filter(room => {
            const matchesSearch =
                room.name.toLowerCase().includes(searchText) ||
                room.type.toLowerCase().includes(searchText);

            const matchesCapacity =
                selectedCapacity === "" || room.capacity === Number(selectedCapacity);

            const matchesPrice =
                selectedPrice === "" || room.price <= Number(selectedPrice);

            return matchesSearch && matchesCapacity && matchesPrice;
        });

        currentPage = 1;
        renderRooms();
        renderPagination();
    }

    /**
     * Handles Book Now clicks.
     * Validates login status, date selection, and availability.
     * If the user is not logged in, they are redirected to the login page first.
     */
    function handleBookButtonClick(roomId) {
        const currentUser = localStorage.getItem("currentUser");

        if (!currentUser) {
            alert("Please log in first before making a reservation.");
            localStorage.setItem("redirectAfterLogin", window.location.href);
            window.location.href = "login.html";
            return;
        }

        const { checkInDate: selectedCheckIn, checkOutDate: selectedCheckOut } = getSelectedStayDates();

        if (!selectedCheckIn || !selectedCheckOut) {
            alert("Please select your stay dates first.");
            return;
        }

        if (new Date(selectedCheckOut) <= new Date(selectedCheckIn)) {
            alert("Check-out date must be after check-in date.");
            return;
        }

        syncBookingsIntoRooms();

        const room = rooms.find(item => item.id === roomId);

        if (!room) {
            alert("Room could not be found.");
            return;
        }

        const available = isRoomAvailable(room, selectedCheckIn, selectedCheckOut);

        if (!available) {
            alert("This room is already booked. Please select another time.");
            return;
        }

        const selectedBooking = {
            roomId: room.id,
            checkInDate: selectedCheckIn,
            checkOutDate: selectedCheckOut
        };

        localStorage.setItem("selectedBooking", JSON.stringify(selectedBooking));
        window.location.href = "booking.html";
    }

    searchBtn.addEventListener("click", filterRooms);
    searchInput.addEventListener("input", filterRooms);
    capacityFilter.addEventListener("change", filterRooms);
    priceFilter.addEventListener("change", filterRooms);

    setupDatePicker();
    syncBookingsIntoRooms();
    filterRooms();
});