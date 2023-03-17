const url = "https://mindhub-xj03.onrender.com/api/amazing"
let conteinerCard = document.getElementById("cards-templatepe")

async function BringData(urlApi, container) {
  try {
    const response = await fetch(urlApi)
    let data = await response.json()
    //Filter date-cards
    let pastCard = data.events.filter(event => new Date(data.currentDate) > new Date(event.date))
    UpCards(pastCard, container)
    //Checkbox
    let containerCheck = document.getElementById("checkboxIDpast")
    let categorysFilter = [... new Set(pastCard.map(event => event.category))]
    UpChecks(categorysFilter, containerCheck);
    //categorys & Search
    let searched = ""
    let cardChecked = []
    const search = document.getElementById("site-search");
    search.addEventListener("keyup", (e) => {
      searched = e.target.value
      crossFilter(pastCard, cardChecked, searched)
    })
    let checkbox = document.querySelectorAll("input[type=checkbox]")
    checkbox.forEach(categoria => {
      categoria.addEventListener('change', () => {
        cardChecked = Array.from(checkbox).filter(check => check.checked).map(check => check.value)
        crossFilter(pastCard, cardChecked, searched)
      })
    })
  } catch (error) {
    console.log(error.message)
  }
}

BringData(url, conteinerCard)


//Cards
function UpCards(pastCard, contenedor) {
  conteinerCard.innerHTML = ""
  if (pastCard.length > 0) {
    let fragment = document.createDocumentFragment()
    for (card of pastCard) {
      let cardDiv = document.createElement("div")
      cardDiv.classList.add("card", "mb-3")
      cardDiv.style.width = "25rem"
      cardDiv.innerHTML = `<img src=${card.image} class="card-img-top " alt=${card.name.split(" ").join("_")}>
    <div class="card-body text_center">
      <h5 class="card-title text">${card.name}</h5>
     <p class="text">${card.description}</p>
     <p class="text">$ ${card.price}</p>
      <a href="./details.html?id=${card._id}" class="btn text-white color-btn align-self-end">Details</a>
    </div>`
      fragment.appendChild(cardDiv)
    }
    contenedor.appendChild(fragment)
  } else {
    let div = document.createElement("div")
    div.innerHTML = '<p class="card-text">No encontrado, intente nuevamente</p>'
    contenedor.appendChild(div)
  }
}

//Check
function UpChecks(categorys, conteiner) {
  let fragmento = document.createDocumentFragment()
  for (check of categorys) {
    let checkDiv = document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
    checkDiv.innerHTML = `<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  conteiner.appendChild(fragmento)
}

function crossFilter(arrayCards, checked, searcheds) {
  let cardCheck = filterCard(checked, arrayCards)
  let cardSearched = filterSearch(searcheds, cardCheck)
  UpCards(cardSearched, conteinerCard)

}

function filterCard(checkeado, listCard) {
  return checkeado.length > 0 ? listCard.filter(event => checkeado.includes(event.category.replace(" ", "_"))) : listCard
}

function filterSearch(searchWord, listCard) {
  return searchWord == "" ? listCard : listCard.filter(event => event.name.toLowerCase().search(searchWord.toLowerCase().trim()) != -1)
}