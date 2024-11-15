const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MzAwN2FlZGU3ODAwMTU3OTM0YzgiLCJpYXQiOjE3MzE2NzI4OTksImV4cCI6MTczMjg4MjQ5OX0.lwoQqHD5UPf5DCCpnpcvw4UDG9lFWcTFR6-TrhKaQ18"
let productID = new URLSearchParams(window.location.search).get('productID');

document.addEventListener('DOMContentLoaded', () => {
    const productDetail = async () => {
        try {
            let response = await fetch(url + productID, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                console.log('Connessione avvenuta con successo!');
                let product = await response.json();
                console.log('prodotto:', product);
                console.log(product.imageUrl);
                let img = document.querySelector('#productImage');
                let productImage = document.createElement('img');
                productImage.setAttribute('src', product.imageUrl);
                productImage.classList.add('w-100');
                productImage.style="max-width: 25rem";
                img.appendChild(productImage);
                let info = document.querySelector('#productInfo');
                info.innerHTML = `
                <h2>${product.brand} - ${product.name}</h2>
                <p><b>ID Prodotto:</b> ${product._id}</p>
                <p>
                    <b>Descrizione Prodotto:</b> <br>
                    ${product.description}
                </p>
                <p><b>Prezzo Prodotto:</b> $${product.price}</p>
                <p>
                    <b>URL Immagine:</b> <br> 
                    ${product.imageUrl}
                </p>
                `
            }
            else {
                return new Error('Errore nella chiamata');
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    productDetail();
})
