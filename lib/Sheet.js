export default class Sheet {
  constructor(headers = []) {
    this.headers = headers;
    this.rows = [];
    this.headerIndex = this.headers.reduce(
      (hash, header, index) => Object.assign(hash, { [header]: index }),
      {}
    );
  }

  getHeaderIndex(header) {
    return this.headerIndex[header] || -1;
  }

  append(row) {
    this.rows.push(row);
  }

  toCSV() {
    return this.rows
      .reduce(
        (csv, row) => {
          csv.push(
            this.headers.map((header) => {
              const value = row[header];
              return value === undefined ? '' : value;
            })
          );
          return csv;
        },
        [this.headers.toString()]
      )
      .join('\n');
  }
}
