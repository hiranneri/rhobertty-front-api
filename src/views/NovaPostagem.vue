<template>
  <main>
    <h1>Nova Postagem</h1>
    <Mensagem :mensagem="mensagem" :tipoMensagem="tipoMensagem"/>
    <FormCadastroAlteracao @gravar="gravar($event)"/>
  </main>

</template>

<script>
import Mensagem from '@/components/shared/Mensagem.vue'
import FormCadastroAlteracao from '@/components/shared/FormCadastroAlteracao.vue'
export default {
    name:'nova-postagem',
    data(){
        return {            
            mensagem:'',
            tipoMensagem:''
        }
    },
    methods:{
        gravar($event){
            if(this.validar($event)){
                const usuarioLogado = this.$store.getters.usuarioLogado
                const idUsuario = usuarioLogado.id
                const body = $event
                this.$http.post(`usuario/${idUsuario}/publicacoes`, body)
                .then(() => {
                    this.tipoMensagem = 'sucesso'
                    this.mensagem = 'Salvo com sucesso'                
                })
                .catch(() => {
                    this.mensagem = 'Não foi possível salvar. Tente novamente'
                    this.tipoMensagem = 'erro'
                    this.$router.push({name: 'login'})
                    document.location.reload()
                })
            }else{
                this.mensagem = 'Preenchimento Incorreto';
                this.tipoMensagem = 'erro'
                return;
            }
        },
        validar(form){
            console.log(form.titulo)
            const titulo = form.titulo;
            const publicacao = form.publicacao;
            if(titulo.length<3 && titulo>1000){
                return false;
            }
            if(publicacao.length<3 && publicacao.length>5000){
                return false;
            }
            return true
        }
    },
    components:{
        Mensagem,
        FormCadastroAlteracao
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
form{
    padding: 40px;
    background: #83a8a8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
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