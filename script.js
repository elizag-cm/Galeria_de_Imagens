function filtrar(category, botaoSelecionado) {
    const exibicoes = document.querySelectorAll(".gallery-card");
    const botoes = document.querySelectorAll("#category-filters button");

    botoes.forEach(botao => {
        botao.classList.remove("bg-green-600", "text-white");
        botao.classList.add("bg-white", "text-gray-700");
    });

    botaoSelecionado.classList.remove("bg-white", "text-gray-700");
    botaoSelecionado.classList.add("bg-green-600", "text-white");

    exibicoes.forEach(exibir => {
        const categoriaExibir = exibir.dataset.category;

        if (category === "todos" || categoriaExibir === category) {
            exibir.classList.remove("hidden");
        } else {
            exibir.classList.add("hidden");
        }
    });
}