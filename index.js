// const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1CCks0Cuqqo8Iea9uJXMT-6Jgrdzg0Yf31WSQgD3yJus');

const Sheet = require('./sheet')
const fetch = require('node-fetch');

// TODO: check all pages and combine in one array

async function scrapePage(index) {
  const res = await fetch(`https://jobs.github.com/positions.json?page=${index}&search=code`)
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
  return rows;
}


(async function() {
  
  let index = 1;
  let rows = [];
  while(true) {
    const newRows = await scrapePage(index);
    console.log('newRows length', newRows.length);
    if (newRows.length === 0) break;
    rows = rows.concat(newRows);
    index++;
  }
  console.log('total rows new length', rows.length);

  // Here:

  // TODO: Sort the rows Array based on date - check sort method/function

  // TODO: Filter rows Array for React or JavaScript jobs and insert in a new Array before Sheet - check filter method/function
  // check filter and include, filter? "js".includes("javascript") => 






  // This will fill google doc:
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(rows);

  console.log('rows sent to sheet ✅');


})()



// ------------------------------------

/* Working code:

(async function() {
  
  // const res = await fetch('https://jobs.github.com/positions.json?search=code')
  // const res = await fetch('https://jobs.github.com/positions.json?location=remote')
  const res = await fetch('https://jobs.github.com/positions.json?page=2&search=code')

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
  // console.log(rows)
  console.log(rows.length, 'length')

  // This will run fill google doc:

  // const sheet = new Sheet();
  // await sheet.load();
  // await sheet.addRows(rows);

})()


*/

// console.log(doc.title);
// await doc.updateProperties({ title: 'renamed doc' });

// const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

// await sheet.addRows([
// { title: 'UX design', location: 'Paris' },
// { title: 'Tech lead', location: 'Oslo' },
// ]);
