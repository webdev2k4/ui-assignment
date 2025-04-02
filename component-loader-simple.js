/**
 * Simple Component Loader
 * Use this if the main component loader is not working
 */
document.addEventListener('DOMContentLoaded', function() {
  // Try to load all components
  const components = document.querySelectorAll('[data-component]');
  components.forEach(el => {
    const name = el.getAttribute('data-component');
    fetch('src/components/' + name + '.html')
      .then(response => response.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => {
        console.error('Failed to load component:', name, err);
        el.innerHTML = `<div style="padding: 10px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
          Failed to load component: ${name}
          <button onclick="retryLoadComponent('${name}', this.parentNode)">
            Retry
          </button>
        </div>`;
      });
  });
});

function retryLoadComponent(name, container) {
  container.innerHTML = 'Retrying...';
  fetch('src/components/' + name + '.html')
    .then(response => response.text())
    .then(html => {
      container.parentNode.innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load component on retry:', name, err);
      container.innerHTML = `<div style="padding: 10px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
        Failed to load component: ${name}
        <button onclick="retryLoadComponent('${name}', this.parentNode)">
          Retry Again
        </button>
      </div>`;
    });
} 