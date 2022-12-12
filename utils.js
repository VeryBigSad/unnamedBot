String.prototype.replaceAll = function (str1, str2, ignore) {
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}


exports.cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


exports.timeToText = function (time) {
  let text = ""
  let days = Math.floor(time / 86400)
  time %= 86400;
  let hours = Math.floor(time / 3600);
  time %= 3600;
  let minutes = Math.floor(time / 60);
  if (days > 0) {
    text += days + ' day'
    days > 1 ? text += 's ' : text += ' '
  }
  if (hours > 0) {
    text += hours + ' hour'
    hours > 1 ? text += 's ' : text += ' '
  }
  if (minutes > 0) {
    text += minutes + ' minute'
    minutes > 1 ? text += 's ' : text += ' '
  }

  if (text === '') {
    return Math.round(time % 60) + ' seconds'
  }
  return text.slice(0, -1)
}


exports.sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}
