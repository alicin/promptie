export default function (screen, args) {
  return new Promise((resolve, reject) => {
    resolve(args._plain.split('').reverse().join(''))
  })
}
