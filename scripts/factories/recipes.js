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

    function searchBar() {
        const articles = document.querySelectorAll('article');
        const champRecherche = document.querySelector('#search-bar');

        const filtrerArticles = () => {
            const recherche = champRecherche.value.toLowerCase();
            let isArticleFound = false;
            if (recherche.length >= 3) {
                articles.forEach(article => {
                    const titre = article.querySelector('.title').textContent.toLowerCase();
                    const ingredients = article.querySelector('.ingredients').textContent.toLowerCase();
                    const description = article.querySelector('.description').textContent.toLowerCase();
                    if (titre.includes(recherche) || ingredients.includes(recherche) || description.includes(recherche)) {
                        article.style.display = 'block';
                        isArticleFound = true;
                    } else {
                        article.style.display = 'none';
                    }
                });
                if (!isArticleFound) {
                    console.log('Aucun article trouvé');
                    const recipesSection = document.querySelector('#recipesSection')
                    const noResult = document.querySelector('#noResult')
                    noResult.style.display = 'block'
                } else if (isArticleFound) {
                    console.log('Article trouvé');
                    const noResult = document.querySelector('#noResult')
                    noResult.style.display = 'none'
                }
            }
        };

        champRecherche.addEventListener('input', () => {
            filtrerArticles();
        });

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