// const { GoogleSpreadsheet } = require('google-spreadsheet');
// spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1CCks0Cuqqo8Iea9uJXMT-6Jgrdzg0Yf31WSQgD3yJus');
const Sheet = require('./sheet')
const fetch = require('node-fetch');

async function scrapePage(index) {
  const res = await fetch(`https://jobs.github.com/positions.json?page=${index}&search=code`)
  // const res = await fetch(`https://jobs.github.com/positions.json?page=${index}&search=code&location=Remote`)
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

  // --------------------------
  // console.log(rows);
  // https://www.digitalocean.com/community/tutorials/js-array-search-methods
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  // const testMyArr = ["thick scales", 80, "tail", "rounded snout"];
  // console.log(testMyArr.filter(item => item.length > 10));

  const filterAllRemote = rows.filter(item => item.location == 'Remote')
  // console.log('filterOne:', filterAllRemote);

  const filterTwo = filterAllRemote.filter(item => item.title == 'React Developer')
  // console.log('filterTwo:', filterTwo);

  const filterAllAtOnce = rows.filter(item => item.location == 'Remote').filter(item => item.title == 'React Developer');
  console.log('filterAllAtOnce:', filterAllAtOnce);

  // TODO: Sort the rows Array based on date - check sort method/function
  // const sortedRows = rows.sort((a, b) => b.date - a.date)
  // console.log(sortedRows);
  // const sortRows = () => {
  //   console.log('sorted array:', rows.sort());
  // }
  // sortRows();
  // --------------------------
  // TODO: Filter rows Array for React or JavaScript jobs and insert in a new Array before Sheet - check filter method/function
  // check filter and include, filter? "js".includes("javascript") => 
  // console.log(rows.includes('Remote'));

  // let items = rows.filter(item => item.title == 'Senior Growth Engineer');
  // console.log(items);

  // --------------------------
  // NOTE: This will fill google doc:

  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(filterAllRemote);

  // await sheet.addRows(rows);
  // console.log('rows sent to sheet ✅');
})()

// ------------------------------------
/* Old working code:
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
