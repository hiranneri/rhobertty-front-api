<template>
  <img src="../assets/img/excluir.png" alt="Excluir Postagem" class="icone-excluir" 
                @click="disparar">
</template>

<script>
export default {
    methods:{
        disparar(){
            this.$emit('botaoAtivado')
        }

    }
}
</script>

<style>

</style>