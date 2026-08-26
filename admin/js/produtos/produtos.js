/* =========================================
   AEG PERFORMANCE
   SISTEMA DE PRODUTOS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTOS
    ========================================= */

    const productForm =
        document.getElementById("productForm");

    const productTable =
        document.getElementById("productTable");

    const searchProduct =
        document.getElementById("searchProduct");

    const filterCategory =
        document.getElementById("filterCategory");

    const filterBrand =
        document.getElementById("filterBrand");

    const imageInput =
        document.getElementById("image");

    const imagePreview =
        document.getElementById("imagePreview");

    const productModal =
        document.getElementById("productModal");


    /* =========================================
       PRODUTO EM EDIÇÃO
    ========================================= */

    window.editingProductId = null;


    /* =========================================
       INICIALIZAÇÃO
    ========================================= */

    renderProducts();

    updateFilters();


    /* =========================================
       CADASTRAR / EDITAR PRODUTO
    ========================================= */

    productForm?.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* =====================================
               PEGAR DADOS DO FORMULÁRIO
            ===================================== */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const brand =
                document
                    .getElementById("brand")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("category")
                    .value;


            const price =
                Number(
                    document
                        .getElementById("price")
                        .value
                );


            const stock =
                Number(
                    document
                        .getElementById("stock")
                        .value
                );


            const description =
                document
                    .getElementById("description")
                    .value
                    .trim();


            const status =
                document
                    .getElementById("status")
                    ?.value || "active";


            /* =====================================
               VALIDAÇÃO
            ===================================== */

            if (!name) {

                alert(
                    "Informe o nome do produto."
                );

                return;

            }


            if (!brand) {

                alert(
                    "Informe a marca."
                );

                return;

            }


            if (!category) {

                alert(
                    "Selecione uma categoria."
                );

                return;

            }


            if (price <= 0) {

                alert(
                    "Informe um preço válido."
                );

                return;

            }


            if (stock < 0) {

                alert(
                    "O estoque não pode ser negativo."
                );

                return;

            }


            /* =====================================
               IMAGEM
            ===================================== */

            let image = "";


            if (
                imageInput &&
                imageInput.files &&
                imageInput.files.length > 0
            ) {

                try {

                    image =
                        await readImage(
                            imageInput.files[0]
                        );

                } catch (error) {

                    console.error(
                        "Erro ao carregar imagem:",
                        error
                    );

                    alert(
                        "Não foi possível carregar a imagem."
                    );

                    return;

                }

            }


            /* =====================================
               MODO EDIÇÃO
            ===================================== */

            if (window.editingProductId) {

                const oldProduct =
                    getProductById(
                        window.editingProductId
                    );


                if (!oldProduct) {

                    alert(
                        "Produto não encontrado."
                    );

                    return;

                }


                const updatedProduct = {

                    ...oldProduct,

                    name,

                    brand,

                    category,

                    /*
                       O SKU NÃO É ALTERADO
                       DURANTE A EDIÇÃO.
                    */

                    sku: oldProduct.sku,

                    price,

                    stock,

                    description,

                    status,

                    /*
                       Se não escolher uma nova
                       imagem, mantém a antiga.
                    */

                    image:
                        image ||
                        oldProduct.image ||
                        ""

                };


                const updated =
                    updateProduct(
                        updatedProduct
                    );


                if (!updated) {

                    alert(
                        "Não foi possível atualizar o produto."
                    );

                    return;

                }

            }

            /* =====================================
               NOVO PRODUTO
            ===================================== */

            else {

                const newProduct = {

                    id:
                        generateProductId(),

                    name,

                    brand,

                    category,

                    /*
                       SKU GERADO AUTOMATICAMENTE
                       PELA CATEGORIA
                    */

                    sku:
                        generateSKU(category),

                    price,

                    stock,

                    description,

                    status,

                    image,

                    createdAt:
                        new Date().toISOString()

                };


                const saved =
                    addProduct(
                        newProduct
                    );


                if (!saved) {

                    alert(
                        "Não foi possível salvar o produto."
                    );

                    return;

                }

            }


            /* =====================================
               FINALIZAÇÃO
            ===================================== */

            resetProductForm();

            closeProductModal();

            renderProducts();

            updateFilters();


            window.editingProductId = null;

        }
    );


    /* =========================================
       PESQUISA
    ========================================= */

    searchProduct?.addEventListener(
        "input",
        () => {

            renderProducts();

        }
    );


    /* =========================================
       FILTRO CATEGORIA
    ========================================= */

    filterCategory?.addEventListener(
        "change",
        () => {

            renderProducts();

        }
    );


    /* =========================================
       FILTRO MARCA
    ========================================= */

    filterBrand?.addEventListener(
        "change",
        () => {

            renderProducts();

        }
    );


    /* =========================================
       AÇÕES DA TABELA
    ========================================= */

    productTable?.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "button[data-action]"
                );


            if (!button) {

                return;

            }


            const action =
                button.dataset.action;


            const id =
                button.dataset.id;


            if (action === "edit") {

                editProduct(id);

            }


            if (action === "delete") {

                removeProduct(id);

            }

        }
    );


    /* =========================================
       RENDERIZAR PRODUTOS
    ========================================= */

    function renderProducts() {

        if (!productTable) {

            return;

        }


        const products =
            getProducts();


        const search =
            searchProduct?.value
                ?.toLowerCase()
                .trim() || "";


        const category =
            filterCategory?.value || "";


        const brand =
            filterBrand?.value || "";


        const filteredProducts =
            products.filter(
                (product) => {


                    const productName =
                        String(
                            product.name || ""
                        ).toLowerCase();


                    const productSKU =
                        String(
                            product.sku || ""
                        ).toLowerCase();


                    const productBrand =
                        String(
                            product.brand || ""
                        ).toLowerCase();


                    const matchesSearch =

                        productName
                            .includes(search)

                        ||

                        productSKU
                            .includes(search)

                        ||

                        productBrand
                            .includes(search);


                    const matchesCategory =

                        !category ||

                        product.category === category;


                    const matchesBrand =

                        !brand ||

                        product.brand === brand;


                    return (

                        matchesSearch &&

                        matchesCategory &&

                        matchesBrand

                    );

                }
            );


        /* =====================================
           NENHUM PRODUTO
        ===================================== */

        if (
            filteredProducts.length === 0
        ) {

            productTable.innerHTML = `

                <tr>

                    <td colspan="9">

                        <div class="empty-state">

                            <i class="fa-solid fa-box-open"></i>

                            <h3>
                                Nenhum produto encontrado
                            </h3>

                            <p>
                                Cadastre um produto
                                ou altere os filtros.
                            </p>

                        </div>

                    </td>

                </tr>

            `;

            return;

        }


        /* =====================================
           MONTAR TABELA
        ===================================== */

        productTable.innerHTML =
            filteredProducts
                .map(
                    (product) => {

                        return `

                            <tr>

                                <td>
                                    ${escapeHTML(
                                        product.id
                                    )}
                                </td>


                                <td>

                                    ${
                                        product.image

                                        ?

                                        `
                                        <img
                                            src="${product.image}"
                                            alt="${escapeHTML(
                                                product.name
                                            )}">
                                        `

                                        :

                                        `
                                        <div
                                            class="product-no-image">

                                            <i
                                                class="fa-solid fa-image">
                                            </i>

                                        </div>
                                        `
                                    }

                                </td>


                                <td>

                                    <strong>

                                        ${escapeHTML(
                                            product.name
                                        )}

                                    </strong>

                                    <small>

                                        SKU:
                                        ${escapeHTML(
                                            product.sku
                                        )}

                                    </small>

                                </td>


                                <td>

                                    ${escapeHTML(
                                        product.category
                                    )}

                                </td>


                                <td>

                                    ${escapeHTML(
                                        product.brand
                                    )}

                                </td>


                                <td>

                                    R$
                                    ${formatPrice(
                                        product.price
                                    )}

                                </td>


                                <td>

                                    <span
                                        class="stock-value
                                        ${getStockClass(
                                            product.stock
                                        )}">

                                        ${product.stock}

                                    </span>

                                </td>


                                <td>

                                    <span
                                        class="status
                                        ${product.status}">

                                        ${
                                            product.status ===
                                            "active"

                                            ?

                                            "Ativo"

                                            :

                                            "Inativo"
                                        }

                                    </span>

                                </td>


                                <td>

                                    <div
                                        class="actions">

                                        <button
                                            type="button"
                                            class="btn-edit"
                                            data-action="edit"
                                            data-id="${escapeHTML(
                                                product.id
                                            )}"
                                            title="Editar">

                                            <i
                                                class="fa-solid fa-pen">
                                            </i>

                                        </button>


                                        <button
                                            type="button"
                                            class="btn-delete"
                                            data-action="delete"
                                            data-id="${escapeHTML(
                                                product.id
                                            )}"
                                            title="Excluir">

                                            <i
                                                class="fa-solid fa-trash">
                                            </i>

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        `;

                    }
                )
                .join("");

    }


    /* =========================================
       EDITAR PRODUTO
    ========================================= */

    function editProduct(id) {

        const product =
            getProductById(id);


        if (!product) {

            alert(
                "Produto não encontrado."
            );

            return;

        }


        window.editingProductId = id;


        document
            .getElementById("name")
            .value =
            product.name || "";


        document
            .getElementById("brand")
            .value =
            product.brand || "";


        document
            .getElementById("category")
            .value =
            product.category || "";


        /*
           SKU APENAS PARA VISUALIZAÇÃO.
           NÃO ALTERAMOS.
        */

        document
            .getElementById("sku")
            .value =
            product.sku || "";


        document
            .getElementById("price")
            .value =
            product.price ?? "";


        document
            .getElementById("stock")
            .value =
            product.stock ?? "";


        document
            .getElementById("description")
            .value =
            product.description || "";


        const status =
            document.getElementById(
                "status"
            );


        if (status) {

            status.value =
                product.status || "active";

        }


        /* =====================================
           IMAGEM
        ===================================== */

        if (
            imagePreview &&
            product.image
        ) {

            imagePreview.src =
                product.image;

            imagePreview.style.display =
                "block";

        }

        else if (imagePreview) {

            imagePreview.src = "";

            imagePreview.style.display =
                "none";

        }


        /* =====================================
           TÍTULO
        ===================================== */

        const modalTitle =
            document.querySelector(
                ".modal-header h2"
            );


        if (modalTitle) {

            modalTitle.textContent =
                "Editar Produto";

        }


        /* =====================================
           ABRIR MODAL
        ===================================== */

        productModal?.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }


    /* =========================================
       EXCLUIR PRODUTO
    ========================================= */

    function removeProduct(id) {

        const product =
            getProductById(id);


        if (!product) {

            alert(
                "Produto não encontrado."
            );

            return;

        }


        const confirmed =
            confirm(
                `Deseja realmente excluir "${product.name}"?`
            );


        if (!confirmed) {

            return;

        }


        const deleted =
            deleteProduct(id);


        if (!deleted) {

            alert(
                "Não foi possível excluir o produto."
            );

            return;

        }


        renderProducts();

        updateFilters();

    }


    /* =========================================
       ATUALIZAR FILTROS
    ========================================= */

    function updateFilters() {

        const products =
            getProducts();


        /* =====================================
           CATEGORIAS
        ===================================== */

        if (filterCategory) {

            const currentValue =
                filterCategory.value;


            const categories =
                [
                    ...new Set(
                        products
                            .map(
                                product =>
                                    product.category
                            )
                            .filter(Boolean)
                    )
                ];


            filterCategory.innerHTML = `

                <option value="">
                    Todas as Categorias
                </option>

                ${
                    categories
                        .map(
                            (category) => `

                                <option
                                    value="${escapeAttribute(
                                        category
                                    )}">

                                    ${escapeHTML(
                                        category
                                    )}

                                </option>

                            `
                        )
                        .join("")
                }

            `;


            if (
                categories.includes(
                    currentValue
                )
            ) {

                filterCategory.value =
                    currentValue;

            }

        }


        /* =====================================
           MARCAS
        ===================================== */

        if (filterBrand) {

            const currentValue =
                filterBrand.value;


            const brands =
                [
                    ...new Set(
                        products
                            .map(
                                product =>
                                    product.brand
                            )
                            .filter(Boolean)
                    )
                ];


            filterBrand.innerHTML = `

                <option value="">
                    Todas as Marcas
                </option>

                ${
                    brands
                        .map(
                            (brand) => `

                                <option
                                    value="${escapeAttribute(
                                        brand
                                    )}">

                                    ${escapeHTML(
                                        brand
                                    )}

                                </option>

                            `
                        )
                        .join("")
                }

            `;


            if (
                brands.includes(
                    currentValue
                )
            ) {

                filterBrand.value =
                    currentValue;

            }

        }

    }


    /* =========================================
       GERAR SKU AUTOMATICAMENTE
       PELA CATEGORIA
    ========================================= */

    function generateSKU(category) {

        const products =
            getProducts();


        const categoryCodes = {

            "Motor": "MOT",

            "Freios": "FRE",

            "Suspensão": "SUS",

            "Elétrica": "ELE",

            "Lubrificantes": "LUB",

            "Filtros": "FIL",

            "Performance": "PRF",

            "Acessórios": "ACE"

        };


        const categoryCode =
            categoryCodes[category]
            || "GEN";


        const prefix =
            `AEG-${categoryCode}`;


        const existingNumbers =

            products

                .filter(
                    product =>
                        product.sku &&
                        product.sku.startsWith(
                            prefix
                        )
                )

                .map(
                    product => {

                        const parts =
                            product.sku.split("-");


                        return (
                            parseInt(
                                parts[2],
                                10
                            ) || 0
                        );

                    }
                );


        let nextNumber = 1;


        if (
            existingNumbers.length > 0
        ) {

            nextNumber =
                Math.max(
                    ...existingNumbers
                ) + 1;

        }


        return (

            `${prefix}-${String(
                nextNumber
            ).padStart(3, "0")}`

        );

    }


    /* =========================================
       GERAR ID DO PRODUTO
    ========================================= */

    function generateProductId() {

        const products =
            getProducts();


        if (
            products.length === 0
        ) {

            return "PROD-001";

        }


        const numbers =

            products
                .map(
                    product => {

                        const number =
                            parseInt(
                                String(
                                    product.id
                                )
                                .replace(
                                    "PROD-",
                                    ""
                                ),
                                10
                            );


                        return isNaN(number)
                            ? 0
                            : number;

                    }
                );


        const highestNumber =
            Math.max(...numbers);


        return (

            `PROD-${String(
                highestNumber + 1
            ).padStart(3, "0")}`

        );

    }


    /* =========================================
       LER IMAGEM
    ========================================= */

    function readImage(file) {

        return new Promise(
            (resolve, reject) => {

                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        resolve(
                            reader.result
                        );

                    };


                reader.onerror =
                    () => {

                        reject(
                            reader.error
                        );

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    /* =========================================
       RESETAR FORMULÁRIO
    ========================================= */

    function resetProductForm() {

        productForm?.reset();


        const sku =
            document.getElementById("sku");


        if (sku) {

            sku.value = "";

        }


        const status =
            document.getElementById("status");


        if (status) {

            status.value =
                "active";

        }


        if (imagePreview) {

            imagePreview.src = "";

            imagePreview.style.display =
                "none";

        }


        if (imageInput) {

            imageInput.value = "";

        }


        const modalTitle =
            document.querySelector(
                ".modal-header h2"
            );


        if (modalTitle) {

            modalTitle.textContent =
                "Novo Produto";

        }

    }


    /* =========================================
       FECHAR MODAL
    ========================================= */

    function closeProductModal() {

        productModal?.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    /* =========================================
       FORMATAR PREÇO
    ========================================= */

    function formatPrice(value) {

        return Number(
            value || 0
        ).toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }


    /* =========================================
       ESTOQUE
    ========================================= */

    function getStockClass(stock) {

        if (stock <= 0) {

            return "stock-danger";

        }


        if (stock <= 5) {

            return "stock-warning";

        }


        return "stock-ok";

    }


    /* =========================================
       PROTEÇÃO HTML
    ========================================= */

    function escapeHTML(value) {

        return String(
            value ?? ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    function escapeAttribute(value) {

        return escapeHTML(value);

    }

});