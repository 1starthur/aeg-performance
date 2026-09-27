package aeg_perfomance_api.service;

import aeg_perfomance_api.model.Produto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProdutoService {

    private List<Produto> produtos = new ArrayList<>();

    public List<Produto> listarProdutos(){
        return produtos;
    }

    public Produto cadastrarProduto(Produto produto){
        produtos.add(produto);
        return produto;
    }

    public void excluirProduto (long id){
        produtos.removeIf(produto -> produto.getId() == id);
    }

    public Produto atualizarProduto(long id, Produto produto){

        for (int i = 0; i < produtos.size(); i++){
            if (produtos.get(i).getId() == id){
                produtos.set(i, produto);
                return produto;
            }
        }
        return null;
    }

}
