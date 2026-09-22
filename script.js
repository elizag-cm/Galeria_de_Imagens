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



    const modal = document.querySelector("#image-modal");

    const modalImage = document.querySelector("#modal-image");
    const modalCategory = document.querySelector("#modal-category");
    const modalTitle = document.querySelector("#modal-title");
    const modalLocation = document.querySelector("#modal-location");
    const modalDescription = document.querySelector("#modal-description");

    const modalClose = document.querySelector("#modal-close");
    const modalPrev = document.querySelector("#modal-prev");
    const modalNext = document.querySelector("#modal-next");


    const botoesImagem = document.querySelectorAll(
        "[data-image-id]"
    );

    let imagemAtual = 0;


    function obterCardsVisiveis() {
        return Array.from(
            document.querySelectorAll(".gallery-card")
        ).filter(card => {
            return !card.classList.contains("hidden");
        });
    }

    function abrirModal(card) {
        const imagem = card.querySelector("img");
        const categoria = card.querySelector("span");
        const titulo = card.querySelector("h3");
        const localizacao = card.querySelector("p");

        // Preenche o modal
        modalImage.src = imagem.src;
        modalImage.alt = imagem.alt;

        modalCategory.textContent = categoria.textContent;
        modalTitle.textContent = titulo.textContent;
        modalLocation.textContent = localizacao.textContent;

        modalDescription.textContent =
            `Confira esta imagem de ${titulo.textContent}, localizada em ${localizacao.textContent}.`;

        // Mostra o modal
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        // Impede o scroll da página
        document.body.classList.add("overflow-hidden");
    }


    function fecharModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");

        // Libera o scroll da página
        document.body.classList.remove("overflow-hidden");
    }


    botoesImagem.forEach(botao => {

        botao.addEventListener("click", () => {

            const card = botao.closest(".gallery-card");

            const cardsVisiveis = obterCardsVisiveis();

            imagemAtual = cardsVisiveis.indexOf(card);

            abrirModal(card);
        });

    });


    modalClose.addEventListener("click", () => {
        fecharModal();
    });


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            fecharModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            fecharModal();
        }

    });


    modalNext.addEventListener("click", () => {

        const cardsVisiveis = obterCardsVisiveis();

        if (cardsVisiveis.length === 0) {
            return;
        }

        imagemAtual++;

        // Volta para a primeira imagem
        if (imagemAtual >= cardsVisiveis.length) {
            imagemAtual = 0;
        }

        abrirModal(cardsVisiveis[imagemAtual]);
    });

    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    const mobileMenu = document.querySelector("#mobile-menu");

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("hidden");

        });

    }