var carrinho = [];
//salvar o carrinho no localstorage
$(function () {
    if (localStorage.carrrinho)
    {
        carrinho = JSON.parse(localStorage.carrinho);
        mostrarCarrinho()
    }
});
//funçao para adicionar o produto ao carrinho
function addToCart() {
    var preco = $("#produtos").val();
    var nome = $("#produtos option:selected").text();
    var qtd = $("#qtd").val();

    // atualizar quantidade no carrinho
    for (var i in carrinho) {
        if(carrinho[i].Produto == nome)
        {
            carrinho[i].Qtd = qtd;
            salvarCarrinho();
            mostrarCarrinho();
            return;
        }
    }
    // criar objeto do produto
    var item = { Produto: nome,  Preco: preco, Qtd: qtd }; 
    carrinho.push(item);
    salvarCarrinho();
    mostrarCarrinho();
}
//deletar item do carrinho
function deleteItem(index){
    carrinho.splice(index,1); 
    salvarCarrinho();
    mostrarCarrinho();
}

function salvarCarrinho() {
    if ( window.localStorage)
    {
        localStorage.cart = JSON.stringify(carrinho);
    }
}
//mostrar carrinho na pagina
function mostrarCarrinho() {
    if (carrinho.length == 0) {
        $("#carrinho").css("visibility", "hidden");
        return;
    }

    $("#carrinho").css("visibility", "visible");
    $("#carrinho1").empty();
    for (var i in carrinho) {
        var item = carrinho[i];
        var row = "<tr><td>" + item.Produto + "</td><td>" +
        "R$"+ item.Preco + "</td><td>" + item.Qtd + "</td><td>"
                      + "R$"+ item.Qtd * item.Preco +  "</td><td>"
                     + "<button onclick='deleteItem(" + i + ")'>Deletar</button></td></tr>";
        $("#carrinho1").append(row);
    }
}