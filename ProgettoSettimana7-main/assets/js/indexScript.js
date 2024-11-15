const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MzAwN2FlZGU3ODAwMTU3OTM0YzgiLCJpYXQiOjE3MzE2NzI4OTksImV4cCI6MTczMjg4MjQ5OX0.lwoQqHD5UPf5DCCpnpcvw4UDG9lFWcTFR6-TrhKaQ18"
let productID = new URLSearchParams(window.location.search).get('productID');

document.addEventListener('DOMContentLoaded', () => {
    // Chiamata GET
    const getProducts = async () => {
        try {
            let response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                console.log('Connessione avvenuta con successo! Status code:', response.status);
                let results = await response.json();
                console.log('Prodotti presenti: ', results);
                displayProducts(results);
            }
            else {
                return new Error('Errore nella chiamata');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    getProducts();

    const displayProducts = (results) => {
        let container = document.querySelector('#cardContainer');
        results.forEach(product => {
            //Creazione cards
            let cards = document.createElement('div');
            cards.classList.add('col-sm-3', 'd-flex', 'justify-content-center', 'align-items-center');
            cards.innerHTML = `
            <div class="card mb-3 shadow" style="width: 20rem; height: 25rem">
                <img src="${product.imageUrl}" class="img-fluid object-fit-contain h-50" alt="${product.name}" >
                <div class="card-body bg-warning-emphasis d-flex flex-column justify-content-between">
                    <div class="card-title">
                        <h5 class="card-title">${product.brand} ${product.name}</h5>
                        <p class="card-text text-secondary">$${product.price}</p>
                    </div>
                    <p class="card-text d-flex justify-content-between">
                        <a href="backoffice.html?productID=${product._id}" class="btn btn-dark"><i class="bi bi-pencil-square"></i></a>
                        <a href="details.html?productID=${product._id}" class="btn btn-info"><i class="bi bi-info-circle"></i></a>
                    </p>
                </div>
            </div>
            `;
            container.appendChild(cards);
        });
    }
})
