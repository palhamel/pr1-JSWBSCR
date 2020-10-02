const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      "1CCks0Cuqqo8Iea9uJXMT-6Jgrdzg0Yf31WSQgD3yJus"
    );
  }
  async load() {
    // load directly from json file if not in secure environment
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo(); // loads document properties and worksheets
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; 
    await sheet.addRows(rows);
  }
}


// (async function () {
//   const sheet = new Sheet();
//   await sheet.load();
//   await sheet.addRows([
//     { title: "UX design", location: "Paris" },
//     { title: "Tech lead", location: "Oslo" },
//   ]);
// })();
