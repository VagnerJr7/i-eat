document.addEventListener("DOMContentLoaded", function () {
  // Use getElementsByClassName para obter uma coleção de elementos
  const carrinhoProdutos = document.getElementsByClassName("product-list-item");
  const criarContaContainer = document.getElementById("modal-item");
  const fecharContainerButton = document.getElementById("button-close");
  const modalTitleElement = document.querySelector("#modal-item .modal-title");
  const modalValueElement = document.getElementById("modal-value");
  const productQuantityInput = document.getElementById(
    "product-qtd-input"
  ) as HTMLInputElement;
  const adicionarButton = document.querySelector("#modal-item .adc-button");
  const containerSobreTela = document.getElementById("container-sobre-tela");
  const productInfoAside = document.getElementById("product-info-aside");
  const productListAside = document.getElementById("product-list-aside");
  const closeAsideButton = document.getElementById("close-aside");

  let cartProducts = [];

  const renderProductList = () => {
    productListAside.innerHTML = "";
    let totalValue = 0;
    cartProducts.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.textContent = `${
        product.title
      } - Valor: R$ ${product.value.toFixed(2)} - Quantidade: ${
        product.quantity
      }`;
      productListAside.appendChild(productItem);
      totalValue += product.value * product.quantity;
    });
  };
  // Converta a coleção HTMLCollection para um array para poder usar forEach
  const carrinhoProdutosArray = Array.from(carrinhoProdutos);

  if (
    carrinhoProdutosArray.length > 0 &&
    criarContaContainer &&
    modalTitleElement &&
    productQuantityInput &&
    modalValueElement &&
    adicionarButton &&
    containerSobreTela &&
    productInfoAside &&
    productListAside &&
    closeAsideButton
  ) {
    carrinhoProdutosArray.forEach(function (carrinhoProduto) {
      carrinhoProduto.addEventListener("click", function () {
        // Obtém o título  (ajuste conforme necessário)
        const productTitle =
          carrinhoProduto.querySelector(".title-product").textContent;

        const productValue = parseFloat(
          carrinhoProduto
            .querySelector(".price-product")
            .textContent.replace("R$", "")
            .trim()
        );

        // Atualiza o título e o valor do modal com os do item
        modalTitleElement.textContent = productTitle;

        modalValueElement.textContent = "Valor: " + productValue.toFixed(2); // Arredonda para duas casas decimais

        // Exibe o container ao clicar no botão "Criar Conta"
        criarContaContainer.style.display = "block";
      });
    });

    fecharContainerButton.addEventListener("click", function () {
      // Oculta o container ao clicar no botão "Fechar"
      criarContaContainer.style.display = "none";
    });
  }

  // Adicionar um evento de escuta ao input de quantidade
  productQuantityInput.addEventListener("input", function () {
    const quantity = parseInt(productQuantityInput.value);
    const productPrice = parseFloat(
      modalValueElement.textContent.replace("Valor: ", "").trim()
    );
    const totalPrice = quantity * productPrice;
    modalValueElement.textContent = "Valor: " + totalPrice.toFixed(2); // Atualiza o valor total na modal
  });

  adicionarButton.addEventListener("click", function () {
    const productTitle = modalTitleElement.textContent;
    const productValue = parseFloat(
      modalValueElement.textContent.replace("Valor: ", "").trim()
    );
    const quantity = parseInt(productQuantityInput.value) || 1;

    cartProducts.push({
      title: productTitle,
      value: productValue,
      quantity: quantity,
    });

    renderProductList();
    criarContaContainer.style.display = "none";
    containerSobreTela.style.display = "block";
  });

  containerSobreTela.addEventListener("click", function () {
    // Exibe o aside com a lista de produtos
    renderProductList();
    productInfoAside.classList.add("open");
  });

  closeAsideButton.addEventListener("click", function () {
    productInfoAside.classList.remove("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  console.log("Stored username:", username); // Debug: Verifique se o username está no localStorage
  if (username) {
    const userSection = document.getElementById("user-section");
    userSection.innerHTML = `
      <span>Bem-vindo, ${username}</span>
      <button id="logout" class="btn btn-outline-danger m-2">Sair</button>
    `;

    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("username");
      window.location.reload(); // Recarrega a página para voltar ao estado não logado
    });
  }
});
