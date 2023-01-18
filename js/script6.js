// toevoegen van producten
function submitInput() {
    const newProd = {}
    newProd['id'] = document.getElementById('Product ID').value;
    newProd['name'] = document.getElementById('Productnaam').value;
    newProd['prijs'] = document.getElementById('Prijs').value;
    newProd['amount'] = document.getElementById('Voorraad').value;
    newProd['img'] = document.getElementById('Img').value;
    console.log(newProd);
    productenAdd(newProd);
}

function productenAdd(add) {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    parsedData.push(add);
    localStorage.setItem('producten', JSON.stringify(parsedData));
}
