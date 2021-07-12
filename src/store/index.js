import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const state = {
    token: null,
    usuario: {},
    postagens: []
}

//usar process.env.KEY_VUEXPERSIST
const vuexLocalStorage = new VuexPersist({
    key: 'tkn',
    storage: window.localStorage,
})

const mutations = {
    DEFINIR_USUARIO_LOGADO(state, {token, usuario}){
        state.token = token
        state.usuario = usuario
    },
    DESLOGAR_USUARIO(state){
        state.token = null
        state.usuario = null
        state.postagens = null
    },
    DEFINIR_POSTAGENS(state, {postagens}){
        state.postagens = postagens
    },
    EXCLUIR_POSTAGEM(state, id){
        state.postagens =  state.postagens.filter(p => p.id != id)
    }
}

const actions = {
    efetuarLogin({commit}, usuario){
        return new Promise((resolve, reject) => {
            http.post('/login', usuario).then(response => {
                commit('DEFINIR_USUARIO_LOGADO', {
                    token: response.data.token,
                    usuario: response.data.usuario                    
                })
                resolve(response.data)
            })
            .catch(err=>{
                console.error(err.message)
                reject(err)
            })
        })
    },
    pesquisarPostagens({commit}, usuario){
        return new Promise((resolve, reject) => {
            http.get(`usuario/${usuario}/publicacoes`).then(response => {
                commit('DEFINIR_POSTAGENS', {
                    postagens : response.data.publicacoes                  
                })
                resolve(response.data)
            })
            .catch(err=>{
                console.error(err.message)
                reject(err)
            })
        })
    },
    atualizarPostagens({commit}, idPublicacao){
        commit('EXCLUIR_POSTAGEM', idPublicacao)
    },
    deslogarUsuario({commit}){
        commit('DESLOGAR_USUARIO')
    }
}

const getters = {
    isUsuarioLogado: state => Boolean(state.token),
    usuarioLogado: state => state.usuario,
    postagens : state => state.postagens
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins:[vuexLocalStorage.plugin]
})