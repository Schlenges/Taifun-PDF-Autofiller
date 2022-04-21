const csv = require('csv-parser')
const fs = require('fs')
const { cleanUpData, preprocess, toString } = require('./helper.js')

const titlesFile = './data/sampleTitles.csv';
const outputJSFile = './output/data.js'

const convert = async (file) => {
  const data = await getData(file)
  const priceList = await getPrices(data)
  const sumList = await getSums(data)
  const titleList = await getTitles(titlesFile)

  saveAsJson({ priceList, sumList, titleList })

  return { priceList, sumList, titleList }
}

const getData = (file) => new Promise((resolve, reject) => {
  let result = []

  fs.createReadStream(file)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => result.push(cleanUpData(data)))
    .on('end', () => resolve(result))
    .on('error', (error) => reject(error))
})

const getPrices = (data) => new Promise((resolve, reject) => {
  let epList = []
  let gpList = []

  data.map(el => {
    epList.push(el.ep)
    gpList.push(el.gp)
  })

  // filter missing prices
  gpList = gpList.filter(el => el != 'EP.')
  resolve({ epList, gpList })
})

const getSums = (data) => new Promise((resolve, reject) => {
  let filtered = preprocess(data)
  let sumList = []
  let index = 3 // index of relevant position number
  let sum = filtered[0].gp

  for (i = 1; i < filtered.length; i++) {
    if (filtered[i].position[index] === filtered[i - 1].position[index]) {
      sum += filtered[i].gp
    } else {
      sum = Math.round((sum + Number.EPSILON) * 100) / 100
      sumList.push(sum)
      sum = filtered[i].gp
    }
  }
  sumList.push(sum)

  let wholeSum = sumList.reduce((accumulator, currentValue) => accumulator + currentValue)

  sumList.unshift(wholeSum)
  sumList = sumList.map(sum => toString(sum))
  resolve(sumList)
})

const saveAsJson = (data) => {
  fs.writeFile(outputJSFile, `var data = ${JSON.stringify(data)}`, function (err) {
    if (err) throw err
    console.log('Saved!')
  })
}

const getTitles = (file) => new Promise((resolve, reject) => {
  let result = []

  fs.createReadStream(file)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => result.push(data.Beschreibung))
    .on('end', () => resolve(result))
    .on('error', (error) => reject(error))
})

module.exports = { convert }
