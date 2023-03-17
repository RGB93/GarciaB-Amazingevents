const url = "https://mindhub-xj03.onrender.com/api/amazing"
async function BringData(urlApi, conteiner) {
  try {
    const response = await fetch(urlApi)
    const datos = await response.json();
    console.log(datos)
    const queryString = location.search
    const params = new URLSearchParams(queryString)
    const id = params.get("id")
    const card = datos.events.find(event => event._id == id)
    createCard(card, conteiner)
  } catch (error) {
    console.log(error.message)
  }
}
BringData(url, conteinerCard)

function createCard(card) {
  const card_details = document.getElementById("conteinerCard")
  let div = document.createElement('div')
  div.classList.add()
  div.style.width = "120rem"
  div.innerHTML = `<div class="d-flex col-md-6 align-items-center justify-content-center">
      <img src=${card.image} class="img-fluid h-100 w-100 border-end border-bottom" alt=${card.name.split(" ").join("_")}">
      </div>
      <div class="col-md-6 bg-white">
        <div class="card-body">
          <h5>${card.name}</h5>
          <p>${card.description}</p>
            <ul>
              <li>Date: ${card.date}</li>
              <li>Description: ${card.description}</li>
              <li>Category: ${card.category}</li>
              <li>Place: ${card.place}</li>
              <li>Capacity: ${card.capacity}</li>
              <li>Assistance or estimate: ${card.assistance}</li>
              <li>Price:${card.price}</li>
            </ul>
            <input type="button" value="Back" onClick="history.go(-1);">
          </div>
      </div>`
  card_details.appendChild(div)
}