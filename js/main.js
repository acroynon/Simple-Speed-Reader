/* Initialise setup */
showMenu();

/* Button clicks */
function readClicked(){
	hideErrorMessage()
	var inputWords = getElement("input").value;
	if(isEmpty(inputWords)){
		displayErrorMessage();
	}else{
		startSpeedReader(inputWords);
	}
}

function stopClicked(){
	hideErrorMessage()
	stopSpeedReader();
}

function combineWordsCheckboxClicked(){
	var checked = getElement("combineWordsCheckbox").checked;
	getElement("combineRange").disabled = !checked;
}

/* Range value change handlers */
function changeSpeedRange(){
	var speedRangeElem = getElement("speedRange");
	var valueElem = getElement("speedRangeValue");
	valueElem.innerText = speedRangeElem.value;
}

function changeCombineRange(){
	var combineRangeElem = getElement("combineRange");
	var valueElem = getElement("combineRangeValue");
	valueElem.innerText = combineRangeElem.value;
}

/* actual reader code */
var globalTimer = null;
function startSpeedReader(text){
	showReader();
	var words = text.split(/\s+/);
	var wordElem = getElement("word");
	var combineWords = getElement("combineWordsCheckbox").checked;
	var combineLength = getElement("combineRange").value;
	var speed = getElement("speedRange").value;
	var totalWords = words.length;
	var currentIndex = 0;

	globalTimer = setInterval(function(){
		if(currentIndex >= totalWords){
			stopSpeedReader();
		}else{
			var currentWord = words[currentIndex];
			// Check combine word
			if(combineWords){
				var twoWords = currentWord + " " + words[currentIndex+1]
				if(twoWords.length <= parseInt(combineLength) + 1){
					currentWord = currentWord + " " + words[currentIndex+1];
					currentIndex += 1;
				}
			}
			// Show word(s) on screen
			wordElem.innerText = currentWord.trim();
			currentIndex += 1;
		}
	}, 1000 / speed);
}

function stopSpeedReader(){
	showMenu();
	clearInterval(globalTimer);
	getElement("word").innerText = "";
}


/* helper functions */
function displayErrorMessage(){
	getElement("message").style.display = "block";
}

function hideErrorMessage(){
	getElement("message").style.display = "none";
}

function showReader(){
	getElement("menu").style.display = "none";
	getElement("reader").style.display = "block";
}

function showMenu(){
	getElement("menu").style.display = "block";
	getElement("reader").style.display = "none";
}

function getElement(id){
	return document.getElementById(id);
}

function isEmpty(str){
	return (!str || str.length === 0 || str.trim() === "");
}