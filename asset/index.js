//1. Récuperer l'element <canvas> du DOM
let canvas = document.querySelector("#gameZone"); //ou document.getElementById("gameZone")

//2. Appeler le contexte(=les axes utilisés pour dessiner) de l'element <canvas>
let contexte= canvas.getContext('2d');

// Declarer une variable où seront stockee les touches précedement pressée
let preTouche;

// Compter le nombres de pommes mangées
let pommesMangées=0;

//3. Définir l'objet serpent
const snake={
    tete:{
        largeur:20,
        hauteur:20
    },
    position:{
        axeX:300,
        axeY:300
    },
    deplacement:{
        axeX:0,
        axeY:0
    },
    corps:[],
    taille:3,
    vitesse:100,


    afficher:()=>{
        contexte.clearRect(0, 0, canvas.width, canvas.height);
        contexte.fillStyle="#8db16c";
        // contexte.fillRect(snake.position.axeX, snake.position.axeY, snake.tete.largeur, snake.tete.hauteur);
        for(let loop=0;loop<snake.corps.length;loop++){
            contexte.fillRect(snake.corps[loop].x, snake.corps[loop].y, snake.tete.largeur-2, snake.tete.hauteur-2);
        }
    },

    deplacer:()=>{
        // snake.position.axeX++                =>>Pour le voir se deplacer sur l'axe X
        snake.position.axeX+=snake.deplacement.axeX*snake.tete.largeur
        // la position du serpent sur l'axe des X = ((sa position + son deplacement(+1))* sa largeur)
        snake.position.axeY+=snake.deplacement.axeY*snake.tete.hauteur;
        let coordonées={};
        coordonées.x=snake.position.axeX;
        coordonées.y=snake.position.axeY;
        snake.corps.push(coordonées);

        while(snake.corps.length>snake.taille){
            snake.corps.shift();
            };
    },
    
    grandir:()=>{  
        //manger une pomme= position X;Y de la pomme et du serpent = identique
        console.log("le serpent à manger une pomme!")
        snake.taille++;
    },

    accelerer:()=>{
        snake.vitesse-=10;
    }



};

const pomme={
    dimension:{
        // tete du rayon du cercle = largeur du serpent(20)/2
        rayon:10,
    },
    position:{
        // Position aléatoire entre 0 et 30 (largeur du canavas(600)/largeur du serpent(20))
        axeX:(Math.trunc(Math.random()*30)*snake.tete.largeur),
        axeY:(Math.trunc(Math.random()*30)*snake.tete.hauteur)
    },

    afficher:()=>{
        contexte.beginPath();
        contexte.arc(pomme.position.axeX+pomme.dimension.rayon, pomme.position.axeY+pomme.dimension.rayon, pomme.dimension.rayon, 0, Math.PI * 2);
        contexte.fillStyle="#df953a";
        contexte.fill();
        contexte.closePath();
    },

    nouvelle:()=>{
        pomme.position.axeX=(Math.trunc(Math.random()*30)*snake.tete.largeur);
        pomme.position.axeY=(Math.trunc(Math.random()*30)*snake.tete.hauteur);
    }
}


window.onload= () => { 
    // Initialiser un setInterval qui appelera toutes les fonctions utiles au jeu chaque 10ms.
    let RunTheGame = setInterval(game,snake.vitesse); 

    //Affecter à chaque touche du clavier une modification de la position du serpent
    document.addEventListener("keydown",clavier);
}


// Créer la fonction principale du jeu qui sera appeler tous les 10millisecondes
function game(){

    //Afficher le serpent
    snake.afficher();

    //Faire se deplacer le serpent
    snake.deplacer();

    //Afficher la pomme
    pomme.afficher();

    //Verifier si le serpent à manger une pomme
    if(snake.position.axeX == pomme.position.axeX && snake.position.axeY == pomme.position.axeY){
        //Faire grandir le serpent
        snake.grandir();

        //Faire réaparaitre une nouvelle pomme
        pomme.nouvelle();

        //Compter le nombres de pommes mangées
        pommesMangées++;
        
        //Si nombres de pommes mangées est un multiple de 5, augmentée la vitesse du serpent
        if(pommesMangées%5===0){
            snake.accelerer();
        }
    }  
    


};

function clavier(touche){
    // Pour connaitre les codes de chaque touches:
    // console.log(touche)
    // >> keydown {target: body, key: "ArrowUp", charCode: 0, keyCode: 38}

    switch(touche.keyCode) {
    case 37:
    // touche gauche
    if(preTouche == 39){break;}             //Si la touche précedente etait la 39, n'excute rien

    snake.deplacement.axeX=-1;              //Se deplace vers la gauche sur l'axe des X
    snake.deplacement.axeY=0;               //Ne modifie pas l'axe Y

    preTouche= touche.keyCode;              //Stocke la touche préssée dans la variable "preTouche"


    break;

    case 38:
    // touche haut
    if(preTouche == 40){break;}             //Si la touche précedente etait la 40, n'excute rien

    snake.deplacement.axeX=0;              //Ne modifie pas l'axe X
    snake.deplacement.axeY=-1;             //Se deplace vers le haut de l'axe Y (inversé)

    preTouche= touche.keyCode;             //Stocke la touche préssée dans la variable "preTouche"

    break;

    case 39:
    // touche droite
    if(preTouche == 37){break;}             //Si la touche précedente etait la 37, n'excute rien

    snake.deplacement.axeX=+1;              //Se deplace vers la droite sur l'axe des X
    snake.deplacement.axeY=0;               //Ne modifie pas l'axe Y

    preTouche= touche.keyCode;              //Stocke la touche préssée dans la variable "preTouche"

    break;

    case 40:
    // touche bas
    if(preTouche == 38){break;}             //Si la touche précedente etait la 38, n'excute rien

    snake.deplacement.axeX=0;              //Ne modifie pas l'axe X
    snake.deplacement.axeY=+1;             //Se deplace vers le bas de l'axe Y (inversé)

    preTouche= touche.keyCode;             //Stocke la touche préssée dans la variable "preTouche"

    break;

    case 32:
    // touche espace
    snake.deplacement.axeX=0;              //Ne modifie pas l'axe X
    snake.deplacement.axeY=0;              //Ne modifie pas l'axe Y
    break;

    };
}




