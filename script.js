console.log('✅ O script.js foi carregado!');
// API do Jikan (MyAnimeList) para personagens de One Piece (ID 21)
const url = 'https://api.tenrai.org/v4/anime/21/characters';

async function carregarPersonagens() {
    const container = document.getElementById('container-cards');
    container.innerHTML = '<p>Carregando personagens...</p>';

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        const personagens = dados.data.slice(0, 20);

        container.innerHTML = '';

        personagens.forEach(item => {
            const personagem = item.character;

            const card = document.createElement('div');
            card.className = 'card';

            const imagem = document.createElement('img');
            imagem.src = personagem.images.jpg.image_url;
            imagem.alt = personagem.name;

            const nome = document.createElement('h2');
            nome.textContent = personagem.name;

            const papel = document.createElement('p');
            papel.textContent = `Papel: ${item.role === 'Main' ? 'Protagonista' : 'Coadjuvante'}`;

            const favoritos = document.createElement('p');
            favoritos.textContent = `Favoritos: ${item.favorites.toLocaleString('pt-BR')}`;

            card.appendChild(imagem);
            card.appendChild(nome);
            card.appendChild(papel);
            card.appendChild(favoritos);

            container.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao carregar:', erro);
        container.innerHTML = `<p>Erro: ${erro.message}. Tente novamente.</p>`;
    }
}

window.addEventListener('DOMContentLoaded', carregarPersonagens);