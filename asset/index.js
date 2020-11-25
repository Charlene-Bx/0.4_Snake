//0. Attendre que la page soit entiérement chargée avant de lancer le script
window.onload= () => {  

    //1. Récuperer l'element <canvas> du DOM
    let canvas = document.querySelector("#gameZone"); //ou document.getElementById("gameZone")

    //2. Appeler le contexte(=les axes utilisés pour dessiner) de l'element <canvas>
    let contexte= canvas.getContext('2d');

    //3. Initialiser un setInterval qui appelera toutes les fonctions utiles au jeu chaque 10ms.
    let RunTheGame = setInterval(game,10);  

    //4. Définir l'objet serpent
    const snake={
        dimension:{
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
        //Voir 5.
        afficher:()=>{
            contexte.clearRect(0, 0, canvas.width, canvas.height);
            contexte.fillStyle="#8db16c";
            contexte.fillRect(snake.position.axeX, snake.position.axeY, snake.dimension.largeur, snake.dimension.hauteur);
        },
        deplacer:()=>{
            // snake.position.axeX++                =>>Pour le voir se deplacer sur l'axe X
            snake.position.axeX+=snake.deplacement.axeX;
            snake.position.axeY+=snake.deplacement.axeY;

        }
    };

    //5. Créer la fonction principale du jeu qui sera appeler tous les 10millisecondes
    function game(){

        //Afficher le serpent
        snake.afficher();

        //Faire se deplacer le serpent
        snake.deplacer();

        //Affecter à chaque touche du clavier une modification de la position du serpent
        document.addEventListener("keydown",clavier);
        // Pour connaitre les codes de chaque touches utiliser la fonction suivante:
        // document.addEventListener("keydown",keyboard);
        // function keyboard(evt){console.log(evt)}
        // >> keydown {target: body, key: "ArrowUp", charCode: 0, keyCode: 38}
        function clavier(touche){
            switch(touche.keyCode) {
            case 37:
            // touche gauche
            snake.deplacement.axeX=-1;              //Se deplace vers la gauche sur l'axe des X
            snake.deplacement.axeY=0;               //Ne modifie pas l'axe Y
            break;

            case 38:
            // touche haut
            snake.deplacement.axeX=0;              //Ne modifie pas l'axe X
            snake.deplacement.axeY=-1;             //Se deplace vers le haut de l'axe Y (inversé)
            break;

            case 39:
            // touche droite
            snake.deplacement.axeX=+1;              //Se deplace vers la droite sur l'axe des X
            snake.deplacement.axeY=0;               //Ne modifie pas l'axe Y

            break;
            case 40:
            // touche bas
            snake.deplacement.axeX=0;              //Ne modifie pas l'axe X
            snake.deplacement.axeY=+1;             //Se deplace vers le bas de l'axe Y (inversé)
            break;

            case 32:
            // touche espace
            snake.deplacement.axeX=0;              //Ne modifie pas l'axe X
            snake.deplacement.axeY=0;              //Ne modifie pas l'axe Y
            break;

            }
        }
           
        
    }

}




