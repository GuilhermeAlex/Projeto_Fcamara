"use strict"
// ==== Mecanismo de busca ====
const input = document.querySelector("[data-search]")
const pathPaginaToons = "/html/toons.html"

// Como o mesmo script está sendo usado para mais de uma página, esse if declara as váriaveis da página toons apenas se o script for chamado a partir dela.
if (window.location.pathname.endsWith(pathPaginaToons)) {
    var h2Catalogo = document.querySelector("[data-desenhos]")
    var h2Acessados = document.querySelector("[data-h2-acessados]")
    var listaAcessados = document.querySelector("[data-acessados-recentemente]")
    var catalogo = document.querySelector("[data-catalogo]")
    var catalogoCompleto = document.querySelector("[data-catalogo]")
    var catalogoDesenhos = catalogoCompleto.querySelectorAll("[data-desenho]")
    var desenhosDiv = document.querySelector(".desenhos")
    var achados = 0
    var arrowsRight = document.querySelectorAll("[data-arrow-right]")
    var arrowsLeft = document.querySelectorAll("[data-arrow-left]")
    var listasDesenhos = document.querySelectorAll("[data-lista-desenhos]")

    if (window.localStorage.getItem("pesquisa") != null) {
        if (window.localStorage.getItem("pesquisa").length <= 2) {
            input.value = window.localStorage.getItem("pesquisa")
        } else {
            input.focus()
        }
    }

    // Se o usuário estiver vindo de outra página e algo tiver sido registrado na barra de pesquisa, lança um focus nela.
    if (input.value != "") {
        input.focus()
        pesquisar()
    }
}

// Adiciona um Event listener que aciona a função pesquisar sempre que é digitada uma letra nova
input.addEventListener('keydown', pesquisar)
input.addEventListener('keyup', pesquisar)

function pesquisar(event) {
    // Verifica se o usuário se encontra na página do catalógo, caso não se encontre, encaminha para ela.
    if (window.location.pathname.endsWith(pathPaginaToons) == false) {
        window.localStorage.setItem("pesquisa", event.key)
        let caminho = document.querySelector('[data-caminho]')
        return caminho.click()
    }
    const busca = input.value.toUpperCase();
    // Se a caixa de pesquisa tiver vazia ele restaura todos e retorna
    if (input.value == '') {
        h2Catalogo.className = "none"
        catalogoCompleto.className = "none"
        desenhosDiv.className = "desenhos"
        return
    }
    desenhosDiv.className = "none"
    catalogoCompleto.className = "catalogo-pesquisa"
    // Restaura todos os desenhos
    for (let i = 0; i < catalogoDesenhos.length; i++) {
        const elemento = catalogoDesenhos[i]
        elemento.className = "item-pesquisa"
        achados++
    }
    // Esconde os que não estão de acordo com a pesquisa
    for (let i = 0; i < catalogoDesenhos.length; i++) {
        const elemento = catalogoDesenhos[i]
        const nome = elemento.dataset.nome
        if (nome.toUpperCase().indexOf(busca) == -1) {
            elemento.className = "none"
            achados--
        }
    }
    h2Catalogo.className = ""
    if (achados == 0) {
        h2Catalogo.innerHTML = `Desculpe, não encontramos nenhum desenho com base na pesquisa "${input.value}"`
    } else if (achados == 1) {
        h2Catalogo.innerHTML = `Foi encontrado ${achados} desenho com base na pesquisa "${input.value}"`
    } else {
        h2Catalogo.innerHTML = `Foram encontrados ${achados} desenhos com base na pesquisa "${input.value}"`
    }
    achados = 0
}

// ==== Fim mecanismo de busca ====

// ==== Início do sistema de troca de avatar ====

const avatar = document.querySelector("[data-avatar]")
const divIcones = document.querySelector(["[data-icones]"])

