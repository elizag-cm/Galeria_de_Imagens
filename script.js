// ========================================
// FILTRO DAS CATEGORIAS
// ========================================

function filtrar(category, botaoSelecionado) {

    const exibicoes =
        document.querySelectorAll(".gallery-card");

    const botoes =
        document.querySelectorAll("#category-filters button");


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

        const categoriaExibir =
            exibir.dataset.category;


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
// LOCAL STORAGE
// ========================================

const STORAGE_KEY = "galeria_imagens";


// Pega as imagens salvas
function obterImagensSalvas() {

    const dados =
        localStorage.getItem(STORAGE_KEY);

    if (!dados) {
        return [];
    }

    try {

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao ler imagens do localStorage:",
            erro
        );

        return [];

    }

}


// Salva as imagens
function salvarImagens(imagens) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(imagens)
        );

    } catch (erro) {

        console.error(
            "Erro ao salvar imagens:",
            erro
        );

        alert(
            "Não foi possível salvar a imagem. " +
            "O armazenamento do navegador pode estar cheio."
        );

    }

}


// Escapa valores antes de colocar dentro de innerHTML
function escaparHTML(valor) {

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ========================================
// MODAL DAS IMAGENS
// ========================================

const modal =
    document.querySelector("#image-modal");

const modalImage =
    document.querySelector("#modal-image");

const modalCategory =
    document.querySelector("#modal-category");

const modalTitle =
    document.querySelector("#modal-title");

const modalLocation =
    document.querySelector("#modal-location");

const modalDescription =
    document.querySelector("#modal-description");

const modalClose =
    document.querySelector("#modal-close");

const modalPrev =
    document.querySelector("#modal-prev");

const modalNext =
    document.querySelector("#modal-next");


let imagemAtual = 0;


// ========================================
// PEGAR CARDS VISÍVEIS
// ========================================

function obterCardsVisiveis() {

    return Array.from(
        document.querySelectorAll(".gallery-card")
    ).filter(card => {

        return !card.classList.contains("hidden");

    });

}


// ========================================
// ABRIR MODAL
// ========================================

function abrirModal(card) {

    const imagem =
        card.querySelector("img");


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


    modalImage.src =
        imagem.src;

    modalImage.alt =
        imagem.alt;


    modalCategory.textContent =
        categoria
            ? categoria.textContent
            : "";


    modalTitle.textContent =
        titulo
            ? titulo.textContent
            : "";


    modalLocation.textContent =
        localizacao
            ? localizacao.textContent
            : "";


    if (descricao) {

        modalDescription.textContent =
            descricao.textContent;

    } else {

        modalDescription.textContent =
            `Confira esta imagem de ${titulo.textContent}, localizada em ${localizacao.textContent}.`;

    }


    modal.classList.remove("hidden");

    modal.classList.add("flex");


    document.body.classList.add(
        "overflow-hidden"
    );

}


// ========================================
// FECHAR MODAL
// ========================================

function fecharModal() {

    modal.classList.add("hidden");

    modal.classList.remove("flex");


    document.body.classList.remove(
        "overflow-hidden"
    );

}


// ========================================
// ABRIR IMAGENS
// ========================================

document
    .querySelector("#gallery-grid")
    .addEventListener("click", event => {


        // Se clicou no botão de excluir,
        // não abre o modal da imagem
        const botaoExcluir =
            event.target.closest(
                ".delete-image-button"
            );


        if (botaoExcluir) {
            return;
        }


        // Procura a área clicável
        const areaImagem =
            event.target.closest(
                ".open-image-button"
            );


        // Para imagens antigas
        const botaoImagem =
            event.target.closest(
                "[data-image-id]"
            );


        const elementoClicado =
            areaImagem ||
            botaoImagem;


        if (!elementoClicado) {
            return;
        }


        const card =
            elementoClicado.closest(
                ".gallery-card"
            );


        if (!card) {
            return;
        }


        const cardsVisiveis =
            obterCardsVisiveis();


        imagemAtual =
            cardsVisiveis.indexOf(card);


        abrirModal(card);

    });


// ========================================
// FECHAR PELO X
// ========================================

modalClose.addEventListener(
    "click",
    () => {

        fecharModal();

    }
);


// ========================================
// FECHAR CLICANDO FORA
// ========================================

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            fecharModal();

        }

    }
);


// ========================================
// PRÓXIMA IMAGEM
// ========================================

