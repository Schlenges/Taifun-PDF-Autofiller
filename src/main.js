const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser');
const { convert } = require('./csv-converter');
const Autofiller = require('./autofiller');

const inputFile = './data/example.html';
const outputFile = './output/pdf.html';
const csvFile = './data/sampleData.csv'
const stylesheet = './style.css';

const run = async () => {
  if(!fs.existsSync('./output')){
    fs.mkdirSync('./output');
  }

  let data = await convert(csvFile);
  let { priceList, sumList, titleList } = data;
  let { epList, gpList } = priceList;

  fs.readFile(inputFile, 'utf8', (err, html) => {
    if (err) throw err;

    const root = parse(html);
    const head = root.querySelector('head');
    const autofill = new Autofiller(root);

    if (!head.querySelector('link')) {
      head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${stylesheet}">`);
    }

    autofill.addPositions(epList, gpList);
    autofill.addEndSums(sumList);
    autofill.addGroupTotals(sumList, titleList);

    fs.writeFile(outputFile, root.toString(), (err) => {
      if (err) return console.log(err);
      console.log('Saved!')
    });
  });
}

run();