/**
 * Plan d'action:
 * 1. Générer une grille de 8 x 8 cases
 *  - 1.1 Dessiner "en dur" la grille dans notre HTML
 *  - 1.2 Styliser notre grille
 *  - 1.3 Générer le HTML de notre grille avec une double boucle
 *    (en se basant sur notre modèle en dur)
 * 
 * 2. Gérer le clic sur un pixel
 *  - 2.1 On écoute le clic sur un pixel
 *  - 2.2 On change la couleur
 *      - 2.2.1 Récupérer notre élément HTML sur lequel on a cliqué
 *      - 2.2.2 Gérer sa couleur avec une classe CSS
 * 3. Formulaire de configuration
 *  - 3.1 On crée notre formulaire "en dur dans le HTML" qui contient:
 *      - 3.1.1 Un champ pour choisir la taille de la grille
 *      - 3.1.2 Un bouton pour valider l'information
 *  - 3.2 On ajoute du style pour qu'il s'affiche correctement
 *  - 3.3 On crée le code JS qui permet de le générer
 *  - 3.4 On récupère la valeur de l'input saisie
 *      - 3.4.1 On a besoin de nouveau d'un écouteur d'événement
 *      - 3.4.2 On a besoin de récupérer la valeur à l'intérieur de l'input
 *  - 3.5 On veut utiliser cette valeur pour générer une grille qui corresponde 
 *          à la taille désirée
 * 
 * BONUS
 *  - 1. On veut factoriser l'intégralité de notre code en un objet (ou module):
 *      1.1 Toutes les variables qui contiennent des valeurs utilisées dans l'intégralité
 *          de notre application sont à mettre en propriété de notre app
 *      1.2 Toutes les fonction qui nous servent dans notre application sont à transformer
 *          en méthodes
 *      1.3 Les fonctions qui doivent être exécuter "par défaut" à l'affichage de notre
 *          page sont à regrouper dans une unique méthode "init" qu'on appelera à la fin
 *          de notre fichier
 *      ATTENTION: on prend bien soin de faire cela étape par étape en testant entre chaque
 *      que l'application fonctionne toujours
 *   - 2. On veut ajouter un champ pour choisir la taille de nos pixels
 * 
 *   - 3. On veut ajouter une palette de couleurs
 */   



