class Autofiller {

  constructor(document) {
    this.document = document;
  }

  addPositions(epList, gpList) {
    let positionen = Array.from(this.document.querySelectorAll('div'))
      .filter(el => el.firstChild)
      .filter(el => el.firstChild.text == "EP ...................")

    let spans = positionen.map(el => el.querySelectorAll("._._1"))

    let epNodes = spans.map(el => el[0])
    let gpNodes = spans.map(el => el[1]).filter(el => el != undefined)

    for (i = 0; i <= epNodes.length - 1; i++) {
      epNodes[i].textContent = epList[i]
    }

    for (i = 0; i <= gpNodes.length - 1; i++) {
      gpNodes[i].textContent = gpList[i]
    }
  }

  addEndSums(sumList) {
    let sumNodes = this.document.querySelectorAll("._._59")

    for (i = 0; i <= sumNodes.length - 1; i++) {
      sumNodes[i].textContent = sumList[i]
    }
  }

  addGroupTotals(sumList, titleList) {
    let list = titleList.map(el => el + ", Netto:")

    let nodes = Array.from(this.document.querySelectorAll('div'))
      .filter(node => list.includes(node.text))

    for (i = 0; i < nodes.length - 1; i++) {
      let spanNode = this.#createSpan(sumList[i + 1])
      nodes[i].insertAdjacentHTML("beforeend", spanNode)
    }

    let spanNode = this.#createSpan(sumList[0])
    nodes[nodes.length - 1].insertAdjacentHTML("beforeend", spanNode)
  }

  #createSpan(text) {
    let node = `<span class="groupSum" style="position: absolute">${text}</span>`
    return node
  }

}

module.exports = Autofiller