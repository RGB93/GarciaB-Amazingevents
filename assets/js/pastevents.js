// Date filter
let fechaActual= new Date(data.currentDate)
let conteinerCard=document.getElementById("cards-templatepe")
let pastCard=data.events.filter(event=>BtDate(fechaActual,event))
function BtDate(fechaActual,fechaEvento){
  let fechaEvent= new Date(fechaEvento.date)
  return fechaEvent<fechaActual
}


UpCards(pastCard,conteinerCard)


function UpCards(pastCard,contenedor){
  conteinerCard.innerHTML=""
  let fragmento=document.createDocumentFragment()
  for(card of pastCard){
     let cardDiv=document.createElement("div")
    cardDiv.classList.add("card", "mb-3")
    cardDiv.style.width="25rem"
    cardDiv.innerHTML=`<img src=${card.image} class="card-img-top h-50 border-bottom" alt=${card.name.split(" ").join("_")}>
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

//Categorys
let conteinerCheck=document.getElementById("checkboxIDpast")
let categorysFilter=pastCard.map(event=>event.category);
categorysFilter=categorysFilter.filter((valor, indice) => {
  return categorysFilter.indexOf(valor) === indice;
});

Checkchar(categorysFilter,conteinerCheck)


function Checkchar(categorys,conteiner){
  let fragmento=document.createDocumentFragment()
  for(check of categorys){
    let checkDiv=document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  conteiner.appendChild(fragmento)
  }
  
// Filter

let checkbox=document.querySelectorAll("input[type=checkbox]")
 
 
let checkeds=[]
checkbox.forEach(categoria=>categoria.addEventListener('change', filterCheck))

function filterCheck(e) {
  if (this.checked) {
checkeds.push(e.target.value)

//console.log(checkeds)
   
  } else {
    checkeds=checkeds.filter(event=>event!==e.target.value)
   //console.log(checkeds)
   
  }
  conteinerCard.innerHTML=""

if(checkeds.length>0){
  UpCards(pastCard.filter(event=>validEvent(event,checkeds)),conteinerCard)
}else{
  UpCards(pastCard,conteinerCard)
}
} 


//console.log(checkeds)



function validEvent(evento,arregloCategorias){
return arregloCategorias.find(categoria=>categoria==evento.category.split(" ").join("_"));
}