//variables
const course = document.querySelector("#courses-list"),
    shoppingCartContent = document.querySelector("#cart-content tbody"),
    clearCartBtn = document.querySelector("#clear-cart");



//eventlisteners
eventListeners();
function eventListeners() {
    //access to the list of courses
    course.addEventListener("click" , byCourse);
    //remove course that user selected
    shoppingCartContent.addEventListener("click" , removeCourse);
    //removing all courses with clearCart button
    clearCartBtn.addEventListener("click" , clearCart);
    //show courses when page loaded
    document.addEventListener("DOMContentLoaded" , showOnLoaded);
}





//functions
//access to the course that customer selected
function byCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains("add-to-cart")){
        //access to the card div with parentElement
        const courses = e.target.parentElement.parentElement;
        //read values
        getCourseInfo(courses);
    }
}

//getting course information
function getCourseInfo(courses) {
    //access to the information that user selected
    let courseInfo ={
        image : courses.querySelector("img").src,
        title : courses.querySelector("h4").textContent,
        price : courses.querySelector("span").textContent,
        id : courses.querySelectorAll("a")[1].getAttribute("data-id")
    }
    //adding information to the cart
    addToCart(courseInfo);
}

//adding information to the cart
function addToCart(cInfo) {
    //create <tr> tag
    const row = document.createElement("tr");
    //build html template
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
    //adding row to the shopping cart
    shoppingCartContent.appendChild(row)
    ///adding courses to the localStorage
    addCourseTolocalStorage(cInfo);
}

//removing the course
function removeCourse(e) {
    let course , courseLS;
    if (e.target.classList.contains("remove")){
        e.target.parentElement.parentElement.remove();
        //removing course  from local storage
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector("a").getAttribute("data-id");
    }
    removeCourseLs(courseId);
}
//removing all courses
function clearCart() {
    //shoppingCartContent.innerHTML = "";
    while (shoppingCartContent.firstChild){
        shoppingCartContent.firstChild.remove();
    }
    //removing all courses from localStorage
    clearCartFromLS();
}
//adding courses to the localStorage
function addCourseTolocalStorage(cInfo) {
    let products = getCourseFromLocalStorage();
    //adding new courses to the array courses
    products.push(cInfo);
    //set courses to the localStorage
    localStorage.setItem("courses" ,JSON.stringify(products));
}
//getting courses from localStorage
function getCourseFromLocalStorage() {
    let courses;
    if (localStorage.getItem("courses")){
        courses = JSON.parse(localStorage.getItem("courses"));
    }else{
        courses = [];
    }
    return courses;
}
//removing all courses from localStorage
function clearCartFromLS() {
    localStorage.clear();
}
//removing course from localStorage
function removeCourseLs(courseId) {
    let courseFromLS = getCourseFromLocalStorage();

    courseFromLS.forEach(function (course , index) {
        if (course.id === courseId){
            courseFromLS.splice(index , 1)
        }
    });
    localStorage.setItem("courses" ,JSON.stringify(courseFromLS));
}
//show courses when page onLoaded
function showOnLoaded() {
    let coursesLS = getCourseFromLocalStorage();

    coursesLS.forEach(function (cInfo) {
        //create <tr> tag
        const row = document.createElement("tr");
        //build html template
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
        //adding row to the shopping cart
        shoppingCartContent.appendChild(row)
    })
}

