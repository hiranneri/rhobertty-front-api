<template>
<div>
  <main>
    <h1>Editar Postagem</h1>
    <Mensagem :mensagem="mensagem" :tipoMensagem="tipoMensagem"/>
    <FormCadastroAlteracao :postagem="postagem" @gravar="gravar"/>
  </main>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Mensagem from '@/components/shared/Mensagem.vue'
import FormCadastroAlteracao from '@/components/shared/FormCadastroAlteracao.vue'
export default {
    name:'editar-postagem',
    data(){
        return {
            tipoMensagem:'',
            mensagem:'',
        }
    },
    methods:{
        gravar(){
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
        },

    },
    
    computed:{
        ...mapState(['postagens']),
        postagem(){
            return this.postagens.find(post => post.id === this.$route.params.id )
        }
    },
    components:{
        Mensagem,
        FormCadastroAlteracao
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

</style>