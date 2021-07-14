<template>
    <div class="item-post">
        <div class="container-imagem">
            <img src="../assets/img/logo.webp" alt="Foto da Publicação" class="imagem-post">
            <BotaoExcluir @click="excluir" @botaoAtivado="excluir(post)"/>
            <router-link :to="{ name:'editar-postagem', params:{id:post.id}}" :post="post">
                <img src="../assets/img/editar.png" alt="Editar Postagem" class="icone-editar">
            </router-link>
        </div>
        <p class="titulo-publicacao">{{post.titulo}}</p> 
        <p class="descricao-post"> {{ publicacaoLimitada }}</p>

        <p class="data-publicacao">23, Maio, 2021</p>
    </div>
</template>

<script>
import BotaoExcluir from '@/components/BotaoExcluir.vue'
export default {
    props:['post'],
    data(){
        return {
            postagem: this.post
        }
    },
    methods:{
        
        excluir(){          
         
            const usuarioLogado = this.$store.getters.usuarioLogado
            const idUsuario = usuarioLogado.id
            const idPublicacao = this.postagem.id

            let confirmacao = confirm(`Deseja realmente excluir essa postagem ${this.postagem.titulo}`);
            if(confirmacao){

                this.$http.delete(`usuario/${idUsuario}/publicacoes/${idPublicacao}`)
                .then(() => {
                    alert('Excluído com sucesso')
                    this.$emit('excluir', this.postagem)                            
                })
                .catch((err) => {
                    alert('Não foi possível excluir. Tente novamente');
                })
               
            }
            
          
        },

    },
    computed:{
        publicacaoLimitada(){
           return this.postagem.publicacao.substr(0,95) + '...';

        }
    },
    components:{
        BotaoExcluir
    }


}
</script>

<style>
.item-post{
    border: 3px solid black;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    margin: 10px;

}
.item-post:hover{
    border: 4px solid white;
}

.imagem-post{
    width: 185px;
    height: 150px;
    min-width: 185px;
}
.icone-editar{
    margin-top: 15px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    float: right;
}
.icone-excluir{
     margin-top: 15px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    float: right;
}
main ul {
    display: block;
}

a{
    text-decoration: none;
    color: black;
}
.titulo-publicacao{
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
    margin-left: 20px;
    width: 100%;
}
.descricao-post{
    width: 80%;
    text-align: left;
}
.data-publicacao{
    font-size: 10px;
    text-align: right;
}
@media (max-width: 600px){
    h1{
        font-size: 40px;
        -webkit-text-stroke-color: 0;
    }
    .icone-editar{
       top: 230px;
       right: 5px;
       width: 30px;
    }
    .icone-excluir{
        top: 320px;
        right: 5px;
        width: 30px;
        height: 40px;
    }

}
</style>