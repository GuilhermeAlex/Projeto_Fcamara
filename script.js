"use strict"
// ==== Mecanismo de busca ====
const input = document.querySelector("[data-search]")
const pathPaginaToons = "/html/toons.html"

// Como o mesmo script está sendo usado para mais de uma página, esse if declara as váriaveis da página toons apenas se o script for chamado a partir dela.
if (window.location.pathname == pathPaginaToons){
    var h2Desenhos = document.querySelector("[data-desenhos]")
    var desenhosElement = document.querySelector(".desenhos")
    var desenhosArray = desenhosElement.querySelectorAll(".item")
    var achados = 0
    input.value = window.localStorage.getItem("pesquisa")
    window.localStorage.clear()
    // Se o usuário estiver vindo de outra página e algo tiver sido registrado na barra de pesquisa, lança um focus nela.
    if (input.value != "")
    {
        input.focus()
        pesquisar()
    }
}


// Adiciona um Event listener que aciona a função pesquisar sempre que é digitada uma letra nova
input.addEventListener('keydown', pesquisar)
input.addEventListener('keyup', pesquisar)

function pesquisar (event) {
    // Verifica se o usuário se encontra na página do catalógo, caso não se encontre, encaminha para ela.
    if (window.location.pathname != pathPaginaToons)
    {
        window.localStorage.setItem("pesquisa", event.key)
        return window.location.pathname = pathPaginaToons
    }
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