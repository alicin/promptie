import progress from '../system/progress'
import paint from '../system/paint'

export default function (screen, args) {
  return new Promise((resolve, reject) => {
    const title = args._plain
    progress.pushProgressIndeterminate(['/', '-', '|', '-', '\\', '-'], 100)
    fetch('https://api.themoviedb.org/3/search/movie?api_key=0df564feab351497c86da9e229935a81&language=en-US&query=' + title + '&page=1&include_adult=false')
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      progress.removeProgress()
      if (res.results.length > 0) {
        let poster = new Image()
        poster.src = `http://image.tmdb.org/t/p/w92${res.results[0].poster_path}`
        poster.onload = () => {
          screen.push(poster.outerHTML, false)
          screen.pushNewLine()
          screen.push(paint('Title: ', {
            styles: ['green', 'bold']
          }) + res.results[0].title)
          screen.push(paint('Plot: ', {
            styles: ['green', 'bold']
          }) + res.results[0].overview)
          screen.push(paint('Year: ', {
            styles: ['green', 'bold']
          }) + res.results[0].release_date)
          resolve(res.results[0].overview)
        }
      } else {
        resolve(paint(`Sorry, we couldn't find a movie with the title "${title}"`, {styles: ['red', 'bold']}))
      }
    })
  })
}
