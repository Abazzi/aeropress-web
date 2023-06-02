/**
 * function diceRolls 
 */
let die;

function diceRolls() {
    let diceRollsArray = [];

    for(i = 0; i <= 5; i++){
        die = Math.floor(Math.random() * 6);
        diceRollsArray.push(die);
    }

    return diceRollsArray;
}

/**
 * generateRecipe(random dice roll)
 * giving the function a parameter makes it so a new roll will be chosen each time the button is clicked
 * declare 5 arrays with all possible steps as Strings.
 * assign a randomly picked step to a variable for each part of the process
 * make a new array with all the selected steps and return it.
 */
function generateRecipe(){

    var diceRollsArray = diceRolls();

    var temperatureOptions = ["75 C","80 C","85 C","90 C","95 C","Your Choice"];
    var steepTimeGrindOptions = ["Coarse - 4 Minutes","Medium - 120 Seconds","Medium Fine - 90s","Fine - 60s","Very Fine - 60s","Your Choice"];
    var waterToCoffeeOptions = ["12g of Coffee to 200g of Water","15g of Coffee to 200g of Water","15g of Coffee to 250g of Water","24g of Coffee to 200g of Water (Dilute to Share)","30g of Coffee to 200g of Water (Dilute to Share)","Your Choice"];
    var stirringOptions = ["Stir Once Before Pressing","Stir Twice Before Pressing","Stir Once Clockwise, and Once Counter-Clockwise Before Pressing","Stir North, South, East, West Before Pressing","Don't Stir","Your Choice"];
    var positionBloomOptions = ["Upright, 30s Bloom, 30g of Water","Upright, no Bloom","Inverted, 30s Bloom, 30g of Water","Inverted, no Bloom","Upright, 30s Bloom, 60g of Water","Inverted, 30s Bloom, 60g of Water"];

    var recipe = [temperatureOptions[diceRollsArray[0]],steepTimeGrindOptions[diceRollsArray[1]],waterToCoffeeOptions[diceRollsArray[2]],
    stirringOptions[diceRollsArray[3]],positionBloomOptions[diceRollsArray[4]]];
    
    return recipe;
}

function clearRecipe(){
    document.getElementById("recipe").innerHTML = "";
}

/**
 * displayRecipe()
 */
function displayRecipe() {
    var steps = ["Temperature","Steep Time / Grind","Water / Coffee","Stirring","Position / Bloom"]

    const stepHexCode = "#fec33a";

    let recipe = generateRecipe();

    for(i = 0; i < recipe.length; i++){
        var recipeStepText = steps[i] + ": " + recipe[i]
        var ol = document.querySelector("#recipe");
        var li = document.createElement("LI");
        var br = document.createElement("br");
        li.setAttribute("class","recipeStep");
        var recipeStep = document.createTextNode(recipeStepText);
        li.appendChild(recipeStep);
        recipeDiv.appendChild(li);
        ol.appendChild(li);
        ol.appendChild(br);
    }

    
}

function toggleTheme(){
    let classes = ["body","header","subtitle","recipeDiv","footer"]
    let toggle = document.querySelector('#toggleTheme');
    if(toggle.checked){
        for(i = 0; i < classes.length; i++){
            document.querySelector(`.${classes[i]}`).classList.toggle(`${classes[i]}-dark`);
        }
    }else{
        console.log("Bye");
    }
}

// Basic function for the button that calls both clearRecipe() and displayRecipe()
function buttonClick(){
    clearRecipe();
    displayRecipe();
}