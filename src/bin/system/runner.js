import minimist from 'minimist'

export default class Runner {
  static run (command) {
    const {app, args} = Runner.parseCommand(command)
    try {
      const cmd = require('../' + app + '/index').default
      if (typeof cmd === 'function') {
        Prompt.disabled = true
        cmd(TerminalScreen, args, function (out) {
          TerminalScreen.push(out)
          Prompt.disabled = false
          setTimeout(() => {
            document.getElementById('prompt').focus()
          }, 1)
        })
      } else {
        TerminalScreen.push(`-promptie: ${app}: command is in the wrong application format. It should return a function`)
      }
    } catch (e) {
      console.log(e)
      TerminalScreen.push(`-promptie: ${app}: command not found`)
    }
  }

  static parseCommand (command) {
    const clean = Runner.cleanCommand(command)
    const parsedCommand = clean.split(' ')
    TerminalScreen.pushNewLine()
    TerminalScreen.push('$ ' + clean)
    const app = parsedCommand[0]
    let args = minimist(parsedCommand.slice(1))
    args._plain = clean.replace(app + ' ', '')
    return {
      app,
      args
    }
  }

  static cleanCommand (command) {
    return command.trim().replace(/\s\s+/g, ' ')
  }
}
