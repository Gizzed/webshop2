
fillInput();
// wijzigen van producten
function fillInput() {
    const tempObj = JSON.parse(localStorage.getItem('temp'));
    document.getElementById('ProductID').value = tempObj.id;
    document.getElementById('Productnaam').value = tempObj.name;
    document.getElementById('Prijs').value = tempObj.prijs;
    document.getElementById('Voorraad').value = tempObj.amount;
    document.getElementById('Img').value = tempObj.img;

};

function submitInput() {
    const newObj = {};
    newObj['name'] = document.getElementById('Productnaam').value;
    newObj['id'] = document.getElementById('ProductID').value;
    newObj['prijs'] = document.getElementById('Prijs').value;
    newObj['amount'] = document.getElementById('Voorraad').value;
    newObj['img'] = document.getElementById('Img').value;
    console.log(newObj);
    productenEdit(newObj);
}


function productenEdit(edit) {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    for (const e of parsedData) {
        if (e.id == edit.id) {
            e.amount = edit.amount;
            e.name = edit.name;
            e.prijs = edit.prijs;
            e.img = edit.img
            e.id = edit.id;
            localStorage.setItem('producten', JSON.stringify(parsedData));
            localStorage.removeItem('temp');
        }
    }

}