import minimist from 'minimist'

export default class Runner {
  static run (command) {
    console.log('asd')
    const {app, args} = Runner.parseCommand(command)
    try {
      const cmd = require('../' + app + '/index').default
      if (typeof cmd === 'function') {
        Prompt.disabled = true
        cmd(Screen, args).then(function (out, silent = false) {
          if (!silent) {
            Screen.push(out)
          }
          Prompt.disabled = false
          setTimeout(() => {
            document.getElementById('prompt').focus()
          }, 1)
        })
      } else {
        Screen.push(`-promptie: ${app}: command is in the wrong application format. It should return a function`)
      }
    } catch (e) {
      if (e.message.indexOf('Cannot find module') > -1) {
        Screen.push(`-promptie: ${app}: command not found`)
      } else {
        Screen.push(`-promptie: ${e.stack}`)
      }
    }
  }

  static parseCommand (command, silent = false) {
    const clean = Runner.cleanCommand(command)
    const parsedCommand = clean.split(' ')
    Screen.pushNewLine()
    if (!silent) {
      Screen.push(Prompt.prompt + ' ' + clean)
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
    let i = 0
    try {
      const first = require('../' + commands[0].app + '/index').default
      let out = await first(Screen, commands[0].args)
      for (i = 1; i < commands.length; i++) {
        let command = require('../' + commands[i] + '/index').default
        let _out = await command(Screen, {_plain: out})
        out = _out
      }
      Screen.push(out)
      Prompt.disabled = false
      setTimeout(() => {
        document.getElementById('prompt').focus()
      }, 1)
    } catch (e) {
      if (e.message.indexOf('Cannot find module') > -1) {
        Screen.push(`-promptie: ${(i === 0) ? commands[i].app : commands[i]}: command not found`)
      } else {
        Screen.push(`-promptie: ${e.stack}`)
      }
    }
  }

  static parsePipedCommands (command) {
    const clean = Runner.cleanCommand(command)
    Screen.pushNewLine()
    Screen.push(Prompt.prompt + ' ' + clean)
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
