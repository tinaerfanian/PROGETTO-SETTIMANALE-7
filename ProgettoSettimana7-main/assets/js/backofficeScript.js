const url = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MzAwN2FlZGU3ODAwMTU3OTM0YzgiLCJpYXQiOjE3MzE2NzI4OTksImV4cCI6MTczMjg4MjQ5OX0.lwoQqHD5UPf5DCCpnpcvw4UDG9lFWcTFR6-TrhKaQ18"
let productID = new URLSearchParams(window.location.search).get('productID');

document.addEventListener('DOMContentLoaded', () => {

    const exists = async () => {
        try {
            let response = await fetch(url + productID, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                console.log('Il prodotto esiste! Status code:', response.status);
                let prodotto = await response.json();
                console.log('Hai ottenuto: ', prodotto);
                document.querySelector('#name').value = prodotto.name
                document.querySelector('#description').value = prodotto.description
                document.querySelector('#brand').value = prodotto.brand
                document.querySelector('#imageUrl').value = prodotto.imageUrl
                document.querySelector('#price').value = prodotto.price

                let btnDelete = document.querySelector('#delete');
                btnDelete.addEventListener('click', () => {
                    if (window.confirm('Desideri eliminare il prodotto?')) {
                        deleteProduct();
                    }
                    else alert('Prodotto NON eliminato!');
                })
            }
            else {
                return new Error('Errore nella chiamata');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    if (productID) {
        exists();
    }

    const saveProduct = async function (newProduct) {
        try {
            let completeURL = productID ? url + productID : url;
            let response = await fetch(completeURL, {
                method: productID ? 'PUT' : 'POST',
                body: JSON.stringify(newProduct),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                if (!window.confirm('Prodotto aggiunto correttamente! Desideri aggiungere altro?')) {
                    alert('Verrai reindirizzato alla homepage.');
                    window.location.assign("index.html");
                }
            } else {
                alert("ERRORE nella creazione del prodotto");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async () => {
        let response = await fetch(url + productID, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response);
        if (response.ok) {
            alert('PRODOTTO ELIMINATO CORRETTAMENTE');
            window.location.replace('./index.html');
        } else {
            alert("PROBLEMA NELL'ELIMINAZIONE DEL PRODOTTO");
        }
    }

    let form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let newProduct = {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,
            brand: document.querySelector('#brand').value,
            imageUrl: document.querySelector('#imageUrl').value,
            price: document.querySelector('#price').value
        }
        console.log('Prodotto inserito: ', newProduct);
        saveProduct(newProduct);
    });
})
