<template>
        <nav class="navegacao">
            <button @click="toogleMenu"  @touchstart="toogleMenu" class="botao-mobile">Menu
                <span class="icone-hamburger"></span>
            </button>

            <ul class="menu">
                <li>
                    <div @click="acessarHome" class="item-menu">
                        <img src="../../assets/img/home.png" alt="Inicio" id="logo" class="icone-menu">
                        <p class="legenda-icone">Home</p>                  
                    </div>
                </li>
                <li> 
                    <div @click="acessarNovaPostagem" class="item-menu">
                        <img src="../../assets/img/adicionar.png" alt="Inicio" id="logo" class="icone-menu">
                        <p class="legenda-icone">Nova Postagem</p>                  
                    </div>
                </li>
                <li>
                    <img src="../../assets/img/sair.png" alt="Inicio" id="sair" class="icone-menu" @click="efetuarLogout">
                    <p class="legenda-icone">Sair</p>
                </li>
            </ul>
        </nav> 
</template>

<script>
export default {
    methods:{
        fecharMenu(){
            let menuNav = document.querySelector('.navegacao');
            menuNav.classList.remove('active');
        },
        efetuarLogout(){
            this.$store.dispatch('deslogarUsuario')
            this.$router.push({name:'login'})
            window.location.reload()
        },
        toogleMenu(event){
            if(event.type==='touchstart'){
                event.preventDefault();
            }
            let menuNav = document.querySelector('.navegacao');
            menuNav.classList.toggle('active')
        },
        acessarHome(){
            this.fecharMenu();
            this.$router.push({name: 'dashboard'})
        },
        acessarNovaPostagem(){
            this.fecharMenu();
            this.$router.push({name: 'nova-postagem'})
        }
    }
}
</script>

<style> 
    .botao-mobile{
        display: none;
    }
    .menu{
        list-style: none;
        display: flex;
        gap: .8rem;
    }
    .icone-menu{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .item-menu{
        display: block;
        padding: .5rem;
    }
    .legenda-icone{
        display: none;
    }
    #sair{
        margin-top: 10px;
        cursor: pointer;
    }
    @media (max-width: 600px){
        .botao-mobile{
            display: flex;
            padding: .5rem .1rem;
            font-size: 1rem;
            border:none;
            background: none;
            cursor: pointer;
            gap: .5rem;
            color: black
        }
        .icone-hamburger{
            color: black;
            border-top: 2px solid;
            width: 20px;
        }
        .menu{
            display: block;
            position: absolute;
            width: 100%;
            top: 100px;
            right: 0;
            background: rgb(89, 155, 117);
            height: 680px;
            z-index: 1000;
            transition: .3s;
            visibility: hidden;
            overflow-y: hidden;
        }
        .navegacao.active .menu{ 
            height: 70vh;
            visibility: visible;
        }
        .item-menu{
            padding: 1rem 0;
            margin-left: 0 1rem;
            
        }
        .icone-hamburger::after, .icone-hamburger::before{
            content: '';
            display: block;
            width: 20px;
            height: 2px;
            margin-top: 5px;
            background: currentColor;
            transition: .3s;
            position: relative;
        }
        .navegacao.active .icone-hamburger{
            border-top-color: transparent;   
        }
        nav.active .icone-hamburger::before{
            transform: rotate(135deg);
        }
        nav.active .icone-hamburger::after{
            transform: rotate(-135deg);
            top: -7px;
        }
        li{
            margin-bottom: 40px;
        }
        .legenda-icone{
            display: inline;
            color: white;            
            margin-left: 15px;
            cursor: pointer;
        }
        .icone-menu{
            cursor: pointer;
        }
    }
</style>