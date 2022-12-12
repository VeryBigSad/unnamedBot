let normalizedPath = require("path").join(__dirname, "");

// Loop through all files in the directory and add them to commands
require("fs").readdirSync(normalizedPath).forEach(function (file) {
  if (file !== 'index.js') {
    exports[file.slice(0, -3)] = require("./" + file);
  }
});
