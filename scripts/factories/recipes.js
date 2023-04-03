function recipesFactory(recipes) {

    function getRecipesCardDOM() {

        const article = document.createElement('article')

        const image = document.createElement('div')
        image.classList.add('image')

        const information = document.createElement('div')
        information.classList.add('information')

        const title_time = document.createElement('div')
        title_time.classList.add('title_time')

        const title = document.createElement('div')
        title.classList.add('title')
        title.innerText = recipes.name

        const time = document.createElement('div')
        time.classList.add('time')
        time.innerText = recipes.time + ' min'

        const timeIcon = document.createElement('i')
        timeIcon.classList.add('fa-regular')
        timeIcon.classList.add('fa-clock')

        const ingredients_description = document.createElement('div')
        ingredients_description.classList.add('ingredients_description')

        const divIngredients = document.createElement('div')
        divIngredients.classList.add('ingredients')

        const description = document.createElement('div')
        description.classList.add('description')
        description.innerText = recipes.description


        article.appendChild(image)
        article.appendChild(information)

        information.appendChild(title_time)
        information.appendChild(ingredients_description)

        title_time.appendChild(title)
        title_time.appendChild(time)

        time.prepend(timeIcon);

        ingredients_description.appendChild(divIngredients)
        ingredients_description.appendChild(description)

        recipes.ingredients.forEach(ingredients => {

            let quantity = ingredients.quantity
            let ingredient = ingredients.ingredient
            let unit = ingredients.unit

            const oneIngredient = document.createElement('div')
            oneIngredient.classList.add('oneIngredient')
            const divQuantity = document.createElement('div')
            divQuantity.classList.add('quantity')


            if (unit) {
                oneIngredient.innerText = ingredient + ':' + ' '
                divQuantity.innerText = quantity + ' ' + unit
            } else if (quantity) {
                oneIngredient.innerText = ingredient + ': '
                divQuantity.innerText = quantity
            } else {
                oneIngredient.innerText = ingredient
            }


            ingredients_description.appendChild(oneIngredient)
            divIngredients.appendChild(oneIngredient)
            oneIngredient.appendChild(divQuantity)

        });

        return (article)

    }

    return { getRecipesCardDOM }
}

function recipes2Factory(recipes) {

    function searchBar(recipes, searchString) {
        // Vérifie que la recherche contient au moins 3 caractères
        if (searchString.length < 3) {
            return recipes;
        }

        // Convertit la chaîne de recherche en minuscules pour une recherche insensible à la casse
        searchString = searchString.toLowerCase();

        // Utilise la méthode filter pour sélectionner les recettes qui contiennent la chaîne de recherche
        const filteredRecipes = recipes.filter(recipe => {
            // Vérifie si le titre, les ingrédients ou la description de la recette contiennent la chaîne de recherche
            const titleMatch = recipe.title.toLowerCase().includes(searchString);
            const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchString));
            const descriptionMatch = recipe.description.toLowerCase().includes(searchString);

            // Retourne true si la recette contient la chaîne de recherche dans l'un des champs
            return titleMatch || ingredientsMatch || descriptionMatch;
        });

        // Utilise la méthode map pour ajouter une propriété "score" à chaque recette, qui représente le nombre d'occurrences de la chaîne de recherche dans la recette
        const scoredRecipes = filteredRecipes.map(recipe => {
            // Concatène tous les champs de la recette (titre, ingrédients, description) en une seule chaîne de caractères
            const allFields = recipe.title + recipe.ingredients.join(' ') + recipe.description;

            // Utilise la méthode reduce pour compter le nombre d'occurrences de la chaîne de recherche dans la recette
            const score = allFields.toLowerCase().split(searchString).length - 1;

            // Retourne une copie de la recette avec une propriété "score" ajoutée
            return { ...recipe, score };
        });

        // Utilise la méthode sort pour trier les recettes par score décroissant
        const sortedRecipes = scoredRecipes.sort((a, b) => b.score - a.score);

        // Retourne le tableau trié de recettes filtrées et notées
        return sortedRecipes;
    }



    function searchFilter() {

        function ingredientsFilter() {

            //creation d 'un tableau de tous les ingrédients
            let ingredients = new Set();

            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    ingredients.add(ingredient.ingredient);
                });
            });

            console.log(ingredients);

        }

        function appliancesFilter() {

            //creation d'un tableau de tous les appareils
            let appliances = new Set();

            recipes.forEach(recipe => {
                appliances.add(recipe.appliance);
            });

            console.log(appliances);

        }

        function ustensilsFilter() {

            //creation d'un tableau de tous les ustensiles

            let ustensils = new Set();

            recipes.forEach(recipe => {

                recipe.ustensils.forEach(ustensil => {
                    ustensils.add(ustensil);
                });
            });

            console.log(ustensils);

        }

        ingredientsFilter(), appliancesFilter(), ustensilsFilter()

    }

    return { searchFilter, searchBar }
}