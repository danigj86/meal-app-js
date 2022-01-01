const botonSearch = document.getElementById("botonSearch");
const inputText = document.getElementById("inputText");
let mealArea = document.getElementById("meal-area");


const getIngredients = (id) => {
    console.log(id)
    
    let textArea = document.getElementById(`modalTextnumber${id}`);
    // console.log(textArea);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52875`)
        .then(response => response.json())
        .then(data => {

            textArea.innerHTML = 
            `
            ${data.meals[0].strInstructions} </br></br>
            <a href="${data.meals[0].strYoutube}"  target="_blank" class=" btn btn-dark">Tutorial in YouTube</a>
            `
        });
}

const searchMeal = () => {
    var ingredient = inputText.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach((meal, i) => {
                    //console.log(meal.strMeal)
                    html += `
             <div class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">Check the button below to see the recipe</p>
                    <button type="button" onclick="getIngredients(${meal.idMeal})" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#number${i}">
                        Instructions
                    </button>
                </div>
            </div>
            
       <div class="modal fade" id="number${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div id="modalTextnumber${meal.idMeal}" class="modal-body">
                       <p>${meal.idMeal}</p>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                   </div>
               </div>
           </div>
       </div>
            
            `;
                })
            }
            else {
                html = `<div class="alert alert-danger" role="alert"> Meal not found! </div>`
            }
            //console.log(html);
            mealArea.innerHTML = html;
        });
}



botonSearch.addEventListener("click", searchMeal)     