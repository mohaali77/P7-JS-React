function searchBar() {
    const searchBar = document.querySelector('#search-bar');
    const recipesSection = document.querySelector('#recipesSection');
    const noResultSection = document.querySelector('#noResult');
    const recipesTitle = document.querySelectorAll('.title');
    const recipesIngredients = document.querySelectorAll('.oneIngredient');
    const recipesDescription = document.querySelectorAll('.description');
    let recipes = [];

    // Récupération des recettes
    fetch('./data/recipes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data.recipes;
            searchBar.addEventListener('input', function () {
                const searchValue = searchBar.value.toLowerCase().trim();

                // Filtrage des recettes
                const filteredRecipes = [];
                for (let i = 0; i < recipes.length; i++) {
                    const recipe = recipes[i];
                    const title = recipe.name.toLowerCase();
                    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
                    const description = recipe.description.toLowerCase();
                    if (title.includes(searchValue) || ingredients.includes(searchValue) || description.includes(searchValue)) {
                        filteredRecipes.push(recipe);
                    }
                }

                // Affichage des recettes filtrées
                if (filteredRecipes.length === 0) {
                    noResultSection.style.display = 'block';
                    recipesSection.innerHTML = '';
                } else {
                    noResultSection.style.display = 'none';
                    recipesSection.innerHTML = '';
                    for (let i = 0; i < filteredRecipes.length; i++) {
                        const recipe = filteredRecipes[i];
                        const article = document.createElement('article');
                        const image = document.createElement('div');
                        image.classList.add('image');
                        const information = document.createElement('div');
                        information.classList.add('information');
                        const title_time = document.createElement('div');
                        title_time.classList.add('title_time');
                        const title = document.createElement('div');
                        title.classList.add('title');
                        title.innerText = recipe.name;
                        const time = document.createElement('div');
                        time.classList.add('time');
                        time.innerText = recipe.time + ' min';
                        const timeIcon = document.createElement('i');
                        timeIcon.classList.add('fa-regular');
                        timeIcon.classList.add('fa-clock');
                        const ingredients_description = document.createElement('div');
                        ingredients_description.classList.add('ingredients_description');
                        const divIngredients = document.createElement('div');
                        divIngredients.classList.add('ingredients');
                        const description = document.createElement('div');
                        description.classList.add('description');
                        description.innerText = recipe.description;
                        article.appendChild(image);
                        article.appendChild(information);
                        information.appendChild(title_time);
                        information.appendChild(ingredients_description);
                        title_time.appendChild(title);
                        title_time.appendChild(time);
                        time.prepend(timeIcon);
                        ingredients_description.appendChild(divIngredients);
                        ingredients_description.appendChild(description);
                        let j = 0;
                        while (j < recipe.ingredients.length) {
                            let quantity = recipe.ingredients[j].quantity;
                            let ingredient = recipe.ingredients[j].ingredient;
                            let unit = recipe.ingredients[j].unit;
                            const oneIngredient = document.createElement('div');
                            oneIngredient.classList.add('oneIngredient');
                            const divQuantity = document.createElement('div');
                            divQuantity.classList.add('quantity');
                            if (unit) {
                                oneIngredient.innerText = ingredient + ':' + ' ';
                                divQuantity.innerText = quantity + ' ' + unit;
                            } else if (quantity) {
                                oneIngredient.innerText = ingredient + ': ';
                                divQuantity.innerText = quantity;
                            } else {
                                oneIngredient.innerText = ingredient;
                            }
                            ingredients_description.appendChild(oneIngredient);
                            divIngredients.appendChild(oneIngredient);
                            j++;
                        }
                        recipesSection.appendChild(article);
                    }
                }
            });
        });
}

searchBar()
