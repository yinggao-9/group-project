// REUSABLE VALIDATE FUNCTION

function validateField(inputId, errorId) {  /* "validateField" is a function to validate the input information
                                                "inputId, errorID", help to not repeat the same function for different fields*/
    const input = document.getElementById(inputId); 
    const error = document.getElementById(errorId); /* "const input" & "const error" save the variables of every element that inputs 
                                                        in the form or the message error using their ID */

    if (input.value.trim() === "") { /*Verify is the field is empty
                                        "trim" remove spaces between the start & the end to not consider spaces like fill the form.
                                        "==="" " compare strict with empty field*/
        input.classList.add("is-invalid"); /*if the field is empty Bootstrap changse the border in color red, notifiying an error message. */
        error.classList.remove("d-none"); /*remove the "d-none" from Bootstrap to allow to show the error message on screen. */
        return false; /*if the validate form has error this avoid to send the form.*/
    } else {
        input.classList.remove("is-invalid"); /*Removes the border color red if it was marked.*/
        error.classList.add("d-none");
        return true; /*Indicates the field is not empty and it was validated.*/
    }
}

// FORM VALIDATION

function validateForm() { /*Declares the function that validates all form fields when the user submits the form.*/

    let isValid = true; /*Creates a variable to track if the form is valid; starts assuming everything is correct.*/

    isValid &= validateField("firstName", "firstNameError"); /*Calls "validateField" for each required field. If any field fails, "isValid" becomes "false".*/
    isValid &= validateField("lastName", "lastNameError");
    isValid &= validateField("email", "emailError");
   
   const email = document.getElementById("email").value; /*Gets the value entered in the email field.*/


    if (email !== "") { /*Only validates the email format if the field is not empty.*/

        if (!email.includes("@")) { /*If it does not contain @, marks the field as invalid and shows a message.*/
            document.getElementById("email").classList.add("is-invalid");
            document.getElementById("emailError").textContent = "Email must include @";
            document.getElementById("emailError").classList.remove("d-none");
            isValid = false;
        }

        else if (!email.includes(".")) { /*If it does not contain a dot, marks the field as invalid and shows a message.*/
            document.getElementById("email").classList.add("is-invalid");
            document.getElementById("emailError").textContent = "Email must include a domain (.)";
            document.getElementById("emailError").classList.remove("d-none");
            isValid = false;
        }
    } 

    isValid &= validateField("phone", "phoneError"); /*Validates that the phone field is not empty.*/

    const phone = document.getElementById("phone").value.replace(/\D/g, ""); /*Takes the phone value and removes anything that is not a number.*/

    if (phone !== "" && !/^\d+$/.test(phone)) { /*If there are non-numeric characters, marks it invalid and shows a message.*/
        document.getElementById("phone").classList.add("is-invalid");
        document.getElementById("phoneError").textContent = "Phone must contain only numbers";
        document.getElementById("phoneError").classList.remove("d-none");
        isValid = false;
    }
    /*Validates that address, city, state, postal code, and card fields are not empty.*/
    isValid &= validateField("address1", "address1Error");
    isValid &= validateField("city", "cityError");
    isValid &= validateField("state", "stateError");
    isValid &= validateField("postalCode", "postalCodeError");
    isValid &= validateField("card", "cardError");

    const card = document.getElementById("card").value;

    if (card !== "" && !/^\d{16}$/.test(card)) { /*If the card field has a value but is not 16 digits, marks it invalid and shows a message.*/
        document.getElementById("card").classList.add("is-invalid");
        document.getElementById("cardError").textContent = "Card must be 16 digits";
        document.getElementById("cardError").classList.remove("d-none");
        isValid = false;
    }
    isValid &= validateField("expMonth", "expMonthError");
    isValid &= validateField("expYear", "expYearError");

    if (!isValid) { /*If any field failed, shows a general message and prevents form submission.*/
        document.getElementById("error").textContent = "Please fill in all required fields.";
        return false;
    }




    // SUCCESS
    const success = document.getElementById("success"); /*If everything is correct, shows a success message and resets the form.*/
    success.style.display = "block";
    success.textContent = "🌿 Booking completed successfully!";

    // SAVE BOOKING DATA (ADD HERE)
    const selectedRoom = JSON.parse(sessionStorage.getItem("selectedBooking"));
    if(selectedRoom){
        localStorage.setItem("selectedBooking", JSON.stringify(selectedRoom));
    }

    // REDIRECT TO MY ACCOUNT (ADD HERE)
    window.location.href = "myAccount.html#roomDetails";

    document.getElementById("paymentForm").reset();
    return false;
}

document.addEventListener("DOMContentLoaded", function() { /*"document.addEventListener" sets up an event listener that
																	waits for the HTML document to be fully loaded and parsed by 
																	the browser.*/
const fields = [ /*Lists the IDs of all fields we want to monitor.*/                               
    "firstName", "lastName", "email", "phone",
    "address1", "city", "state", "postalCode",
    "card", "expMonth", "expYear"
];

fields.forEach(id => { /*When the user types in a field, removes the error class and hides the message.*/                                               /* This helps to dissapear the error message when the field is starting to be field.*/
    document.getElementById(id).addEventListener("input", function () {
        this.classList.remove("is-invalid");
        document.getElementById(id + "Error").classList.add("d-none");
    });
});

 // CARD NUMBER - allow only numbers
  const cardInput = document.querySelector("#card");

  cardInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, '');
  });  

  // MOBILE PHONE //
  const phoneInput = document.querySelector("#phone");
  window.intlTelInput(phoneInput, {
    initialCountry: "ie",
    preferredCountries: ["ie","gb","us","mx"],
    separateDialCode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.11/build/js/utils.js"
  });

    // Allow only numbers
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

 

  // COUNTRY/ REGION AUTOMATICALLY // 
  fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
    .then(res => res.json())
    .then(data => {
    const select = document.getElementById("country");
    // order by name//
    data.sort((a,b) => a.name.common.localeCompare(b.name.common));
    data.forEach(c => {
    const option = document.createElement("option");
    option.value = c.cca2; // código ISO
    option.textContent = c.name.common;
    select.appendChild(option);
    });
    // refresh bootstrap-select
    $('.selectpicker').selectpicker('refresh');
    });

 
});