// On va effectuer un gros "refacto" de notre code pour passer les variables "globales"
// ainsi que les fonctions (que l'on transforme du coup en méthodes) directement
// dans un objet "app" 
var app = {
    gridSize: 5,
    pixelSize: 30,
    colorsList: ['blue', 'green', 'red', 'fof'],
    currentColor: 'blue',

    drawBoard: function(gridSizeWanted, pixelSizeWanted) {
        // On va récupérer dans une variable notre div "invader" (en dehors de notre boucle
        // puisqu'on a besoin de le récupérer une seule fois)
        var invaderHTMLElement = document.getElementById('invader');
        
        // On oublie pas de supprimer son contenu (pour pouvoir générer une nouvelle grille
        // sans besoin de rafraichir la page)
        invaderHTMLElement.textContent = '';
    
        // on crée une boucle qui va nous permettre de générer notre grille
        for (var i = 0; i < gridSizeWanted; i++) {
            // A chaque itération, je crée une ligne avec un élément HTML 
            var line = document.createElement('div');
        
            // On  ajoute directement la classe 'line' à l'élément créé
            line.classList.add('line');
        
            for(var j = 0; j < gridSizeWanted; j++) {
                // A chaque itération de notre deuxième boucle
                // on crée un pixel avec un élément HTML
                var pixel = document.createElement('div');
        
                // On ajoute directement la classe 'pixel' à notre élément
                pixel.classList.add('pixel');

                pixel.style.width = `${pixelSizeWanted}px`;
                pixel.style.height = `${pixelSizeWanted}px`;

                // On en profite pour brancher directement à la création de chaque pixel
                // notre écouteur d'événement qui va détecter le clique de souris
                // On lui passe en deuxième argument la fonction qu'on a prévu à cet effet
                // ATTENTION: on ne met pas les parenthèses
                pixel.addEventListener('click', app.handleClick);
        
                // On oublie pas d'insérer notre élément dans la ligne
                // dé l'itération en cours
                line.appendChild(pixel);
            }
        
            // On insère à chaque itération la ligne créée dans notre div invader
            invaderHTMLElement.appendChild(line);
        }
    },

    handleClick: function(event) {
    
        // le pixel sur lequel on clique va ainsi automatiquement être contenu
        // dans la clé "target" de notre objet "event"
        var pixelClicked = event.target;
        
        // On récupère la liste de class de notre élément cliqué
        var classList = pixelClicked.classList;

        // Si notre liste contient déjà une couleur identique à la couleur sélectionnée
        if (classList.contains(app.currentColor)) {
            // alors on enlève la couleur
            pixelClicked.className = 'pixel';
        } else {
            // sinon on ajoute la couleur souhaitée
            pixelClicked.className = `pixel ${app.currentColor}`;
        }
    },

    drawForm: function() {
        // On récupère l'espace dédié au formulaire dans une variable
        var formHTMLElement = document.getElementsByClassName('configuration')[0];
        
        // On crée notre input en élément HTML
        var gridSizeInputHTMLElement = document.createElement('input');
        
        // On ajoute ensuite les attributs dont on a besoin
        gridSizeInputHTMLElement.placeholder = 'Taille de la grille';
        gridSizeInputHTMLElement.type = 'number';
        
        // On insère notre input dans l'espace dédié de notre formulaire
        formHTMLElement.appendChild(gridSizeInputHTMLElement);

        var pixelSizeInputHTMLElement = document.createElement('input');
        
        // On ajoute ensuite les attributs dont on a besoin
        pixelSizeInputHTMLElement.placeholder = 'Taille des pixels';
        pixelSizeInputHTMLElement.type = 'number';
        
        // On insère notre input dans l'espace dédié de notre formulaire
        formHTMLElement.appendChild(pixelSizeInputHTMLElement);
        
        // On fait exactement la même opération pour notre bouton
        var buttonHTMLElement = document.createElement('button');
        
        // On ajoute le texte que l'on souhaite à l'intérieur
        buttonHTMLElement.textContent = 'Valider';
        
        // On l'insère également dans notre formulaire
        formHTMLElement.appendChild(buttonHTMLElement);
    
        // On va avoir besoin d'écouter l'événement 'submit' sur notre formulaire
        // Cet événement est l'événement par défaut déclenché automatiquement 
        // lorsqu'on clique sur le bouton d'un formulaire
        formHTMLElement.addEventListener('submit', function(event) {
            // La méthode "preventDefault" appliquée à un événement permet d'empêcher
            // le comportement par défaut de cet événement
            event.preventDefault();
    
            // On stocke dans la clé "gridSize" de notre objet app la valeur 
            // de l'input qui permet de choisir la taille de la grille
            var newGridSize = gridSizeInputHTMLElement.value;

            // On remplace la valeur de notre clé "gridSize" UNIQUEMENT
            // si notre input contient une valeur
            if(newGridSize !== '') {
                // On oublie pas de convertir notre string récupérée de l'input en number
                // UNIQUEMENT quand cette string n'est pas vide
                app.gridSize = Number(newGridSize);
            }

            // On stocke dans la clé "pixelSize" de notre objet app la valeur
            // de l'input qui permeet de choisir la taille des pixels
            var newPixelSize = pixelSizeInputHTMLElement.value;

            // On remplace la valeur de notre clé "pixelSize" UNIQUEMENT
            // si notre input contient une valeur
            if(newPixelSize !== '') {
                app.pixelSize = Number(newPixelSize);
            }

    
            // On n'oublie pas d'appeler la fonction pour qu'elle s'exécute en lui passant
            // les tailles désirées de grille et de pixels A PARTIR des clés enregistrées
            // dans notre object app
            app.drawBoard(app.gridSize, app.pixelSize);
        });
    },

    drawColorPalette: function() {

        var paletteContainer = document.createElement('div');
        
        paletteContainer.id = 'palette-container';
        
        // SYNTAXE HISTORIQUE POUR BOUCLE FOR
        // for(var index = 0; index < colorsList.length; index++) {
        //     var paletteColorHTMLElement = document.createElement('a');
        
        //     paletteColorHTMLElement.classList.add('palette-color');
        
        //     paletteColorHTMLElement.classList.add(colorsList[index]);
        
        //     paletteContainer.appendChild(paletteColorHTMLElement);
        // }
        
        // On a également à notre disposition une nouvelle syntaxe pour boucler sur un 
        // tableau. ATTENTION: cette syntaxe peut s'utiliser uniquement si on a pas besoin
        // explicitement de nos index
        for (var color of app.colorsList) {
        
            var paletteColorHTMLElement = document.createElement('a');
        
            paletteColorHTMLElement.classList.add('palette-color');

            paletteColorHTMLElement.dataset.color = color;
        
            paletteColorHTMLElement.classList.add(color);

            paletteColorHTMLElement.addEventListener('click', function(event) {
                // On efface d'abord l'éventuel class 'hilighted' déjà présente sur une couleur
                // cliquée auparavant
                var oldChoosenColorHTMLElement = document.getElementsByClassName('palette-color--active')[0];

                if (oldChoosenColorHTMLElement) {
                    oldChoosenColorHTMLElement.classList.remove('palette-color--active');
                }

                // Ensuite on remplace dans notre application la couleur courante
                // par la nouvelle couleur cliquée dans la palette
                var clickedColorHTMLElement = event.target;

                // On ajoute la class
                clickedColorHTMLElement.classList.add('palette-color--active');

                // On modifie la couleur courante active de l'app
                app.currentColor = clickedColorHTMLElement.classList[1];

                // On peut aussi utiliser le dataset
                // app.currentColor = clickedColorHTMLElement.dataset.color;
            });
        
            paletteContainer.appendChild(paletteColorHTMLElement);
        
        }
        
        document.body.appendChild(paletteContainer);
        
    },

    // On crée une méthode "init" qui va permettre d'initialiser notre application lorsque
    // la page se charge
    init: function() {
        app.drawBoard(app.gridSize, app.pixelSize);

        app.drawForm();

        app.drawColorPalette();
    }
};

// On exécute notre fonction init() afin que notre application se lance dès que la page
// s'affiche
app.init();
