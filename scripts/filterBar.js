function filterBar() {

    // Récupération des recettes
    fetch('./data/recipes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data.recipes;
            console.log(recipes);

            function ingredientsFilter() {

                const container = document.querySelector('#container-ingredients')
                const input = container.querySelector('input')
                const inputAngle = container.querySelector('.fa-angle-down')
                console.log(inputAngle);
                const ingredients = [];

                inputAngle.addEventListener('click', () => {
                    const ul = document.querySelector('.options-ingredients');
                    ul.style.display = 'grid'
                    //inputIngredients.appendChild(ul)
                    ingredients.forEach(ingredient => {
                        const li = document.createElement('li');
                        li.innerText = ingredient
                        input.removeAttribute('id', 'ingredients')
                        input.setAttribute('id', 'ingredients-click')
                        input.removeAttribute('placeholder', 'Ingredients')
                        input.setAttribute('placeholder', 'Rechercher un ingredient')

                        inputAngle.style.transform = 'rotate(180deg)'
                        inputAngle.style.display = 'inline-block'

                        ul.appendChild(li)
                    })
                })


                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (!ingredients.includes(ingredient.ingredient)) {
                            ingredients.push(ingredient.ingredient);
                        }
                    });
                });

                console.log(ingredients);

            }

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

                console.log(appliances);

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


                const arrayTitleDom = []
                document.addEventListener('keydown', function (event) {
                    if (event.key === 'Escape') {
                        arrayTitleDom.length = 0;
                        const titlesDOM = document.querySelectorAll(".title")
                        titlesDOM.forEach(titleDOM => {
                            console.log(titleDOM.textContent);
                            arrayTitleDom.push(titleDOM.textContent)
                        });

                    } console.log(arrayTitleDom);
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