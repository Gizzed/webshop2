if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loadWebshop);
} else {
    loadWebshop();
}
// haalt artikelen uit json bestand
async function loadWebshop() {
    const productenJson = '../json/producten.json';
    if ("producten" in localStorage == false) {
        const response = await fetch(productenJson);
        const data = await response.json();
        localStorage.setItem('producten', JSON.stringify(data));
    }
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    createItem(parsedData);
    voorraadCheck();
    return parsedData;
}

// creëert de html voor de producten
function createItem(parsedData) {
    for (const element of parsedData) {
        const shoppingItemscontent = `
    <div class="card h-100 align-items-center " id="${element.id}">
        <div class="bg-image hover-overlay ripple h-100 " data-mdb-ripple-color="light">
        <img class="img-fluid" src="${element.img}" alt="..."></img>
            <div class="card-body text-center">
                <p class="hide artikel">${element.id}</p>
                <h5 class="card-title" id="t${element.id}">${element.name}</h5>
                <p class="card-text prijs" id="p${element.id}">Prijs: € ${element.prijs}</p>
                <p class="card-text voorraad hide" id="v${element.id}">${element.amount}</p>
                <button type="button" class="btn btn-outline-primary add position-relative"
                id="b${element.id}">Voeg toe aan winkelwagen</button>
            </div>
        </div>
    </div>
`;
        const shoppingItems = document.createElement('div');
        shoppingItems.classList = `col-lg-4 col-md-12 mb-4 shop-item`;
        shoppingItems.innerHTML = shoppingItemscontent;
        document.getElementById("appendHere").append(shoppingItems);
        reloadButtons();
    }
    if ("winkelwagen" in localStorage == true) {
        console.log('U heeft nog producten in uw winkelwagen');
        checkcartNotification();
        adjustElements();
    }
}



function reloadButtons() {
    const addCartbuttons = document.getElementsByClassName('add');
    for (let i = 0; i < addCartbuttons.length; i++) {
        const button = addCartbuttons[i];
        button.addEventListener('click', addCart);
    }
}

// controleert status winkelwagen
function checkCart() {
    if ("winkelwagen" in localStorage == true) {
        const localstoragearray = JSON.parse(localStorage.getItem('winkelwagen'));
        adjustElements();
        return localstoragearray;
    } else {
        let localstoragearray = [];
        return localstoragearray;
    }
}

// aanpassingen in pagina na toevoegen aan winkelwagen
function adjustElements() {
    const parsedData = JSON.parse(localStorage.getItem('winkelwagen'));
    for (const e of parsedData) {
        const adjustElementsItem = document.getElementById('b' + e.id);
        adjustElementsItem.innerHTML = `<span class="position-absolute top-0 start-200 translate-middle">
        <h1><i class="bi text-success bi-check"></i></h1></span>toegevoegd aan winkelwagen`;
        adjustElementsItem.removeEventListener('click', addCart);
        const adjustElementsItemV = document.getAnimations('v' + e.id);
        adjustElementsItemV.innerText = e.amount;
    }
}

// voegt product toe aan winkelwagen
function addCart(event) {
    const addButton = event.target;
    const shopItem = addButton.parentElement;
    const title = shopItem.getElementsByClassName('card-title')[0].innerText;
    const prijsItem = parseFloat(shopItem.getElementsByClassName('prijs')[0].innerText);
    const prijs = parseFloat(prijsItem.replace('Prijs: €', ''));
    const artikel = shopItem.getElementsByClassName('artikel')[0].innerText;
    const localstoragearray = checkCart();
    const myObj = {};
    myObj['id'] = artikel;
    myObj['name'] = title;
    myObj['prijs'] = prijs;
    myObj['aantal'] = 1;
    const newArray = localstoragearray.concat(myObj);
    localStorage.setItem('winkelwagen', JSON.stringify(newArray));
    checkcartNotification();
    adjustElements();
}

// geeft notificatie in badge voor toegevoegde producten
function checkcartNotification() {
    const aantal = JSON.parse(localStorage.getItem('winkelwagen'));
    if (aantal != null && aantal.length > 0) {
        document.getElementsByClassName('badge')[0].classList.remove('hide');
        document.getElementsByClassName('badge')[0].innerHTML = aantal.length;
    } else {
        document.getElementsByClassName('badge')[0].classList.add('hide');
        document.getElementById('purchaseButton').classList.add('hide');
        document.getElementById('clearcart').classList.add('hide');
    }
}

// controleert voorraad in localstorage en past elementen hier op aan.
function voorraadCheck() {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    const checkA = document.getElementsByClassName('add');
    for (let v = 0; v < parsedData.length; v++) {
        for (const b of checkA) {
            if (b.parentElement.firstChild.nextSibling.innerText === parsedData[v].id) {
                if (parsedData[v].amount <= 0) {
                    b.innerText = 'niet op voorraad';
                    b.removeEventListener('click', addCart);
                }
            }
        }
    }
}
