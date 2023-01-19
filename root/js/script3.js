if ("bestelling" in localStorage == true) {
    const parsedData = JSON.parse(localStorage.getItem('bestelling'));
    console.log('bestellingen opgehaald');
    for (const i of parsedData) {
        for (const [key, value] of Object.entries(i)) {
            for (const [key2, value2] of Object.entries(value)) {
                createList(key, value2);
            }
        }
    }
}
// tabel maken
function createList(naam, bestelling) {
    const inCartdiv = document.createElement("tr");
    inCartdiv.classList = "";
    const inCartcontent = `
                <td class="ps-3">${naam}</td>                
                <td class="ps-3" id="id" data-label="Product ID">${bestelling.id}</td>
                <td class="ps-3" data-label="Productnaam">${bestelling.name}</td>                
                <td class="ps-3" data-label="Prijs">${bestelling.prijs}</td>    
                <td class="ps-3" data-label="Aantal">${bestelling.aantal}</td>   
                <div class="d-flex p-2 justify-content-end">            
                </div> 
                `;
    inCartdiv.innerHTML = inCartcontent;
    document.getElementById("bestellingen").append(inCartdiv);
}


