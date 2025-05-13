function getInput() {
    const userInput = document.getElementById("userInput").value;
    searchFood(userInput);
}

const modal = document.getElementById("foodModal");
const closeBtn = document.getElementsByClassName("close")[0];


closeBtn.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const showFoodDetails = (meal) => {
    const modalContent = document.getElementById("modalContent");

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    modalContent.innerHTML = `
        <div class="modal-food-details">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="modal-food-image">
            <div>
                <h2>${meal.strMeal}</h2>
                
                <h4 style="display: inline;">Category&nbsp;&nbsp;&nbsp;: </h4>${meal.strCategory}<br>
                <h4 style="display: inline;">Area&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </h4>${meal.strArea}<br>
                <h4 style="display: inline;">Ingredient&nbsp;: </h4>${meal.strIngredient1}
                <h4>Ingredients:</h4>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.style.display = "block";
};

const searchFood = (search_item) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_item}`)
        .then(res => res.json())
        .then(data => {
            const resultDiv = document.getElementById("fooditem");

            if (data.meals) {
                const matchedMeals = data.meals.filter(meal =>
                    meal.strMeal.toLowerCase().includes(search_item.toLowerCase())
                );

                if (matchedMeals.length > 0) {
                    resultDiv.innerHTML = matchedMeals.map(meal => `
                        <div class="food_card" onclick="showFoodDetails(${JSON.stringify(meal).replace(/"/g, '&quot;')})">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    `).join('');
                }
            }
            else {
                resultDiv.innerHTML = '<div class="food_card">No meals found</div>';
            }
        })

};


searchFood("");