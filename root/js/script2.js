if ("winkelwagen" in localStorage == true) {
    const localstoragearray = JSON.parse(localStorage.getItem('winkelwagen'));
    console.log('U heeft nog producten in uw winkelwagen');
    for (const w of localstoragearray) {
        createCart(w);
        checkcartNotification();
    }
}
// notificatie badge aanpassingen
function checkcartNotification() {
    const aantal = JSON.parse(localStorage.getItem('winkelwagen'));
    if (aantal != null && aantal.length > 0) {
        document.getElementsByClassName('badge')[0].classList.remove('hide');
        document.getElementById('purchaseButton').classList.remove('hide');
        document.getElementById('clearcart').classList.remove('hide');
        document.getElementsByClassName('badge')[0].innerHTML = aantal.length;
    } else {
        document.getElementsByClassName('badge')[0].classList.add('hide');
        document.getElementById('purchaseButton').classList.add('hide');
        document.getElementById('clearcart').classList.add('hide');
    }
}
document.getElementById("clearcart").addEventListener("click", clearCart);
document.getElementById('purchaseButton').addEventListener('click', bestelNaam);
document.getElementById("bestelNaam").addEventListener('change', () => {
    if (document.getElementById('bestelNaam').value.length > 3) {
        document.getElementById('bestelKnop').setAttribute("data-bs-dismiss", "modal");
        document.getElementById('bestelKnop').setAttribute("type", "submit");
        document.getElementById('bestelKnop').addEventListener('click', purchaseClick);
    }
});

// voor de img src
function imgSrc(winkelwagen) {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    for (const v of parsedData) {
        if (winkelwagen.id == v.id) {
            const src = v.img;
            return src;
        }
    }
}

// vooraad ophalen
function getAmount(winkelwagen) {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    for (const v of parsedData) {
        if (winkelwagen.id == v.id) {
            const amount = v.amount;
            return amount;
        }
    }
}

// - knop in winkelwagen
function minButtonclicked(w) {
    const parsedData = JSON.parse(localStorage.getItem('winkelwagen'));
    for (const v of parsedData) {
        if (w == v.id) {
            if (v.aantal > 1) {
                v.aantal -= 1;
                document.getElementById('a' + v.id).innerHTML = "Aantal: " + v.aantal;
                document.getElementById('ta' + v.id).innerHTML = "Totaal: €" + v.aantal * v.prijs;
                localStorage.setItem('winkelwagen', JSON.stringify(parsedData));
                totaalPrijs();
            }
        }
    }
}

// + knop in winkelwagen
function addButtonclicked(w, amount) {
    const parsedData = JSON.parse(localStorage.getItem('winkelwagen'));
    for (const v of parsedData) {
        if (w == v.id) {
            if (v.aantal < amount) {
                v.aantal += 1;
                document.getElementById('a' + v.id).innerHTML = "Aantal: " + v.aantal;
                document.getElementById('ta' + v.id).innerHTML = "Totaal: €" + v.aantal * v.prijs;
                localStorage.setItem('winkelwagen', JSON.stringify(parsedData));
                totaalPrijs();
            }
        }
    }
}

