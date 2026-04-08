document.addEventListener("DOMContentLoaded", function () {

    // ---- Edit Profile Scroll ----
    const editProfileBtn = document.getElementById("editProfileBtn");
    const updateSection = document.getElementById("updateSection");
    if (editProfileBtn && updateSection) {
        editProfileBtn.addEventListener("click", function(){
            updateSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // ---- Phone Input Validation ----
    const phoneInput = document.querySelector("#phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // ---- Load User Profile from localStorage ----
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
        const profileNameEl = document.getElementById("profileName");
        const profileEmailEl = document.getElementById("profileEmail");
        const profilePhoneEl = document.getElementById("profilePhone");

        if (profileNameEl) profileNameEl.textContent = savedProfile.name;
        if (profileEmailEl) profileEmailEl.textContent = savedProfile.email;
        if (profilePhoneEl) profilePhoneEl.textContent = savedProfile.phone;
    }

    // ---- Update Profile Handler ----
    const updateProfileForm = document.getElementById("updateProfileForm");
    if (updateProfileForm) {
        updateProfileForm.addEventListener("submit", function(e){
            e.preventDefault();

            const firstName = document.getElementById("firstName")?.value || "";
            const lastName = document.getElementById("lastName")?.value || "";
            const email = document.getElementById("email")?.value || "";
            const phone = document.getElementById("phone")?.value || "";
            const fullName = firstName + " " + lastName;

            // Update profile display
            const profileNameEl = document.getElementById("profileName");
            const profileEmailEl = document.getElementById("profileEmail");
            const profilePhoneEl = document.getElementById("profilePhone");

            if (profileNameEl) profileNameEl.textContent = fullName;
            if (profileEmailEl) profileEmailEl.textContent = email;
            if (profilePhoneEl) profilePhoneEl.textContent = phone;

            // Save updated profile to localStorage
            localStorage.setItem("userProfile", JSON.stringify({ name: fullName, email, phone }));

            // Show success message temporarily
            const success = document.getElementById("successMessage");
            if (success) {
                success.classList.remove("d-none");
                const profileSection = document.getElementById("profileSection");
                if (profileSection) profileSection.scrollIntoView({ behavior: "smooth" }); 
                setTimeout(() => success.classList.add("d-none"), 3000);
            }
        });
    }

    // ---- Display Selected Room Details ----
    const roomData = sessionStorage.getItem("selectedBooking");
    if (roomData) {
        const room = JSON.parse(roomData);
        const roomDetailsEl = document.getElementById("roomDetails");
        if (roomDetailsEl) {  
            roomDetailsEl.innerHTML = `
                <img src="${room.roomImage}" class="img-fluid mb-3" alt="${room.roomName}">
                <h5>${room.roomName}</h5>
                <p>${room.roomDescription}</p>
                <p class="mb-0"><strong>Guests:</strong> ${room.guests}</p>
                <p class="mb-0"><strong>Check-In:</strong> ${room.checkInDate}</p>
                <p><strong>Check-Out:</strong> ${room.checkOutDate}</p>
                <small class="text-muted edit-stay">← Edit stay details</small>
                <hr class="my-2">
                <p class="mb-0 mt-2"><strong>Price:</strong> €${room.roomPrice}</p>
                <small class="text-muted">EUR Total</small>
            `;
        }
    }

    // ---- Edit Stay Click Handler ----
    document.addEventListener("click", function(e){
        if(e.target.classList.contains("edit-stay")){
            window.location.href = "room-selection.html";
        }
    });

});

// ====== Booking History Dynamic Update ======

// Select tbody from Booking History
const bookingTableBody = document.querySelector('.table tbody');

// Function to add a new booking row to the table
function addBooking(booking) {
    const today = new Date();
    const checkInDate = new Date(booking.checkIn);

    // Automatically determine status
    const status = checkInDate > today ? "Upcoming" : "Completed";

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${booking.id}</td>
        <td>${booking.room}</td>
        <td>${booking.checkIn}</td>
        <td>${booking.checkOut}</td>
        <td>${status}</td>
    `;
    bookingTableBody.appendChild(row);
}

// ---- Clear table and localStorage history on load ----
bookingTableBody.innerHTML = "";      // empty table
localStorage.removeItem("bookingHistory"); // remove old bookings

// ---- Only add the current selected booking ----
const selectedBooking = JSON.parse(sessionStorage.getItem("selectedBooking"));
const bookingHistory = []; // start fresh

if (selectedBooking) {
    bookingHistory.push({
        roomName: selectedBooking.roomName,
        checkInDate: selectedBooking.checkInDate,
        checkOutDate: selectedBooking.checkOutDate
    });

    // Save to localStorage
    localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));

    // Add to table
    addBooking({
        id: 1,
        room: selectedBooking.roomName,
        checkIn: selectedBooking.checkInDate,
        checkOut: selectedBooking.checkOutDate
    });
}