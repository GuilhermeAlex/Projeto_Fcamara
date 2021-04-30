"use strict"
// ==== Mecanismo de busca ====
const input = document.querySelector(".header-search")
const h2Desenhos = document.querySelector("[data-desenhos]")
const desenhosElement = document.querySelector(".desenhos")
const desenhosArray = desenhosElement.querySelectorAll(".item")
let achados = 0

// Adiciona um Event listener que aciona a função pesquisar se for apertado Enter
input.addEventListener('keydown', pesquisar)
input.addEventListener('keyup', pesquisar)

function pesquisar (event) {
    const busca = input.value.toUpperCase();
    // Se a caixa de pesquisa tiver vazia ele restaura todos e retorna
    if (input.value == '')
    {
        h2Desenhos.innerHTML = "Catálogo"
        for (let i = 0; i < desenhosArray.length; i++)
        {   
        const elemento = desenhosArray[i]
        elemento.style.display = "block"
        }
        return 
    }
    // Restaura todos os desenhos
    for (let i = 0; i < desenhosArray.length; i++)
    {   
        const elemento = desenhosArray[i]
        elemento.style.display = "block"
        achados++
    }
    // Esconde os que não estão de acordo com a pesquisa
    for (let i = 0; i < desenhosArray.length; i++)
    {   
        const elemento = desenhosArray[i]
        const nome = elemento.dataset.nome
        if (nome.toUpperCase().indexOf(busca) == -1)
        {
            elemento.style.display = "none"
            achados--
        }
    }
    if (achados == 0) {
        h2Desenhos.innerHTML = `Desculpe, não encontramos nenhum desenho com base na pesquisa "${input.value}"`
    } else {
        h2Desenhos.innerHTML = `Foram encontrados ${achados} desenhos com base na pesquisa "${input.value}"`
    }
    achados = 0
}

// ==== Fim mecanismo de busca ====