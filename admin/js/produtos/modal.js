/* =========================================
   AEG PERFORMANCE
   MODAL DE PRODUTOS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const modal =
        document.getElementById("productModal");

    const btnNovoProduto =
        document.getElementById("btnNovoProduto");

    const btnFechar =
        document.getElementById("closeModal");

    const btnCancelar =
        document.getElementById("cancelModal");

    const form =
        document.getElementById("productForm");

    const modalTitle =
        document.querySelector(".modal-header h2");


    /* =========================================
       ABRIR MODAL
    ========================================= */

    function abrirModal() {

        if (!modal) return;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =========================================
       FECHAR MODAL
    ========================================= */

    function fecharModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    /* =========================================
       NOVO PRODUTO
    ========================================= */

    btnNovoProduto?.addEventListener(
        "click",
        () => {

            form?.reset();

            const sku =
                document.getElementById("sku");

            if (sku) {

                sku.value = "";

            }

            if (modalTitle) {

                modalTitle.textContent =
                    "Novo Produto";

            }

            window.editingProductId = null;

            abrirModal();

        }
    );


    /* =========================================
       FECHAR
    ========================================= */

    btnFechar?.addEventListener(
        "click",
        fecharModal
    );


    btnCancelar?.addEventListener(
        "click",
        () => {

            fecharModal();

            form?.reset();

            window.editingProductId = null;

        }
    );


    /* =========================================
       CLICAR FORA
    ========================================= */

    modal?.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {

                fecharModal();

            }

        }
    );


    /* =========================================
       ESC
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                fecharModal();

            }

        }
    );


    /* =========================================
       PREVIEW DA IMAGEM
    ========================================= */

    const imageInput =
        document.getElementById("image");

    const imagePreview =
        document.getElementById("imagePreview");


    imageInput?.addEventListener(
        "change",
        () => {

            const file =
                imageInput.files[0];

            if (!file) {

                imagePreview.style.display = "none";

                imagePreview.src = "";

                return;

            }

            const reader =
                new FileReader();


            reader.onload = () => {

                imagePreview.src =
                    reader.result;

                imagePreview.style.display =
                    "block";

            };


            reader.readAsDataURL(file);

        }
    );


    /* =========================================
       DISPONIBILIZAR FUNÇÕES
    ========================================= */

    window.openProductModal = abrirModal;

    window.closeProductModal = fecharModal;

});