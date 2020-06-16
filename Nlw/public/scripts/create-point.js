function populateufs() {
  const ufSelect = document.querySelector("select[name=uf]")
  //Promessa                                                           
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //Outra Promessa
    .then(res => res.json())
    .then(states => {

      for (const state of states) {

        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

      }

    })
}
//Executa o evento para preencher os UF's
populateufs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")


  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value="">Selecione o estado</option>'
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {

        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })


}

document.querySelector("select[name=uf]")
  .addEventListener("change", getCities);

//ITENS DE COLETA
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

  const itemLi = event.target

  //Adicionar ou remover uma classe com java script
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

console.log("ITEM ID: ", itemId)

  //verificar se tem item selecionado se sim
  //Pegar os items selecionados
  const alredySelected = selectedItems.findIndex(item => item == itemId)

  //Se já estiver selecionado, tirar da selecão
  if (alredySelected >= 0) {
    filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId //false
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    //se não tiver selecionado, adicioanar
    selectedItems.push(itemId)
  }

  console.log("selectedItems: ", selectedItems)

  //Atualizar o campo escondido com os items selecionados
  collectedItems.value = selectedItems

}