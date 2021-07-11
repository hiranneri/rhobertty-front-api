<template>
    <section>
        <main>
            <h1>Publicações</h1><br>
            <p v-if="mensagem">{{mensagem}}</p>
            <router-link v-if="mensagem" class="nav-item nav-link" to="/nova-postagem">
                <img src="@/assets/img/adicionar.png" alt="Nova Postagem" class="icones-menu">
            </router-link>
            
            <ul>
                <ItemPost v-for="post in postagens" :key="post.titulo" :post="post" 
                    @excluir="atualizarLista(post)" class="items-post"/>
            </ul>
        </main>
       
    </section>

</template>

<script>
import ItemPost from '@/components/ItemPost.vue'
export default {
    name: 'dashboard',
    data(){
        return {
            postagens:[],
            mensagem: '',
            idUsuario:0
        }
    },
    components:{
        ItemPost
    },
    mounted(){
        const usuarioLogado = this.$store.getters.usuarioLogado
        const idUsuario = usuarioLogado.id
        this.$store.dispatch('pesquisarPostagens', idUsuario).then(()=>{
            const postagensRetornadas = this.$store.state.postagens
            if(postagensRetornadas.length>0){
                this.postagens = postagensRetornadas
            } 
            
        }).catch((err)=>{
            console.error(err.message)
            if(err.request.status>400 && err.request.status<499){
                this.$router.push({name: 'login'})

            }else{
                this.mensagem = 'Não foram localizados as suas publicações. Realize uma nova no botão abaixo'

            }
        })

    },
    methods:{
        atualizarLista(post){
           let indice = this.postagens.indexOf(post);
           this.postagens.splice(indice,1)           
        }
    }


}
</script>

<style>
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    background-color: rgb(129, 152, 129);

}
h1{
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 40px;
    font-size: 3.5rem;
    margin-top: 50px;

}
main{
    margin-top: 20px;
}
.items-post{
    display: inline-block;
}

</style>