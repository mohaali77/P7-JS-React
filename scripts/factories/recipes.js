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
        time.innerText = recipes.time

        const ingredients_description = document.createElement('div')
        ingredients_description.classList.add('ingredients_description')

        const ingredients = document.createElement('div')
        ingredients.classList.add('ingredients')

        const oneIngredient = document.createElement('div')
        oneIngredient.classList.add('oneIngredient')
        oneIngredient.innerText = 'ingredient :'

        const quantity = document.createElement('div')
        quantity.classList.add('quantity')
        quantity.innerText = ' 400ml'

        const description = document.createElement('div')
        description.classList.add('description')
        description.innerText = recipes.description

        article.appendChild(image)
        article.appendChild(information)

        information.appendChild(title_time)
        information.appendChild(ingredients_description)

        title_time.appendChild(title)
        title_time.appendChild(time)

        ingredients_description.appendChild(ingredients)
        ingredients_description.appendChild(oneIngredient)
        ingredients_description.appendChild(description)

        ingredients.appendChild(oneIngredient)
        oneIngredient.appendChild(quantity)

        console.log(article);
        return (article)

    }

    return { getRecipesCardDOM }
}