function searchBar() {
    const searchBar = document.querySelector('#search-bar');
    const recipesSection = document.querySelector('#recipesSection');
    const noResultSection = document.querySelector('#noResult');
    const recipesTitle = document.querySelectorAll('.title');
    const recipesIngredients = document.querySelectorAll('.oneIngredient');
    const recipesDescription = document.querySelectorAll('.description');
    let tagSection = document.querySelector('#tagSection')
    let recipes = [];
    let recettesFiltre = []

    // Récupération des recettes
    fetch('./data/recipes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data.recipes;
            searchBar.addEventListener('input', function () {
                const searchValue = searchBar.value.toLowerCase().trim();
                tagSection.innerHTML = '';
                // Filtrage des recettes
                let filteredRecipes = []
                filteredRecipes = recipes.filter(recipe => {
                    const title = recipe.name.toLowerCase();
                    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');
                    const description = recipe.description.toLowerCase();
                    return title.includes(searchValue) || ingredients.includes(searchValue) || description.includes(searchValue);
                });

                //on copie le tableau à chaque nouvelle recherche pour pouvoir l'exploiter
                //dans les filtres
                recettesFiltre = filteredRecipes.slice()

                console.log(recettesFiltre);
                // Affichage des recettes filtrées
                if (filteredRecipes.length === 0) {
                    noResultSection.style.display = 'block';
                    recipesSection.innerHTML = '';
                } else {
                    noResultSection.style.display = 'none';
                    recipesSection.innerHTML = '';
                    filteredRecipes.forEach(recipe => {
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

                function ingredientsFilter() {

                    //Récupération éléments DOM
                    const ingredientBar = document.querySelector('#ingredients');
                    const recipesSection = document.querySelector('#recipesSection');
                    const noResultSection = document.querySelector('#noResult');
                    const container = document.querySelector('#container-ingredients')
                    const input = container.querySelector('input')
                    const inputAngle = container.querySelector('.fa-angle-down')
                    let arrayIngredients = [];
                    let arrayTag = []

                    //fonction qui va permettre d'initialiser le tableau arrayIngredients
                    function initializeArrayIngredient() {

                        inputAngle.addEventListener('click', () => {

                            if (recettesFiltre.length === 0) {
                                arrayIngredients.length = 0
                                recipes.forEach(recipe => {
                                    recipe.ingredients.forEach(ingredient => {
                                        if (!arrayIngredients.includes(ingredient.ingredient)) {
                                            arrayIngredients.push(ingredient.ingredient);
                                        }
                                    });

                                });
                                console.log('!!!!!!!!!!!! RECIPE');

                            } else if (recettesFiltre.length > 0) {
                                arrayIngredients.length = 0
                                recettesFiltre.forEach(recipe => {
                                    recipe.ingredients.forEach(ingredient => {
                                        if (!arrayIngredients.includes(ingredient.ingredient)) {
                                            arrayIngredients.push(ingredient.ingredient);
                                        }
                                    });

                                });
                                console.log('!!!!!!!!!!!! RECETTEFILTER');
                            }
                        })

                        ingredientBar.addEventListener('input', () => {

                            if (recettesFiltre.length === 0) {
                                arrayIngredients.length = 0
                                recipes.forEach(recipe => {
                                    recipe.ingredients.forEach(ingredient => {
                                        if (!arrayIngredients.includes(ingredient.ingredient)) {
                                            arrayIngredients.push(ingredient.ingredient);
                                        }
                                    });

                                });
                                console.log('!!!!!!!!!!!! RECIPE');

                            } else if (recettesFiltre.length > 0) {
                                arrayIngredients.length = 0
                                recettesFiltre.forEach(recipe => {
                                    recipe.ingredients.forEach(ingredient => {
                                        if (!arrayIngredients.includes(ingredient.ingredient)) {
                                            arrayIngredients.push(ingredient.ingredient);
                                        }
                                    });

                                });
                                console.log('!!!!!!!!!!!! RECETTEFILTER');
                            }
                        })
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
                                console.log(arrayIngredients);
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
                                });
                            }
                        })
                        //lors du clic sur l'input
                        input.addEventListener('click', () => {
                            const ul = document.querySelector('.options-ingredients');
                            //lorsque du texte est saisie dans l'input :
                            input.addEventListener('input', () => {
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
                            }
                        });
                    }

                    function createTag() {

                        inputAngle.addEventListener('click', () => {
                            const ul = document.querySelector('.options-ingredients');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        arrayTag.push(event.target.textContent)
                                        const tagSection = document.querySelector('#tagSection')
                                        const tag = document.createElement('div')
                                        tag.textContent = event.target.textContent
                                        tag.setAttribute('class', 'tag-ingredients')
                                        const i = document.createElement('i')
                                        i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark')
                                        tagSection.appendChild(tag)
                                        tag.appendChild(i)
                                        ul.style.top = '271px'
                                    })
                                });
                            }
                        })

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                const ul = document.querySelector('.options-ingredients');
                                if (ul.style.display === 'grid') {
                                    const list = document.querySelectorAll('li');
                                    list.forEach(li => {
                                        li.addEventListener('click', (event) => {
                                            arrayTag.push(event.target.textContent)
                                            const tagSection = document.querySelector('#tagSection')
                                            const tag = document.createElement('div')
                                            tag.textContent = event.target.textContent
                                            tag.setAttribute('class', 'tag-ingredients')
                                            const i = document.createElement('i')
                                            i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark')
                                            tagSection.appendChild(tag)
                                            tag.appendChild(i)
                                            ul.style.top = '271px'
                                        })
                                    });
                                }
                            })

                        })
                    }

                    function filterFunction() {
                        inputAngle.addEventListener('click', () => {
                            const ul = document.querySelector('.options-ingredients');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        //creation copie du tableau pour faire comparaison puis tri. 
                                        const titlesDOM = document.querySelectorAll(".title")
                                        const arrayTitle = []
                                        const recipesCopy = []
                                        titlesDOM.forEach(title => {
                                            arrayTitle.push(title.textContent)
                                        });

                                        arrayTitle.forEach(title => {
                                            const obj = {
                                                name: title,
                                                ingredients: [],
                                                description: null,
                                                time: null
                                            };
                                            recipesCopy.push(obj);
                                        });

                                        recipesCopy.forEach(function (recipeCopy) {
                                            // Utilisez la méthode find() pour trouver l'objet correspondant dans le tableau recipes
                                            const recipe = recipes.find(function (recipe) {
                                                return recipe.name === recipeCopy.name;
                                            });

                                            // Si un objet correspondant est trouvé, ajoutez le tableau d'ingrédients correspondant à l'objet arrayRecipes
                                            if (recipe) {
                                                recipeCopy.ingredients = recipe.ingredients;
                                                recipeCopy.description = recipe.description;
                                                recipeCopy.time = recipe.time;
                                            }
                                        });

                                        const ingredientName = event.target.innerText; // Obtenez le nom de l'ingrédient cliqué

                                        // Utilisez la méthode find() pour trouver les recettes qui contiennent l'ingrédient cliqué
                                        const recipesContainingIngredient = recipesCopy.filter(function (recipe) {
                                            return recipe.ingredients.some(function (ingredient) {
                                                return ingredient.ingredient === ingredientName;
                                            });
                                        });


                                        function createElement() {
                                            console.log(recipesContainingIngredient);

                                            if (recipesContainingIngredient.length === 0) {
                                                noResultSection.style.display = 'block';
                                                recipesSection.innerHTML = '';
                                                console.log('aa');
                                            } else {
                                                console.log('bb');
                                                noResultSection.style.display = 'none';
                                                recipesSection.innerHTML = '';
                                                recipesContainingIngredient.forEach(recipe => {
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

                                        createElement()

                                    })
                                });
                            }
                        })
                    }

                    initializeArrayIngredient()
                    showFullList()
                    maskList()
                    createTag();
                    //filterFunction()


                }

                function appliancesFilter() {

                    const appareilBar = document.querySelector('#appareils');
                    const recipesSection = document.querySelector('#recipesSection');
                    const noResultSection = document.querySelector('#noResult');
                    const container = document.querySelector('#container-appareils')
                    const input = container.querySelector('input')
                    const inputAngle = container.querySelector('.fa-angle-down')

                    const arrayAppareils = [];
                    const arrayTag = []

                    recipes.forEach(recipe => {
                        if (!arrayAppareils.includes(recipe.appliance)) {
                            arrayAppareils.push(recipe.appliance);
                        }

                    });
                    console.log(arrayAppareils);

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
                                input.removeAttribute('placeholder', 'Rechercher un appareil');
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
                                arrayAppareils.forEach((appareil) => {
                                    //on crée des balise li
                                    const li = document.createElement('li');
                                    //on ajoute un ingrédient dans chaque balise li
                                    li.innerText = appareil;
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

                                const filteredAppareils = arrayAppareils.filter((appareil) => {
                                    return appareil.toLowerCase().includes(searchValue);
                                });

                                //on affiche la liste d'ingrédient
                                ul.style.display = 'grid'
                                //on supprime le contenu de la liste, car elle sera recréé
                                ul.innerHTML = '';
                                //pour chaque élément du tableau d'ingrédient qu'on aura été créer :
                                filteredAppareils.forEach((appareil) => {
                                    //on crée des éléments li
                                    const li = document.createElement('li');
                                    //on ajoute dans chaque li, un ingredient de la liste
                                    li.textContent = appareil;
                                    //on ajoute les balise li à la balise ul
                                    ul.appendChild(li);
                                });

                                //on modifie les attributs de l'input (id, placeholder) pour agir sur le css
                                input.removeAttribute('id', 'Appareils');
                                input.setAttribute('id', 'appareils-click');
                                input.removeAttribute('placeholder', 'Appareils');
                                input.setAttribute('placeholder', 'Rechercher un ingredient');
                                //on modifie le css de la flèche
                                inputAngle.style.transform = 'rotate(180deg)';
                                inputAngle.style.display = 'inline-block';
                                //si la section des tag contient au moins 1 éléments, on arrange le css de la liste
                                const tagSection = document.querySelector('#tagSection')
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
                                //si le tableau qu'on a créé possède 2 ingredients
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
                                input.removeAttribute('placeholder', 'Rechercher un appareils');
                                input.setAttribute('placeholder', 'Appareils');
                                input.style.width = '130px'
                                inputAngle.style.transform = 'rotate(0deg)';
                            }
                        });
                    }

                    function createTag() {

                        inputAngle.addEventListener('click', () => {
                            const ul = document.querySelector('.options-appareils');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        arrayTag.push(event.target.textContent)
                                        const tagSection = document.querySelector('#tagSection')
                                        const tag = document.createElement('div')
                                        tag.textContent = event.target.textContent
                                        tag.setAttribute('class', 'tag-appareils')
                                        const i = document.createElement('i')
                                        i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark')
                                        tagSection.appendChild(tag)
                                        tag.appendChild(i)
                                        ul.style.top = '271px'
                                    })
                                });
                            }
                        })

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
                                const ul = document.querySelector('.options-appareils');
                                if (ul.style.display === 'grid') {
                                    const list = document.querySelectorAll('li');
                                    list.forEach(li => {
                                        li.addEventListener('click', (event) => {
                                            arrayTag.push(event.target.textContent)
                                            const tagSection = document.querySelector('#tagSection')
                                            const tag = document.createElement('div')
                                            tag.textContent = event.target.textContent
                                            tag.setAttribute('class', 'tag-appareils')
                                            const i = document.createElement('i')
                                            i.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark')
                                            tagSection.appendChild(tag)
                                            tag.appendChild(i)
                                            ul.style.top = '271px'
                                        })
                                    });
                                }
                            })

                        })
                    }

                    function deleteTag() {

                        inputAngle.addEventListener('click', () => {
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
                                                    console.log(arrayTag.length);
                                                    event.target.parentNode.remove()
                                                }

                                                if (arrayTag.length <= 0) {
                                                    ul.style.top = '232px'
                                                }

                                                ////SUPPRIMER ET METTRE A JOUR ///////////////

                                                /*const titlesDOM = document.querySelectorAll(".title")
                                                const arrayTitle = []
                                                let recipesCopy = []
                                                titlesDOM.forEach(title => {
                                                    arrayTitle.push(title.textContent)
                                                });
                    
                                                arrayTitle.forEach(title => {
                                                    const obj = {
                                                        name: title,
                                                        ingredients: [],
                                                        description: null,
                                                        time: null
                                                    };
                                                    recipesCopy.push(obj);
                                                });
                    
                                                recipesCopy.forEach(function (recipeCopy) {
                                                    // Utilisez la méthode find() pour trouver l'objet correspondant dans le tableau recipes
                                                    const recipe = recipes.find(function (recipe) {
                                                        return recipe.name === recipeCopy.name;
                                                    });
                    
                                                    // Si un objet correspondant est trouvé, ajoutez le tableau d'ingrédients correspondant à l'objet arrayRecipes
                                                    if (recipe) {
                                                        recipeCopy.ingredients = recipe.ingredients;
                                                        recipeCopy.description = recipe.description;
                                                        recipeCopy.time = recipe.time;
                                                    }
                                                });
                    
                    
                                                const ingredientName = event.target.parentNode.textContent; // Obtenez le nom de l'ingrédient cliqué
                    
                                                console.log('Ingrédient cliqué :', ingredientName);
                                                console.log('Tableau recipes :', recipes);
                                                console.log('Tableau recipesCopy :', recipesCopy);
                    
                                                const recipeContainingIngredient = recipes.find(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient === ingredientName));
                    
                                                if (recipeContainingIngredient && !recipesCopy.includes(recipeContainingIngredient)) {
                                                    // Si une recette contenant l'ingrédient cliqué est trouvée dans recipes et qu'elle n'a pas encore été copiée dans recipesCopy, on l'ajoute
                                                    recipesCopy.push(recipeContainingIngredient);
                                                }
                    
                                                console.log('Recettes contenant l\'ingrédient :', recipesCopy);*/




                                            })
                                        });
                                    })
                                });
                            }
                        })

                        input.addEventListener('click', () => {
                            input.addEventListener('input', () => {
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
                                                        console.log(arrayTag.length);
                                                        event.target.parentNode.remove()
                                                    }

                                                    if (arrayTag.length <= 0) {
                                                        ul.style.top = '232px'
                                                    }

                                                })
                                            });
                                        })
                                    });
                                }
                            });
                        })
                    }

                    function filterFunction() {
                        inputAngle.addEventListener('click', () => {
                            const ul = document.querySelector('.options-ingredients');
                            if (ul.style.display === 'grid') {
                                const list = document.querySelectorAll('li');
                                list.forEach(li => {
                                    li.addEventListener('click', (event) => {
                                        //creation copie du tableau pour faire comparaison puis tri. 
                                        const titlesDOM = document.querySelectorAll(".title")
                                        const arrayTitle = []
                                        const recipesCopy = []
                                        titlesDOM.forEach(title => {
                                            arrayTitle.push(title.textContent)
                                        });

                                        arrayTitle.forEach(title => {
                                            const obj = {
                                                name: title,
                                                ingredients: [],
                                                description: null,
                                                time: null
                                            };
                                            recipesCopy.push(obj);
                                        });

                                        recipesCopy.forEach(function (recipeCopy) {
                                            // Utilisez la méthode find() pour trouver l'objet correspondant dans le tableau recipes
                                            const recipe = recipes.find(function (recipe) {
                                                return recipe.name === recipeCopy.name;
                                            });

                                            // Si un objet correspondant est trouvé, ajoutez le tableau d'ingrédients correspondant à l'objet arrayRecipes
                                            if (recipe) {
                                                recipeCopy.ingredients = recipe.ingredients;
                                                recipeCopy.description = recipe.description;
                                                recipeCopy.time = recipe.time;
                                            }
                                        });

                                        const ingredientName = event.target.innerText; // Obtenez le nom de l'ingrédient cliqué

                                        // Utilisez la méthode find() pour trouver les recettes qui contiennent l'ingrédient cliqué
                                        const recipesContainingIngredient = recipesCopy.filter(function (recipe) {
                                            return recipe.ingredients.some(function (ingredient) {
                                                return ingredient.ingredient === ingredientName;
                                            });
                                        });


                                        function createElement() {
                                            console.log(recipesContainingIngredient);

                                            if (recipesContainingIngredient.length === 0) {
                                                noResultSection.style.display = 'block';
                                                recipesSection.innerHTML = '';
                                                console.log('aa');
                                            } else {
                                                console.log('bb');
                                                noResultSection.style.display = 'none';
                                                recipesSection.innerHTML = '';
                                                recipesContainingIngredient.forEach(recipe => {
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

                                        createElement()

                                    })
                                });
                            }
                        })
                    }

                    showFullList()
                    maskList()
                    createTag();
                    deleteTag();



                }

                function ustensilsFilter() {

                    const container = document.querySelector('#container-ustensiles')
                    const input = container.querySelector('input')
                    const inputAngle = container.querySelector('.fa-angle-down')
                    const ustensils = [];

                    recipes.forEach(recipe => {
                        recipe.ustensils.forEach(ustensil => {
                            if (!ustensils.includes(ustensil)) {
                                ustensils.push(ustensil);
                            }
                        });
                    });

                    console.log(ustensils);

                    inputAngle.addEventListener('click', () => {
                        const ul = document.querySelector('.options-ustensiles');
                        ul.style.display = 'grid'
                        //inputIngredients.appendChild(ul)
                        ustensils.forEach(ustensil => {
                            const li = document.createElement('li');
                            li.innerText = ustensil
                            input.removeAttribute('id', 'input-ustensiles')
                            input.setAttribute('id', 'ustensiles-click')
                            input.removeAttribute('placeholder', 'Ustensiles')
                            input.setAttribute('placeholder', 'Rechercher un ustensile')
                            inputAngle.style.transform = 'rotate(180deg)'
                            inputAngle.style.display = 'inline-block'
                            ul.appendChild(li)
                        })
                    })

                    document.addEventListener('click', (event) => {
                        const ul = document.querySelector('.options-ustensiles');
                        const estMonElement = event.target === container || container.contains(event.target);
                        const estMonBouton = event.target === inputAngle;

                        if (!estMonBouton && !estMonElement) {
                            ul.style.display = 'none';
                            ul.innerHTML = ''
                            input.removeAttribute('id', 'ustensiles-click')
                            input.setAttribute('id', 'ustensiles')
                            input.removeAttribute('placeholder', 'Rechercher un ustensile')
                            input.setAttribute('placeholder', 'Ustensile')
                            inputAngle.style.transform = 'rotate(360deg)'
                        }
                    });




                    //afficher barre avec suggestion etc. 
                    //récupérer tout les éléments du dom présents.
                    //faire une comparaison des titres du fichier json avec ceux d'un tableau de titre qu'on aura créer
                    //si un des titres correspond, faire la comparaison si l'ustensil selectionné est le même que celui du fichier json
                    //recreé tout les éléments

                }

                ustensilsFilter()
                appliancesFilter();
                ingredientsFilter();

                //.catch(error => console.log(error));

            }

            filterBar()

        })
    //.catch(error => console.log(error));
}

searchBar()