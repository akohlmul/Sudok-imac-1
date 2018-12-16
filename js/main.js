/*




																	SUDOKUS






*/

const facile_1 = "089010504547300060000900003608001930219000754047200601100005000020006875508030410";
const facile_1_solution = "389716524547382961126954873658471932219638754347295681197845263423196875568732419";
const facile_2 = "092800056058690000600000708320507900700809003006204071603000005000024380850007140";
const facile_2_solution = "792831456458697132613425798324517968715869243986234571643189275971524386852367149";
const facile_3 = "050010700610000805704360910006002300457301296009400100035028401904000028001040090";
const facile_3_solution = "253819764619742835784365912186592347457381296239476158635928471974163528821547693";
const moyen_1 = "010300002089200674000700013100603900003908400009401006850006000746002830100008060";
const moyen_1_solution = "417368592389251674625794813184673925563928417279451386859736241746192835132548967";
const moyen_2 = "000518076004070210000620000900053004501000709300170005000092000062040300490538000";
const moyen_2_solution = "329518476654973218817624953987253164521486739346179285735692841862147395491538762";
const moyen_3 = "000190700000703006071500200003472008260000047800163900001007340400809000005016000";
const moyen_3_solution = "235196784984723156671584239953472618261598347847163952861527349472839615395416728";
const difficile_1 = "607000510020076000140500000000208005809000203600405000000003021000780060051000804";
const difficile_1_solution = "637849512528176934149523768374298165859617243612435987786453921492781365351296874";
const difficile_2 = "000918020010060098200075300600040000001000900000030002003570004670040030020893000";
const difficile_2_solution = "365918427417263598289475316659842731321756984748931652183576294679142835524893167";
const difficile_3 = "510008070000709000072030458000000020500304007080000000761050830000801000040700061";
const difficile_3_solution = "513248976648759132972136458194687325526314987387529614761452839293861475845793261";

/*
Les sudokus se lisent comme ça
____
|147|
|258|
|369|
-----
on peut donc facilement les transformer en string


Déclarations des const et var*/

const popUpStart = document.querySelector("#levelForm");
const greyCover = document.querySelector("#cover");
const pseudoField = document.querySelector("#inputName");
const selectLevel = document.querySelector("#levelForm .level"); //Donner une ID ?
const startButton = document.querySelector("#jouer");
var choosenLevel;
var gridToDisplay;
var arrayToLoad;
var solution;
var stringResult=''; //Variable qui contiendra la chaine de chiffre donnée pour qu'on la compare à la solution
const allBigBoxes = document.querySelectorAll('.box');
const allSmallBoxes = document.querySelectorAll('.little-box');
var firstClickDone = false;
const validButton = document.querySelector("#valider");
const jeveuxcontinuer = document.querySelector("#continer"); //Changer en continUer
const popUpBravo = document.querySelector("#popBravo");
const popUpFail = document.querySelector("#popFail");


/*A enlever plus tard*/
popUpBravo.style.display = 'none';
popUpFail.style.display = 'none';

//La fonction enlève le popup du début pour qu'on puisse jouer et load la grille.
const startGame = (button) => {
	
	/*Comme c'est un bouton de type submit on l'mepeche de raffraichir la page*/
	button.preventDefault();
	
	if(pseudoField.value != ''){
		popUpStart.style.display = 'none';
		greyCover.style.display = 'none';
		choosenLevel = selectLevel.options[selectLevel.selectedIndex].value;
		
		//Le niveau est choisi et on lui ajoute un nombre aléatoire entre 1 et 3
		gridToDisplay = choosenLevel+'_'+(Math.floor(Math.random() * 3) + 1 );
		solution = gridToDisplay+'_solution';
		
		//La grille à charger
		//On doit mettre eval pour qu'il comprenne que c'est le nom d'une variable
		arrayToLoad = Array.from(eval(gridToDisplay));
		
		//Pour chaque petite case, on va devoir lui attribuer une valeur de départ ou non
		allSmallBoxes.forEach(loadGrid);
	}else{
		alert('Entre un pseudo avant de commencer :)');
	}
}

startButton.addEventListener('click', evt => startGame(evt));
	

/*Cette fonction charge les grilles pré-établies dans le sudoku d'après l'index de la case donnée
et le string de arrayToLoad*/
const loadGrid = (element, index) =>{
	/*Si on a un index différent de 0, et donc que la grille
	contient un numéri de base, on change son background par
	la bonne image et on change la couleur de fond
	On lui ajoute la classe "BlackAndWhite"*/
	if(arrayToLoad[index] != 0){		
		element.style.background = 'center / contain no-repeat rgba(0,0,0,0.15) url("img/'+arrayToLoad[index]+'.png")';
		element.classList.add("BlackAndWhite");
	}else{
		element.style.background = '';
	}
}

