<template>
  <div id="app">
     <Menu/>
    <router-view/>
   
  </div>
</template>

<script>
import Menu from '@/components/shared/Menu.vue'
export default {
  components:{
    Menu,
    
  }
}
</script>

<style>
#app{

  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
}
.mensagem{
    text-align: center;
    font-size: 20px;
}
</style>
