// const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1CCks0Cuqqo8Iea9uJXMT-6Jgrdzg0Yf31WSQgD3yJus');

const Sheet = require('./sheet')
const fetch = require('node-fetch');

(async function() {
  
  const res = await fetch('https://jobs.github.com/positions.json?description=react&location=remote')
  // console.log(res);
  const json = await res.json();
  // console.log({json});

  // map field in array to rows:
  
  const rows = json.map(job => {
    return {
      company: job.company,
      title: job.title,
      location: job.location,
      date: job.created_at,
      url: job.url,
    }
  })
  
  const sheet = new Sheet();
  await sheet.load();
  
  await sheet.addRows(rows);

})()

// console.log(doc.title);
// await doc.updateProperties({ title: 'renamed doc' });

// const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

// await sheet.addRows([
// { title: 'UX design', location: 'Paris' },
// { title: 'Tech lead', location: 'Oslo' },
// ]);
