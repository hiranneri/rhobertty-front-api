<template>
    <section>
        <main>
            <h1>Publicações</h1><br>
            <p v-if="mensagem">{{mensagem}}</p>
            <router-link v-if="mensagem" class="nav-item nav-link" to="/nova-postagem">
                <img src="@/assets/img/adicionar.png" alt="Nova Postagem" class="icones-menu">
            </router-link>
            
            <Loader v-if="loading" class="loader" />

             <div class="container-posts">
                
                <ItemPost v-for="post in postagens" :key="post.titulo" :post="post" 
                    @excluir="atualizarLista(post)"/>
                
            </div>
             
        </main>
       
    </section>

</template>

<script>
import ItemPost from '@/components/ItemPost.vue'
import Loader from '@/components/Loader.vue'
export default {
    name: 'dashboard',
    data(){
        return {
            postagens:[],
            mensagem: '',
            idUsuario:0,
            loading:true
        }
    },
    components:{
        ItemPost,
        Loader
    },
    mounted(){
        const usuarioLogado = this.$store.getters.usuarioLogado
        const idUsuario = usuarioLogado.id
        this.$store.dispatch('pesquisarPostagens', idUsuario).then(()=>{
            const postagensRetornadas = this.$store.state.postagens
            this.loading = false
            if(postagensRetornadas.length>0){
                this.postagens = postagensRetornadas
            } 
            
        }).catch((err)=>{
            this.loading = false
            if(err.request.status>400 && err.request.status<499){
                localStorage.clear()
                this.$router.push({name: 'login'})
                location.reload()

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

<style scoped>
section{
    background-color: rgb(89, 155, 117);
}
h1{
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 40px;
}

.loader{
    text-align: center;
}
.container-posts{
    display: grid;
    margin-left: 8%;
    grid-template-columns: 350px 350px 350px;
    text-align: center;
   
}
@media (max-width: 600px){
    .container-posts{
        margin-left: 5px;
        grid-template-columns: 310px 310px 310px;

    }
}

</style>