modalNext.addEventListener(
    "click",
    () => {

        const cardsVisiveis =
            obterCardsVisiveis();


        if (cardsVisiveis.length === 0) {
            return;
        }


        imagemAtual++;


        if (
            imagemAtual >=
            cardsVisiveis.length
        ) {

            imagemAtual = 0;

        }


        abrirModal(
            cardsVisiveis[imagemAtual]
        );

    }
);


// ========================================
// IMAGEM ANTERIOR
// ========================================

modalPrev.addEventListener(
    "click",
    () => {

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


        abrirModal(
            cardsVisiveis[imagemAtual]
        );

    }
);


// ========================================
// TECLA ESC
// ========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            fecharModal();

            fecharModalAdicionarImagem();

            fecharModalExcluir();

        }

    }
);


// ========================================
// MENU MOBILE
// ========================================

const mobileMenuButton =
    document.querySelector(
        "#mobile-menu-button"
    );


const mobileMenu =
    document.querySelector(
        "#mobile-menu"
    );


if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "hidden"
            );

        }
    );

}


const mobileAddImageButton =
    document.querySelector(
        "#mobile-add-image-button"
    );


if (mobileAddImageButton) {

    mobileAddImageButton.addEventListener(
        "click",
        () => {

            addImageModal.classList.remove(
                "hidden"
            );

            addImageModal.classList.add(
                "flex"
            );


            document.body.classList.add(
                "overflow-hidden"
            );


            mobileMenu.classList.add(
                "hidden"
            );

        }
    );

}


// ========================================
// ADICIONAR IMAGEM
// ========================================

const addImageButton =
    document.querySelector(
        "#add-image-button"
    );


const addImageModal =
    document.querySelector(
        "#add-image-modal"
    );


const addImageClose =
    document.querySelector(
        "#add-image-close"
    );


const cancelAddImage =
    document.querySelector(
        "#cancel-add-image"
    );


const addImageForm =
    document.querySelector(
        "#add-image-form"
    );


// ========================================
// PREVIEW DA IMAGEM
// ========================================

const imageFile =
    document.querySelector(
        "#image-file"
    );


const imagePreview =
    document.querySelector(
        "#image-preview"
    );


const imageUploadPlaceholder =
    document.querySelector(
        "#image-upload-placeholder"
    );


let previewUrl = null;


// ========================================
// PREVIEW DA IMAGEM
// ========================================

imageFile.addEventListener(
    "change",
    event => {

        const arquivo =
            event.target.files[0];


        if (!arquivo) {
            return;
        }


        // Libera o preview anterior
        if (previewUrl) {

            URL.revokeObjectURL(
                previewUrl
            );

        }


        // Cria URL temporária
        previewUrl =
            URL.createObjectURL(
                arquivo
            );


        imagePreview.src =
            previewUrl;


        imagePreview.classList.remove(
            "hidden"
        );


        imageUploadPlaceholder.classList.add(
            "hidden"
        );

    }
);


// ========================================
// LIMPAR PREVIEW
// ========================================

function limparPreviewImagem() {

    if (previewUrl) {

        URL.revokeObjectURL(
            previewUrl
        );

        previewUrl = null;

    }


    imagePreview.src = "";

    imagePreview.classList.add(
        "hidden"
    );


    imageUploadPlaceholder.classList.remove(
        "hidden"
    );

}


// ========================================
// ABRIR MODAL DE ADICIONAR
// ========================================

addImageButton.addEventListener(
    "click",
    () => {

        addImageModal.classList.remove(
            "hidden"
        );

        addImageModal.classList.add(
            "flex"
        );


        document.body.classList.add(
            "overflow-hidden"
        );

    }
);


// ========================================
// FECHAR MODAL DE ADICIONAR
// ========================================

function fecharModalAdicionarImagem() {

    if (!addImageModal) {
        return;
    }


    addImageModal.classList.add(
        "hidden"
    );

    addImageModal.classList.remove(
        "flex"
    );


    document.body.classList.remove(
        "overflow-hidden"
    );

}


// ========================================
// BOTÃO X
// ========================================

addImageClose.addEventListener(
    "click",
    () => {

        fecharModalAdicionarImagem();

    }
);


// ========================================
// BOTÃO CANCELAR
// ========================================

cancelAddImage.addEventListener(
    "click",
    () => {

        fecharModalAdicionarImagem();

    }
);


// ========================================
// FECHAR CLICANDO FORA
// ========================================

addImageModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            addImageModal
        ) {

            fecharModalAdicionarImagem();

        }

    }
);


// ========================================
// CRIAR CARD
// ========================================

