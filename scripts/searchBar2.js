function searchBar() {
    const searchBar = document.querySelector('#search-bar');
    const recipesSection = document.querySelector('#recipesSection');
    const noResultSection = document.querySelector('#noResult');

    let tagSection = document.querySelector('#tagSection')
    let recipes = [];
    let recettesFiltre = []
    let recettesFiltreAvecTag = []
    let arrayTag = []

    // Récupération des recettes
    fetch('./data/recipes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data.recipes;
            searchBar.addEventListener('input', function () {

                if (searchBar.value.length >= 3) {
                    //on récupère la valeur saisie dans la barre de recherche dans une constante
                    const searchValue = searchBar.value.toLowerCase().trim();

                    // Filtrage des recettes
                    let filteredRecipes = [];
                    for (let i = 0; i < recipes.length; i++) {
                        const recipe = recipes[i];
                        const title = recipe.name.toLowerCase();
                        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
                        const description = recipe.description.toLowerCase();
                        if (title.includes(searchValue) || ingredients.includes(searchValue) || description.includes(searchValue)) {
                            filteredRecipes.push(recipe);
                        }
                    }

                    //on copie le tableau à chaque nouvelle recherche pour pouvoir l'exploiter dans les filtres
                    recettesFiltre = filteredRecipes.slice()

                    //on efface les tags existant et on vide le tableau des tags
                    tagSection.innerHTML = '';
                    arrayTag.length = 0

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
                } else {
                    recettesFiltre.length = 0
                    recettesFiltreAvecTag.length = 0
                    arrayTag.length = 0
                    tagSection.innerHTML = '';
                    noResultSection.style.display = 'none';
                    recipesSection.innerHTML = '';
                    recipes.forEach(recipe => {
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
                        recipe.ingredients.forEach(ingredients => {
                            let quantity = ingredients.quantity;
                            let ingredient = ingredients.ingredient;
                            let unit = ingredients.unit;
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
                            oneIngredient.appendChild(divQuantity);
                        });
                        recipesSection.appendChild(article);
                    });

                }
            });

            function filterBar() {

                function createElement() {

                    if (recettesFiltreAvecTag.length === 0) {
                        noResultSection.style.display = 'block';
                        recipesSection.innerHTML = '';
                    } else {
                        noResultSection.style.display = 'none';
                        recipesSection.innerHTML = '';
                        recettesFiltreAvecTag.forEach(recipe => {
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
                            recipe.ingredients.forEach(ingredients => {
                                let quantity = ingredients.quantity;
                                let ingredient = ingredients.ingredient;
                                let unit = ingredients.unit;
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
                                oneIngredient.appendChild(divQuantity);
                            });
                            recipesSection.appendChild(article);
                        });
                    }
                }

                function ingredientsFilter() {

                    //Récupération éléments DOM
                    const container = document.querySelector('#container-ingredients')
                    const input = container.querySelector('input')
                    const inputAngle = container.querySelector('.fa-angle-down')
                    let arrayIngredients = [];

                    //fonction qui va permettre d'initialiser le tableau arrayIngredients
                    function initializeArrayIngredient() {

                        function initializeFunction() {
                            //si aucune recherche n'a été faite sur la barre de recherche
                            if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none') {

                                // si une recherche avec filtre existe déjà on va récupérer les ingrédients du tableau recetteFiltreAvecTag
                                // dans le tableau arrayIngredients
                                if (recettesFiltreAvecTag.length > 0) {
                                    arrayIngredients.length = 0
                                    recettesFiltreAvecTag.forEach(recipe => {
                                        recipe.ingredients.forEach(ingredient => {
                                            if (!arrayIngredients.includes(ingredient.ingredient)) {
                                                arrayIngredients.push(ingredient.ingredient);
                                            }
                                        });
                                    });
                                }//sinon on va récupérer les ingrédient directement du tableau recipes,  dans le tableau arrayIngredients
                                else {
                                    arrayIngredients.length = 0
                                    recipes.forEach(recipe => {
                                        recipe.ingredients.forEach(ingredient => {
                                            if (!arrayIngredients.includes(ingredient.ingredient)) {
                                                arrayIngredients.push(ingredient.ingredient);
                                            }
                                        });
                                    });
                                }

                            }

                            //si le tableau recetteFiltre est remplis, donc si une recherche a déjà 
                            //été faite avec la barre de recherche
                            else if (recettesFiltre.length > 0) {

                                // si une recherche avec filtre existe déjà on va récupérer les ingrédients du tableau recetteFiltreAvecTag
                                // dans le tableau arrayIngredients
                                if (recettesFiltreAvecTag.length > 0) {
                                    arrayIngredients.length = 0
                                    recettesFiltreAvecTag.forEach(recipe => {
                                        recipe.ingredients.forEach(ingredient => {
                                            if (!arrayIngredients.includes(ingredient.ingredient)) {
                                                arrayIngredients.push(ingredient.ingredient);
                                            }
                                        });
                                    });
                                    //sinon on va récupérer les ingrédient du tableau recetteFiltre,  dans le tableau arrayIngredients
                                } else {
                                    arrayIngredients.length = 0
                                    recettesFiltre.forEach(recipe => {
                                        recipe.ingredients.forEach(ingredient => {
                                            if (!arrayIngredients.includes(ingredient.ingredient)) {
                                                arrayIngredients.push(ingredient.ingredient);
                                            }
                                        });

                                    });
                                }
                            }
                        }

                        //au clic sur le la flèche de l'input : 
                        inputAngle.addEventListener('click', initializeFunction)

                        //lors de la saisie de texte sur l'input :
                        input.addEventListener('input', initializeFunction)
                    }

                    //fonction qui va afficher la liste des ingrédients du filtre 
                    function showFullList() {

                        //lors du clic sur la flèche
                        inputAngle.addEventListener('click', () => {

                            const ul = document.querySelector('.options-ingredients');
                            // si la liste est déjà affichée on masque la liste. 
                            if (ul.style.display === 'grid') {
                                ul.style.display = 'none';
                                //on supprime le contenu à chaque fois que l'on masque, car elle sera recréer
                                ul.innerHTML = '';
                                //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                input.removeAttribute('id', 'ingredients-click');
                                input.setAttribute('id', 'ingredients');
                                input.removeAttribute('placeholder', 'Rechercher un ingredient');
                                input.setAttribute('placeholder', 'Ingredients');
                                //la rotation de la flèche reste initial, vers le bas
                                inputAngle.style.transform = 'rotate(0deg)';
                                input.style.width = '130px'
                                ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                input.value = ''
                            }
                            // sinon on affiche la liste.
                            else {
                                ul.style.display = 'grid';
                                //pour chaque ingredient du tableau arrayIngredients :
                                arrayIngredients.forEach((ingredient) => {
                                    //on crée des balise li
                                    const li = document.createElement('li');
                                    //on ajoute un ingrédient dans chaque balise li
                                    li.innerText = ingredient;
                                    //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                    input.removeAttribute('id', 'ingredients');
                                    input.setAttribute('id', 'ingredients-click');
                                    input.removeAttribute('placeholder', 'Ingredients');
                                    input.setAttribute('placeholder', 'Rechercher un ingredient');
                                    //on modifie le css de l'input et de la flèche
                                    input.style.width = '589px'
                                    inputAngle.style.transform = 'rotate(180deg)';
                                    inputAngle.style.display = 'inline-block';
                                    //on ajoute les balise li à l'intérieur de la balise ul
                                    ul.appendChild(li);
                                    //si la section des tag contient au moins 1 éléments, on arrange le css de la liste
                                    const tagSection = document.querySelector('#tagSection')
                                    if (tagSection.childElementCount > 0) {
                                        ul.style.top = '271px'
                                    } else {
                                        ul.style.top = '232px'
                                    }

                                    //si le tableau qu'on a créé possède 0 ingredients
                                    if (arrayIngredients.length === 0) {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#ingredients-click')
                                        inputClicked.style.width = '130px';


                                        //si le tableau qu'on a créé possède qu'un seul ingredient
                                    } else if (arrayIngredients.length === 1) {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#ingredients-click')
                                        ul.style.gridTemplateColumns = '1fr'
                                        inputClicked.style.width = '188.5px';
                                    }
                                    //si le tableau qu'on a créé possède 2 ingredients
                                    else if (arrayIngredients.length === 2) {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#ingredients-click')
                                        ul.style.gridTemplateColumns = '1fr 1fr'
                                        inputClicked.style.width = '389px';
                                    }
                                    else {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#ingredients-click')
                                        ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                        inputClicked.style.width = '589px';
                                    }
                                });
                            }
                        })
                        //lors du clic sur l'input
                        input.addEventListener('click', () => {
                            //lorsque du texte est saisie dans l'input :
                            input.addEventListener('input', () => {
                                const ul = document.querySelector('.options-ingredients');
                                //on récupère le texte saisie dans l'input tout en minuscule 
                                const searchValue = input.value.toLowerCase();

                                const filteredIngredients = arrayIngredients.filter((ingredient) => {
                                    return ingredient.toLowerCase().includes(searchValue);
                                });

                                //on affiche la liste d'ingrédient
                                ul.style.display = 'grid'
                                //on supprime le contenu de la liste, car elle sera recréé
                                ul.innerHTML = '';
                                //pour chaque élément du tableau d'ingrédient qu'on aura été créer :
                                filteredIngredients.forEach((ingredient) => {
                                    //on crée des éléments li
                                    const li = document.createElement('li');
                                    //on ajoute dans chaque li, un ingredient de la liste
                                    li.textContent = ingredient;
                                    //on ajoute les balise li à la balise ul
                                    ul.appendChild(li);
                                });

                                //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                input.removeAttribute('id', 'ingredients');
                                input.setAttribute('id', 'ingredients-click');
                                input.removeAttribute('placeholder', 'Ingredients');
                                input.setAttribute('placeholder', 'Rechercher un ingredient');
                                //on modifie le css de la flèche
                                inputAngle.style.transform = 'rotate(180deg)';
                                inputAngle.style.display = 'inline-block';
                                const tagSection = document.querySelector('#tagSection')
                                //si la section des tag contient au moins 1 éléments, on arrange le css de la liste
                                if (tagSection.childElementCount > 0) {
                                    ul.style.top = '271px'
                                } else {
                                    ul.style.top = '232px'
                                }

                                //si le tableau qu'on a créé possède 0 ingredients
                                if (filteredIngredients.length === 0) {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#ingredients-click')
                                    inputClicked.style.width = '130px';


                                    //si le tableau qu'on a créé possède qu'un seul ingredient
                                } else if (filteredIngredients.length === 1) {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#ingredients-click')
                                    ul.style.gridTemplateColumns = '1fr'
                                    inputClicked.style.width = '188.5px';
                                }
                                //si le tableau qu'on a créé possède 2 ingredients
                                else if (filteredIngredients.length === 2) {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#ingredients-click')
                                    ul.style.gridTemplateColumns = '1fr 1fr'
                                    inputClicked.style.width = '389px';
                                }
                                else {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#ingredients-click')
                                    ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                    inputClicked.style.width = '589px';
                                }
                            });
                        })

                    }

                    //fonction qui va masquer la liste des ingrédients du filtre
                    function maskList() {
                        //lors du clic
                        document.addEventListener('click', (event) => {
                            const ul = document.querySelector('.options-ingredients');
                            const estMonElement = event.target === container || container.contains(event.target);
                            const estMonBouton = event.target === inputAngle;
                            if (!estMonBouton && !estMonElement) {
                                ul.style.display = 'none';
                                ul.innerHTML = '';
                                input.value = ''
                                input.removeAttribute('id', 'ingredients-click');
                                input.setAttribute('id', 'ingredients');
                                input.removeAttribute('placeholder', 'Rechercher un ingredient');
                                input.setAttribute('placeholder', 'Ingredients');
                                input.style.width = '130px'
                                inputAngle.style.transform = 'rotate(0deg)';
                                ul.style.gridTemplateColumns = '1fr 1fr 1fr'

                            }
                        });
                    }

                    function createTag() {

                        inputAngle.addEventListener('click', create);

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                create()
                            })

                        })

                        function create() {
                            const ul = document.querySelector('.options-ingredients');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        const tagText = event.target.textContent;
                                        console.log(1);
                                        if (!arrayTag.includes(tagText)) { // Vérifie si le tag n'est pas déjà dans le tableau
                                            arrayTag.push(tagText);
                                            const tagSection = document.querySelector('#tagSection');
                                            const tag = document.createElement('div');
                                            tag.textContent = tagText;
                                            tag.setAttribute('class', 'tag-ingredients');
                                            const i = document.createElement('i');
                                            i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark');
                                            tagSection.appendChild(tag);
                                            tag.appendChild(i);
                                            ul.style.display = 'none'
                                            ul.innerHTML = ''
                                            input.removeAttribute('id', 'ingredients-click');
                                            input.setAttribute('id', 'ingredients');
                                            input.removeAttribute('placeholder', 'Rechercher un ingredient');
                                            input.setAttribute('placeholder', 'Ingredients');
                                            //la rotation de la flèche reste initial, vers le bas
                                            inputAngle.style.transform = 'rotate(0deg)';
                                            input.style.width = '130px'
                                            ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                            input.value = ''

                                        }
                                        ul.style.top = '271px';
                                    });
                                });
                            }
                        }

                    }

                    function filterFunction() {

                        function filter() {
                            const ul = document.querySelector('.options-ingredients');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {

                                        if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none' && recettesFiltreAvecTag.length === 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recipes.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });

                                        }
                                        else if (recettesFiltre.length > 0 && recettesFiltreAvecTag.length === 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recettesFiltre.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });
                                        }
                                        else if (recettesFiltreAvecTag.length > 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recettesFiltreAvecTag.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });

                                        }
                                        createElement()

                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', filter)

                        input.addEventListener('click', () => {

                            input.addEventListener('input', () => {
                                filter()
                            })
                        })
                    }

                    function deleteTag() {

                        function deleteFunction() {
                            const ul = document.querySelector('.options-ingredients');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        const allTag = document.querySelectorAll('.tag-ingredients')
                                        allTag.forEach(tag => {
                                            const i = tag.querySelector('i')
                                            i.addEventListener('click', (event) => {
                                                const index = arrayTag.indexOf(event.target.parentNode.textContent);
                                                if (index !== -1) {
                                                    arrayTag.splice(index, 1); // Supprime l'élément du tableau
                                                    event.target.parentNode.remove()
                                                }

                                                if (arrayTag.length <= 0) {
                                                    ul.style.top = '232px'
                                                }

                                                if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none') {
                                                    // On filtre les recettes avec la méthode filter
                                                    recettesFiltreAvecTag = recipes.filter((recipe) => {
                                                        // On récupère les ingrédients, ustensiles et appareils de la recette
                                                        const { ingredients, ustensils, appliance } = recipe;

                                                        // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                        const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                        // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                        return arrayTag.every((tag) => allTags.includes(tag));
                                                    });

                                                }
                                                else if (recettesFiltre.length > 0) {
                                                    // On filtre les recettes avec la méthode filter
                                                    recettesFiltreAvecTag = recettesFiltre.filter((recipe) => {
                                                        // On récupère les ingrédients, ustensiles et appareils de la recette
                                                        const { ingredients, ustensils, appliance } = recipe;

                                                        // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                        const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                        // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                        return arrayTag.every((tag) => allTags.includes(tag));
                                                    });
                                                }

                                                createElement()
                                            })
                                        });
                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', deleteFunction)

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                deleteFunction()
                            })
                        })
                    }

                    initializeArrayIngredient()
                    showFullList()
                    maskList()
                    createTag();
                    filterFunction()
                    deleteTag()

                }

                function appliancesFilter() {

                    //Récupération éléments DOM
                    const container = document.querySelector('#container-appareils')
                    const input = container.querySelector('input')
                    const inputAngle = container.querySelector('.fa-angle-down')
                    let arrayAppliances = [];


                    //fonction qui va permettre d'initialiser le tableau arrayIngredients
                    function initializeArrayAppareils() {

                        function initializeFunction() {
                            if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none') {

                                if (recettesFiltreAvecTag.length > 0) {
                                    arrayAppliances.length = 0
                                    recettesFiltreAvecTag.forEach(recipe => {
                                        if (!arrayAppliances.includes(recipe.appliance)) {
                                            arrayAppliances.push(recipe.appliance);
                                        }
                                    });
                                } else {

                                    arrayAppliances.length = 0
                                    recipes.forEach(recipe => {
                                        if (!arrayAppliances.includes(recipe.appliance)) {
                                            arrayAppliances.push(recipe.appliance);
                                        }
                                    });
                                }

                            }
                            else if (recettesFiltre.length > 0) {

                                if (recettesFiltreAvecTag.length > 0) {
                                    arrayAppliances.length = 0
                                    recettesFiltreAvecTag.forEach(recipe => {
                                        if (!arrayAppliances.includes(recipe.appliance)) {
                                            arrayAppliances.push(recipe.appliance);
                                        }
                                    });
                                } else {

                                    arrayAppliances.length = 0
                                    recettesFiltre.forEach(recipe => {
                                        if (!arrayAppliances.includes(recipe.appliance)) {
                                            arrayAppliances.push(recipe.appliance);
                                        }
                                    });
                                }
                            }
                        }

                        inputAngle.addEventListener('click', initializeFunction)

                        input.addEventListener('input', initializeFunction)
                    }

                    //fonction qui va afficher la liste des ingrédients du filtre 
                    function showFullList() {

                        //lors du clic sur la flèche
                        inputAngle.addEventListener('click', () => {

                            const ul = document.querySelector('.options-appareils');
                            // si la liste est déjà affichée on masque la liste. 
                            if (ul.style.display === 'grid') {
                                ul.style.display = 'none';
                                //on supprime le contenu à chaque fois que l'on masque, car elle sera recréer
                                ul.innerHTML = '';
                                //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                input.removeAttribute('id', 'appareils-click');
                                input.setAttribute('id', 'appareils');
                                input.removeAttribute('placeholder', 'Rechercher un ingredient');
                                input.setAttribute('placeholder', 'Appareils');
                                //la rotation de la flèche reste initial, vers le bas
                                inputAngle.style.transform = 'rotate(0deg)';
                                input.style.width = '130px'
                                ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                input.value = ''
                            }
                            // sinon on affiche la liste.
                            else {
                                ul.style.display = 'grid';
                                //pour chaque ingredient du tableau arrayIngredients :
                                arrayAppliances.forEach((appliance) => {
                                    //on crée des balise li
                                    const li = document.createElement('li');
                                    //on ajoute un ingrédient dans chaque balise li
                                    li.innerText = appliance;
                                    //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                    input.removeAttribute('id', 'appareils');
                                    input.setAttribute('id', 'appareils-click');
                                    input.removeAttribute('placeholder', 'Appareils');
                                    input.setAttribute('placeholder', 'Rechercher un appareil');
                                    //on modifie le css de l'input et de la flèche
                                    input.style.width = '589px'
                                    inputAngle.style.transform = 'rotate(180deg)';
                                    inputAngle.style.display = 'inline-block';
                                    //on ajoute les balise li à l'intérieur de la balise ul
                                    ul.appendChild(li);
                                    //si la section des tag contient au moins 1 éléments, on arrange le css de la liste
                                    const tagSection = document.querySelector('#tagSection')
                                    if (tagSection.childElementCount > 0) {
                                        ul.style.top = '271px'
                                    } else {
                                        ul.style.top = '232px'
                                    }

                                    //si le tableau qu'on a créé possède 0 ingredients
                                    if (arrayAppliances.length === 0) {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#appareils-click')
                                        inputClicked.style.width = '130px';

                                        //si le tableau qu'on a créé possède qu'un seul ingredient
                                    } else if (arrayAppliances.length === 1) {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#appareils-click')
                                        ul.style.gridTemplateColumns = '1fr'
                                        inputClicked.style.width = '188.5px';
                                    }
                                    //si le tableau qu'on a créé possède 2 appareils
                                    else if (arrayAppliances.length === 2) {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#appareils-click')
                                        ul.style.gridTemplateColumns = '1fr 1fr'
                                        inputClicked.style.width = '389px';
                                    }
                                    else {
                                        //on modifie le css pour qu'il corresponde à la maquette
                                        const inputClicked = document.querySelector('#appareils-click')
                                        ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                        inputClicked.style.width = '589px';
                                    }
                                });

                            }
                        })
                        //lors du clic sur l'input
                        input.addEventListener('click', () => {
                            const ul = document.querySelector('.options-appareils');
                            //lorsque du texte est saisie dans l'input :
                            input.addEventListener('input', () => {
                                //on récupère le texte saisie dans l'input tout en minuscule 
                                const searchValue = input.value.toLowerCase();

                                const filteredAppareils = arrayAppliances.filter((appliance) => {
                                    return appliance.toLowerCase().includes(searchValue);
                                });

                                //on affiche la liste d'ingrédient
                                ul.style.display = 'grid'
                                //on supprime le contenu de la liste, car elle sera recréé
                                ul.innerHTML = '';
                                //pour chaque élément du tableau d'ingrédient qu'on aura été créer :
                                filteredAppareils.forEach((appliance) => {
                                    //on crée des éléments li
                                    const li = document.createElement('li');
                                    //on ajoute dans chaque li, un ingredient de la liste
                                    li.textContent = appliance;
                                    //on ajoute les balise li à la balise ul
                                    ul.appendChild(li);
                                });

                                //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                input.removeAttribute('id', 'appareils');
                                input.setAttribute('id', 'appareils-click');
                                input.removeAttribute('placeholder', 'Appareils');
                                input.setAttribute('placeholder', 'Rechercher un appareil');
                                //on modifie le css de la flèche
                                inputAngle.style.transform = 'rotate(180deg)';
                                inputAngle.style.display = 'inline-block';
                                const tagSection = document.querySelector('#tagSection')
                                //si la section des tag contient au moins 1 éléments, on arrange le css de la liste
                                if (tagSection.childElementCount > 0) {
                                    ul.style.top = '271px'
                                } else {
                                    ul.style.top = '232px'
                                }

                                //si le tableau qu'on a créé possède 0 ingredients
                                if (filteredAppareils.length === 0) {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#appareils-click')
                                    inputClicked.style.width = '130px';

                                    //si le tableau qu'on a créé possède qu'un seul ingredient
                                } else if (filteredAppareils.length === 1) {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#appareils-click')
                                    ul.style.gridTemplateColumns = '1fr'
                                    inputClicked.style.width = '188.5px';
                                }
                                //si le tableau qu'on a créé possède 2 appareils
                                else if (filteredAppareils.length === 2) {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#appareils-click')
                                    ul.style.gridTemplateColumns = '1fr 1fr'
                                    inputClicked.style.width = '389px';
                                }
                                else {
                                    //on modifie le css pour qu'il corresponde à la maquette
                                    const inputClicked = document.querySelector('#appareils-click')
                                    ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                    inputClicked.style.width = '589px';
                                }
                            });
                        })

                    }

                    //fonction qui va masquer la liste des ingrédients du filtre
                    function maskList() {
                        document.addEventListener('click', (event) => {
                            const ul = document.querySelector('.options-appareils');
                            const estMonElement = event.target === container || container.contains(event.target);
                            const estMonBouton = event.target === inputAngle;
                            if (!estMonBouton && !estMonElement) {
                                ul.style.display = 'none';
                                ul.innerHTML = '';
                                input.value = ''
                                input.removeAttribute('id', 'appareils-click');
                                input.setAttribute('id', 'appareils');
                                input.removeAttribute('placeholder', 'Rechercher un appareil');
                                input.setAttribute('placeholder', 'Appareils');
                                input.style.width = '130px'
                                inputAngle.style.transform = 'rotate(0deg)';
                                ul.style.gridTemplateColumns = '1fr 1fr 1fr'

                            }
                        });
                    }

                    function createTag() {

                        function create() {
                            const ul = document.querySelector('.options-appareils');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        const tagText = event.target.textContent;
                                        if (!arrayTag.includes(tagText)) { // Vérifie si le tag n'est pas déjà dans le tableau
                                            arrayTag.push(tagText);
                                            const tagSection = document.querySelector('#tagSection');
                                            const tag = document.createElement('div');
                                            tag.textContent = tagText;
                                            tag.setAttribute('class', 'tag-appareils');
                                            const i = document.createElement('i');
                                            i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark');
                                            tagSection.appendChild(tag);
                                            tag.appendChild(i);
                                            ul.style.display = 'none'
                                            ul.innerHTML = ''
                                            input.removeAttribute('id', 'appareils-click');
                                            input.setAttribute('id', 'appareils');
                                            input.removeAttribute('placeholder', 'Rechercher un appareil');
                                            input.setAttribute('placeholder', 'Appareils');
                                            //la rotation de la flèche reste initial, vers le bas
                                            inputAngle.style.transform = 'rotate(0deg)';
                                            input.style.width = '130px'
                                            ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                            input.value = ''

                                        }
                                        ul.style.top = '271px';
                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', create);

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                create()
                            })

                        })

                    }

                    function filterFunction() {

                        function filter() {
                            const ul = document.querySelector('.options-appareils');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {

                                        if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none' && recettesFiltreAvecTag.length === 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recipes.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });

                                        }
                                        else if (recettesFiltre.length > 0 && recettesFiltreAvecTag.length === 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recettesFiltre.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });
                                        }
                                        else if (recettesFiltreAvecTag.length > 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recettesFiltreAvecTag.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });

                                        }
                                        createElement()

                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', filter)

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                filter()
                            })

                        })
                    }

                    function deleteTag() {

                        function deleteFunction() {
                            const ul = document.querySelector('.options-appareils');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        const allTag = document.querySelectorAll('.tag-appareils')
                                        allTag.forEach(tag => {
                                            const i = tag.querySelector('i')
                                            i.addEventListener('click', (event) => {
                                                const index = arrayTag.indexOf(event.target.parentNode.textContent);
                                                if (index !== -1) {
                                                    arrayTag.splice(index, 1); // Supprime l'élément du tableau
                                                    event.target.parentNode.remove()
                                                }

                                                if (arrayTag.length <= 0) {
                                                    ul.style.top = '232px'
                                                }

                                                if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none') {
                                                    // On filtre les recettes avec la méthode filter
                                                    recettesFiltreAvecTag = recipes.filter((recipe) => {
                                                        // On récupère les ingrédients, ustensiles et appareils de la recette
                                                        const { ingredients, ustensils, appliance } = recipe;

                                                        // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                        const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                        // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                        return arrayTag.every((tag) => allTags.includes(tag));
                                                    });

                                                }
                                                else if (recettesFiltre.length > 0) {
                                                    // On filtre les recettes avec la méthode filter
                                                    recettesFiltreAvecTag = recettesFiltre.filter((recipe) => {
                                                        // On récupère les ingrédients, ustensiles et appareils de la recette
                                                        const { ingredients, ustensils, appliance } = recipe;

                                                        // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                        const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                        // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                        return arrayTag.every((tag) => allTags.includes(tag));
                                                    });
                                                }

                                                createElement()
                                            })
                                        });
                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', deleteFunction)

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                deleteFunction()
                            })

                        })
                    }

                    initializeArrayAppareils()
                    showFullList()
                    maskList()
                    createTag();
                    filterFunction()
                    deleteTag()

                }

                function ustensilsFilter() {

                    const container = document.querySelector('#container-ustensiles')
                    const input = container.querySelector('input')
                    const inputAngle = container.querySelector('.fa-angle-down')
                    let arrayUstensiles = [];

                    function initializeArrayUstensiles() {

                        function initializeFunction() {
                            if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none') {

                                if (recettesFiltreAvecTag.length > 0) {
                                    arrayUstensiles.length = 0
                                    recettesFiltreAvecTag.forEach(recipe => {
                                        recipe.ustensils.forEach(ustensil => {
                                            if (!arrayUstensiles.includes(ustensil)) {
                                                arrayUstensiles.push(ustensil);
                                            }
                                        });
                                    });
                                } else {

                                    arrayUstensiles.length = 0
                                    recipes.forEach(recipe => {
                                        recipe.ustensils.forEach(ustensil => {
                                            if (!arrayUstensiles.includes(ustensil)) {
                                                arrayUstensiles.push(ustensil);
                                            }
                                        });
                                    });
                                }

                            }
                            else if (recettesFiltre.length > 0) {

                                if (recettesFiltreAvecTag.length > 0) {
                                    arrayUstensiles.length = 0
                                    recettesFiltreAvecTag.forEach(recipe => {
                                        recipe.ustensils.forEach(ustensil => {
                                            if (!arrayUstensiles.includes(ustensil)) {
                                                arrayUstensiles.push(ustensil);
                                            }
                                        });
                                    });
                                } else {

                                    arrayUstensiles.length = 0
                                    recettesFiltre.forEach(recipe => {
                                        recipe.ustensils.forEach(ustensil => {
                                            if (!arrayUstensiles.includes(ustensil)) {
                                                arrayUstensiles.push(ustensil);
                                            }
                                        });
                                    });
                                }
                            }
                        }

                        inputAngle.addEventListener('click', initializeFunction)

                        input.addEventListener('input', initializeFunction)
                    }

                    function showFullList() {

                        inputAngle.addEventListener('click', () => {

                            const ul = document.querySelector('.options-ustensiles');
                            if (ul.style.display === 'grid') {
                                ul.style.display = 'none';
                                ul.innerHTML = '';
                                input.removeAttribute('id', 'ustensiles-click');
                                input.setAttribute('id', 'ustensiles');
                                input.removeAttribute('placeholder', 'Rechercher un ustensile');
                                input.setAttribute('placeholder', 'Ustensiles');
                                inputAngle.style.transform = 'rotate(0deg)';
                                input.style.width = '130px'
                                ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                input.value = ''
                            }
                            else {
                                ul.style.display = 'grid';
                                arrayUstensiles.forEach((ustensile) => {
                                    const li = document.createElement('li');
                                    li.innerText = ustensile;
                                    input.removeAttribute('id', 'ustensiles');
                                    input.setAttribute('id', 'ustensiles-click');
                                    input.removeAttribute('placeholder', 'Ustensiles');
                                    input.setAttribute('placeholder', 'Rechercher un ustensiles');
                                    input.style.width = '589px'
                                    inputAngle.style.transform = 'rotate(180deg)';
                                    inputAngle.style.display = 'inline-block';
                                    ul.appendChild(li);
                                    const tagSection = document.querySelector('#tagSection')
                                    if (tagSection.childElementCount > 0) {
                                        ul.style.top = '271px'
                                    } else {
                                        ul.style.top = '232px'
                                    }

                                    if (arrayUstensiles.length === 0) {
                                        const inputClicked = document.querySelector('#ustensiles-click')
                                        inputClicked.style.width = '130px';

                                    } else if (arrayUstensiles.length === 1) {
                                        const inputClicked = document.querySelector('#ustensiles-click')
                                        ul.style.gridTemplateColumns = '1fr'
                                        inputClicked.style.width = '188.5px';
                                    }
                                    else if (arrayUstensiles.length === 2) {
                                        const inputClicked = document.querySelector('#ustensiles-click')
                                        ul.style.gridTemplateColumns = '1fr 1fr'
                                        inputClicked.style.width = '389px';
                                    }
                                    else {
                                        const inputClicked = document.querySelector('#ustensiles-click')
                                        ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                        inputClicked.style.width = '589px';
                                    }
                                });
                            }
                        })

                        input.addEventListener('click', () => {
                            const ul = document.querySelector('.options-ustensiles');
                            input.addEventListener('input', () => {
                                const searchValue = input.value.toLowerCase();

                                const filteredUstensiles = arrayUstensiles.filter((ustensile) => {
                                    return ustensile.toLowerCase().includes(searchValue);
                                });

                                ul.style.display = 'grid'
                                ul.innerHTML = '';
                                filteredUstensiles.forEach((ustensile) => {
                                    const li = document.createElement('li');
                                    li.textContent = ustensile;
                                    ul.appendChild(li);
                                });

                                input.removeAttribute('id', 'ustensiles');
                                input.setAttribute('id', 'ustensiles-click');
                                input.removeAttribute('placeholder', 'Ustensiles');
                                input.setAttribute('placeholder', 'Rechercher un ustensile');
                                inputAngle.style.transform = 'rotate(180deg)';
                                inputAngle.style.display = 'inline-block';
                                const tagSection = document.querySelector('#tagSection')
                                if (tagSection.childElementCount > 0) {
                                    ul.style.top = '271px'
                                } else {
                                    ul.style.top = '232px'
                                }

                                if (filteredUstensiles.length === 0) {
                                    const inputClicked = document.querySelector('#ustensiles-click')
                                    inputClicked.style.width = '130px';

                                } else if (filteredUstensiles.length === 1) {
                                    const inputClicked = document.querySelector('#ustensiles-click')
                                    ul.style.gridTemplateColumns = '1fr'
                                    inputClicked.style.width = '188.5px';
                                }
                                else if (filteredUstensiles.length === 2) {
                                    const inputClicked = document.querySelector('#ustensiles-click')
                                    ul.style.gridTemplateColumns = '1fr 1fr'
                                    inputClicked.style.width = '389px';
                                }
                                else {
                                    const inputClicked = document.querySelector('#ustensiles-click')
                                    ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                    inputClicked.style.width = '589px';
                                }
                            });
                        })

                    }

                    function maskList() {
                        document.addEventListener('click', (event) => {
                            const ul = document.querySelector('.options-ustensiles');
                            const estMonElement = event.target === container || container.contains(event.target);
                            const estMonBouton = event.target === inputAngle;
                            if (!estMonBouton && !estMonElement) {
                                ul.style.display = 'none';
                                ul.innerHTML = '';
                                input.value = ''
                                input.removeAttribute('id', 'ustensiles-click');
                                input.setAttribute('id', 'ustensiles');
                                input.removeAttribute('placeholder', 'Rechercher un appareil');
                                input.setAttribute('placeholder', 'Ustensiles');
                                input.style.width = '130px'
                                inputAngle.style.transform = 'rotate(0deg)';
                                ul.style.gridTemplateColumns = '1fr 1fr 1fr'

                            }
                        });
                    }

                    function createTag() {

                        function create() {
                            const ul = document.querySelector('.options-ustensiles');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        const tagText = event.target.textContent;
                                        if (!arrayTag.includes(tagText)) {
                                            arrayTag.push(tagText);
                                            const tagSection = document.querySelector('#tagSection');
                                            const tag = document.createElement('div');
                                            tag.textContent = tagText;
                                            tag.setAttribute('class', 'tag-ustensiles');
                                            const i = document.createElement('i');
                                            i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark');
                                            tagSection.appendChild(tag);
                                            tag.appendChild(i);
                                            ul.style.display = 'none'
                                            ul.innerHTML = ''
                                            input.removeAttribute('id', 'ustensiles-click');
                                            input.setAttribute('id', 'ustensiles');
                                            input.removeAttribute('placeholder', 'Rechercher un ustensile');
                                            input.setAttribute('placeholder', 'Ustensiles');
                                            inputAngle.style.transform = 'rotate(0deg)';
                                            input.style.width = '130px'
                                            ul.style.gridTemplateColumns = '1fr 1fr 1fr'
                                            input.value = ''

                                        }
                                        ul.style.top = '271px';
                                    });
                                });
                            }
                        }

                        inputAngle.addEventListener('click', create);

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                create()
                            })

                        })

                    }

                    function filterFunction() {

                        function filter() {
                            const ul = document.querySelector('.options-ustensiles');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {

                                        if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none' && recettesFiltreAvecTag.length === 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recipes.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });

                                        }
                                        else if (recettesFiltre.length > 0 && recettesFiltreAvecTag.length === 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recettesFiltre.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });
                                        }
                                        else if (recettesFiltreAvecTag.length > 0) {

                                            // On filtre les recettes avec la méthode filter
                                            recettesFiltreAvecTag = recettesFiltreAvecTag.filter((recipe) => {
                                                // On récupère les ingrédients, ustensiles et appareils de la recette
                                                const { ingredients, ustensils, appliance } = recipe;

                                                // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                return arrayTag.every((tag) => allTags.includes(tag));
                                            });

                                        }
                                        createElement()

                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', filter)

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                filter()
                            })

                        })
                    }

                    function deleteTag() {

                        function deleteFunction() {
                            const ul = document.querySelector('.options-ustensiles');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        const allTag = document.querySelectorAll('.tag-ustensiles')
                                        allTag.forEach(tag => {
                                            const i = tag.querySelector('i')
                                            i.addEventListener('click', (event) => {
                                                const index = arrayTag.indexOf(event.target.parentNode.textContent);
                                                if (index !== -1) {
                                                    arrayTag.splice(index, 1); // Supprime l'élément du tableau
                                                    event.target.parentNode.remove()
                                                }

                                                if (arrayTag.length <= 0) {
                                                    ul.style.top = '232px'
                                                }

                                                if (recettesFiltre.length === 0 && getComputedStyle(noResultSection).display === 'none') {
                                                    // On filtre les recettes avec la méthode filter
                                                    recettesFiltreAvecTag = recipes.filter((recipe) => {
                                                        // On récupère les ingrédients, ustensiles et appareils de la recette
                                                        const { ingredients, ustensils, appliance } = recipe;

                                                        // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                        const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                        // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                        return arrayTag.every((tag) => allTags.includes(tag));
                                                    });

                                                }
                                                else if (recettesFiltre.length > 0) {
                                                    // On filtre les recettes avec la méthode filter
                                                    recettesFiltreAvecTag = recettesFiltre.filter((recipe) => {
                                                        // On récupère les ingrédients, ustensiles et appareils de la recette
                                                        const { ingredients, ustensils, appliance } = recipe;

                                                        // On concatène les ingrédients, ustensiles et appareils dans un seul tableau
                                                        const allTags = [...ingredients.map((i) => i.ingredient), ...ustensils, appliance];

                                                        // On vérifie si tous les éléments du tableau arrayTag sont présents dans la recette
                                                        return arrayTag.every((tag) => allTags.includes(tag));
                                                    });
                                                }

                                                createElement()
                                            })
                                        });
                                    })
                                });
                            }
                        }

                        inputAngle.addEventListener('click', deleteFunction)

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                deleteFunction()
                            })

                        })
                    }

                    initializeArrayUstensiles()
                    showFullList()
                    maskList()
                    createTag();
                    filterFunction()
                    deleteTag()
                }

                ustensilsFilter()
                appliancesFilter();
                ingredientsFilter();

            }

            filterBar()
        });
}

searchBar()











