export default async function ask (message) {
  Prompt.disabled = false
  Prompt.applicationPrompt = true
  Screen.push(message)
  return new Promise((resolve) => {
    Prompt.$el.addEventListener('prompt', onPrompt, false)
    function onPrompt (e) {
      Prompt.$el.removeEventListener('prompt', onPrompt, false)
      Prompt.disabled = true
      Prompt.applicationPrompt = false
      resolve(e.detail)
    }
  })
}
