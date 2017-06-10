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
        TerminalScreen.push(`-promptie: ${command}: command is in the wrong application format. It should return a function`)
      }
    } catch (e) {
      console.log(e)
      TerminalScreen.push(`-promptie: ${command}: command not found`)
    }
  }

  static parseCommand (command) {
    const clean = Runner.cleanCommand(command)
    const parsedCommand = clean.split(' ')
    TerminalScreen.pushNewLine()
    TerminalScreen.push('$ ' + clean)
    return {
      app: parsedCommand[0],
      args: minimist(parsedCommand.slice(1))
    }
  }

  static cleanCommand (command) {
    return command.trim().replace(/\s\s+/g, ' ')
  }
}
