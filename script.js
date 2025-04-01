// Flash Sale Countdown Timer
function startCountdown() {
  // Set the countdown to 2 hours from now
  const countDownDate = new Date().getTime() + (2 * 60 * 60 * 1000);
  
  // Update the countdown every second
  const countdownTimer = setInterval(function() {
      // Get current time
      const now = new Date().getTime();
      
      // Find the distance between now and the countdown date
      const distance = countDownDate - now;
      
      // Time calculations for hours, minutes and seconds
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Display the result
      document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
      document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
      document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
      
      // If the countdown is finished, clear the interval
      if (distance < 0) {
          clearInterval(countdownTimer);
          document.getElementById("hours").innerHTML = "00";
          document.getElementById("minutes").innerHTML = "00";
          document.getElementById("seconds").innerHTML = "00";
      }
  }, 1000);
}

// Banner Carousel
let currentSlide = 0;
const slides = [
  "/placeholder.svg?height=300&width=800",
  "/placeholder.svg?height=300&width=800&text=Banner+2",
  "/placeholder.svg?height=300&width=800&text=Banner+3"
];

function showSlide(index) {
  const carouselInner = document.querySelector('.carousel-inner');
  
  // Create HTML for all slides
  let slidesHTML = '';
  slides.forEach((slide, i) => {
      const activeClass = i === index ? 'active' : '';
      slidesHTML += `
          <div class="carousel-item ${activeClass}">
              <img src="${slide}" alt="Promotion Banner ${i+1}">
          </div>
      `;
  });
  
  carouselInner.innerHTML = slidesHTML;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto rotate carousel
function startCarousel() {
  showSlide(currentSlide);
  setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  startCountdown();
  startCarousel();
  
  // Add event listener for load more button
  const loadMoreBtn = document.querySelector('.load-more button');
  if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
          // In a real application, this would load more products via AJAX
          alert('This would load more products in a real application!');
      });
  }
});