String.prototype.replaceAll = function(str1, str2, ignore) {
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}


exports.timeToText = function(time) {
  let text = ""
  let days = Math.floor(time / 86400)
  time %= 86400;
  let hours = Math.floor(time / 3600);
  time %= 3600;
  let minutes = Math.floor(time / 60);
  if (days > 0) {
    text += days + ' day'
    days > 1 ? text+='s ':text+=' '
  }
  if (hours > 0){
    text += hours + ' hour'
    hours > 1 ? text+='s ':text+=' '
  }
  if (minutes > 0) {
    text += minutes + ' minute'
    minutes > 1 ? text+='s ':text+=' '
  }

  if (text === '') {
    return '0 seconds'
  }
  return text.slice(0, -1)
}


exports.sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}
