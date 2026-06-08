const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
        "service_fba6mj6",
        "template_vdzdyha",
        this
    )
    .then(() => {

        const toast = document.getElementById("toast");

            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3500);

        form.reset();

    })
    .catch(error => {

        alert("❌ Error al enviar");

        console.error(error);

    });

});