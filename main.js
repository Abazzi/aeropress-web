// DOM Connections
const recipeDiv = document.querySelector('.recipeDiv');
const recipe = document.querySelector('.recipe');
const toggle = document.querySelector("#toggleTheme");
const infoIcon = document.querySelector('.infoIcon');
const infoDialog = document.querySelector('.infoDialog');
const closeButton = document.querySelector('.closeButton');
const clipboardIcon = document.querySelector('.clipboardIcon');
// Dice Side Values
const temperatureOptions = ["75 C","80 C","85 C","90 C","95 C","Your Choice"];
const steepTimeGrindOptions = ["Coarse - 4 Minutes","Medium - 120 Seconds","Medium Fine - 90s","Fine - 60s","Very Fine - 60s","Your Choice"];
const waterToCoffeeOptions = ["12g of Coffee to 200g of Water","15g of Coffee to 200g of Water","15g of Coffee to 250g of Water","24g of Coffee to 200g of Water (Dilute to Share)","30g of Coffee to 200g of Water (Dilute to Share)","Your Choice"];
const stirringOptions = ["Stir Once Before Pressing","Stir Twice Before Pressing","Stir Once Clockwise, and Once Counter-Clockwise Before Pressing","Stir North, South, East, West Before Pressing","Don't Stir","Your Choice"];
const positionBloomOptions = ["Upright, 30s Bloom, 30g of Water","Upright, no Bloom","Inverted, 30s Bloom, 30g of Water","Inverted, no Bloom","Upright, 30s Bloom, 60g of Water","Inverted, 30s Bloom, 60g of Water"];
// classes used to change the css properties in the toggleTheme function
const classes = ['body','header','recipeDiv','recipe','footer','a','toast'];
// die holds the number values
let die;
// stepNodes will hold all of the steps for when we need to change their themes in toggleTheme()
let stepNodes;

/**
 * dice()
 * mimics rolling 6 dice, and stores each dice side value into an array, functions returns an array of 6 numbers
 */
function dice() {
    let rolls = [];

    for(i = 0; i <= 5; i++){
        die = Math.floor(Math.random() * 6);
        rolls.push(die);
    }

    return rolls;
}

/**
 * generateRecipe(random dice roll)
 * giving the function a parameter makes it so a new roll will be chosen each time the button is clicked
 * declare 5 arrays with all possible steps as Strings.
 * assign a randomly picked step to a variable for each part of the process
 * make a new array with all the selected steps and return it.
 */
function generateRecipe(){
    let rolls = dice();

    let steps = ["Temperature","Steep Time / Grind","Water / Coffee","Stirring","Position / Bloom"]

    let recipe = {
        temperature: `${steps[0]}: ${temperatureOptions[rolls[0]]}`,
        steepTimeGrind: `${steps[1]}: ${steepTimeGrindOptions[rolls[1]]}`,
        waterToCoffee: `${steps[2]}: ${waterToCoffeeOptions[rolls[2]]}`,
        stirring: `${steps[3]}: ${stirringOptions[rolls[3]]}`,
        positionBloom:`${steps[4]}: ${positionBloomOptions[rolls[4]]}`
    }   
    
    return recipe;
}

/**
 * displayRecipe()
 * uses the generateRecipe() function and uses that object to display the steps in list items,
 *  appending each list item to a ordered list
 */
function displayRecipe() {

    let recipe = generateRecipe();

    for(const step in recipe){
        let ol = document.querySelector('.recipe');
        let li = document.createElement('li');
        let br = document.createElement('br');
        let recipeStep;
        let recipeStepText;
        recipeStepText = `${recipe[step]}`;

        // assigns class depending if the toggle switch is on or off
        toggle.checked ? li.setAttribute('class','step step-dark') : li.setAttribute('class','step step-light');
        recipeStep = document.createTextNode(recipeStepText);
        li.appendChild(recipeStep);
        ol.appendChild(li);
        ol.append(br);
    }

    stepNodes = document.querySelectorAll('.step');
}

// Clears all child nodes in div, used for recipeDiv
function clearRecipe(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Shows the "Copied!" toast when the clipboard icon is clicked
 */
function showToast() {
    let toast = document.querySelector('.toast');
    toast.classList.add('toast-show');
    setTimeout(function(){
        toast.classList.remove('toast-show')
    },3000);
}

/**
 * Attached to toggle in footer, removes and adds light or dark mode classes to html element
 */
function toggleTheme(){
    stepNodes = document.querySelectorAll('.step');
    for(i = 0; i < classes.length; i++){
        if(document.querySelector(`.${classes[i]}`).classList.contains(`${classes[i]}-light`)){
            document.querySelector(`.${classes[i]}`).classList.remove(`${classes[i]}-light`);
            stepNodes.forEach((step) => step.classList.remove('step-light'));
            document.querySelector(`.${classes[i]}`).classList.add(`${classes[i]}-dark`);
            stepNodes.forEach((step) => step.classList.add('step-dark'));
        }else{
            document.querySelector(`.${classes[i]}`).classList.remove(`${classes[i]}-dark`);
            stepNodes.forEach((step) => step.classList.remove('step-dark'));
            document.querySelector(`.${classes[i]}`).classList.add(`${classes[i]}-light`);
            stepNodes.forEach((step) => step.classList.add('step-light'));
        }
    }
}

// Event Listener attached to recipeDiv
recipeDiv.addEventListener('click', (e) => {
    buttonClick();
});

toggle.addEventListener('change' , () => {
    toggleTheme();
})

infoIcon.addEventListener('click', () => {
    infoDialog.showModal();
})

closeButton.addEventListener('click', () => {
    infoDialog.close();
})

clipboardIcon.addEventListener('click', () => {
    let steps = document.querySelectorAll('.step');
    let allSteps = [];
    let stepTextArea = document.createElement('textarea')

    steps.forEach((step) => {
        // Copy the text inside the text field
        allSteps.push(step.textContent);
    })

    // Join Array elements with line breaks after each line
    stepTextArea.value = allSteps.join('\n');

    navigator.clipboard.writeText(stepTextArea.value);

    stepTextArea.remove();
    showToast();
})

// Basic function for the button that calls both clearRecipe() and displayRecipe()
function buttonClick(){
    clearRecipe(recipe);
    displayRecipe();
}