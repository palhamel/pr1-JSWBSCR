// const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1CCks0Cuqqo8Iea9uJXMT-6Jgrdzg0Yf31WSQgD3yJus');

const Sheet = require('./sheet')
const fetch = require('node-fetch');

(async function() {
  const sheet = new Sheet();

  await sheet.load();

  const res = await fetch('https://jobs.github.com/positions.json?description=python&location=new+york')
  // console.log(res);
  const json = await res.json();
  console.log(json);

  // console.log(doc.title);
  // await doc.updateProperties({ title: 'renamed doc' });
  
  // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

  // await sheet.addRows([
  // { title: 'UX design', location: 'Paris' },
  // { title: 'Tech lead', location: 'Oslo' },
  // ]);

})()
 
