/*




																	SUDOKUS






*/

/*
Niveau faible
*/

const facile_1 = "089010504547300060000900003608001930219000754047200601100005000020006875508030410";
const facile_1_solution = "389716524547382961126954873658471932219638754347295681197845263423196875568732419";

/*
Les sudokus se lisent comme ça
____
|147|
|258|
|369|
-----
*/

const allBigBoxes = document.querySelectorAll('.box');
const allSmallBoxes = document.querySelectorAll('.little-box');


/*CHARGER LE SUDOKU*/


//Le niveau aura été choisi et on aura plusieurs grilles possibles
const level = 'facile';
const gridToDisplay = facile_1;
//Condition de chargement à mettre ici
const arrayToLoad = Array.from(facile_1);
const solution = facile_1_solution;
	

//Cette fonction charge les grilles pré-établies dans le sudoku
const loadGrid = (element, index) =>{
	if(arrayToLoad[index] != 0){		
		element.style.background = 'center / contain no-repeat  rgba(0,0,0,0.15) url("img/'+arrayToLoad[index]+'.png")';
	}else{
		element.style.background = '';
	}
	
	element.classList.add("alreadyFilled");
}

//Pour chaque petite case, on va devoir lui attribuer une valeur de départ ou non
allSmallBoxes.forEach(loadGrid);

/*PENDANT QU'ON RESOUD LE SUDOKU*/


const changeBg = (smallBox) => {
	/*Si on clique, on passe à l'image d'après, si le nombre de clique%10 = 0, alors on remet la case vide
	Pour récuperer le nombre de clics, on prend simplement le nom de l'image*/
	
	var nomImage = smallBox.style.backgroundImage;
	var nbClick;
	
	/*Si on n'a pas d'image de fond, alors on est à 0*/
	if(nomImage == ''){
		nomImage = 0;
		nbClick = 0;
	}else{
		nomImage= nomImage.substring(5, nomImage.length-2);
		nbClick = nomImage.substring(4, 5);
	}
	
	/*On veut la photo d'après
	C'est donc la photo après le nombre de click modulo 10 car si on dépasse 9, on veut revenir à 0*/
	const imageToFetch = nbClick%10+1;
	
	/*Si on veut faire défiler les images*/
	if(imageToFetch != 10){
		/*Son chemin d'accès est dans image, et son extension est png*/
		const urlImageToFetch = 'center / contain no-repeat #eee url("img/'+imageToFetch+'.png")';
		
		smallBox.style.background = urlImageToFetch;
		
	}else{ /*Si on a cliqué pour revenir à une case vide*/
		smallBox.style.background = '';
	}
}

/*Fonction du forEach qui met l'eventListener*/
const handleClick = (element) => element.addEventListener('click', evt => changeBg(evt.target));

/*Si on right-click, ça efface*/
const handleRightClick = (element) => element.addEventListener('contextmenu', function(evt) {
    evt.preventDefault();
    element.style.background = '';
});
/*Si on clique sur une petite case, alors on doit s'occupper du fait qu'on ait cliqué*/
allSmallBoxes.forEach(handleClick);
allSmallBoxes.forEach(handleRightClick);


/*VERIFICATION DU SUDOKU*/

const button = document.querySelector('#valider');

/*On va mettre bout à bout les numéros rentrés dans le sudoku pour que ce soit du même format que la solution
en plus on a qu'une comparaison*/

var stringResult='';

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

function buttonClicked() {
	/*On crée la chaine*/
	allSmallBoxes.forEach(insertInString);
	
	const n = stringResult.localeCompare(solution);
	if(n ==0)
		alert('Bravo !');
	else
		alert("C'est raté...");
}

button.addEventListener('click', buttonClicked);












