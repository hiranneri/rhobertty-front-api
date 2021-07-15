<template>
<div>
     <main>
            <Loader v-if="loading" class="loader"/>
        <h2>
            <a href="https://rhoberttyvue.vercel.app/" target="_blank">
                <img src="../assets/img/logo.webp" alt="Logo" class="img-login">
            </a>
        </h2>
        <form action="post"> 
            <Mensagem :mensagem="mensagem" :tipoMensagem="tipoMensagem"/>           
            <div class="campos">
                <label for="">Email:</label>
                <input type="email" name="usuario" v-model="form.email" required>
            </div>

            <div class="campos">
                <label for="">Senha:</label><br>
                <input type="password" name="senha" v-model="form.senha" required>               
            </div>

            <button @click.prevent="acessar" type="submit"
                class="btn-logar">
                Acessar
            </button>
        </form>
    
    </main>
</div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import Mensagem from '@/components/shared/Mensagem.vue'
export default {
    components:{
        Loader,
        Mensagem
    },
    data(){
        return {
            form:{
                email:'',
                senha:'',
            },
            mensagem:'',
            tipoMensagem:'',
            loading: false
        }
    },
    methods:{
        acessar(){
            this.loading = true
           this.$store.dispatch('efetuarLogin', this.form).then(()=> {
               this.$router.push({name: 'dashboard'})
               this.loading = false
           }).catch((err)=>{
               this.loading = false
               this.tipoMensagem = 'erro'
               if(err.request.status>400 && err.request.status<499){
                   this.mensagem = 'Email e/ou senha inválidos'
               }else{
                   this.mensagem = 'Ocorreu um erro. Tente novamente mais tarde'
               }
           })
        },
      
    },
}
</script>

<style scoped>
main{
    background-color: rgb(93 167 187 / 78%);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 5% auto;
    max-width: 300px; 
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem ;
   
}
.img-login{
    width: 50%;
    height: 100%;
    position: relative;
    left: 20%;  
    margin-top: 10px; 
}
.loader{
    text-align: center;
    margin-bottom: 15px;
    margin-top: 0;
}
form{
    display: flex;
    flex-direction: column;
}
label{
    margin-top: 10px;
}
form .campos:first-child{
    margin-bottom: 1.5rem;
}
form .campos:last-child{
    font-size: 1.5rem;
}
.campos input{
    outline: none;
    color: rgba(0, 0, 0, 0.7);
    border:none;
    height: 45px;
    border-radius: 10px;
    width: 100%;
    margin-top: 10px;
    padding-left: 15px;

}

.btn-logar{
    margin-top: 2rem;
    padding: 0.4rem;
    height: 40px;
    background: #4c4e4f7d;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    border-radius: 4px;
}
.btn-logar:hover{
    letter-spacing: 0.5px;
    color: white;
}

</style>