function filterBar() {

    // Récupération des recettes
    fetch('./data/recipes.json')
        .then(response => response.json())
        .then(data => {
            let recipes = data.recipes;
            console.log(recipes);

            function ingredientsFilter() {

                const ingredientBar = document.querySelector('#ingredients');
                const recipesSection = document.querySelector('#recipesSection');
                const noResultSection = document.querySelector('#noResult');
                const container = document.querySelector('#container-ingredients')
                const input = container.querySelector('input')
                const inputAngle = container.querySelector('.fa-angle-down')
                const arrayIngredients = [];
                const arrayTag = []

                //on récupère tout les ingrédients en 1 seul exemplaire dans un tableau
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (!arrayIngredients.includes(ingredient.ingredient)) {
                            arrayIngredients.push(ingredient.ingredient);
                        }
                    });
                });
                console.log(arrayIngredients);

                function showList() {

                    inputAngle.addEventListener('click', () => {
                        const ul = document.querySelector('.options-ingredients');
                        // si la liste est déjà affichée on masque la liste. 
                        if (ul.style.display === 'grid') {
                            ul.style.display = 'none';
                            ul.innerHTML = '';
                            input.removeAttribute('id', 'ingredients-click');
                            input.setAttribute('id', 'ingredients');
                            input.removeAttribute('placeholder', 'Rechercher un ingredient');
                            input.setAttribute('placeholder', 'Ingredients');
                            inputAngle.style.transform = 'rotate(0deg)';

                            // sinon on affiche la liste.
                        } else {
                            ul.style.display = 'grid';
                            arrayIngredients.forEach((ingredient) => {
                                const li = document.createElement('li');
                                li.innerText = ingredient;
                                input.removeAttribute('id', 'ingredients');
                                input.setAttribute('id', 'ingredients-click');
                                input.removeAttribute('placeholder', 'Ingredients');
                                input.setAttribute('placeholder', 'Rechercher un ingredient');
                                inputAngle.style.transform = 'rotate(180deg)';
                                inputAngle.style.display = 'inline-block';
                                ul.appendChild(li);
                            });
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
                                    console.log(i);
                                    tagSection.appendChild(tag)
                                    tag.appendChild(i)
                                    ul.style.top = '271px'
                                })
                            });
                        }
                    })
                }

                function deleteTag() {

                    inputAngle.addEventListener('click', () => {
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
                                                console.log(arrayTag.length);
                                                event.target.parentNode.remove()
                                            }

                                            if (arrayTag.length <= 0) {
                                                ul.style.top = '232px'
                                            }

                                            ////SUPPRIMER ET METTRE A JOUR ///////////////

                                            const titlesDOM = document.querySelectorAll(".title")
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
                                        })
                                    });
                                })
                            });
                        }
                    })
                }

                function maskList() {
                    document.addEventListener('click', (event) => {
                        const ul = document.querySelector('.options-ingredients');
                        const estMonElement = event.target === container || container.contains(event.target);
                        const estMonBouton = event.target === inputAngle;
                        if (!estMonBouton && !estMonElement) {
                            ul.style.display = 'none';
                            ul.innerHTML = '';
                            input.removeAttribute('id', 'ingredients-click');
                            input.setAttribute('id', 'ingredients');
                            input.removeAttribute('placeholder', 'Rechercher un ingredient');
                            input.setAttribute('placeholder', 'Ingredients');
                            inputAngle.style.transform = 'rotate(0deg)';
                        }
                    });
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
                                    console.log(recipesCopy.length);

                                    const ingredientName = event.target.innerText; // Obtenez le nom de l'ingrédient cliqué

                                    console.log(ingredientName);

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



                showList()
                maskList()
                createTag();
                deleteTag();
                filterFunction()

            }

            /*const arrayTitleDom = []
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    arrayTitleDom.length = 0;
                    const titlesDOM = document.querySelectorAll(".title")
                    titlesDOM.forEach(titleDOM => {
                        console.log(titleDOM.textContent);
                        arrayTitleDom.push(titleDOM.textContent)
                    });
            
                } console.log(arrayTitleDom);
            });*/























            function appliancesFilter() {

                const container = document.querySelector('#container-appareils')
                const input = container.querySelector('input')
                const inputAngle = container.querySelector('.fa-angle-down')
                const appliances = [];

                recipes.forEach(recipe => {
                    if (!appliances.includes(recipe.appliance)) {
                        appliances.push(recipe.appliance);
                    }

                });
                console.log(appliances);

                inputAngle.addEventListener('click', () => {
                    const ul = document.querySelector('.options-appareils');
                    ul.style.display = 'grid'
                    //inputIngredients.appendChild(ul)
                    appliances.forEach(appliance => {
                        const li = document.createElement('li');
                        li.innerText = appliance
                        input.removeAttribute('id', 'input-appareils')
                        input.setAttribute('id', 'appareils-click')
                        input.removeAttribute('placeholder', 'Appareils')
                        input.setAttribute('placeholder', 'Rechercher un appareil')
                        inputAngle.style.transform = 'rotate(180deg)'
                        inputAngle.style.display = 'inline-block'
                        ul.appendChild(li)
                    })
                })

                document.addEventListener('click', (event) => {
                    const ul = document.querySelector('.options-appareils');
                    const estMonElement = event.target === container || container.contains(event.target);
                    const estMonBouton = event.target === inputAngle;

                    if (!estMonBouton && !estMonElement) {
                        ul.style.display = 'none';
                        ul.innerHTML = ''
                        input.removeAttribute('id', 'appareils-click')
                        input.setAttribute('id', 'appareils')
                        input.removeAttribute('placeholder', 'Rechercher un appareil')
                        input.setAttribute('placeholder', 'Appareil')

                        inputAngle.style.transform = 'rotate(360deg)'
                    }
                });



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

            ingredientsFilter();
            appliancesFilter();
            ustensilsFilter()
        })
    //.catch(error => console.log(error));

}

filterBar()