<template>
<div class="corpo">
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
import Mensagem from '@/components/shared/Mensagem.vue'
import Loader from '@/components/Loader.vue'
export default {
    name: 'login',
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
    components:{
        Mensagem,
        Loader
    }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body{
    background-color: #95a2957d;   
}
.corpo{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
main{
    margin: 0 auto;
    max-width: 300px;
    min-height: 40vh;
    padding: 2rem;
    background-color: rgb(93 167 187 / 78%);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
   
}
.loader{
    text-align: center;
    margin-bottom: 30px;
}
.img-login{
    width: 50%;
    height: 100%;
    position: relative;
    left: 20%;   
}

form{
    display: flex;
    flex-direction: column;
}
form .campos:first-child{
    margin-bottom: 1.5rem;
}
form .campos:last-child{
    font-size: 1.5rem;
}

.campos{
    position: relative;

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

@media (max-width: 600px){

    h2{
        width: 110%;
        height: 130px;
        margin: 0 auto;
    
    }
    .campos:first-child{
        margin-top: 20px;
    }
    .campos label{
        font-size: 20px;
    }
    .campos input{
        font-size: 1.5rem;
        height: 50px;
    }
    .btn-logar{
        height: 60px;
    }
}
</style>