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

        console.log(article);
        return (article)

    }

    return { getRecipesCardDOM }
}