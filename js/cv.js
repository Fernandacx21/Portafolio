document
.getElementById('downloadCV')
.addEventListener('click', function(e){

    e.preventDefault();

    const link = document.createElement('a');

    link.href = 'cv/CV Maria Fernanda González Ramírez.pdf';

    link.download = 'CV Maria Fernanda González Ramírez.pdf';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

});