import paint from '../system/paint'
import progress from '../system/progress'
export default function (screen, params, done) {
  var index = 0
  screen.push(paint('Hello and welcome to "hello" command', {styles: ['blue', 'bold']}))
  screen.push(paint('You will be presented with a dummy determinate loading..', {styles: ['magenta', 'underline']}))
  screen.push(paint('this is a command', {command: true}))
  screen.push(paint('google', {link: 'http://google.ca'}))
  let interval = setInterval(() => {
    console.log('asd')
    index += 0.02
    if (index < 1) {
      progress.pushProgressDeterminate(index, '_', 'O')
    } else {
      progress.removeProgress()
      clearInterval(interval)
      done(paint('Process Finished', {styles: ['green']}))
    }
  }, 100)
}
