/* Every project needs a fileofshame which contains 
 * dangerously set global variables, hack functions 
 * and some other shit code.
 *
 * Credits: https://plainjs.com/javascript/events/live-binding-event-handlers-14/
 * 
 */
// matches polyfill for the super-fast DOM 4 Element Selector
import Runner from './bin/system/runner'
export default function () {
  // helper for enabling IE 8 event bindings
  function addEvent(el, type, handler) {
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
  }
  window.Element && function (ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
    ElementPrototype.matchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    function (selector) {
      let node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1
      while (nodes[++i] && nodes[i] != node)
      return !!nodes[i]
    }
  }(Element.prototype)
  // jQuery-like live binding helper using matchesSelector
  function live (selector, event, callback, context) {
    addEvent(context || document, event, function (e) {
      let found, el = e.target || e.srcElement
      while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement
      if (found) callback.call(el, e)
    })
  }

  live('.command', 'click', function(){
    Runner.run(this.innerText)
  })
}
