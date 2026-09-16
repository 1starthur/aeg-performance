package aeg_perfomance_api.model;

public class Produto {

    private long id;
    private String nome;
    private double preco;
    private int estoque;

    public Produto(long id,String nome, double preco, int estoque){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    public long getId(){
        return id;
    }
    public String getNome(){
        return nome;
    }
    public double getPreco(){
        return preco;
    }

    public int getEstoque() {
        return estoque;
    }
}
