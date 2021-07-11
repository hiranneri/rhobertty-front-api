<template>
  <div id="app">
     <Menu/>
    <router-view class="componentes"/>
  </div>
</template>

<script>
import Menu from '@/components/shared/Menu.vue'
export default {
  components:{
    Menu
  }
}
</script>

<style>
#app{
  background-color: rgb(89, 155, 117);
}
.componentes{
  height: 100vh;
}
.mensagem{
    text-align: center;
    font-size: 20px;
}
</style>
