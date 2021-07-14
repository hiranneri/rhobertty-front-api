<template>
<div>
  <main>
      <h1>Editar Postagem</h1>
      <Mensagem :mensagem="mensagem" :tipoMensagem="tipoMensagem"/>
       <form>
            <div class="form-group">
                <label for="titulo">Título: </label>
                <input type="text" class="form-control" id="titulo" min="3" max="700" v-model="postagem.titulo" placeholder="Título" required>
            </div>
            <div class="form-group">
                <label for="postagem">Postagem</label>
                <textarea name="texto" id="postagem"  class="form-control" 
                            min="3" max="5000" v-model="postagem.publicacao" placeholder="Digite o texto da sua postagem" required></textarea>
            </div>
            <button class="btn-enviar" @click.prevent="editarPostagem">Editar</button>
        </form>
  </main>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Mensagem from '@/components/shared/Mensagem.vue'
export default {
   /* props:['post'],*/
    name:'editar-postagem',
    data(){
        return {
            tipoMensagem:'',
            mensagem:'',
        }
    },
    methods:{
        editarPostagem(){
            const usuarioLogado = this.$store.getters.usuarioLogado
            const idUsuario = usuarioLogado.id
            const idPublicacao = this.$route.params.id
            this.$http.put(`usuario/${idUsuario}/publicacoes/${idPublicacao}`, this.postagem)
                .then(() => {
                    this.tipoMensagem = 'sucesso'
                    this.mensagem = 'Salvo com sucesso'                
                })
                .catch(() => {
                    localStorage.clear()
                    this.$router.push({name: 'login'})
                    location.reload()
                })
        }
    },
    
    computed:{
        ...mapState(['postagens']),
        postagem(){
            return this.postagens.find(post => post.id === this.$route.params.id )
        }
    },
    components:{
        Mensagem
    },
    mounted(){
        const dadosForm = window.localStorage.getItem('dados');
        if(dadosForm){
            this.postagem.titulo =  dadosForm.form.titulo
            this.postagem.publicacao = dadosForm.form.publicacao
        }
    }
}
</script>

<style scoped>
main{
    background-color: rgb(89, 155, 117);
    height: 100vh;
}
h1{
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
}
section{   
    border-radius: 25px;
    background-color: rgba(23, 207, 143, 0.23);
    width: 50%;
    margin: 0 auto;   
}
#postagem{
    height: 300px;
}

label{
    font-weight: bold;
}
label[for="imagem"]{
    background-color: #2ca563;
    border-radius: 5px; 
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin-bottom:10px;
    padding: 6px 20px;
    font-size: 15px;

}
input[type='file']{
    display: none;
    
}
form{
    width: 50%;
    margin: 0 auto;
}

.btn-enviar{
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: linear-gradient(to right, rgb(64, 174, 71), rgba(93, 167, 187, 0.78));  
    border:0;
    border-radius: 35px;
    font-weight: bold;

}
.btn-enviar:hover{
    background: linear-gradient(to left, rgb(19, 77, 19), rgb(93 167 187 / 78%));
    color: white;
}
@media (max-width: 600px){
    form{
        width: 90%;
    }
}

</style>