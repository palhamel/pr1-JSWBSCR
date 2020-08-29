const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1CCks0Cuqqo8Iea9uJXMT-6Jgrdzg0Yf31WSQgD3yJus');

(async function() {


  // OR load directly from json file if not in secure environment
  await doc.useServiceAccountAuth(require('./credentials.json'));

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  await doc.updateProperties({ title: 'renamed doc' });
  
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

  await sheet.addRows([
  { title: 'UX design', location: 'Paris' },
  { title: 'Tech lead', location: 'Oslo' },
  ]);

})()
 
