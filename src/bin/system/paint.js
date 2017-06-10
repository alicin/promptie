export default function paint (str, args) {
  var paintedStr = '<span class="paint'
  if (args.styles) {
    args.styles.forEach(function (arg) {
      paintedStr += ' ' + arg
    })
  }
  paintedStr += '">'
  if (args.link) {
    paintedStr += '<a href="' + args.link + '" target="_blank">'
  }
  paintedStr += str
  if (args.link) {
    paintedStr += '</a>'
  }
  paintedStr += '</span>'
  return paintedStr
}
