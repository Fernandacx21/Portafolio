document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".project-carousel");
  
  if (carousel) {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll(".dot");
    const prevBtn = carousel.querySelector(".prev-btn");
    const nextBtn = carousel.querySelector(".next-btn");
    
    let currentIndex = 0;

    function updateCarousel(index) {
      slides[currentIndex].classList.remove("active");
      dots[currentIndex].classList.remove("active");

      if (index >= slides.length) currentIndex = 0;
      else if (index < 0) currentIndex = slides.length - 1;
      else currentIndex = index;

      slides[currentIndex].classList.add("active");
      dots[currentIndex].classList.add("active");
    }

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateCarousel(currentIndex + 1);
    });

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateCarousel(currentIndex - 1);
    });


    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        updateCarousel(dotIndex);
      });
    });
  }
});