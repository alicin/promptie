<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/alicin/promptie/master/static/android-icon-192x192.png" alt="promptie" width="96">
  <br>
  promptie
  <br>
</h1>
<h4 align="center">A framework for creating command-line like interfaces in web browsers</h4>

<p>Promptie gives you useful and convenient API's to simulate a CLI like interface in the browser. You can easily write your own applications in it and you can even pipe the outputs of your applications to each other.</p>
<h2 align="center">
  <img src="https://raw.githubusercontent.com/alicin/promptie/master/static/demo1/Large%20GIF%20(640x480).gif" alt="promptie demo" width="640">
  <br>
  <img src="https://raw.githubusercontent.com/alicin/promptie/master/static/demo2/Large%20GIF%20(640x480).gif" alt="promptie demo" width="640">
</h2>

## Table of contents

- [Running and Building](#running-and-building)
- [Creating an application](#creating-an-application)
- [API](#api)
  - [Screen](#screen)
  - [Prompt](#prompt)
- [System](#system)
  - [Runner](#runner)
  - [Paint](#paint)
  - [Progress](#progress) 
- [Road Map](#road-map)
- [Credits](#credits)
- [License](#license)

## Running and Building
Instructions below are tested with NodeJS v7.7.2 and works with yarn package manager as well.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Creating an application
Creating an application is very easy in promptie. Just create a folder inside `src/bin` with the name of your application and put an `index.js` file inside it. `index.js` should export a function that returns a javascript `Promise`. This exported function has two parameters: 

`screen` provides utilities to print text or html on [Screen](#screen) 

`args` is a js object wrapping the parsed command line arguments. Promptie uses [minimist](https://github.com/substack/minimist) to parse arguments, you can check the github page to learn more.

`resolve` method of the promise takes two arguments. `out` is a string argument that represents the final output of your application. This is the output that gets piped while using pipes. The second argument is `silent`. It is a boolean, optional value, `false` by default. if it is true or left blank, your final output will be printed on the screen on application exit.

Here is an example application that basically colorize the input string. You can check the `bin` folder to see some other application examples.

```js
import paint from '../system/paint'

export default function (screen, args) {
  return new Promise((resolve) => {
    const colors = ['red', 'yellow', 'green', 'blue', 'magenta', 'cyan']
    let output = ''
    args._plain.split('').forEach(function (char, index) {
      output += paint(char, {styles: [colors[index % colors.length]]})
    })
    resolve(output)
  })
}

```

## API

Promptie has two main API's, [Screen](#screen) and [Prompt](#prompt).

#### Screen
- **`lines`**: A property containing all the lines on the [Screen](#screen).
```js
Screen.lines = []
```
- **`push`**: Pushes a line to the [Screen](#screen). If you want to escape html, you can pass `true` as the second parameter.
```js
Screen.push(line, escapeHtml = false)
```
- **`pushNewLine`**: Pushes a new empty line.
```js
Screen.pushNewLine()
```
- **`replaceLastLine`**: Replaces last line on the [Screen](#screen) with the given line.
```js
Screen.replaceLastLine(line)
```
- **`removeLastLine`**: Removes the last line from [Screen](#screen).
```js
Screen.removeLastLine()
```
- **`clean`**: Clears all lines from [Screen](#screen).
```js
Screen.removeLastLine()
```
#### Prompt

- **`prompt`**: A property used to set the prompt text. Default is `>`.
```js
Prompt.prompt = '$'
```
- **`disabled`**: A boolean value if set to `false` the prompt will be disabled.
```js
Prompt.prompt = '$'
```
- **`getCaretPosition`**: Returns the caret position index.
```js
Prompt.getCaretPosition()
```
- **`setCaretPostion`**: Sets the caret position to given index.
```js
Prompt.setCaretPostion(index)
```
- **`pushCaretToEnd`**: Pushes caret to the end of the line.
```js
Prompt.pushCaretToEnd()
```

## System
System provides a couple of helpers to be used in your application.

#### Runner
This is a special type of system helper that is used to run commands in `promptie` and also can be imported to your applications to run other commands within your application. Runner js has two main methods to parse commands

- **`static run (command)`**: Runs the given command string.
```js
Runner.run('movie Eternal Sunshine of the Spotless Mind')
```
- **`static async runPipe (command)`**: Runs the given piped command list string. Uses `async/await` to wait for applications to finish and pass their outputs to other applications.
```js
import Runner from '../system/runner'
// Passes the string to movie app which queries the OMDB and returns 
// the plot of the movie and colorize it with rainbow command. 
// You can see this in action in the gifs at the top of the page.
Runner.runPipe('echo Star Wars | movie | rainbow')
```

#### Paint
Paint helps you add colors, styles and links to your application. It has a special style type called `command` which creates a clickable command that is executed on click. You can check the `paint.css` file inside `bin/system` to see available styles.
```js
import paint from '../system/paint'

screen.push(paint('You will be presented with a dummy determinate loading..', 
{styles: ['magenta', 'underline', 'white-bg']}))

screen.push(paint('movie Star Wars', {styles: ['command']}))

```


#### Progress
Progress provides determinate and intereminate progress indicators for your app.

- **`static pushProgressIndeterminate(characterSequence, interval)`**: Creates a indeterminate progress indicator with the given character sequence.

- **`static pushProgressDeterminate(progress, zero, one)`**: Creates a determinate progress indicator. `progress` represents the total progress done with a value between 0 and 1. zero is a single character representing the unfinished progress and one represents the done progress.

- **`static removeProgress()`**: Removes the progress from screen.

```js
import progress from '../system/progress'

// This will put '000000______________ %30' on the screen.
progress.pushProgressDeterminate(0.3, '_', 'O')

// This will continuously loop through given character sequence until you call progress.removeProgress()
progress.pushProgressIndeterminate(['/', '-', '|', '-', '\\', '-'], 100)
```

## Road Map
- [ ] Giving applications their own prompt for gettin user input during the execution of the application.
- [ ] Math parsing.
- [ ] A `.promptie_profile` file for setting environmental options and running apps on launch.
- [ ] A ruby on rails like application generator to generate application templates in the `src/bin`.
- [ ] SUPER FUTURE TODO: Fulscreen GUI applications and multitasking 🙃.

## Credits

This software mainly uses code from these open source packages.

- [Vue.js](https://vuejs.org/)
- [minimist](https://github.com/substack/minimist)

## License

MIT

---

> Twitter [@alican](https://twitter.com/alican)
