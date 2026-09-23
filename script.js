function filtrar(category, botaoSelecionado) {
    const exibicoes = document.querySelectorAll(".gallery-card");
    const botoes = document.querySelectorAll("#category-filters button");

    botoes.forEach(botao => {
        botao.classList.remove(
            "bg-emerald-600",
            "text-white",
            "shadow-sm"
        );

        botao.classList.add(
            "bg-white",
            "text-slate-600"
        );
    });

    botaoSelecionado.classList.remove(
        "bg-white",
        "text-slate-600"
    );

    botaoSelecionado.classList.add(
        "bg-emerald-600",
        "text-white",
        "shadow-sm"
    );

    exibicoes.forEach(exibir => {
        const categoriaExibir = exibir.dataset.category;

        if (
            category === "todos" ||
            categoriaExibir === category
        ) {
            exibir.classList.remove("hidden");
        } else {
            exibir.classList.add("hidden");
        }
    });
}


// ========================================
// MODAL DAS IMAGENS
// ========================================

const modal = document.querySelector("#image-modal");

const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalLocation = document.querySelector("#modal-location");
const modalDescription = document.querySelector("#modal-description");

const modalClose = document.querySelector("#modal-close");
const modalPrev = document.querySelector("#modal-prev");
const modalNext = document.querySelector("#modal-next");

let imagemAtual = 0;


// Pega somente os cards que estão visíveis
function obterCardsVisiveis() {
    return Array.from(
        document.querySelectorAll(".gallery-card")
    ).filter(card => {
        return !card.classList.contains("hidden");
    });
}


// Abre o modal
function abrirModal(card) {
    const imagem = card.querySelector("img");

    const categoria =
        card.querySelector(".image-category") ||
        card.querySelector("span");

    const titulo =
        card.querySelector(".image-title") ||
        card.querySelector("h3");

    const localizacao =
        card.querySelector(".image-location") ||
        card.querySelector("p");

    const descricao =
        card.querySelector(".image-description");

    modalImage.src = imagem.src;
    modalImage.alt = imagem.alt;

    modalCategory.textContent =
        categoria ? categoria.textContent : "";

    modalTitle.textContent =
        titulo ? titulo.textContent : "";

    modalLocation.textContent =
        localizacao ? localizacao.textContent : "";

    if (descricao) {
        modalDescription.textContent =
            descricao.textContent;
    } else {
        modalDescription.textContent =
            `Confira esta imagem de ${titulo.textContent}, localizada em ${localizacao.textContent}.`;
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
}


// Fecha o modal
function fecharModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");
}


// ========================================
// ABRIR IMAGENS
// ========================================

// Funciona tanto para imagens originais
// quanto para imagens adicionadas
document.querySelector("#gallery-grid").addEventListener("click", event => {

    // Se clicou no botão de excluir,
    // não abre o modal
    const botaoExcluir =
        event.target.closest(".delete-image-button");

    if (botaoExcluir) {
        return;
    }

    // Procura a área clicável da imagem
    const areaImagem =
        event.target.closest(".open-image-button");

    // Para as imagens antigas
    const botaoImagem =
        event.target.closest("[data-image-id]");

    const elementoClicado =
        areaImagem || botaoImagem;

    if (!elementoClicado) {
        return;
    }

    const card =
        elementoClicado.closest(".gallery-card");

    if (!card) {
        return;
    }

    const cardsVisiveis =
        obterCardsVisiveis();

    imagemAtual =
        cardsVisiveis.indexOf(card);

    abrirModal(card);
});


// Fechar pelo X
modalClose.addEventListener("click", () => {
    fecharModal();
});


// Fechar clicando fora da imagem
modal.addEventListener("click", event => {
    if (event.target === modal) {
        fecharModal();
    }
});


// Próxima imagem
modalNext.addEventListener("click", () => {
    const cardsVisiveis =
        obterCardsVisiveis();

    if (cardsVisiveis.length === 0) {
        return;
    }

    imagemAtual++;

    if (imagemAtual >= cardsVisiveis.length) {
        imagemAtual = 0;
    }

    abrirModal(cardsVisiveis[imagemAtual]);
});


// Imagem anterior
modalPrev.addEventListener("click", () => {
    const cardsVisiveis =
        obterCardsVisiveis();

    if (cardsVisiveis.length === 0) {
        return;
    }

    imagemAtual--;

    if (imagemAtual < 0) {
        imagemAtual =
            cardsVisiveis.length - 1;
    }

    abrirModal(cardsVisiveis[imagemAtual]);
});


// ========================================
// TECLA ESC
// ========================================

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        fecharModal();
        fecharModalAdicionarImagem();
    }
});


// ========================================
// MENU MOBILE
// ========================================

const mobileMenuButton =
    document.querySelector("#mobile-menu-button");

