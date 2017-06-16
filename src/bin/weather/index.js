import progress from '../system/progress'
import paint from '../system/paint'
import ask from '../system/ask'

export default function (screen, args) {
  return new Promise((resolve, reject) => {
    ask('Enter the city name for forecast')
    .then(function (city) {
      progress.pushProgressIndeterminate(['/', '-', '|', '-', '\\', '-'], 100)
      return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=697bfd07e7af4dd87f26fe4b0597ac82&units=metric`)
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      progress.removeProgress()
      resolve(`Current temperature for ${res.name} is ${paint(parseInt(res.main.temp) + ' degrees.', {styles: ['bold', 'green']})}`)
    })
    .catch(function (error) {
      progress.removeProgress()
      resolve(paint(`Error: "${error}"`, {styles: ['red', 'bold']}))
    })
  })
}
