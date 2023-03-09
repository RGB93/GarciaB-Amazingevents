const queryString=location.search

const params= new URLSearchParams(queryString)
const id=params.get("id")

const card=data.events.find(event=>event._id==id)
console.log(card)
UpCard(card)

function UpCard(card){
    
    const conteinerCard=document.getElementById("conteinerCard")
   
    let Div=document.createElement("div")
    Div.classList.add("row", "g-0")
  
    Div.innerHTML=` <div class="d-flex col-md-6 align-items-center justify-content-center">
      <img src=${card.image} class="img-fluid h-100 w-100 border-end border-bottom"
        alt=${card.name.split(" ").join("_")}>
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
      </div>
    </div>`
  conteinerCard.appendChild(Div)
  }