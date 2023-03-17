//Traer Api y Cards
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let chequeados = [];
let searchFilter = [];
let inputSearch = document.getElementById("site-search");
let checkbox = document.getElementById("checkboxID");
let pastEvents =  [];

const conteinerCard = document.getElementById("cardHome")
async function BringData(urlApi, container) {
    try {
      const response = await fetch(urlApi)
      let data = await response.json()
      //Filter date-cards
      UpCards(data.events, container)
      //Checkbox
      let containerCheck = document.getElementById("checkboxID")
      let categorysFilter = [... new Set(data.events.map(event => event.category))]
      UpChecks(categorysFilter, containerCheck);
      //categorys & Search
      let searched = ""
      let cardChecked = []
      const search = document.getElementById("site-search");
      search.addEventListener("keyup", (e) => {
        searched = e.target.value
        crossFilter(data.events, cardChecked, searched)
      })
      let checkbox = document.querySelectorAll("input[type=checkbox]")
      checkbox.forEach(categoria => {
        categoria.addEventListener('change', () => {
          cardChecked = Array.from(checkbox).filter(check => check.checked).map(check => check.value)
          crossFilter(data.events, cardChecked, searched)
        })
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  
  BringData(urlApi, conteinerCard)
  
  //Card & Category 
  function UpCards(events, contenedor) {
    conteinerCard.innerHTML = ""
    if (events.length > 0) {
      let fragmento = document.createDocumentFragment()
      for (card of events) {
        let cardDiv = document.createElement("div")
        cardDiv.classList.add("card", "mb-3")
        cardDiv.style.width = "25rem"
        cardDiv.innerHTML = `<img src=${card.image} class="card-img-top "" alt=${card.name.split(" ").join("_")}>
    <div class="card-body text_center">
      <h5 class="card-title">${card.name}</h5>
     <p>${card.description}</p>
     <p>$ ${card.price}</p>
      <a href="./details.html?id=${card._id}" class="btn text-white color-btn align-self-end">Details</a>
    </div>`
        fragmento.appendChild(cardDiv)
      }
      contenedor.appendChild(fragmento)
    } else {
      let div = document.createElement("div")
      div.innerHTML = '<p class="card-text">No encontrado, intente nuevamente</p>'
      contenedor.appendChild(div)
    }
  }

function UpChecks(categorias, contenedor) {
    let fragment = document.createDocumentFragment()
    for (check of categorias) {
      let checkDiv = document.createElement("div")//["museo","comida","cine","Food Fair"]
      checkDiv.classList.add("form-check", "form-check-inline")
      checkDiv.innerHTML = `<input class="form-check-input" type="checkbox" name="category" id=${check.split(" ").join("_")}
         value=${check.split(" ").join("_")}>
       <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
      fragment.appendChild(checkDiv)
    }
    contenedor.appendChild(fragment)
  }
  
  //Search 
  function filterCard(checkeado, listCard) {
    return checkeado.length > 0 ? listCard.filter(event => checkeado.includes(event.category.replace(" ", "_"))) : listCard 
  }
  function filterSearch(searchWord, listCard) {
    return searchWord == "" ? listCard : listCard.filter(event => event.name.toLowerCase().search(searchWord.toLowerCase().trim()) != -1)
  }  
  function crossFilter(arrayCards, checked, searcheds) {
    let cardCheck = filterCard(checked, arrayCards)
    let cardSearched = filterSearch(searcheds, cardCheck)
    UpCards(cardSearched, conteinerCard)
  }