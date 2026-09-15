package aeg_perfomance_api.controller;

import aeg_perfomance_api.model.Produto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProdutoController {

    @GetMapping("/produtos")
    public Produto listarProdutos(){
        Produto produto = new Produto();

        return produto;


    }
}