// html winkelwagen creëeren
function createCart(winkelwagen) {
    const src = imgSrc(winkelwagen);
    const amount = getAmount(winkelwagen);
    const inCartdiv = document.createElement("div");
    inCartdiv.classList = "row d-flex p-3 ";
    const inCartcontent = `
    <p class="hide">${winkelwagen.id}</p>
                <div class="col-12 col-lg-2 mb-2"><h4 class="cartItem-title">${winkelwagen.name}</h4></div>
                <div class="col-4 col-lg-2 d-flex"><img src="${src}" class="object-fit-cover border rounded" 
                alt="..." width="50" height="60"> </div>
                <div class="col-4 col-lg-2"><h6 class="cartItem-prijs">Prijs: €${winkelwagen.prijs}</h6></div>    
                <div class="col-6 col-lg-2"><h6 id="a${winkelwagen.id}">Aantal: ${winkelwagen.aantal}</h6><i>
                (Op voorraad: ${amount})</i></div>    
                <div class="col-6 col-lg-2"><span id="ta${winkelwagen.id}">Totaal: 
                €${winkelwagen.prijs * winkelwagen.aantal}
                </span></div>                   
                <div class="col-6 col-lg-2"><h4><i class="bi bi-trash3 rem m-1"></i></h4></div>                  
                <div class="d-flex col-12 mt-2 justify-content-start">  
                <button type="button" onclick="minButtonclicked(${winkelwagen.id})" 
                class="btn btn-primary min m-1">-
                </button>
                <button type="button" onclick="addButtonclicked(${winkelwagen.id},${amount})" 
                class="btn btn-success add m-1">+
                </button>           
                </div>   
                <hr class="mt-2" />
                `;
    inCartdiv.innerHTML = inCartcontent;
    document.getElementById("shoppingCart").append(inCartdiv);
    totaalPrijs();
    const removeCartbuttons = document.getElementsByClassName('rem');
    for (let i = 0; i < removeCartbuttons.length; i++) {
        const button = removeCartbuttons[i];
        button.addEventListener('click', remButtonclicked);
    }
}
// verwijderknoppen
function remButtonclicked(event) {
    const remButton = event.target;
    remButton.parentElement.parentElement.parentElement.remove();
    const id = remButton.parentElement.parentElement.parentElement.firstElementChild.innerText;
    console.log(id);
    const winkelwagen = JSON.parse(localStorage.getItem('winkelwagen'));
    for (const e of winkelwagen) {
        if (id == e.id) {
            const index = winkelwagen.indexOf(e);
            winkelwagen.splice(index, 1);
            localStorage.setItem('winkelwagen', JSON.stringify(winkelwagen));
        }
    }
    totaalPrijs();
    checkcartNotification();
}


// geeft de totaalprijs in winkelmand
function totaalPrijs() {
    document.getElementById('totaalprijs').innerHTML = "";
    let totaalPrijs = 0;
    const totaalPrijsarray = JSON.parse(localStorage.getItem('winkelwagen'));
    if (totaalPrijsarray != null && totaalPrijsarray.length > 0) {
        for (const e of totaalPrijsarray) {
            totaalPrijs += Number(e.prijs) * e.aantal;
        }
    }
    const totaalPrijsdiv = document.createElement('div');
    totaalPrijsdiv.classList = "row p-2";
    totaalPrijsdiv.innerHTML = ` 
    <div class="col d-flex " id="totaalprijs"><h3>Totaalprijs: €${totaalPrijs}</h3></div>`;
    document.getElementById('totaalprijs').append(totaalPrijsdiv);
    if (totaalPrijs == 0) {
        totaalPrijsdiv.innerHTML = "<h5>Uw winkelwagen is leeg</h5>";
    }
    return totaalPrijs;
}

// actie na klik op aankoop
function purchaseClick() {
    veranderVoorraad();
    const naam = bestelNaam();
    const myObj = {};
    let newArray = [];
    const winkelwagen = JSON.parse(localStorage.getItem('winkelwagen'));
    if ("bestelling" in localStorage == false) {
        myObj[naam] = winkelwagen;
        newArray.push(myObj);
        localStorage.setItem('bestelling', JSON.stringify(newArray));
    } else {
        const bestelling = JSON.parse(localStorage.getItem('bestelling'));
        myObj[naam] = winkelwagen;
        let newArray = bestelling.concat(myObj);
        localStorage.setItem('bestelling', JSON.stringify(newArray));
    }
    clearCart();
}

// leegt de localstorage/winkelwagen
function clearCart() {
    const cart = document.getElementById('shoppingCart');
    while (cart.hasChildNodes()) {
        cart.removeChild(cart.firstChild);
    }
    localStorage.removeItem('winkelwagen');
    checkcartNotification();
    totaalPrijs();
}

// stukje voorraad beheer
function veranderVoorraad() {
    const parsedData = JSON.parse(localStorage.getItem('producten'));
    const bestelling = JSON.parse(localStorage.getItem('winkelwagen'));
    for (const v of parsedData) {
        for (const b of bestelling) {
            if (b.id == v.id) {
                v.amount -= b.aantal;
                localStorage.setItem('producten', JSON.stringify(parsedData));
            }
        }
    }
}



// naam voor bij de bestelling
function bestelNaam() {
    console.log(document.getElementById('bestelNaam').value);
    const naam = document.getElementById('bestelNaam').value;
    return naam;
}


