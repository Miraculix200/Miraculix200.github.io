/* Whirlpool datavis — shared chrome behaviour.
   Only job: remember a light/dark choice and re-render. The charts read
   colours from CSS at draw time, so a palette switch reloads the page
   rather than trying to repaint SVG in place. That keeps every page —
   including ones that draw their charts inline — correct for free. */

(function () {
  var KEY = 'whirlpool-datavis-theme';

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) { /* private mode, whatever */ }

  function current() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  window.toggleDatavisTheme = function () {
    var next = current() === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    document.documentElement.setAttribute('data-theme', next);
    location.reload();
  };

  window.datavisTheme = current;

  // fill in any toggle's label once the DOM is there
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.textContent = current() === 'light' ? '☾ dark' : '☀ light';
    });
  });
})();
