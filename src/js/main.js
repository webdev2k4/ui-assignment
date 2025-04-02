// Main JavaScript file for E-Com Shop

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Flash Sale Countdown
  initFlashSaleCountdown();
  
  // Initialize Product Carousels
  initProductCarousels();
  
  // Initialize Search Bar
  initSearchBar();
  
  // Handle mobile menu
  initMobileMenu();
  
  // Add event listener for load more button
  const loadMoreBtn = document.querySelector('.load-more button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // In a real application, this would load more products via AJAX
      alert('This would load more products in a real application!');
    });
  }
});

/**
 * Initialize Flash Sale Countdown
 */
function initFlashSaleCountdown() {
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');
  const secondsElement = document.getElementById('countdown-seconds');

  if (!hoursElement || !minutesElement || !secondsElement) return;

  // Set end time - 24 hours from now
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 24);

  // Update the countdown every second
  setInterval(function() {
    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) {
      // Reset countdown to 24 hours when it reaches zero
      endTime.setHours(endTime.getHours() + 24);
    } else {
      // Calculate hours, minutes and seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Display the countdown
      hoursElement.textContent = hours < 10 ? '0' + hours : hours;
      minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
      secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  }, 1000);
}

/**
 * Initialize Product Carousels
 */
function initProductCarousels() {
  // This is a simplified carousel functionality
  // In a real implementation, you might use a library like Swiper or Slick
  const carousels = document.querySelectorAll('.product-carousel');
  
  carousels.forEach(carousel => {
    const container = carousel.querySelector('.carousel-container');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    let position = 0;
    const itemWidth = 220; // Width of each item + margin
    const visibleItems = Math.floor(container.offsetWidth / itemWidth);
    const totalItems = container.children.length;
    
    // Hide prev button initially
    prevBtn.style.opacity = '0.5';
    prevBtn.style.pointerEvents = 'none';
    
    // Handle next button click
    nextBtn.addEventListener('click', () => {
      if (position > -(totalItems - visibleItems)) {
        position--;
        container.style.transform = `translateX(${position * itemWidth}px)`;
        
        // Enable prev button
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
        
        // Disable next button if at the end
        if (position <= -(totalItems - visibleItems)) {
          nextBtn.style.opacity = '0.5';
          nextBtn.style.pointerEvents = 'none';
        }
      }
    });
    
    // Handle prev button click
    prevBtn.addEventListener('click', () => {
      if (position < 0) {
        position++;
        container.style.transform = `translateX(${position * itemWidth}px)`;
        
        // Enable next button
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
        
        // Disable prev button if at the beginning
        if (position >= 0) {
          prevBtn.style.opacity = '0.5';
          prevBtn.style.pointerEvents = 'none';
        }
      }
    });
  });
}

/**
 * Initialize Search Bar
 */
function initSearchBar() {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-button');
  
  if (!searchInput || !searchButton) return;
  
  searchButton.addEventListener('click', function() {
    performSearch(searchInput.value);
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });
}

/**
 * Perform search function
 * @param {string} query - The search query
 */
function performSearch(query) {
  if (!query.trim()) return;
  
  // In a real application, this would redirect to a search results page
  // or make an AJAX request to fetch results
  alert(`Searching for: ${query}`);
  
  // Example of redirection:
  // window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
}

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu.classList.contains('open') && 
      !mobileMenu.contains(event.target) && 
      !menuToggle.contains(event.target)) {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}

/**
 * Product Detail Page Functions
 */
// Only run these functions if we're on the product detail page
if (document.querySelector('.product-detail')) {
  document.addEventListener('DOMContentLoaded', function() {
    // Handle quantity selectors
    initQuantitySelector();
    
    // Handle thumbnail gallery
    initThumbnailGallery();
    
    // Handle color options
    initColorOptions();
  });
}

/**
 * Initialize Quantity Selector
 */
function initQuantitySelector() {
  const decreaseBtn = document.querySelector('.decrease-btn');
  const increaseBtn = document.querySelector('.increase-btn');
  const quantityInput = document.querySelector('.quantity-selector input');
  
  if (!decreaseBtn || !increaseBtn || !quantityInput) return;
  
  decreaseBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    const max = parseInt(quantityInput.getAttribute('max') || 100);
    if (value < max) {
      quantityInput.value = value + 1;
    }
  });
  
  // Ensure the value is a number
  quantityInput.addEventListener('blur', function() {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
      quantityInput.value = 1;
    }
  });
}

/**
 * Initialize Thumbnail Gallery
 */
function initThumbnailGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail img');
  const mainImage = document.querySelector('.main-image img');
  
  if (!thumbnails.length || !mainImage) return;
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Set active thumbnail
      thumbnails.forEach(t => t.parentElement.classList.remove('active'));
      this.parentElement.classList.add('active');
      
      // Change main image
      mainImage.src = this.src.replace('width=60', 'width=400').replace('height=60', 'height=400');
    });
  });
}

/**
 * Initialize Color Options
 */
function initColorOptions() {
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (!colorOptions.length) return;
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      colorOptions.forEach(o => o.classList.remove('active'));
      this.classList.add('active');
    });
  });
}