function criarCard(imagem) {

    const card =
        document.createElement("article");


    card.className =
        "gallery-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg";


    // Categoria
    card.dataset.category =
        imagem.categoria;


    // ID salvo no localStorage
    card.dataset.id =
        imagem.id;


    card.innerHTML = `

        <div class="relative aspect-[4/3] overflow-hidden">

            <!-- Área que abre o modal -->

            <div
                class="open-image-button h-full w-full cursor-pointer"
            >

                <img
                    src="${imagem.imagem}"
                    alt="${escaparHTML(imagem.titulo)}"
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
                ${escaparHTML(imagem.categoria)}
            </span>


            <h3
                class="image-title mt-3 text-lg font-semibold text-slate-900"
            >
                ${escaparHTML(imagem.titulo)}
            </h3>


            <p
                class="image-location mt-1 text-sm text-slate-500"
            >
                ${escaparHTML(imagem.localizacao)}
            </p>


            <p
                class="image-description mt-3 text-sm text-slate-600"
            >
                ${escaparHTML(imagem.descricao)}
            </p>

        </div>

    `;


    return card;

}


// ========================================
// LER ARQUIVO COMO BASE64
// ========================================

function converterImagemParaBase64(arquivo) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = () => {

                resolve(
                    reader.result
                );

            };


            reader.onerror = () => {

                reject(
                    reader.error
                );

            };


            reader.readAsDataURL(
                arquivo
            );

        }
    );

}


// ========================================
// ADICIONAR NOVA IMAGEM
// ========================================

addImageForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const arquivo =
            document.querySelector(
                "#image-file"
            ).files[0];


        const titulo =
            document.querySelector(
                "#image-title"
            ).value.trim();


        const categoria =
            document.querySelector(
                "#image-category"
            ).value;


        const localizacao =
            document.querySelector(
                "#image-location"
            ).value.trim();


        const descricao =
            document.querySelector(
                "#image-description"
            ).value.trim();


        if (!arquivo) {

            alert(
                "Escolha uma imagem."
            );

            return;

        }


        try {

            // ====================================
            // CONVERTE A IMAGEM PARA BASE64
            // ====================================

            const imagemBase64 =
                await converterImagemParaBase64(
                    arquivo
                );


            // ====================================
            // CRIA O OBJETO DA IMAGEM
            // ====================================

            const novaImagem = {

                id:
                    Date.now().toString(),

                imagem:
                    imagemBase64,

                titulo:
                    titulo,

                categoria:
                    categoria,

                localizacao:
                    localizacao,

                descricao:
                    descricao

            };


            // ====================================
            // PEGA AS IMAGENS EXISTENTES
            // ====================================

            const imagens =
                obterImagensSalvas();


            // ====================================
            // ADICIONA A NOVA IMAGEM
            // ====================================

            imagens.push(
                novaImagem
            );


            // ====================================
            // SALVA NO LOCAL STORAGE
            // ====================================

            salvarImagens(
                imagens
            );


            // ====================================
            // CRIA O CARD NA TELA
            // ====================================

            const card =
                criarCard(
                    novaImagem
                );


            const galeria =
                document.querySelector(
                    "#gallery-grid"
                );


            galeria.appendChild(
                card
            );


            // ====================================
            // FECHA O FORMULÁRIO
            // ====================================

            fecharModalAdicionarImagem();


            // ====================================
            // LIMPA O FORMULÁRIO
            // ====================================

            addImageForm.reset();


            // ====================================
            // LIMPA O PREVIEW
            // ====================================

            limparPreviewImagem();


        } catch (erro) {

            console.error(
                "Erro ao adicionar imagem:",
                erro
            );


            alert(
                "Não foi possível salvar a imagem."
            );

        }

    }
);


// ========================================
// CARREGAR IMAGENS DO LOCAL STORAGE
// ========================================

function carregarImagensSalvas() {

    const imagens =
        obterImagensSalvas();


    const galeria =
        document.querySelector(
            "#gallery-grid"
        );


    if (!galeria) {
        return;
    }


    imagens.forEach(imagem => {

        const card =
            criarCard(
                imagem
            );


        galeria.appendChild(
            card
        );

    });

}


// ========================================
// EXCLUIR IMAGEM
// ========================================

document
    .querySelector("#gallery-grid")
    .addEventListener(
        "click",
        event => {


            const botaoExcluir =
                event.target.closest(
                    ".delete-image-button"
                );


            if (!botaoExcluir) {
                return;
            }


            const card =
                botaoExcluir.closest(
                    ".gallery-card"
                );


            if (!card) {
                return;
            }


            abrirModalExcluir(
                card
            );

        }
    );


// ========================================
// MODAL DE CONFIRMAÇÃO
// ========================================

