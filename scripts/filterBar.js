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
                const ingredients = [];
                const arrayTag = []

                //on récupère tout les ingrédients en 1 seul exemplaire  dans un tableau
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (!ingredients.includes(ingredient.ingredient)) {
                            ingredients.push(ingredient.ingredient);
                        }
                    });
                });
                console.log(ingredients);

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
                        ingredients.forEach((ingredient) => {
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
                                    tag.setAttribute('class', 'tag')
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
                                    const allTag = document.querySelectorAll('.tag')
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
                    })
                }


                createTag();
                deleteTag();


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