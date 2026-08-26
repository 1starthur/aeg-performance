/* =========================================
   AEG PERFORMANCE
   STORAGE DE PRODUTOS
========================================= */


/* =========================================
   CHAVE DO LOCALSTORAGE
========================================= */

const PRODUCTS_STORAGE_KEY =
    "aeg_performance_products";


/* =========================================
   PEGAR TODOS OS PRODUTOS
========================================= */

function getProducts() {

    const products =
        localStorage.getItem(
            PRODUCTS_STORAGE_KEY
        );


    if (!products) {

        return [];

    }


    try {

        const parsedProducts =
            JSON.parse(products);


        if (!Array.isArray(parsedProducts)) {

            return [];

        }


        return parsedProducts;

    }

    catch (error) {

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

    }

    catch (error) {

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

    const products =
        getProducts();


    return products.find(
        product =>
            product.id === id
    ) || null;

}


/* =========================================
   ADICIONAR PRODUTO
========================================= */

function addProduct(product) {

    const products =
        getProducts();


    products.push(product);


    return saveProducts(
        products
    );

}


/* =========================================
   ATUALIZAR PRODUTO
========================================= */

function updateProduct(updatedProduct) {

    const products =
        getProducts();


    const index =
        products.findIndex(
            product =>
                product.id ===
                updatedProduct.id
        );


    if (index === -1) {

        return false;

    }


    products[index] =
        updatedProduct;


    return saveProducts(
        products
    );

}


/* =========================================
   EXCLUIR PRODUTO
========================================= */

function deleteProduct(id) {

    const products =
        getProducts();


    const filteredProducts =
        products.filter(
            product =>
                product.id !== id
        );


    /*
       Se nenhum produto foi removido,
       significa que o ID não existe.
    */

    if (
        filteredProducts.length ===
        products.length
    ) {

        return false;

    }


    return saveProducts(
        filteredProducts
    );

}


/* =========================================
   LIMPAR TODOS OS PRODUTOS
   USE SOMENTE PARA TESTES
========================================= */

function clearProducts() {

    localStorage.removeItem(
        PRODUCTS_STORAGE_KEY
    );

}


/* =========================================
   EXPORTAR FUNÇÕES
   DISPONÍVEIS GLOBALMENTE
========================================= */

window.getProducts =
    getProducts;

window.saveProducts =
    saveProducts;

window.getProductById =
    getProductById;

window.addProduct =
    addProduct;

window.updateProduct =
    updateProduct;

window.deleteProduct =
    deleteProduct;

window.clearProducts =
    clearProducts;