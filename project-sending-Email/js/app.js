//variables
const sendBtn = document.querySelector("#sendBtn"),
    email = document.querySelector("#email"),
    subject = document.querySelector("#subject"),
    message = document.querySelector("#message"),
    resetBtn = document.querySelector("#resetBtn"),
    form = document.querySelector("#email-form")


//eventlisteners
eventListeners();

function eventListeners() {
    //app initialization
    document.addEventListener("DOMContentLoaded", appInit);
    //validating field
    email.addEventListener("blur", validateField);
    subject.addEventListener("blur", validateField);
    message.addEventListener("blur", validateField);
    message.addEventListener("keyup", validateField);
    //reset button
    resetBtn.addEventListener("click", resetForm);
    //submit form and show gif
    form.addEventListener("submit", submitForm);
}


//functions
function appInit() {
    //disabled send button on loaded
    sendBtn.disabled = true;
}

//submit form and show gif
function submitForm(e) {
    e.preventDefault();

    //show the spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "block";

    //make second gif
    const sendEmailImg = document.createElement("img");
    sendEmailImg.src = "img/mail.gif";
    sendEmailImg.style.display = "block";


    //show the image of send email
    setTimeout(function () {
        //hide first gif
        spinner.style.display = "none";

        //append second gif
        const loaders = document.querySelector("#loaders");
        loaders.appendChild(sendEmailImg);

        //hide second gif
        setTimeout(function () {
            resetForm();
            sendEmailImg.remove();
            sendBtn.disabled = true;
        }, 6000)

    }, 2000)
}

//validating field of form
function validateField() {
//validate length of field
    validateLength(this);

    //validate email field
    if (this.type === "email") {
        validateEmail(this);
    }
    //able send button
    let error = document.querySelectorAll(".error");
    if (email.value !== "" && subject.value !== "" && message.value !== "") {
        if (error.length === 0) {
            sendBtn.disabled = false;
        }
    }
}

//validate length of field
function validateLength(field) {
    if (field.value.length) {
        field.style.borderBottomColor = "green";
        field.classList.remove("error");
    } else {
        field.style.borderBottomColor = "red";
        field.classList.add("error");
    }
}

//validate email field
function validateEmail(field) {
    if (field.value.includes("@")) {
        field.style.borderBottomColor = "green";
        field.classList.remove("error");
    } else {
        field.style.borderBottomColor = "red";
        field.classList.add("error");
    }

}

//reset form with reset button
function resetForm() {
    form.reset();
    sendBtn.disabled = true;
    email.style.borderBottomColor = "unset";
    subject.style.borderBottomColor = "unset";
    message.style.borderBottomColor = "unset";
}