// Verifica se o script está sendo acessado a partir da página index, pois o caminho para as imagens a partir dela é diferente.
if (window.location.pathname.endsWith("/index.html")) {
    var icones = ["imagens/avatar-icons/default-avatar.png", "imagens/avatar-icons/power-girl.jpg", "imagens/avatar-icons/arnold.jpg", "imagens/avatar-icons/coragem.jpg", "imagens/avatar-icons/captain-caveman-200x200.jpg", "imagens/avatar-icons/homer-200x200.jpg", "imagens/avatar-icons/kid-goku-200x200.jpg", "imagens/avatar-icons/mestre-dos-magos-200x200.jpg", "imagens/avatar-icons/mickey-200x200.jpg", "imagens/avatar-icons/naruto-200x200.jpg", "imagens/avatar-icons/pernalonga-200x200.jpg", "imagens/avatar-icons/pingu-200x200.jpg", "imagens/avatar-icons/pink-panther-200x200.jpg", "imagens/avatar-icons/scooby-doo-200x200.jpg", "imagens/avatar-icons/Seiya-200x200.jpg"]
    if (window.localStorage.getItem("avatar") != null) {
        const avatarPessoal = window.localStorage.getItem("avatar")
        const avatarAlt = window.localStorage.getItem("avatarAlt")
        avatar.src = avatarPessoal
        avatar.alt = avatarAlt
    }
} else {
    var icones = ["../imagens/avatar-icons/default-avatar.png", "../imagens/avatar-icons/power-girl.jpg", "../imagens/avatar-icons/arnold.jpg", "../imagens/avatar-icons/coragem.jpg", "../imagens/avatar-icons/captain-caveman-200x200.jpg", "../imagens/avatar-icons/homer-200x200.jpg", "../imagens/avatar-icons/kid-goku-200x200.jpg", "../imagens/avatar-icons/mestre-dos-magos-200x200.jpg", "../imagens/avatar-icons/mickey-200x200.jpg", "../imagens/avatar-icons/naruto-200x200.jpg", "../imagens/avatar-icons/pernalonga-200x200.jpg", "../imagens/avatar-icons/pingu-200x200.jpg", "../imagens/avatar-icons/pink-panther-200x200.jpg", "../imagens/avatar-icons/scooby-doo-200x200.jpg", "../imagens/avatar-icons/Seiya-200x200.jpg"]
    if (window.localStorage.getItem("avatar") != null) {
        const avatarPessoal = window.localStorage.getItem("avatar")
        const avatarAlt = window.localStorage.getItem("avatarAlt")
        avatar.src = "../" + avatarPessoal
        avatar.alt = avatarAlt
    }
}
var iconesAlt = ["Ícone de avatar padrão da web, silhueta masculina azul.", "Ícone de avatar com pequena imagem de Florzinha, do desenho 'As meninas super-poderosas'.", "Ícone de avatar com pequena imagem de Arnold, do desenho 'Hey Arnold'.", "Ícone de avatar com pequena imagem de coragem, do desenho 'Coragem, o cão covarde'.", "Ícone de avatar com pequena imagem do capitão caverna, do desenho 'Capitão caverna e as panterinhas'.", "Ícone de avatar com pequena imagem de Homer, do desenho 'Os Simpsons'.", "Ícone de avatar com pequena imagem de Goku criança, do desenho 'Dragon Ball'.", "Ícone de avatar com pequena imagem do mestre dos magos, do desenho 'Caverna do dragão'.", "Ícone de avatar com pequena imagemdo Mickey pilotando o navio em um estilo de desenho antigo.", "Ícone de avatar com pequena imagem do Naruto animado do anime 'Naruto clássico'.", "Ícone de avatar com pequena imagem do pernalonga.", "Ícone de avatar com pequena imagem do Pingu com as nadadeiras na cintura.", "Ícone de avatar com pequena imagem da pantera cor de rosa com cara de surpresa.", "Ícone de avatar com pequena imagem do scooby doo sobre um fundo azul.", "Ícone de avatar com pequena imagem do Seiya do desenho 'Cavaleiros do Zodíaco'."]

// Coloca o display da janela de escolha de avatares como "none" e adiciona uma função ao avatar para que ao ser clicado mude o display da janela de icones

atualizarIcones()
// gera a lista de avatares disponíveis com base nos avatares registrados na lista icones
function atualizarIcones() {
    for (let i = 0; i < icones.length; i++) {
        var element = document.createElement("li")
        element.className = "icone"
        var element2 = document.createElement("img")
        element2.className = "icones"
        element2.src = icones[i]
        element2.alt = iconesAlt[i]
        element2.addEventListener('click', trocarAvatar)
        element.appendChild(element2)
        divIcones.appendChild(element)
    }
}

// realiza a troca do avatar

function trocarAvatar(element) {
    element = element.target
    window.localStorage.setItem("avatarAlt", element.alt)
    avatar.alt = element.alt
    var temp = element.src
    element = avatar.src
    avatar.src = temp
    window.localStorage.setItem("avatar", avatar.src.slice(avatar.src.indexOf("imagens")))

}

