const produtos = [

{
    nome:"Filtro Esportivo Inbox",
    preco:"149,90",
    imagem:"img/produtos/filtro.png",
    categoria:"Motor"
},

{
    nome:"Pastilha de Freio Premium",
    preco:"219,90",
    imagem:"img/produtos/pastilha.png",
    categoria:"Freios"
},

{
    nome:"Amortecedor Premium",
    preco:"389,90",
    imagem:"img/produtos/amortecedor.png",
    categoria:"Suspensão"
},

{
    nome:"Óleo Sintético 5W30",
    preco:"59,90",
    imagem:"img/produtos/oleo.png",
    categoria:"Lubrificantes"
}

];

const grid = document.getElementById("products-grid");

produtos.forEach(produto =>{

grid.innerHTML += `

<div class="product-card">

<div class="product-image">

<img src="${produto.imagem}" alt="${produto.nome}">

</div>

<div class="product-info">

<div class="rating">

★★★★★

</div>

<h3>${produto.nome}</h3>

<p>${produto.categoria}</p>

<span class="price">

R$ ${produto.preco}

</span>

<button class="btn-primary">

Comprar

</button>

</div>

</div>

`;

});