// error
const error = document.getElementById('error');
error.style.display = 'none';
const errorApi = document.getElementById('error-message');
errorApi.style.display = 'none';
const noResult = document.getElementById('no-result');
noResult.style.display = 'none';

document.getElementById('button-addon2').addEventListener('click', async () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // clear input value
  searchField.value = '';
  if (searchText == '') {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      const res = await fetch(url);
      const data = await res.json();
      displayMeal(data.meals);
    } catch (err) {
      errorApi.style.display = 'block';
    }
  }
});
//  meal display cards
const displayMeal = (meals) => {
  const mealContainer = document.getElementById('search-result');
  mealContainer.textContent = '';
  if (meals == null) {
    noResult.style.display = 'block';
  } else {
    meals.forEach((meal) => {
      noResult.style.display = 'none';
      const div = document.createElement('div');
      div.classList.add('col');
      div.style.cursor = 'pointer';
      div.innerHTML = `
       <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      </div>
    </div>
    `;
      mealContainer.appendChild(div);
    });
  }
};
// single meal load
const loadMealDetails = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals[0]);
};
// single meal display card
const displayMealDetails = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  mealDetails.textContent = '';
  const div = document.createElement('div');
  div.style.border = '1px solid #eeeeee';
  div.innerHTML = `
<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">${meal.strMeal}</h5>
   <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
   <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `;
  mealDetails.appendChild(div);
};
