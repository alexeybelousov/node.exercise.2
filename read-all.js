const fs = require('fs');

function read(path, name) {
  return new Promise((done, fail) => {
    fs.readFile(path + name, { encoding: 'utf8' }, (err, content) => {
      if (err) {
        fail(err);
      } else {
        done({
          name,
          content
        });
      }
    })
  })
}

function readDir(path) {
  return new Promise((done, fail) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        fail(err);
      } else {
        done(files);
      }
    })
  })
}

module.exports = (path) => {
  return readDir(path).then(files => {
    const filePromises = files.map(file => {
      return read(path, file);
    });
    return Promise.all(filePromises);
  });
};
