// trim whitespaces
const cleanUpData = (data) => ({
  ...data,
  ep: data.ep.trim(),
  gp: data.gp.trim()
})

const toString = (number) => {
  let str = number.toFixed(2).replace(".", ",")
  let splittedStr = str.split(/(.*?),/).splice(1)
  let val = splittedStr[0]

  if(val.length > 3){
    splittedStr[0] = val.substring(0, val.length-3) + "." + val.substring(val.length-3)
  }

  return splittedStr.join(",")
}

const preprocess = (data) => (
  data
    .filter(el => ((el.gp != 'EP.') && (el.gp != '-'))) // filter missing or empty Gesamtpreise
    .map(el => ({
      position: _toArray(el),
      gp: _toNumber(el.gp)
    })
))

const _toArray = el => el.position.split('')
const _toNumber = price => Number(price.replace(".", "").replace(",", "."))

module.exports = {
  cleanUpData,
  preprocess,
  toString
}