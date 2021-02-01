fs = require('fs');
fs.writeFile('./release/githubio/version/version.json', JSON.stringify(version), function (err) {
  if (err) return console.log(err);
  console.log('Save version.json OK');
});
