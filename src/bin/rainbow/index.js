import paint from '../system/paint'

export default function (screen, args) {
  return new Promise((resolve, reject) => {
    const colors = ['red', 'yellow', 'green', 'blue', 'magenta', 'cyan']
    let output = ''
    args._plain.split('').forEach(function (char, index) {
      output += paint(char, {styles: [colors[index % colors.length]]})
    })
    resolve(output)
  })
}
