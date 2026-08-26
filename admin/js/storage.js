/* =========================================
   AEG PERFORMANCE
   STORAGE DE PRODUTOS
========================================= */


/* =========================================
   CHAVE DO LOCAL STORAGE
========================================= */

const PRODUCTS_STORAGE_KEY = "aeg_performance_products";


/* =========================================
   BUSCAR TODOS OS PRODUTOS
========================================= */

function getProducts() {

    const products = localStorage.getItem(PRODUCTS_STORAGE_KEY);

    if (!products) {

        return [];

    }

    try {

        return JSON.parse(products);

    } catch (error) {

        console.error(
            "Erro ao carregar produtos:",
            error
        );

        return [];

    }

}


/* =========================================
   SALVAR TODOS OS PRODUTOS
========================================= */

function saveProducts(products) {

    try {

        localStorage.setItem(
            PRODUCTS_STORAGE_KEY,
            JSON.stringify(products)
        );

        return true;

    } catch (error) {

        console.error(
            "Erro ao salvar produtos:",
            error
        );

        return false;

    }

}


/* =========================================
   BUSCAR PRODUTO PELO ID
========================================= */

function getProductById(id) {

    const products = getProducts();

    return products.find(
        product => product.id === id
    );

}


/* =========================================
   ADICIONAR PRODUTO
========================================= */

function addProduct(product) {

    const products = getProducts();

    products.push(product);

    return saveProducts(products);

}


/* =========================================
   ATUALIZAR PRODUTO
========================================= */

function updateProduct(updatedProduct) {

    const products = getProducts();

    const index = products.findIndex(
        product => product.id === updatedProduct.id
    );

    if (index === -1) {

        return false;

    }

    products[index] = updatedProduct;

    return saveProducts(products);

}


/* =========================================
   EXCLUIR PRODUTO
========================================= */

function deleteProduct(id) {

    const products = getProducts();

    const filteredProducts = products.filter(
        product => product.id !== id
    );

    if (filteredProducts.length === products.length) {

        return false;

    }

    return saveProducts(filteredProducts);

}


/* =========================================
   GERAR ID
========================================= */

function generateProductId() {

    const products = getProducts();

    if (products.length === 0) {

        return "PROD-001";

    }

    const numbers = products.map(product => {

        const number = parseInt(
            String(product.id).replace("PROD-", ""),
            10
        );

        return isNaN(number) ? 0 : number;

    });

    const highestNumber = Math.max(...numbers);

    const nextNumber = highestNumber + 1;

    return `PROD-${String(nextNumber).padStart(3, "0")}`;

}


/* =========================================
   CONTAR PRODUTOS
========================================= */

function getProductCount() {

    return getProducts().length;

}


/* =========================================
   LIMPAR TODOS OS PRODUTOS
========================================= */

function clearProducts() {

    localStorage.removeItem(
        PRODUCTS_STORAGE_KEY
    );

}