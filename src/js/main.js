
function generateRecipe(diceRoll){
    var temperatureOptions = ["75 C","80 C","85 C","90 C","95 C","Your Choice"];
    var steepTimeGrindOptions = ["Coarse: 4 Minutes","Medium: 120 Seconds","Medium Fine: 90s","Fine:60s","Very Fine: 60s","Your Choice"];
    var waterToCoffeeOptions = ["12g of Coffee to 200g of Water","15g of Coffee to 200g of Water","15g of Coffee to 250g of Water","24g of Coffee to 200g of Water (Dilute to Share)","30g of Coffee to 200g of Water (Dilute to Share)","Your Choice"];
    var stirringOptions = ["Stir Once Before Pressing","Stir Twice Before Pressing","Stir Once Clickwise, and Once Counter-Clickwise Before Pressing","Stir North, South, East, West Before Pressing","Don't Stir","Your Choice"];
    var positionBloomOptions = ["Upright, 30s Bloom, 30g of Water","Upright, no Bloom","Inverted, 30s Bloom, 30g of Water","Inverted, no Bloom","Upright, 30s Bloom, 60g of Water","Inverted, 30s Bloom, 60g of Water"];

    var tp = temperatureOptions[diceRoll]
    var stp= steepTimeGrindOptions[diceRoll]
    var wc= waterToCoffeeOptions[diceRoll]
    var stirring = stirringOptions[diceRoll]
    var pos = positionBloomOptions[diceRoll]

    var recipe = [tp,stp,wc,stirring,pos]
    
    return recipe;
}

function clearRecipe(){
    let recipeDiv = document.getElementById('recipe');
    recipeDiv.innerHTML = "";
}

function displayRecipe() {
    var diceRoll = Math.floor(Math.random() * 6)
    var steps = ["Temperature","Steep Time / Grind","Water / Coffee","Stirring","Position / Bloom"]

    let recipe = generateRecipe(diceRoll)

    for(i = 0; i < recipe.length; i++){
        var recipeStepText = steps[i] + ":" + recipe[i]
        var li = document.createElement("LI");
        li.setAttribute("class","recipeStep")
        var recipeStep = document.createTextNode(recipeStepText);
        li.appendChild(recipeStep);
        recipeDiv.appendChild(li);
    }

    
}

function buttonClick(){
    clearRecipe();
    displayRecipe();
}