package aeg_perfomance_api.controller;

import aeg_perfomance_api.model.Produto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProdutoController {

    @GetMapping("/produtos")
    public List<Produto> listarProdutos(){
        Produto produto1 = new Produto(
                1L,
                "Pastilha de freio",
                149.90,
                10
        );
        Produto produto2 = new Produto(
                2L,
                "Amortecedor",
                389.90,
                5
        );
        Produto produto3 = new Produto(
                3L,
                "Filtro de óleo",
                39.90,
                20
        );
        return List.of(produto1,produto2,produto3);
    }
}