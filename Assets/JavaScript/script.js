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
    console.log(obj.analyzedInstructions[0].steps)
    
    const title = obj.title;
    const instructions = obj.instructions;
    const div = document.createElement('div')
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const currentRec = document.getElementById(id)
    currentRec.before('')

    h4.textContent = title;
    p.textContent = instructions
    div.append(h4, p)
    currentRec.after(div)


}