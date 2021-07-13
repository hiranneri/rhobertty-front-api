<template>
<div>
  <main>
      <h1>Editar Postagem</h1>
      <Mensagem :mensagem="mensagem" :tipoMensagem="tipoMensagem"/>
      <form action="post">
         <!-- 
          <div class="campos">
            <label for="imagem">Imagem:</label>
            <input type="file" name="imagem" @change="mostraCaminhoArquivo" id="imagem">

          </div>
          -->
            <div class="campos">
                <label for="titulo">Título</label>
                <input type="text" name="titulo" id="titulo" v-model="postagem.titulo" class="campo-dados" 
                    required>

            </div>

            <div class="campos">
                <label for="texto">Postagem</label>
                <textarea name="texto" id="campo-post" v-model="postagem.publicacao" class="campo-dados" required></textarea>

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
        mostraCaminhoArquivo(event){
            const file = event.target.files[0].name;
            console.log(file)
        },
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

form{
    margin: 0 auto;
    width: 50%;
    text-align: left;
    margin-top: 20px;
    background: #fcfcfc21; 
    padding: 30px;
    border-radius: 25px;
}

.campos{
    margin: 10px 0;
}
.campo-dados{
    width: 90%;
    height: 35px;
    font-size: 15px;
    padding: 10px;

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

#campo-post{
    height: 250px;
}

.btn-enviar{
    width: 90%;
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
        margin-top: 10px;
        margin-bottom: 40px;
        width: 80%;
    }
    #titulo{
        width: 240px;
    }
    #campo-post{
       
        height: 170px;
    }
}
</style>