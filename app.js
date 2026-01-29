// j
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

let itens = [];

const formAdicionar = document.getElementById('forms');
const tabelaBody = document.querySelector('table tbody');

formAdicionar.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const desc = document.getElementById('descricao').value.trim();
    const valor = parseFloat(document.getElementById('valor-unitario').value.replace(',', '.'));
    const qtd = parseInt(document.getElementById('quantidade').value);
    
    if (!desc || isNaN(valor) || valor <= 0 || isNaN(qtd) || qtd <= 0) {
        alert('Preencha todos os campos corretamente');
        return;
    }

    itens.push({
        id: Date.now(),
        descricao: desc,
        categoria: document.getElementById('categoria').value,
        quantidade: qtd,
        valor: valor
    });

    formAdicionar.reset();
    atualizar();
    document.querySelector('.tabela-orcamento').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('#cards button').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('#card');
        const ps = card.querySelectorAll('p');
        const desc = ps[0].textContent;
        const valor = parseFloat(ps[ps.length - 1].textContent.replace('R$', '').replace(',', '.'));
        const cat = card.closest('section').id;

        itens.push({
            id: Date.now(),
            descricao: desc,
            categoria: cat === 'corridas' ? 'Corridas' : cat === 'equipamentos' ? 'Equipamentos' : 'Planilhas',
            quantidade: 1,
            valor: valor
        });

        atualizar();
        document.querySelector('.tabela-orcamento').scrollIntoView({ behavior: 'smooth' });
    });
});

function atualizar() {
    tabelaBody.innerHTML = itens.map(item => {
        const subtotal = item.quantidade * item.valor;
        return `
            <tr>
                <td>${item.descricao}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td><button class="botao-remover" data-id="${item.id}"></button></td>
            </tr>
        `;
    }).join('');

    document.querySelectorAll('.botao-remover').forEach(btn => {
        btn.addEventListener('click', () => {
            itens = itens.filter(i => i.id != btn.dataset.id);
            atualizar();
        });
    });

    const total = itens.reduce((sum, i) => sum + (i.quantidade * i.valor), 0);
    const qtdTotal = itens.reduce((sum, i) => sum + i.quantidade, 0);
    const maisCaro = itens.length ? Math.max(...itens.map(i => i.valor)) : 0;

    document.querySelector('.card-resumo:nth-child(1) strong').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    document.querySelector('.card-resumo:nth-child(2) strong').textContent = qtdTotal;
    document.querySelector('.card-resumo:nth-child(3) strong').textContent = maisCaro ? `R$ ${maisCaro.toFixed(2).replace('.', ',')}` : '---';
}