const ingredients = document.getElementById('ingredients')
const submitBtn = document.getElementById('submit')
const queryUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=485cdff989f1474e9d84102838b6aa31&number=25&ranking=1&ingredients="
const recipeImg = document.createElement('img')
const recipeTitle = document.createElement('h4')
const recipeDiv = document.createElement('div')
let results;


// EVENT LISTENERS
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    // Call spoonacular API and map results to flat object
    $.ajax({
        url: queryUrl + ingredients.value,
        method: "GET"
    })
        .then(res => {
            console.log(res)
            mapResults(res)
            displayResults(results)
        })
        .catch(err => console.error(err))
})

document.body.addEventListener('click', e => {
    if (e.target.className === 'viewBtn') {
        console.log(e.target.value)
        e.preventDefault();
        findRecipe(e.target.value)
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

    for (let i = 0; i < data.length; i++) {
        // recipe title
        const title = recipeTitle.textContent = data[i].title
        // recipe title h4 tag
        const h4 = document.createElement('h4')
        // image
        const img = document.createElement('img')
        // section tag from HTML
        const section = document.querySelector("section")
        img.setAttribute('src', data[i].image)
        img.setAttribute('alt', data[i].title)
        h4.append(title)
        const button = document.createElement('button')
        button.textContent = 'View Recipe'
        button.classList = "viewBtn"
        button.value = data[i].id
        section.append(h4)
        section.append(img)
        img.after(button)

    }
}

function findRecipe(id) {

    const queryUrl = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=485cdff989f1474e9d84102838b6aa31"
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(res => console.log(res))
        .catch(err => console.error(err))
}