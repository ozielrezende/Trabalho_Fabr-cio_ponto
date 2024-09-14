
async function fetchEstados() {
    const api = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const estados = await api.json();
    const estadoSelect = document.getElementById('estado');
    
   
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
    });
}


async function fetchCidades(estadoId) {
    const api = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
    const cidades = await api.json();
    const lista_de_cidades = document.getElementById('cidade-list');
    
   
    lista_de_cidades.innerHTML = '';

    
    cidades.forEach(cidade => {
        const li = document.createElement('li');
        li.classList.add('cidade-item');
        li.textContent = cidade.nome;
        lista_de_cidades.appendChild(li);
    });
}


document.getElementById('estado').addEventListener('change', function() {
    const estadoId = this.value;
    if (estadoId) {
        fetchCidades(estadoId); 
    } else {
        document.getElementById('cidade-list').innerHTML = ''; 
    }
});


fetchEstados();