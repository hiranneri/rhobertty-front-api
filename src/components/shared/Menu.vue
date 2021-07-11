<template>
<nav class="navbar navbar-expand-lg navbar-light menu">
    <img src="../../assets/img/logo.webp" alt="Logo Rhobertty" class="logo" >
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <MenuLogado v-if="isUsuarioLogado"/>
</nav>  
</template>

<script>
import { mapGetters } from 'vuex'
import MenuLogado from '@/components/shared/MenuLogado.vue'
export default {
    name: 'menu',
    methods:{
        logout(){
            this.$store.commit('DESLOGAR_USUARIO')
            this.$router.push({name:'login'})
        },
        
    },
    computed:{
        ...mapGetters(['isUsuarioLogado'])        
    },
    components:{
        MenuLogado
    }
}
</script>

<style>
    ul{
        list-style: none;
    }
    .menu{
        background-color:rgb(93 167 187 / 78%);
    }
    .logo{
        width: 150px;
        height: 70px;
    }
    .container-menu{
        float: right;
    }
    .icones-menu{
        width: 30px;
        height: 30px;
    }
    @media (max-width: 600px){
    
    .icones-menu{
        margin: 0 auto;
    }
    }
</style>