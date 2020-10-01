const xhr = new XMLHttpRequest();

// Find's recipe by id from Spoonacular
function findRecipe(id) {

    const queryUrl = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=485cdff989f1474e9d84102838b6aa31"
    xhr.open('GET', queryUrl)
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText))
            const obj = JSON.parse(xhr.responseText)
            displayRecipe(obj, id)
        } else {
            console.log(xhr.status)
        }
    }
    xhr.send();
}


// finds recipes by ingredients from Spoonacular
function findRecipesByIngredients(ingredients) {

    const queryUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=485cdff989f1474e9d84102838b6aa31&number=25&ranking=1&ingredients="

    xhr.open('GET', queryUrl + ingredients)
    xhr.onload = function () {
        if (xhr.status === 200) {
            // console.log(JSON.parse(xhr.responseText))
            mapResults(JSON.parse(xhr.responseText))
            displayResults(JSON.parse(xhr.responseText))
        } else {
            console.log(xhr.status)
        }
    }
    xhr.send();

}