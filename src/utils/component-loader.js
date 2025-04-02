/**
 * Component Loader Utility
 * Helps load reusable HTML components into pages
 */

// Function to load HTML components into elements with data-component attribute
function loadComponents() {
  console.log("Starting to load components...");
  const componentElements = document.querySelectorAll('[data-component]');
  console.log(`Found ${componentElements.length} components to load`);
  
  // Calculate base URL - this handles the case where the page might be in a subdirectory
  const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
  console.log(`Base URL: ${baseUrl}`);
  
  componentElements.forEach(element => {
    const componentName = element.getAttribute('data-component');
    console.log(`Loading component: ${componentName}`);
    fetchComponent(componentName, element, baseUrl);
  });
}

// Function to fetch a component HTML and insert it into the target element
function fetchComponent(componentName, targetElement, baseUrl) {
  // Build absolute URL to the component
  const componentUrl = new URL('src/components/' + componentName + '.html', baseUrl).href;
  console.log(`Fetching component from: ${componentUrl}`);
  
  fetch(componentUrl)
    .then(response => {
      console.log(`Response status for ${componentName}: ${response.status}`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName} (${response.status})`);
      }
      return response.text();
    })
    .then(html => {
      console.log(`Successfully loaded component: ${componentName}`);
      targetElement.innerHTML = html;
      
      // Process component content
      processComponentContent(targetElement, baseUrl);
    })
    .catch(error => {
      console.error('Error loading component:', error);
      targetElement.innerHTML = `<div style="color: #d9534f; background-color: #f2dede; padding: 15px; border: 1px solid #ebccd1; border-radius: 4px;">
        <strong>Error loading component:</strong> ${componentName}
        <br><small>${error.message}</small>
      </div>`;
    });
}

// Process component content (scripts, links, etc.)
function processComponentContent(element, baseUrl) {
  // Process scripts
  const scripts = element.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    Array.from(script.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  });
  
  // Process links and fix relative URLs
  element.querySelectorAll('a[href], img[src]').forEach(el => {
    if (el.tagName === 'A' && el.hasAttribute('href')) {
      const href = el.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('//')) {
        // It's a relative URL, make it absolute based on the baseUrl
        el.setAttribute('href', new URL(href, baseUrl).href);
      }
    } else if (el.tagName === 'IMG' && el.hasAttribute('src')) {
      const src = el.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
        // It's a relative URL, make it absolute based on the baseUrl
        el.setAttribute('src', new URL(src, baseUrl).href);
      }
    }
  });
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadComponents); 