<template>
   
    <form>
        <div class="form-group">
            <label for="titulo">Título:</label>
            <input type="text" class="form-control" v-model="postagem.titulo" id="titulo" min="3" max="700" placeholder="Título" required>
        </div>
        <div class="form-group">
            <label for="postagem">Postagem</label>
            <textarea name="texto" id="postagem" v-model="postagem.publicacao" class="form-control" 
                        min="3" max="5000" placeholder="Digite o texto da sua postagem" required></textarea>
        </div>
        <button class="btn-enviar" @click.prevent="gravarPostagem">OK</button>
    </form>

   
</template>

<script>
export default {
    props:{
        postagem:{
            type: Object,
            default: ()=>({})
        }
    },
    methods:{
        gravarPostagem(){
            this.$emit('gravar', this.postagem);
        }
    }
}
</script>

<style scoped>
#postagem{
    height: 300px;
}
form{
    padding: 40px;
    background: #83a8a8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}
label{
    font-weight: bold;
}
label[for="imagem"]{
    background-color: #2ca563;
    border-radius: 5px; 
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin-bottom:10px;
    padding: 6px 20px;
    font-size: 15px;

}
input[type='file']{
    display: none;
    
}
form{
    width: 50%;
    margin: 0 auto;
}

.btn-enviar{
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: linear-gradient(to right, rgb(64, 174, 71), rgba(93, 167, 187, 0.78));  
    border:0;
    border-radius: 35px;
    font-weight: bold;

}
.btn-enviar:hover{
    background: linear-gradient(to left, rgb(19, 77, 19), rgb(93 167 187 / 78%));
    color: white;
}
@media (max-width: 600px){
    form{
        width: 90%;
    }
}

</style>