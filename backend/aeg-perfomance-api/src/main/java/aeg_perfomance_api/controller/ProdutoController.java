package aeg_perfomance_api.controller;

import aeg_perfomance_api.model.Produto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProdutoController {

    private List<Produto> produtos = new ArrayList<>();

    @GetMapping("/produtos")
    public List<Produto> listarProdutos(){
        return produtos;

    }
    @PostMapping("/produtos")
    public Produto cadastrarProduto(@RequestBody Produto produto){
        produtos.add(produto);
        return produto;
    }
    @DeleteMapping("/produtos/{id}")
    public void excluirProduto(@PathVariable Long id){

        produtos.removeIf(produto -> produto.getId() == id);
    }
    @PutMapping("/produtos/{id}")
    public Produto atualizarProduto(@PathVariable Long id, @RequestBody Produto produto){

        for (int i = 0; i< produtos.size();i++){
            if (produtos.get(i).getId() == id){
                produtos.set(i, produto);
                return produto;
            }

        }
        return null;
    }
}