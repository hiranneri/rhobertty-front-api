<template>
<div>
  <main>
      <h1>Nova Postagem</h1>
      <Mensagem :mensagem="mensagem" :tipoMensagem="tipoMensagem"/>
      <form>
          <!-- Campo imagem será adicionado quando o projeto for sustentado pela AWS
          <div class="campos">
            <label for="imagem">Imagem:</label>
            <input type="file" name="imagem" @change="mostraCaminhoArquivo" id="imagem">
          </div>
          -->
            <div class="campos">
                <label for="titulo">Título</label><br>
                <input type="text" name="titulo" id="titulo" class="campo-dados" v-model="form.titulo" 
                min="3" max="350"    required>

            </div>

            <div class="campos">
                <label for="texto">Postagem</label>
                <textarea name="texto" id="campo-post"  class="campo-dados" 
                min="3" max="5000" v-model="form.publicacao" required></textarea>
            </div>

            <button class="btn-enviar" @click.prevent="postar">Postar</button>
      </form>
  </main>
</div>
</template>

<script>
import Mensagem from '@/components/shared/Mensagem.vue'
export default {
    name:'nova-postagem',
    data(){
        return {
            form: {
                titulo:'',
                publicacao: ''
            },
            mensagem:'',
            tipoMensagem:''
        }
    },
    methods:{
        mostraCaminhoArquivo(event){
            const file = event.target.files[0].name;
            console.log(file)
        },
        postar(){
            const usuarioLogado = this.$store.getters.usuarioLogado
            const idUsuario = usuarioLogado.id
            const body = this.form
            this.$http.post(`usuario/${idUsuario}/publicacoes`, body)
            .then(() => {
                this.tipoMensagem = 'sucesso'
                this.mensagem = 'Salvo com sucesso'                
            })
            .catch((err) => {
                this.mensagem = 'Não foi possível salvar. Tente novamente'
                this.tipoMensagem = 'erro'
                console.error(err.message)
                window.localStorage.setItem('publicacao-titulo', this.form.titulo)
                window.localStorage.setItem('publicacao-conteudo', this.form.publicacao)  
                window.localStorage.removeItem('tkn')              
                this.$router.push({name: 'login'})
                document.location.reload()
            })
        },
        created(){
            console.log(' n gravado')
            const dadosFormTitulo = window.localStorage.getItem('publicacao-titulo');
            const dadosFormPublicacao = window.localStorage.getItem('publicacao-titulo');
            if(dadosFormTitulo && dadosFormPublicacao){
                console.log('gravado')
                this.form.titulo =  dadosFormTitulo.titulo
                this.form.publicacao = dadosFormPublicacao.publicacao
            }
                
        }
    },
    components:{
        Mensagem
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