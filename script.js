// Sélection des éléments dans le DOM
const cartItemsContainer = document.querySelector('.cart-items'); // Conteneur des articles du panier
const cartTotalElement = document.querySelector('.cart-total');   // Élément affichant le total du panier

// Fonction pour mettre à jour le total du panier
function updateCartTotal() {
    let total = 0; // Initialisation du total à 0
    const cartItems = document.querySelectorAll('.cart-item'); // Sélectionne tous les articles du panier

    // Boucle sur chaque article pour calculer le total
    cartItems.forEach(item => {
        const priceElement = item.querySelector('.cart-item-price'); // Sélectionne l'élément du prix de l'article
        const quantityElement = item.querySelector('.quantity');     // Sélectionne l'élément de la quantité
        const price = parseInt(priceElement.textContent.replace('FCA', '')); // Convertit le prix en nombre
        const quantity = parseInt(quantityElement.textContent);      // Convertit la quantité en nombre
        total += price * quantity; // Ajoute le prix total de cet article au total général
    });

    cartTotalElement.textContent = total; // Met à jour l'affichage du total du panier
}

// Fonction pour ajuster la quantité d'un article
function adjustQuantity(event, isAdding) {
    const quantityElement = event.target.closest('.cart-item-quantity').querySelector('.quantity'); // Sélectionne la quantité de l'article concerné
    let quantity = parseInt(quantityElement.textContent); // Convertit la quantité actuelle en nombre

    // Ajoute ou enlève 1 à la quantité selon le bouton cliqué
    if (isAdding) {
        quantity += 1;
    } else if (quantity > 1) {
        quantity -= 1;
    }

    quantityElement.textContent = quantity; // Met à jour la quantité dans le DOM
    updateCartTotal(); // Met à jour le total après modification de la quantité
}

// Fonction pour supprimer un article du panier
function removeCartItem(event) {
    const cartItem = event.target.closest('.cart-item'); // Sélectionne l'article concerné
    cartItem.remove(); // Supprime l'article du DOM
    updateCartTotal(); // Met à jour le total après suppression
}

// Ajout des gestionnaires d'événements pour ajuster la quantité
cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('quantity-plus')) {
        adjustQuantity(event, true); // Ajoute une unité à l'article
    } else if (event.target.classList.contains('quantity-minus')) {
        adjustQuantity(event, false); // Enlève une unité à l'article
    } else if (event.target.classList.contains('remove-item')) {
        removeCartItem(event); // Supprime l'article du panier
    }
});

// Appel initial pour calculer le total lorsque la page charge
updateCartTotal();