// ==== Fim do sistema de troca de avatar ====

// ==== Acessados recentemente ====

// Verifica se a página atual é a página do catálogo
if (window.location.pathname.endsWith(pathPaginaToons)) {
    // Verifica se há algum desenho recentemente acessado, se houver carrega eles.
    const acessadosRecente = document.querySelector("[data-acessados]")
    if (window.localStorage.getItem("recentes") != null) {
        var listaRecentes = JSON.parse(window.localStorage.getItem("recentes"))
        h2Acessados.className = ""
        listaAcessados.className = "list-container"

    } else {
        h2Acessados.className = "none"
        listaAcessados.className = "none"
        var listaRecentes = []
    }

    atualizaRecentesNaTela(listaRecentes)
    function atualizaRecentesNaTela(lista) {
        for (let i = 0; i < lista.length; i++) {
            let desenhoInteresseNome = lista[i]
            for (let c = 0; c < catalogoDesenhos.length; c++) {
                var elemento = catalogoDesenhos[c]
                const nome = elemento.dataset.nome
                if (desenhoInteresseNome.toUpperCase() == nome.toUpperCase()) {
                    var elemento = elemento.cloneNode(true)
                    elemento.className = "item"
                    acessadosRecente.appendChild(elemento)
                }
            }
        }
    }
}

function adicionaInteresse(element) {
    // Verifica se o elemento clicado já está na lista de recentes
    if (listaRecentes.indexOf(element.dataset.nome) == -1) {
        listaRecentes.unshift(element.dataset.nome)
    } else {
        // Se já estiver, muda a posição dele na lista para 0
        listaRecentes.splice(listaRecentes.indexOf(element.dataset.nome), 1)
        listaRecentes.unshift(element.dataset.nome)
    }
    while (listaRecentes.length > 6) {
        listaRecentes.pop()
    }
    // Atualiza a lista de recentes na memória local
    window.localStorage.setItem("recentes", JSON.stringify(listaRecentes))
}


// ==== Fim acessados recentemente ====

// ==== Início do mecanismo de carrosel no catálogo 
if (window.location.pathname.endsWith(pathPaginaToons)) {
    let contador = []
    arrowsRight.forEach((arrow, i) => {
        const itemNumber = listasDesenhos[i].querySelectorAll("img").length
        contador.push(0)
        arrow.addEventListener('click', () => {
            if (window.matchMedia("(max-width: 400px)").matches) {
                if ((contador[i]) < itemNumber - 1) {
                    contador[i]++
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value - window.innerWidth * 0.89}px)`
                }
            } else if (window.matchMedia("(max-width: 800px)").matches) {
                if ((contador[i]) < itemNumber - 2) {
                    contador[i]++
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value - window.innerWidth * 0.445}px)`
                }
            } else if (window.matchMedia("(max-width: 1100px)").matches) {
                if ((contador[i]) < itemNumber - 3) {
                    contador[i]++
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value - window.innerWidth * 0.299}px)`
                }
            } else {
                if ((contador[i]) < itemNumber - 4) {
                    contador[i]++
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value - window.innerWidth * 0.223}px)`
                }
            }
            var temp = arrow.style.pointerEvents
            arrow.style.pointerEvents = "none"
            setTimeout(() => { arrow.style.pointerEvents = temp }, 500)
        })

    })
    arrowsLeft.forEach((arrow, i) => {
        const itemNumber = listasDesenhos[i].querySelectorAll("img").length
        arrow.addEventListener('click', () => {
            if ((contador[i]) > 0) {
                contador[i]--
                if (window.matchMedia("(max-width: 400px)").matches) {
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value + window.innerWidth * 0.89}px)`
                } else if (window.matchMedia("(max-width: 800px)").matches) {
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value + window.innerWidth * 0.445}px)`
                } else if (window.matchMedia("(max-width: 1100px)").matches) {
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value + window.innerWidth * 0.299}px)`
                } else {
                    listasDesenhos[i].style.transform = `translateX(${listasDesenhos[i].computedStyleMap().get("transform")[0].x.value + window.innerWidth * 0.223}px)`
                }
            }
            var temp = arrow.style.pointerEvents
            arrow.style.pointerEvents = "none"
            setTimeout(() => { arrow.style.pointerEvents = temp }, 500)
        })
    })
}

// ==== Fim do mecanismo de carrosel no catálogo ====

window.localStorage.setItem("pesquisa", "")
