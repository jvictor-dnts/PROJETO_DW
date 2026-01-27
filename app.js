
const botaoTema = document.getElementById('tema');
const body = document.body;
const imagemTema = document.querySelector('#tema img');

botaoTema.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
         imagemTema.src = "images/sol.png";
     } else {
        imagemTema.src = "images/lua.png";
     }
});