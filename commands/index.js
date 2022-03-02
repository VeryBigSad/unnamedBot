let normalizedPath = require("path").join(__dirname, "");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if (file !== 'index.js') {
    exports[file.slice(0, -3)] = require("./" + file);
  }
});
