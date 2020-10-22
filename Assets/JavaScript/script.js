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
        // console.log(e.target.id)
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

    const recipe = document.getElementsByClassName(id)
    // prevents recipe from being rendered more than once
    if (recipe.length) return

    const directions = obj.analyzedInstructions[0].steps.map(x => ({
        number: x.number,
        instruction: x.step,
        ingredients: [...x.ingredients],
        equipment: x.equipment
    }))
    // console.log(directions)

    const title = obj.title;
    const div = document.createElement('div')
    div.classList = id
    const h2 = document.createElement('h2');
    const currentRec = document.getElementById(id)
    let p;
    
    h2.textContent = title;
    div.append(h2)
    
    for (let i = 0; i < directions.length; i++) {
        
        p = document.createElement('p')
        
        const h3 = document.createElement('h3')
        const h4 = document.createElement('h4')
        
        console.log(directions[i])
        
        const stepNumber = directions[i].number;
        const instructions = directions[i].instruction;
        const ingredients = directions[i].ingredients;
        const equipment = directions[i].equipment
        
        ingredients.forEach(x=> h3.textContent = "Ingredients: " + x.name)
        equipment.forEach(x=> h4.textContent = "Equipment: " + x.name)
    
        p.textContent = stepNumber + " . " + instructions
        div.append(h3, h4, p)
    }

    currentRec.after(div)

}