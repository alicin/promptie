import minimist from 'minimist'

export default class Runner {
  static run (command) {
    const {app, args} = Runner.parseCommand(command)
    try {
      const cmd = require('../' + app + '/index').default
      if (typeof cmd === 'function') {
        Prompt.disabled = true
        cmd(TerminalScreen, args).then(function (out, silent = false) {
          if (!silent) {
            TerminalScreen.push(out)
          }
          Prompt.disabled = false
          setTimeout(() => {
            document.getElementById('prompt').focus()
          }, 1)
        })
      } else {
        TerminalScreen.push(`-promptie: ${app}: command is in the wrong application format. It should return a function`)
      }
    } catch (e) {
      if (e.message.indexOf('Cannot find module') > -1) {
        TerminalScreen.push(`-promptie: ${app}: command not found`)
      } else {
        TerminalScreen.push(`-promptie: ${e.stack}`)
      }
    }
  }

  static parseCommand (command, silent = false) {
    const clean = Runner.cleanCommand(command)
    const parsedCommand = clean.split(' ')
    TerminalScreen.pushNewLine()
    if (!silent) {
      TerminalScreen.push(Prompt.prompt + ' ' + clean)
    }
    const app = parsedCommand[0]
    let args = minimist(parsedCommand.slice(1))
    args._plain = clean.replace(app + ' ', '')
    return {
      app,
      args
    }
  }

  static async runPipe (command) {
    const commands = Runner.parsePipedCommands(command)
    const first = require('../' + commands[0].app + '/index').default
    let out = await first(TerminalScreen, commands[0].args)
    for (let i = 1; i < commands.length; i++) {
      let command = require('../' + commands[i] + '/index').default
      let _out = await command(TerminalScreen, {_plain: out})
      out = _out
    }
    TerminalScreen.push(out)
    Prompt.disabled = false
    setTimeout(() => {
      document.getElementById('prompt').focus()
    }, 1)
  }

  static parsePipedCommands (command) {
    const clean = Runner.cleanCommand(command)
    TerminalScreen.pushNewLine()
    TerminalScreen.push(Prompt.prompt + ' ' + clean)
    let commands = clean.split(' | ')
    let firstCommand = Runner.parseCommand(commands[0], true)
    commands.shift()
    commands.unshift(firstCommand)
    return commands
  }

  static cleanCommand (command) {
    return command.trim().replace(/\s\s+/g, ' ')
  }
}
