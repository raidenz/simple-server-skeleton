var fs = require('fs');
var exports = module.exports = {};

exports.make = (schema, num = 5) => {
	let records = [];
	for (let i = 1; i <= num; i++) {
	  records.push(schema(i))
	}
	return records;
};

// exports.populate = populate;
exports.populate = (num = 5, fn) => (Array.from({length: num}, fn, id => id));

/**
 * Save to db.json
 * @param  {object} data [add data]
 * NOTE:
 * appendFile to append file
 */
exports.saveDb = (data) => {
	fs.writeFile("./db.json", JSON.stringify(data), function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});
	// console.log(data);
}