function criarModalExcluir() {

    // Se o modal já existe,
    // reutiliza
    if (
        document.querySelector(
            "#delete-image-modal"
        )
    ) {

        return document.querySelector(
            "#delete-image-modal"
        );

    }


    const modalExcluir =
        document.createElement(
            "div"
        );


    modalExcluir.id =
        "delete-image-modal";


    modalExcluir.className =
        "fixed inset-0 z-[100] hidden items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm";


    modalExcluir.innerHTML = `

        <div
            class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >

            <div class="flex items-start gap-4">

                <!-- Ícone de alerta -->

                <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center
                           rounded-full bg-red-100 text-red-600"
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                        />

                    </svg>

                </div>


                <div>

                    <h2
                        id="delete-modal-title"
                        class="text-lg font-semibold text-slate-900"
                    >
                        Excluir imagem
                    </h2>


                    <p
                        class="mt-2 text-sm leading-6 text-slate-500"
                    >
                        Tem certeza que deseja excluir esta imagem?
                        Esta ação não poderá ser desfeita.
                    </p>

                </div>

            </div>


            <!-- Botões -->

            <div
                class="mt-6 flex justify-end gap-3"
            >

                <!-- Cancelar -->

                <button
                    type="button"
                    id="cancel-delete-image"
                    class="rounded-lg border border-slate-200
                           px-4 py-2.5 text-sm font-medium
                           text-slate-700 transition
                           hover:bg-slate-50"
                >
                    Cancelar
                </button>


                <!-- Excluir -->

                <button
                    type="button"
                    id="confirm-delete-image"
                    class="rounded-lg bg-red-600
                           px-4 py-2.5 text-sm font-medium
                           text-white transition
                           hover:bg-red-700"
                >
                    Excluir
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modalExcluir
    );


    return modalExcluir;

}


// ========================================
// FECHAR MODAL DE EXCLUSÃO
// ========================================

function fecharModalExcluir() {

    const modalExcluir =
        document.querySelector(
            "#delete-image-modal"
        );


    if (!modalExcluir) {
        return;
    }


    modalExcluir.classList.add(
        "hidden"
    );

    modalExcluir.classList.remove(
        "flex"
    );


    document.body.classList.remove(
        "overflow-hidden"
    );

}


// ========================================
// EXCLUIR A IMAGEM
// ========================================

function excluirImagem(card) {

    if (!card) {
        return;
    }


    // Pega o ID da imagem
    const id =
        card.dataset.id;


    // Se não possui ID,
    // provavelmente é uma imagem original
    if (!id) {

        return;

    }


    // ====================================
    // PEGA AS IMAGENS DO LOCAL STORAGE
    // ====================================

    const imagens =
        obterImagensSalvas();


    // ====================================
    // REMOVE SOMENTE A IMAGEM COM O ID
    // ====================================

    const novasImagens =
        imagens.filter(
            imagem => imagem.id !== id
        );


    // ====================================
    // SALVA NOVAMENTE
    // ====================================

    salvarImagens(
        novasImagens
    );


    // ====================================
    // SE A IMAGEM ESTIVER ABERTA
    // FECHA O MODAL
    // ====================================

    const imagem =
        card.querySelector("img");


    if (
        imagem &&
        !modal.classList.contains("hidden") &&
        modalImage.src === imagem.src
    ) {

        fecharModal();

    }


    card.remove();

}


// ========================================
// ABRIR MODAL DE EXCLUSÃO
// ========================================

function abrirModalExcluir(card) {

    const modalExcluir =
        criarModalExcluir();


    const botaoCancelar =
        modalExcluir.querySelector(
            "#cancel-delete-image"
        );


    const botaoConfirmar =
        modalExcluir.querySelector(
            "#confirm-delete-image"
        );


    // Mostra o modal

    modalExcluir.classList.remove(
        "hidden"
    );

    modalExcluir.classList.add(
        "flex"
    );


    // Impede o scroll da página

    document.body.classList.add(
        "overflow-hidden"
    );


    botaoCancelar.onclick = () => {

        fecharModalExcluir();

    };


    botaoConfirmar.onclick = () => {

        excluirImagem(
            card
        );


        fecharModalExcluir();

    };


    modalExcluir.onclick =
        event => {

            if (
                event.target ===
                modalExcluir
            ) {

                fecharModalExcluir();

            }

        };

}


// ========================================
// CARREGAR DADOS SALVOS
// ========================================
//
// Essa função precisa ser chamada
// depois que todo o JavaScript foi
// definido.
//

carregarImagensSalvas();