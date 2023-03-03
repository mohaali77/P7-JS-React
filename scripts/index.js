fetch('./data/recipes.json')
    // On transforme la réponse en JSON
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((e) =>
        console.log("il y a une erreur :" + e)
    );