let loadingInterval
let determinatePresent

export default class Progress {

  static pushProgressIndeterminate (characterSequence, interval) {
    let index = characterSequence.length

    TerminalScreen.push(characterSequence[characterSequence.length - 1])

    if (loadingInterval) {
      clearInterval(loadingInterval)
    }

    loadingInterval = setInterval(() => {
      TerminalScreen.replaceLastLine(characterSequence[index % characterSequence.length])
      index++
    }, interval)
  }

  static pushProgressDeterminate (progress, zero, one) {
    const percentage = Math.round(progress * 100)
    let loading = ''
    for (var i = 0; i < 20; i++) {
      if (i < Math.round(progress * 20)) {
        loading += one
      } else {
        loading += zero
      }
    }
    loading += ' %' + percentage
    if (!determinatePresent) {
      TerminalScreen.push(loading)
      determinatePresent = true
    } else {
      TerminalScreen.replaceLastLine(loading)
    }
  }

  static removeProgress () {
    if (determinatePresent) {
      determinatePresent = undefined
      TerminalScreen.removeLastLine()
    }
    if (loadingInterval) {
      clearInterval(loadingInterval)
      loadingInterval = undefined
      TerminalScreen.removeLastLine()
    }
  }

}
