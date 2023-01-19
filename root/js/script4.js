if ("producten" in localStorage == true) {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    for (const [key, value] of Object.entries(parsedData)) {
        createProducten(value);
    }
}

// html producten creëeren
function createProducten(producten) {
    const inCartdiv = document.createElement("tr");
    inCartdiv.classList = "";
    inCartcontent = `                
                <td class="ps-3" data-label="Product ID">${producten.id}</td>
                <td class="ps-3" data-label="Productnaam">${producten.name}</td>                
                <td class="ps-3" data-label="Prijs">${producten.prijs}</td>  
                <td class="ps-3" data-label="Voorraad">${producten.amount}</td>   
                <td class="ps-3" data-label="Img">${producten.img}</td> 
                <div class="d-flex p-2 justify-content-end">
                <h4><a href="edit-producten.html"><i class="bi bi-pen edit  ps-3" id="e${producten.id}"></i></a></h4> 
                <h4><i class="bi bi-trash3 rem  ps-3" id="${producten.id}"></i></h4>                            
                </div>               
                `;
    inCartdiv.innerHTML = inCartcontent;
    document.getElementById("producten").append(inCartdiv);
    const remButtons = document.getElementsByClassName('rem');
    for (let i = 0; i < remButtons.length; i++) {
        const button = remButtons[i];
        button.addEventListener('click', remButtonclicked);
    }
    const editButton = document.getElementById('e' + producten.id);
    editButton.addEventListener('click', () => {
        const id = producten.id;
        editButtonclicked(id);
    })
}
// edit button actie
function editButtonclicked(id) {
    const parsedData = JSON.parse(localStorage.getItem('producten'))
    for (const e of parsedData) {
        if (e.id == id) {
            const temp = e;
            localStorage.setItem('temp', JSON.stringify(temp));
        }
    }
}
// verwijder button actie
function remButtonclicked(event) {
    const remButton = event.target;
    remButton.parentElement.parentElement.parentElement.remove();
    const id = remButton.id;
    const producten = JSON.parse(localStorage.getItem('producten'));
    for (const e of producten) {
        if (id == e.id) {
            const index = producten.indexOf(e);
            producten.splice(index, 1);
            localStorage.setItem('producten', JSON.stringify(producten));
            if (producten.length <= 0) {
                localStorage.removeItem('producten');
            }
        }
    }
}

// reset de producten
async function resetProducten() {
    localStorage.removeItem('producten');
    const productenJson = '../json/producten.json';
    const response = await fetch(productenJson);
    const data = await response.json();
    localStorage.setItem('producten', JSON.stringify(data));
    location.reload();
}