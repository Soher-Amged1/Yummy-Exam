const displayData=document.getElementById("displayData")
let mealIngredient=document.getElementById("mealIngredient")
let i=document.getElementById("displayin")

const loading = document.querySelector(".loading");
     $(document).ready(() => {
        loading.classList.remove("d-none");
       searchByName()
    })
closeNav()
function closeNav(time = 0) {
    $("#closeNav").css("display", "none")
    $("#openNav").css("display", "block")
    let widht = $(".nav1").innerWidth()
    $(".nav-bar").animate({ left: `-${widht}px` }, time)
    $(".nav-bar ul li").animate({ top: "300px" }, 500)
}
// To open 
$("#openNav").click(function () {
    $("#closeNav").css("display", "block")
    $("#openNav").css("display", "none")
    $(".nav-bar").animate({ left: "0px" }, 500)
    for (let i = 0; i < 5; i++) {
        $(".nav-bar ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
})
// To close
$("#closeNav").click(function () {
    closeNav(500)
})
// navlinks
$(".navLink").click((e) => {
    let link = e.target.getAttribute("getid")
    closeNav(500)
    $(`#${link}`).siblings().css("display", "none")
    $(`#${link}`).css("display", "block")
    $("#loading").fadeIn(0);
    $("#loading").fadeOut(1000);
})
async function searchByName (name=""){
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data=await response.json()
    console.log(data)
    loading.classList.add("d-none");
    display(data)
    meal()

}
function display(data){
    let len =(data.meals).length
    let temp=''
    for (let i=0;i<len;i++)
    {
        
        temp +=`<div class="col-md-3">
        <div dataid="${data.meals[i].idMeal}"class ="item rounded-2 position-relative">
        <div class="layer d-flex align-items-center">
        <h5 class="">${data.meals[i].strMeal}</h5>
        </div>
        <img class="w-100 rounded-2"src="${data.meals[i].strMealThumb}"alt="yummy">
        </div>
        </div>`
    }
        loading.classList.remove("d-none");
        displayData.innerHTML=temp
        loading.classList.add("d-none");
    }
function meal(){
        let meal=document.querySelectorAll(".item")
        meal.forEach(elm => {
        elm.addEventListener("click",async function(){
        await (fetchMeal(elm))
        displayData.innerHTML=''
        i.innerHTML=temp

})   
    });
}
async function fetchMeal(item){
    const id=item.getAttribute("dataid")
    loading.classList.remove("d-none");

    let resp=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data=await resp.json()
     let meal=data.meals[0]
     displaymeal(meal)
     loading.classList.add("d-none");

    }
function displaymeal(meal){
      let tempingred=""
     let i=1
     do {
        tempingred+=  `<li class="alert alert-info m-2 p-1"><span>${(meal[`strMeasure${i}`] )}</span><span>${(meal[`strIngredient${i}`])}</span> </li>`
        i++;
       } while ((meal[`strIngredient${i}`])!="");
       let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>` }
    let temp=""
    temp +=`<div class="my-3 mx-5 row g-4 text-white">
    <div class="col-md-4">
    <img class="w-100 rounded-2" alt="meal-pic" src="${meal.strMealThumb}">
    <h4 class="py-2 fs-1 ">${meal.strMeal}</h4>
    </div>
    <div class="col-md-8">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    <h3>Area :<span>${meal.strArea}</span></h3>
    <h3>Category :<span>${meal.strCategory}</span></h3>
    <h3>Recipes :
    </h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${tempingred}
        </ul>
        <h3> Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
           ${tagsStr}
       </ul>
        <span class="btn btn-success">Source<a src="${meal.strSource}" target="_blank"></a></span>
        <span class="btn btn-danger">Youtube<a src="${meal.strYoutube}" target="_blank"></a></span>
</div>
</div>`
mealIngredient.innerHTML=temp

}

async function searchLetter(letter){
    let resp=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data=await resp.json()
    display(data)
    meal() 
}


async function searchName(name){
    await searchByName(name)
}
function showSearchInputs(){
    displayData.innerHTML=''
    mealIngredient.innerHTML=''
    temp=`<div class="row py-4 placecolor">
      <div  class="col-md-6">
      <input onkeyup="searchName(this.value)" id="name" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
     </div>
     <div class="col-md-6">
     <input onkeyup="searchLetter(this.value)"id="letter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
     </div>
     </div>
     </div>`
i.innerHTML=temp
/*
document.getElementById("name").addEventListener("keyup", () => {
    searchName()
 })*/
}


async function showCategory(){
    loading.classList.remove("d-none");
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data=await response.json()
    console.log(data)
displayCategory(data.categories)
loading.classList.add("d-none");
i.innerHTML=""

}
function displayCategory(data){

    displayData.innerHTML=''
    mealIngredient.innerHTML=''
    loading.classList.remove("d-none");

temp=""
for(let i=0;i<data.length;i++){
    temp+=`<div class="col-md-3">
    <div dataid="${data[i].strCategory}"class ="item rounded-2 position-relative">
    <div class="layer text-center">
    <h5 class="">${data[i].strCategory}</h5>
    <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
    <img class="w-100 rounded-2"src="${data[i].strCategoryThumb}"alt="yummy">
    </div>
    </div>`
}
loading.classList.add("d-none");

displayData.innerHTML=temp
    let meal=document.querySelectorAll(".item")
    meal.forEach(elm => {
    elm.addEventListener("click",async function(){
    let name=elm.getAttribute("dataid")
    displayData.innerHTML=''
    await (fetchcategoryMeals(name))
    })})
}
async function fetchcategoryMeals(catName){
    loading.classList.remove("d-none");
    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    const data=await response.json()
    console.log(data)
    display(data)
    loading.classList.add("d-none");

    meal()
}
async function showArea(){
    i.innerHTML=""

    loading.classList.remove("d-none");

    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data=await response.json()
    console.log(data)
    displayArea(data.meals)
    loading.classList.add("d-none");

}
function displayArea(data){
    loading.classList.remove("d-none");

    displayData.innerHTML=''
    mealIngredient.innerHTML=''
temp=""
for(let i=0;i<data.length;i++){
    temp+=`
    <div class="col-md-3">
    <div dataid=${data[i].strArea} class ="item text-white text-center">
    <i class="fa-solid fa-house-laptop areaicon"></i>
    <h5 class="fs-2">${data[i].strArea}</h5>
    </div>
    </div>`
}
displayData.innerHTML=temp
loading.classList.add("d-none");

let meal=document.querySelectorAll(".item")
    meal.forEach(elm => {
    elm.addEventListener("click",async function(){
    let area=elm.getAttribute("dataid")
    displayData.innerHTML=''
    await (fetchAreaMeals(area))
})
    })}
async function fetchAreaMeals(area){
    loading.classList.remove("d-none");

    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data=await response.json()
    console.log(data)
    display(data)
    loading.classList.add("d-none");

    meal()
}

async function showIngredients(){
    i.innerHTML=""

    loading.classList.remove("d-none");

    const response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const data=await response.json()
    let newArray = (data.meals).slice(0, 20);
    displayIngredients(newArray)
    loading.classList.add("d-none");

}

function displayIngredients(data){
    loading.classList.remove("d-none");

    displayData.innerHTML=''
    mealIngredient.innerHTML=''
temp=""
for(let i=0;i<data.length;i++){
    temp+=`
    <div class="col-md-3">
    <div dataid=${data[i].strIngredient} class ="item text-white text-center">
    <i class="fa-solid fa-drumstick-bite fs-1"></i>
        <h5 class="fs-2">${data[i].strIngredient}</h5>
        <p> ${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
    </div>`
}
displayData.innerHTML=temp
loading.classList.add("d-none");

let meal=document.querySelectorAll(".item")
    meal.forEach(elm => {
    elm.addEventListener("click",async function(){
    let Ingredient=elm.getAttribute("dataid")
    displayData.innerHTML=''
    await (fetchIngredientMeals(Ingredient))
})
    })}

async function fetchIngredientMeals(Ingredient){
    loading.classList.remove("d-none");

    const response =await fetch(`    https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
    const data=await response.json()
    console.log(data)
    display(data)
    loading.classList.add("d-none");

    meal()
   }
   let resultName =false
   let resultGmail=false
   let resultPhone=false
   let resultage=false
   let resultpassword=false
   let reresultpassword=false
   function contact(){
    i.innerHTML=""

    displayData.innerHTML=''
    mealIngredient.innerHTML=''

    temp=`<div id="rcontact" class ="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="row form-group g-4">
      <div class="col-md-6">
      <input class="form-control" id="RName"type="text" placeholder="Enter Your Name">
      <div id="nameAlert" class="alert alert-danger w-100 mt-2">
    Special characters and numbers not allowed
    </div>
     </div>
     <div class="col-md-6">
     <input class="form-control"id="RGmail" type="email" placeholder="Enter Your Gmail">
     <div id="emailAlert" class="alert alert-danger w-100 mt-2">
    Email not valid *exemple@yyy.zzz</div>
     </div>
     <div class="col-md-6">
     <input id="RPhone"class="form-control" type="tel" placeholder="Enter Your Phone">
     <div id="phoneAlert" class="alert alert-danger w-100 mt-2">
     Enter valid Phone Number     </div>
    </div>
    <div class="col-md-6">
    <input class="form-control"id="RAge" type="number" placeholder="Enter Your Age">
    <div id="ageAlert" class="alert alert-danger w-100 mt-2">
     Enter valid Age </div>
    </div>
    <div class="col-md-6">
    <input class="form-control"id="Rpassword" type="password" placeholder="Enter Your password">
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2">
    Enter valid password *Minimum eight characters, at least one letter and one number:* </div>
   </div>
   <div class="col-md-6">
   <input class="form-control"id="Rrepassword" type="password" placeholder="Repassword">
   <div id="repasswordAlert" class="alert alert-danger w-100 mt-2">
   Enter valid repassword </div>
   </div>
   <div class="col-md-12 d-flex justify-content-center">
   <button id="submitBtn"  class="btn btn-outline-danger disabled px-2 mt-3">Submit</button>
   </div>
     </div>     
     </div></div>
`
displayData.innerHTML=temp

document.getElementById("RName").addEventListener("keyup", () => {
   checkName()
})
document.getElementById("RGmail").addEventListener("keyup", () => {
   checkGmail()
 
})
document.getElementById("RPhone").addEventListener("keyup", () => {
   checkPhone()

})
document.getElementById("RAge").addEventListener("keyup", () => {
    checkAge()

})
document.getElementById("Rpassword").addEventListener("keyup", () => {
  checkPassword()

})
document.getElementById("Rrepassword").addEventListener("keyup", () => {
   checkRePassword()
   validate()

  })
   }
   

   function checkName(){
    let Name= document.getElementById("RName")
    let regexName = /^[A-Za-z]{1,10}$/
    resultName = regexName.test((Name.value))
    if (resultName==true){
        document.querySelector("#nameAlert").style.display="none"
        return true

    }
    else{
        document.querySelector("#nameAlert").style.display="block"
        return false

    }
   }
   function checkGmail(){
    let Gmail= document.getElementById("RGmail")
    let regexGmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    resultGmail = regexGmail.test((Gmail.value))
   
    if (resultGmail==true){
        document.querySelector("#emailAlert").style.display="none"
        return true

    }
    else{
        document.querySelector("#emailAlert").style.display="block"
        return false

    }
   }
   function checkPhone(){
    let phone= document.getElementById("RPhone")
    let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
     resultPhone = regexPhone.test((phone.value))
    if (resultPhone==true){
        document.querySelector("#phoneAlert").style.display="none"
        return true
    }
    else{
        document.querySelector("#phoneAlert").style.display="block"
        return false

    }
   }
   function checkAge(){
    let age= document.getElementById("RAge")
    let regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
     resultage = regexAge.test((age.value))
    if (resultage==true){
        document.querySelector("#ageAlert").style.display="none"
        return true
    }
    else{
        document.querySelector("#ageAlert").style.display="block"
        return false

    }
   }
   function checkPassword(){
    let password= document.getElementById("Rpassword")
    let regexpassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
     resultpassword = regexpassword.test((password.value))
    if (resultpassword==true){
        document.querySelector("#passwordAlert").style.display="none"
        return true
    }
    else{
        document.querySelector("#passwordAlert").style.display="block"
        return false
    }
   }
   function checkRePassword(){
    let repassword= document.getElementById("Rrepassword").value
    let password=document.getElementById("Rpassword").value
    
    if(repassword==password){
        document.querySelector("#repasswordAlert").style.display="none"
        reresultpassword==true
        return true
    }
    else{
        document.querySelector("#repasswordAlert").style.display="block"
        return false

    }    
   }

   function validate(){
   if(checkAge()==true&&checkGmail()==true&&checkName()==true&&checkPassword()==true&&checkPhone()==true&&checkRePassword()==true){

    $("#submitBtn").removeClass("disabled")
    console.log("hello")
       }
       else {
        $("#submitBtn").addClass("disabled")
    }}