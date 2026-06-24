const toggle = document.getElementById('theme-toggle');
const emailIcon = document.getElementById('email-icon');

toggle.addEventListener('click', () => {

  document.body.classList.toggle('dark');

  const themeIcon = toggle.querySelector('i');

  if (document.body.classList.contains('dark')) {
    if (themeIcon) {
      themeIcon.className = 'fas fa-sun';
    }
    
    if (emailIcon) {
      emailIcon.style.color = '#ff8fbc'; 
    }

  } else {
    if (themeIcon) {
      themeIcon.className = 'fas fa-moon';
    }
  
    if (emailIcon) {
      emailIcon.style.color = ''; 
    }
  }

});

 AOS.init({
    duration:1200,
    once:true
  });

  window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }, 400);

});