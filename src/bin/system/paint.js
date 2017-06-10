export default function paint (str, args) {
  var paintedStr = '<span class="paint'
  if (args.styles) {
    args.styles.forEach(function (arg) {
      paintedStr += ' ' + arg
    })
  }
  paintedStr += '">'
  if (args.command) {
    paintedStr += '<cmd runnable="' + str + '">'
  } else if (args.link) {
    paintedStr += '<a href="' + args.link + '" target="_blank">'
  }
  paintedStr += str
  if (args.command) {
    paintedStr += '</cmd>'
  } else if (args.link) {
    paintedStr += '</a>'
  }
  paintedStr += '</span>'
  console.log(paintedStr)
  return paintedStr
}