/*Cette fonction s'occupe de changer le fond d'une case si on a cliqué dessus*/
const changeBg = (smallBox) => {
	
	/*Si c'est la premiere fois qu'on clique sur une case, on démarre le chrono*/
	if(!firstClickDone){
		firstClickDone = true;
		chronoStart();
	}
	
	/*Si la case cliquée n'est pas une case non-modifiable*/
	if(!smallBox.classList.contains("BlackAndWhite")){
		
		/*On prend en compte s'il y a déjà un fond ou non*/
		var nomImage = smallBox.style.backgroundImage;
		var nbClick;
			
		/*Si on n'a pas d'image de fond, alors on est à 0 click
		sinon, on a actuellement une image qui s'appelle nomImage.substring(5, nomImage.length-2)
		car les images ont le nom ' url("img/1.png") ', puis on récupère seulement le numéro en 
		faisant nomImage.substring(4, 5);*/
		if(nomImage == ''){
			nbClick = 0;
		}else{
			nomImage= nomImage.substring(5, nomImage.length-2);
			nbClick = nomImage.substring(4, 5);
		}
		
		/*On veut la photo d'après
		C'est donc la photo après le nombre de click modulo 10 car si on dépasse 9, on veut revenir à 0*/
		const imageToFetch = nbClick%10+1;
			
		/*Si on est à 10, alors on met une case vide, sinon on change le bg*/
		if(imageToFetch != 10){
			/*Son chemin d'accès est dans image, et son extension est png*/
			const urlImageToFetch = 'center / contain no-repeat #eee url("img/'+imageToFetch+'.png")';	
			smallBox.style.background = urlImageToFetch;		
		}else{
			smallBox.style.background = '';
		}
	}
}

/*On change le bg si on cliqué sur une case*/
const handleClick = (element) => element.addEventListener('click', evt => changeBg(evt.target));

/*Si on right-click, on prevent son action par défault et ça efface ce qu'il y avait dans la case
si ce n'est pas une case non-modifiable*/
const handleRightClick = (element) => element.addEventListener('contextmenu', function(evt) {
    evt.preventDefault();
	if(!element.classList.contains("BlackAndWhite"))
		element.style.background = '';
});

/*Si on clique sur une petite case, alors on doit s'occupper du fait qu'on ait cliqué*/
allSmallBoxes.forEach(handleClick);
allSmallBoxes.forEach(handleRightClick);


/*On va mettre bout à bout les numéros rentrés dans le sudoku pour que ce soit du même format que la solution
en plus on a qu'une comparaison*/
function insertInString(element){
	var nbPhoto = element.style.backgroundImage;
	
	/*Si on n'a pas d'image de fond, alors on est à 0*/
	if(nbPhoto == ''){
		nbPhoto = 0;
	}else{
		/*Sinon on prend le chiffre*/
		nbPhoto = nbPhoto.substring(9, 10);
	}

	/*On ajoute au string le numéro*/
	stringResult += nbPhoto;
}

/*Si on a validé, on va vérifier si on a eu la bonne solution*/
function buttonClicked() {
	/*On crée la chaine*/
	allSmallBoxes.forEach(insertInString);

	/*On remet eval() pour savoir que c'est le nom de la variable
	et on compare les deux strings
	si localeCompare renvoie 0 alors c'est gagné sinon on affiche le popup
	de fail*/
	const n = stringResult.localeCompare(eval(solution));
	if(n ==0){
		popUpBravo.style.display = 'inline';
		cover.style.display = 'inline';
		document.querySelector("#popBravo h1").innerHTML = "Félicitations "+pseudoField.value+" !";
	}
	else{
		popUpFail.style.display = 'inline';
		cover.style.display = 'inline';
		document.querySelector("#popFail h1").innerHTML = "Perdu "+pseudoField.value;
	}
}

/*Si on avait fail mais qu'on veut continuer*/
function continueGame(){
	popFail.style.display = 'none';
	cover.style.display = 'none';
}

validButton.addEventListener('click', buttonClicked);
jeveuxcontinuer.addEventListener('click', continueGame);


/*CHRONOMETRE*/

var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
var temps="0:00:00:00";

function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	document.getElementById("chronotime").value = hr + ":" + min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}

/*Si on clique sur je valide, le chrono s'arrete*/
function chronoStart(){
	validButton.onclick = chronoStop;
	start = new Date();
	chrono();
}

/*Si on clique sur je valide, le chrono s'arrete*/
function chronoContinue(){
	validButton.onclick = chronoStop;
	start = new Date()-diff;
	start = new Date(start);
	chrono();
}

/*Si le chrono est arrêté mais qu'on veux continuer, on relance le chrono*/
function chronoStop(){
	jeveuxcontinuer.onclick = chronoContinue;
	temps = document.getElementById("chronotime").value;
	/*On ajoute le temps dans le pop up de Fail*/
	document.querySelector("#popFail h2 span").innerHTML = temps;
	document.querySelector("#popBravo h2 span").innerHTML = temps;
	clearTimeout(timerID);
}







