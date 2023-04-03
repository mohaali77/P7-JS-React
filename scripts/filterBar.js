function filterBar() {

    // Récupération des recettes
    fetch('./data/recipes.json')
        .then(response => response.json())
        .then(data => {
            recipes = data.recipes;
            console.log(recipes);

            function ingredientsFilter() {

                const ingredients = [];

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

                const appliances = [];

                recipes.forEach(recipe => {
                    if (!appliances.includes(recipe.appliance)) {
                        appliances.push(recipe.appliance);
                    }

                });

                console.log(appliances);

            }

            function ustensilsFilter() {

                const ustensils = [];

                recipes.forEach(recipe => {
                    recipe.ustensils.forEach(ustensil => {
                        if (!ustensils.includes(ustensil)) {
                            ustensils.push(ustensil);
                        }
                    });
                });

                console.log(ustensils);

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
        .catch(error => console.log(error));

}

filterBar()