const mobileMenu =
    document.querySelector("#mobile-menu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}


// ========================================
// MODO ESCURO
// ========================================

const themeToggle =
    document.getElementById("theme-toggle");

const moonIcon =
    document.getElementById("moon-icon");

const sunIcon =
    document.getElementById("sun-icon");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {
    ativarModoEscuro();
} else {
    ativarModoClaro();
}


themeToggle.addEventListener("click", () => {

    const modoEscuroAtivo =
        document.body.classList.contains("dark-mode");

    if (modoEscuroAtivo) {
        ativarModoClaro();
    } else {
        ativarModoEscuro();
    }
});


function ativarModoEscuro() {

    document.body.classList.add("dark-mode");

    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");

    themeToggle.setAttribute(
        "aria-label",
        "Ativar modo claro"
    );

    localStorage.setItem(
        "theme",
        "dark"
    );
}


function ativarModoClaro() {

    document.body.classList.remove("dark-mode");

    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");

    themeToggle.setAttribute(
        "aria-label",
        "Ativar modo escuro"
    );

    localStorage.setItem(
        "theme",
        "light"
    );
}


// ========================================
// ADICIONAR IMAGEM
// ========================================

const addImageButton =
    document.querySelector("#add-image-button");

const addImageModal =
    document.querySelector("#add-image-modal");

const addImageClose =
    document.querySelector("#add-image-close");

const cancelAddImage =
    document.querySelector("#cancel-add-image");

const addImageForm =
    document.querySelector("#add-image-form");


// Abre o modal de adicionar
addImageButton.addEventListener("click", () => {

    addImageModal.classList.remove("hidden");
    addImageModal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
});


// Fecha o modal de adicionar
function fecharModalAdicionarImagem() {

    if (!addImageModal) {
        return;
    }

    addImageModal.classList.add("hidden");
    addImageModal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");
}


// Botão X
addImageClose.addEventListener("click", () => {
    fecharModalAdicionarImagem();
});


// Botão cancelar
cancelAddImage.addEventListener("click", () => {
    fecharModalAdicionarImagem();
});


// Fechar clicando fora
addImageModal.addEventListener("click", event => {

    if (event.target === addImageModal) {
        fecharModalAdicionarImagem();
    }
});


// ========================================
// ADICIONAR A NOVA IMAGEM NA GALERIA
// ========================================

addImageForm.addEventListener("submit", event => {

    event.preventDefault();

    const arquivo =
        document.querySelector("#image-file").files[0];

    const titulo =
        document.querySelector("#image-title").value;

    const categoria =
        document.querySelector("#image-category").value;

    const localizacao =
        document.querySelector("#image-location").value;

    const descricao =
        document.querySelector("#image-description").value;


    if (!arquivo) {
        alert("Escolha uma imagem.");
        return;
    }


    // Cria uma URL temporária para a imagem
    const imagemUrl =
        URL.createObjectURL(arquivo);


    // Cria o card
    const card =
        document.createElement("article");


    card.className =
        "gallery-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg";


    card.dataset.category =
        categoria;


    // Guarda a URL para podermos liberar
    // a memória quando a imagem for excluída
    card.dataset.imageUrl =
        imagemUrl;


    card.innerHTML = `

        <div class="relative aspect-[4/3] overflow-hidden">

            <!-- Área que abre o modal -->
            <div
                class="open-image-button h-full w-full cursor-pointer"
            >

                <img
                    src="${imagemUrl}"
                    alt="${titulo}"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                >

                <!-- Overlay -->
                <div
                    class="absolute inset-0 flex items-center justify-center
                           bg-slate-950/0 transition duration-300
                           group-hover:bg-slate-950/30"
                >

                    <span
                        class="flex h-12 w-12 scale-75
                               items-center justify-center
                               rounded-full bg-white/90
                               text-slate-800 opacity-0
                               shadow-lg transition duration-300
                               group-hover:scale-100
                               group-hover:opacity-100"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 5l7 7-7 7"
                            />

                        </svg>

                    </span>

                </div>

            </div>


            <!-- BOTÃO DE EXCLUIR -->
            <button
                type="button"
                class="delete-image-button absolute right-3 top-3 z-10
                       flex h-9 w-9 items-center justify-center
                       rounded-full bg-white/90 text-red-600
                       shadow-md transition
                       hover:bg-red-600 hover:text-white"
                title="Excluir imagem"
                aria-label="Excluir imagem"
            >

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >

                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 7h12M9 7V5h6v2m-7 0v12h8V7"
                    />

                </svg>

            </button>

        </div>


        <div class="p-5">

            <span
                class="image-category inline-flex rounded-full
                       bg-emerald-50 px-3 py-1 text-xs
                       font-medium text-emerald-700"
            >
                ${categoria}
            </span>


            <h3
                class="image-title mt-3 text-lg font-semibold text-slate-900"
            >
                ${titulo}
            </h3>


            <p
                class="image-location mt-1 text-sm text-slate-500"
            >
                ${localizacao}
            </p>


            <p
                class="image-description mt-3 text-sm text-slate-600"
            >
                ${descricao}
            </p>

        </div>
    `;


    const galeria =
        document.querySelector("#gallery-grid");


    galeria.appendChild(card);


    // Fecha o formulário
    fecharModalAdicionarImagem();


    // Limpa os campos
    addImageForm.reset();
});


// ========================================
// EXCLUIR IMAGEM
// ========================================

document
    .querySelector("#gallery-grid")
    .addEventListener("click", event => {

        const botaoExcluir =
            event.target.closest(
                ".delete-image-button"
            );


        if (!botaoExcluir) {
            return;
        }


        const card =
            botaoExcluir.closest(".gallery-card");


        if (!card) {
            return;
        }


        const confirmar =
            confirm(
                "Tem certeza que deseja excluir esta imagem?"
            );


        if (!confirmar) {
            return;
        }


        // Libera a URL temporária da imagem
        if (card.dataset.imageUrl) {

            URL.revokeObjectURL(
                card.dataset.imageUrl
            );
        }


        // Se essa imagem estiver aberta no modal,
        // fecha o modal
        if (
            !modal.classList.contains("hidden") &&
            modalImage.src ===
                card.querySelector("img").src
        ) {
            fecharModal();
        }


        // Remove o card
        card.remove();
    });