<template>
<section>
  <p :class="'alert ' + classificacao"  v-if="mensagem">{{mensagem}}</p>
</section>
</template>

<script>
export default {
    props: ['mensagem' ,'tipoMensagem'],
    computed:{
        classificacao(){
            if(this.tipoMensagem==='erro'){
               return 'alert-danger mensagem'
            }else{
              return 'alert-success mensagem'
            }
        }
    }
}
</script>

<style>
    p{
        margin-top: 10px;
        width: 30%;
        margin: 0 auto;
    }
</style>