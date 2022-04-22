# Taifun-PDF Autofiller

A custom Node.js application to autofill PDFs with data from Taifun software.

## The Problem

While working at the office of my family's business, I realized that a lot of time was spent filling out bills of quantities to send out to customers. Project data was tracked and stored through a special software (Taifun) and had to be transcribed manually into pre-designed PDFs that the individual customer would provide. Those bills could contain hundreds of items, so having to fill out these documents manually was very time intensive and error prone.

## The Solution
As a solution, this program processes an exported csv data-set from Taifun and inserts it into the customer template. To provide a bit more flexibility and help in dealing with the varying PDF layouts, the program reads in an HTML converted version of the document. (For quick and easy conversion I used [pdf2htmlEX](https://github.com/pdf2htmlEX/pdf2htmlEX)). After preparing the data and parsing the HTML file, it inserts the prices to the correct positions via DOM manipulation and saves the filled out document as a new file.  

## Installation And Usage
The repository comes with sample data to quickly try out the program:

1) Clone the repository
2) Install dependencies with ```npm install```
3) Start the app with ```npm start```
4) You can find the filled out document in the ```output``` folder

