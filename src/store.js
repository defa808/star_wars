import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    minFilms: [],
    loadMinFilms: false,
    loadSelectedFilm:false,
    films: [],
    selectedFilm: {},
    endPointApi: 'https://swapi.co/api'
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadMinFilms = status;
    },

    LOADING_FILM(state, status) {
      state.loadSelectedFilm = status;
    },

    SET_MIN_FILMS(state, res) {
      state.minFilms = res;
    },

    SET_FILM(state, res) {
      state.films.push(res);
      state.selectedFilm = res;
    },

    SET_SELECTED_FILM(state, res) {
      state.selectedFilm = res;
    }
  },

  getters: {
    minFilms: state => state.minFilms,
    films: state => state.films,
    selectedFilm: state => state.selectedFilm,
    loadSelectedFilm:state=> state.loadSelectedFilm,
  },

  actions: {
    loadMinFilms(context) {
      context.commit('SET_LOADING_STATUS', true);
      axios.get(`${this.state.endPointApi}/films`).then(res => {
        context.commit('SET_MIN_FILMS', res.data.results);
        context.commit('SET_LOADING_STATUS', false);
      });
    },
    loadFilm(context, payload) {
      context.commit('LOADING_FILM', false);
      axios.get(`${this.state.endPointApi}/films/${payload}`).then(res => {
        context.commit('SET_FILM', res.data);
        context.commit('LOADING_FILM', true);
      });
    },
    setSelectedFilm(context, payload){
      context.commit('SET_SELECTED_FILM', payload);
    }
  }
});
