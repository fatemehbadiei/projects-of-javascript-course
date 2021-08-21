//variables
const course = document.querySelector("#courses-list"),
    shoppingCartContent = document.querySelector("#cart-content tbody"),
    clearCartBtn = document.querySelector("#clear-cart")


//eventlisteners
eventListeners();

function eventListeners() {
    course.addEventListener("click", byCourse);

    //remove course from the card
    shoppingCartContent.addEventListener("click" , removeCourse);

    //remove all courses from the card
    clearCartBtn.addEventListener("click" , clearCart);

    //show courses when page loaded
    document.addEventListener("DOMContentLoaded" , showOnLoaded);
}


//functions
//adding the course to the cart
function byCourse(e) {
    e.preventDefault();
    //use delegation for access to the card that selected
    if (e.target.classList.contains("add-to-cart")) {
        //access to the card div with parentElement
        const course = e.target.parentElement.parentElement;
        //read values
        getCourseInfo(course);
    }
}

//getting the course info that user selected
function getCourseInfo(course) {
    //access to the course info
    const courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector("span").textContent,
        id: course.querySelectorAll("a")[1].getAttribute("data-id")

    }
    //adding the course to the card
    addToCart(courseInfo);
}

//adding the course to the card
function addToCart(cInfo) {
    //creat <tr> tag
    const row = document.createElement("tr");

    //Build HTML template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${cInfo.image}" width="100px">
            </td>
            <td>${cInfo.title}</td>
            <td>${cInfo.price}</td>
            <td>
                <a href="#" class="remove" data-id="${cInfo.id}">X</a>
            </td>
        </tr>
    `
    shoppingCartContent.appendChild(row);

    //adding courses to the localStorage
    saveToLocalStorage(cInfo);
}

//adding courses to the localStorage
function saveToLocalStorage(course) {
    let products = getFromLocalStorage();

    //adding new courses to the array courses
    products.push(course);

    //set courses to the localStorage
    localStorage.setItem("courses" , JSON.stringify(products));
}

//getting courses from localStorage
function getFromLocalStorage() {
    let courses;
    if (localStorage.getItem("courses")){
        courses = JSON.parse(localStorage.getItem("courses"));
    }else{
        courses = [];
    }
    return courses;
}

//remove course from the DOM
function removeCourse(e) {
    let course , courseId;
    if (e.target.classList.contains("remove")){
        e.target.parentElement.parentElement.remove();
        //remove course from localstorage
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector("a").getAttribute("data-id");
    }
    //remove course from localstorage
    removeCourseLs(courseId)
}

//remove course from localstorage
function removeCourseLs(id) {
    let coursesLs = getFromLocalStorage();
    coursesLs.forEach(function (course , index) {
        if (course.id === id){
            coursesLs.splice(index , 1)
        }
    });
    localStorage.setItem("courses" , JSON.stringify(coursesLs))
}

//remove all courses from the DOM
function clearCart() {
    // shoppingCartContent.innerHTML = "";

    while (shoppingCartContent.firstChild){
        shoppingCartContent.firstChild.remove();
    }
    //clear all courses from localStorage
    clearCartLS();
}

//clear all courses from localStorage
function clearCartLS() {
    localStorage.clear();
}


//show courses when page loaded
function showOnLoaded() {
    let coursesLS = getFromLocalStorage();

    //add courses into the card
    coursesLS.forEach(function (cInfo) {
        //creat <tr> tag
        const row = document.createElement("tr");

        //Build HTML template
        row.innerHTML = `
        <tr>
            <td>
                <img src="${cInfo.image}" width="100px">
            </td>
            <td>${cInfo.title}</td>
            <td>${cInfo.price}</td>
            <td>
                <a href="#" class="remove" data-id="${cInfo.id}">X</a>
            </td>
        </tr>
    `
        shoppingCartContent.appendChild(row);
    })
}
