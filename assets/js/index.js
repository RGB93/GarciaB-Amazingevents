//Cards y Checkbox
const conteinerCard=document.getElementById("cardHome")

UpCards(data.events,conteinerCard)

function UpCards(events,contenedor){
  conteinerCard.innerHTML=""
  let fragmento=document.createDocumentFragment()
 
for(card of events){
  let cardDiv=document.createElement("div")
  cardDiv.classList.add("card")
  cardDiv.style.width="25rem"
  cardDiv.innerHTML=`<img src=${card.image} class="card-img-top h-50" alt=${card.name.split(" ").join("_")}>
  <div class="card-body d-flex flex-column bg-white">
    <h5 class="card-title text-black">${card.name}</h5>
   <p class="text-black">${card.description}</p>
   <p class="text-black">$${card.price}</p>
   <a href="./details.html?id=${card._id}" class="btn btn-dark color-text card-link">Details</a>
  </div>`
  fragmento.appendChild(cardDiv)
}
contenedor.appendChild(fragmento)
}

const containerCheckb=document.getElementById("checkboxID")

let categorys=data.events.map(event=>event.category)
let categorysFiltradas=categorys.filter((valor, indice) => {
  return categorys.indexOf(valor) === indice;
})
Checkchar(categorysFiltradas,containerCheckb)

function Checkchar(categorias,contenedor){
  let fragmento=document.createDocumentFragment()
  for(check of categorias){
    let checkDiv=document.createElement("div")//["museo","comida","cine","Food Fair"]
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" type="checkbox" name="category" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  contenedor.appendChild(fragmento)
  }


//Check filter

let checkbox=document.querySelectorAll("input[type=checkbox]")
 
let checkeds=[]
checkbox.forEach(categoria=>{categoria.addEventListener('change', filterCheck)})

function filterCheck(e) {
  if (this.checked) {
checkeds.push(e.target.value)

console.log(checkeds)
   
  } else {
    checkeds=checkeds.filter(event=>event!==e.target.value)
   //console.log(checkeds)
   
  }
  
if(checkeds.length>0){
UpCards(data.events.filter(event=>validEvent(event,checkeds)),conteinerCard)
}else{
  UpCards(data.events,conteinerCard)
}
} 

function validEvent(evento,arregloCategorias){
return arregloCategorias.find(categoria=>categoria==evento.category.split(" ").join("_"));
}

//SEARCH - NO TERMINADO

// let inputsChequeados = []
// let arraySearch = []

// const search_input = document.getElementById("site-search")
// console.log(search_input)

// search_input.addEventListener('keyup', () => {
//     inputText = search_input.value
//     console.log(texto(inputText))
//     (data.events)
// })
