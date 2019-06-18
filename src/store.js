import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    minFilms: [],
    loading: false,
    films: [],
    characters: [],
    selectedFilm: {},
    selectedCharacters: [],
    selectedCharacter:{},
    starships:[],
    selectedStarships:[],
    selectedStarship:{},
    endPointApi: 'https://swapi.co/api'
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loading = status;
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
    },

    SET_CHARACTERS(state, res) {
      state.characters.push(res);
    },

    SET_SELECTED_CHARACTERS(state, res) {
      state.selectedCharacters.push(res);
    },

    RESET_SELECTED_CHARACTERS(state, res) {
      state.selectedCharacters = [];
    },

    SET_STARSHiPS(state, res) {
      state.starships.push(res);
    },

    SET_SELECTED_STARSHiPS(state, res) {
      state.selectedStarships.push(res);
    },

    RESET_SELECTED_STARSHiPS(state, res) {
      state.selectedStarships = [];
    },
    
    SET_SELECTED_CHARACTER(state, res) {
      state.selectedCharacter = res;
    },

  },

  getters: {
    minFilms: state => state.minFilms,
    films: state => state.films,
    selectedFilm: state => state.selectedFilm,
    loading: state => state.loading,
    characters: state => state.characters,
    selectedCharacters: state => state.selectedCharacters,
    selectedCharacter:state=>state.selectedCharacter,
    selectedStarships: state => state.selectedStarships,
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
      context.commit('SET_LOADING_STATUS', true);
      context.commit('RESET_SELECTED_CHARACTERS');
      context.commit('RESET_SELECTED_STARSHiPS');
      axios.get(`${this.state.endPointApi}/films/${payload}`).then(res => {
        context.commit('SET_LOADING_STATUS', false);

        for (let characterUrl of res.data.characters) {
          let item = this.state.characters.find(x => x.url == characterUrl);
          if (item == undefined)
            axios.get(characterUrl).then(x => {
              context.commit('SET_CHARACTERS', x.data);
              context.commit('SET_SELECTED_CHARACTERS', x.data);
            });
          else context.commit('SET_SELECTED_CHARACTERS', item);
        }

        for (let characterUrl of res.data.starships) {
          let item = this.state.starships.find(x => x.url == characterUrl);
          if (item == undefined)
            axios.get(characterUrl).then(x => {
              context.commit('SET_STARSHiPS', x.data);
              context.commit('SET_SELECTED_STARSHiPS', x.data);
            });
          else context.commit('SET_SELECTED_STARSHiPS', item);
        }

        context.commit('SET_FILM', res.data);
      });
    },

    setSelectedFilm(context, payload) {
      context.commit('SET_SELECTED_FILM', payload);
    },

    setSelectedCharacter(context, payload) {
      context.commit('SET_SELECTED_CHARACTER', payload);
    },

    loadCharacter(context,  payload){
      debugger;
      context.commit('SET_LOADING_STATUS', true);
      axios.get(`${this.state.endPointApi}/people/${payload}`).then(res => {
        context.commit('SET_CHARACTERS', res.data);
        context.commit('SET_SELECTED_CHARACTER', res.data);
        context.commit('SET_LOADING_STATUS', false);
      });
    }

  }
});
