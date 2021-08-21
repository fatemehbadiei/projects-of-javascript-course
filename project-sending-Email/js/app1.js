//variables
const sendBtn = document.querySelector("#sendBtn"),
    email = document.querySelector("#email"),
    subject = document.querySelector("#subject"),
    message = document.querySelector("#message"),
    resetBtn = document.querySelector("#resetBtn"),
    form = document.querySelector("#email-form");



//eventListeners
eventListeners();
function eventListeners() {
    //disable sendBtn when page loaded
    document.addEventListener("DOMContentLoaded" , appInit);
    //validate fields of form
    email.addEventListener("blur" ,validateField);
    subject.addEventListener("blur" ,validateField);
    message.addEventListener("blur" ,validateField);
    message.addEventListener("keyup" ,validateField);
    //reset form
    resetBtn.addEventListener("click" , resetForm);
    //submit form
    form.addEventListener("submit" , submitForm);
}


//functions
//disable sendBtn when page loaded
function appInit() {
    sendBtn.disabled = true;
}

//submit form
function submitForm(e) {
    e.preventDefault();

    //add gif when form submit
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "block";

    //create second gif and add to form when submit
    const sendEmailImg = document.createElement("img");
    sendEmailImg.src = "img/mail.gif";
    sendEmailImg.style.display = "block"

    setTimeout(function () {
        //hidden spinner gif
        spinner.style.display = "none";

        //add second gif to loaders
        const loaders = document.querySelector("#loaders");
        loaders.appendChild(sendEmailImg);

        setTimeout(function () {
            form.reset();
            sendEmailImg.remove();
            sendBtn.disabled = true;
        }, 6000)


    } ,2000)
}

//validate fields of form
function validateField() {
    validateLength(this);

    //validate email
    if (this.type === "email"){
        validateEmail(this);
    }

    //able sendBtn of form
    const error = document.querySelectorAll(".error")
    if(email.value !== "" && subject.value !== "" && message.value !== ""){
        if (error.length === 0 ){
            sendBtn.disabled = false;
        }
    }
}

//validate length of every input
function validateLength(field) {
    if (field.value.length){
        field.style.borderBottomColor ="green";
        field.classList.remove("error");
    }else{
        field.style.borderBottomColor ="red";
        field.classList.add("error");
    }
}

//validate email of form
function validateEmail(field) {
    if (field.value.includes("@")){
        field.style.borderBottomColor = "green";
        field.classList.remove("error");
    }else {
        field.style.borderBottomColor = "red";
        field.classList.add("error");
    }
}

//reset form
function resetForm() {
    form.reset();
    sendBtn.disabled = true;
    email.style.borderBottomColor = "unset";
    subject.style.borderBottomColor = "unset";
    message.style.borderBottomColor = "unset";
}











