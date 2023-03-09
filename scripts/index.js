// Récupération des données via l'API Fetch
fetch('./data/recipes.json')
    // On transforme la réponse en JSON
    .then(response => response.json())
    .then(data => {
        //fonction qui va nous permettre de récupérer les données des photographes
        async function getRecipes() {
            //on récupère les données des photographes.
            let recipes = data.recipes
            console.log(recipes);
            // on retourne le tableau photographers seulement une fois récupéré
            return ({
                recipes: [...recipes]
            })
        }

        // Fonction qui affiche les données dans le DOM
        async function displayData(recipes) {
            //on récupère l'élément du DOM où notre contenu sera intégrer
            const recipesSection = document.querySelector("#recipesSection");

            //pour chaque photographe :
            recipes.forEach((recipes) => {
                //on appelle la fonction photographerFactory 
                const recipesModel = recipesFactory(recipes);
                //on appelle la fonction userCard de chaque utilisateurs
                const recipesCardDOM = recipesModel.getRecipesCardDOM();
                //ici on va intégrer ces userCards à l'intérieur de la section des photographes
                recipesSection.appendChild(recipesCardDOM);
            });
        }

        async function init() {
            // Récupère les datas des photographes
            const { recipes } = await getRecipes();
            // On appelle la fonction qui va afficher les données dans le DOM
            displayData(recipes);
        }

        init();

    })
    .catch((e) =>
        console.log("il y a une erreur :" + e)
    );