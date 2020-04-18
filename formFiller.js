let {priceList, sumList, titleList} = data
let {epList, gpList} = priceList

const addPositions = () => {
  let positionen = Array.from(document.querySelectorAll('div'))
    .filter(el => el.firstChild)
    .filter(el => el.firstChild.data == "EP ...................")
  
  let spans = positionen.map(el => el.querySelectorAll("._._1"))
  
  let epNodes = spans.map(el => el[0])
  let gpNodes = spans.map(el => el[1]).filter(el => el != undefined)
  
  for(i = 0; i <= epNodes.length-1; i++){
    epNodes[i].innerHTML = epList[i]
  }
  
  for(i = 0; i <= gpNodes.length-1; i++){
    gpNodes[i].innerHTML = gpList[i]
  }
}

const addEndSums = () => {
  let sumNodes = document.getElementsByClassName("_ _59")
  
  for(i = 0; i <= sumNodes.length-1; i++){
    sumNodes[i].innerHTML = sumList[i]
  }
}

const addGroupTotals = () => {
  let list = titleList.map(el => el + ", Netto:")

  let nodes = Array.from(document.querySelectorAll('div'))
    .filter(el => list.includes(el.innerText))
  
  for(i = 0; i < nodes.length-1; i++){
    let spanNode = _createSpan(sumList[i+1])
    nodes[i].appendChild(spanNode)
  }

  let spanNode = _createSpan(sumList[0])
  nodes[nodes.length-1].appendChild(spanNode)
}

const _createSpan = (text) => {
  let node = document.createElement('span')
  node.classList.add('groupSum')
  node.style.position = "absolute"
  node.textContent = text
  return node
}

const addTotal = () => {
  let nodes = Array.from(document.querySelectorAll('div'))
    .filter(el => el.innerText == "")
}

addPositions()
addEndSums()
addGroupTotals()