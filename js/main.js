const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {

  document.body.classList.toggle('dark');

  if(document.body.classList.contains('dark')){

    toggle.innerHTML = '☀️';

  }else{

    toggle.innerHTML = '🌙';

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