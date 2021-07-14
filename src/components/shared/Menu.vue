<template>
    <header id="section">
       <router-link to="/" id="logoEscriba"> 
            <img src="../../assets/img/logo.webp" alt="Logotipo Escriba" id="logo" >
        </router-link>
       <Menu v-if="isUsuarioLogado"/>

    </header>
 
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from '@/components/shared/MenuLogado.vue'
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
        Menu
    }
}
</script>

<style scoped>
    #logo{
        width: 100px;
        height: 50px;
    }
 #section{
        box-sizing: border-box;
        display: flex;
        background-color: rgba(83, 141, 157, 0.78);
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        font-weight: bold;
        align-items: center;
        height: 100px;
        padding: 1rem;
        justify-content: space-between;
        
    }

</style>