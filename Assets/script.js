
const xhr = new XMLHttpRequest();
const ingredients = document.getElementById('ingredients')
const submitBtn = document.getElementById('submit')
const recipeImg = document.createElement('img')
const recipeTitle = document.createElement('h4')
const recipeDiv = document.createElement('div')
let results;


// EVENT LISTENERS
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    // Call spoonacular API and map results to flat object
    findRecipesByIngredients(ingredients.value)
})

document.body.addEventListener('click', e => {
    if (e.target.className === 'viewBtn') {
        console.log(e.target.id)
        e.preventDefault();
        findRecipe(e.target.id)
    }
})


// FUNCTIONS

// map results to flat object
function mapResults(data) {
    results = data.map(x => ({
        title: x.title,
        image: x.image,
        id: x.id,

    }))
    // console.log(results)
}

function displayResults(data) {
    const section = document.querySelector("section")
    section.innerHTML = ''

    for (let i = 0; i < data.length; i++) {
        // recipe title
        const title = recipeTitle.textContent = data[i].title
        // recipe title h4 tag
        const h4 = document.createElement('h4')
        // image
        const img = document.createElement('img')
        // section tag from HTML
        img.setAttribute('src', data[i].image)
        img.setAttribute('alt', data[i].title)
        h4.append(title)
        const button = document.createElement('button')
        button.textContent = 'View Recipe'
        button.classList = "viewBtn"
        button.id = data[i].id
        section.append(h4)
        section.append(img)
        img.after(button)

    }
}

function displayRecipe(obj, id) {

    const title = obj.title;
    const instructions = obj.instructions;
    const div = document.createElement('div')
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const currentRec = document.getElementById(id)

    h4.textContent = title;
    p.textContent = instructions
    div.append(h4, p)
    currentRec.after(div)


}

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