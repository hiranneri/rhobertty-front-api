<template>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ">
            <router-link class="nav-item nav-link active" to="/home">
                <img src="../../assets/img/home.png" alt="Inicio" class="icones-menu">
            </router-link>
            <router-link class="nav-item nav-link" to="/nova-postagem">
                <img src="../../assets/img/adicionar.png" alt="Nova Postagem" class="icones-menu">
            </router-link>
            
            <img src="../../assets/img/sair.png" @click="efetuarLogout" alt="Nova Postagem" class="icones-menu">
            
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        efetuarLogout(){
            this.$store.dispatch('deslogarUsuario')
            this.$router.push({name:'login'})
            window.location.reload()
        }
    }
}
</script>

<style>
.icones-menu{
    cursor: pointer;
}
</style>