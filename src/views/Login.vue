<template>
<div class="corpo">
    <FormularioLogin/>

</div>
</template>

<script>
import FormularioLogin from '@/components/FormularioLogin.vue'
export default {
    name: 'login',
    components:{
        FormularioLogin
    }
}
</script>

<style scoped>
.corpo{
    overflow-y: hidden;
    height: 100vh;
    background-color: #a8c8b5;
}
</style>