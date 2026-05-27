let animes = JSON.parse(

    localStorage.getItem("animes")

) || [

    {
        nome: "Naruto",
        tipo: "Shounen",
        status: "Assistindo",
        favorito: false,
    },

    {
        nome: "Meu Primeiro Amor",
        tipo: "Romance",
        status: "Completo",
        favorito: false,
    },

    {
        nome: "Attack on Titan",
        tipo: "Ação",
        status: "Assistir Depois",
        favorito: false,
    }

]

let animeEditando = null

let animeExcluir = null

/* VARIAVEIS */

const listaAnimes = document.getElementById("listaAnimes")

const modal = document.getElementById("Modal")

const btnNovoAnime = document.getElementById("NovoAnime")

const btnAdicionarAnime = document.getElementById("AdicionarAnime")

const nomeAnime = document.getElementById("NomeAnime")

const tipoAnime = document.getElementById("TipoAnime")

const statusAnime = document.getElementById("StatusAnime")

const fecharModal = document.getElementById("FecharModal")

const tipoFiltro = document.getElementById("FiltroTipo")

const btnFiltrar = document.getElementById("Filtrar")

const assistindo = document.getElementById("Assistindo")

const completo = document.getElementById("Completo")

const assistirDepois = document.getElementById("AssistirDepois")

const totalAnimes = document.getElementById("TotalAnimes")

const totalFavoritos = document.getElementById("TotalFavoritos")

const ultimoAnime = document.getElementById("UltimoAnime")

const tituloModal = document.getElementById("TituloModal")

const modalExcluir = document.getElementById("ModalExcluir")

const cancelarExcluir = document.getElementById("CancelarExcluir")

const confirmarExcluir = document.getElementById("ConfirmarExcluir")



/* SALVAR DADOS */

function salvarAnimes() {

    localStorage.setItem(

        "animes",

        JSON.stringify(animes)

    )

}



/* LISTA ANIME */

function renderizarAnimes(lista) {

    listaAnimes.innerHTML = ""

    lista.forEach((anime) => {

        listaAnimes.innerHTML += `

            <div class="anime">

                <h2>${anime.nome}</h2>

                <p>${anime.tipo}</p>

                <p>${anime.status}</p>

                <button onclick="favoritarAnime('${anime.nome}')">

                    Favoritar

                </button>

                <button onclick="editarAnime('${anime.nome}')">

                    Editar

                </button>

                <button onclick="excluirAnime('${anime.nome}')">

                    Excluir

                </button>

            </div>

        `
    })

    atualizarDashboard()

}

renderizarAnimes(animes)



/* DASHBOARD */

function atualizarDashboard() {

    totalAnimes.innerHTML = animes.length

    const favoritos = animes.filter((anime) => {

        return anime.favorito === true

    })

    totalFavoritos.innerHTML = favoritos.length

    ultimoAnime.innerHTML =
            animes.length > 0 ? animes[animes.length - 1].nome : "Nenhum"


}



/* FAVORITOS */

function favoritarAnime(nome) {

    animes.forEach((anime) => {

        if(anime.nome === nome) {

            anime.favorito = !anime.favorito

        }

    })

    salvarAnimes()

    renderizarAnimes(animes)

}



/* EXCLUIR ANIME */

function excluirAnime(nome) {

    animeExcluir = nome

    modalExcluir.style.display = "flex"

}



/* BOTAO CANCELAR */

cancelarExcluir.addEventListener("click", () => {

    modalExcluir.style.display = "none"

})



/* BOTAO CONFIRMAR */

confirmarExcluir.addEventListener("click", () => {

    animes = animes.filter((anime) => {

        return anime.nome !== animeExcluir

    })

    salvarAnimes()

    renderizarAnimes(animes)

    modalExcluir.style.display = "none"

})



/* EDITAR ANIME */

function editarAnime(nome) {

    const anime = animes.find((anime) => {

        return anime.nome === nome

    })

    nomeAnime.value = anime.nome

    tipoAnime.value = anime.tipo

    statusAnime.value = anime.status

    animeEditando = anime

    tituloModal.innerHTML = "Editar Anime"

    modal.style.display = "flex"

}



/* MODAL */

btnNovoAnime.addEventListener("click", () => {

    tituloModal.innerHTML = "Novo Anime"

    modal.style.display = "flex"

})



btnAdicionarAnime.addEventListener("click", () => {

    if(animeEditando) {

        animeEditando.nome = nomeAnime.value

        animeEditando.tipo = tipoAnime.value

        animeEditando.status = statusAnime.value

    }

    else {

        const novoAnime = {

            nome: nomeAnime.value,

            tipo: tipoAnime.value,

            status: statusAnime.value,

            favorito: false
        }

        animes.push(novoAnime)

    }

    salvarAnimes()

    renderizarAnimes(animes)

    modal.style.display = "none"

    animeEditando = null

})



/* FECHAR MODAL */

fecharModal.addEventListener("click", () => {

    modal.style.display = "none"

})



/* FILTROS */

btnFiltrar.addEventListener("click", () => {

    let animesFiltrados = animes



    /* FILTRO TIPO */

    if(tipoFiltro.value === "Favoritos") {

        animesFiltrados = animes.filter((anime) => {

            return anime.favorito === true

        })

    }



    if(tipoFiltro.value !== "Todos" && tipoFiltro.value !== "Favoritos") {

        animesFiltrados = animes.filter((anime) => {

            return anime.tipo === tipoFiltro.value

        })

    }



    /* FILTRO STATUS */

    if(assistindo.checked) {

        animesFiltrados = animesFiltrados.filter((anime) => {

            return anime.status === "Assistindo"

        })

    }



    if(completo.checked) {

        animesFiltrados = animesFiltrados.filter((anime) => {

            return anime.status === "Completo"

        })

    }



    if(assistirDepois.checked) {

        animesFiltrados = animesFiltrados.filter((anime) => {

            return anime.status === "Assistir Depois"

        })

    }



    renderizarAnimes(animesFiltrados)

})