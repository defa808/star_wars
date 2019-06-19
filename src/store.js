import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    minFilms: [],
    loading: false,
    films: [],
    characters: [],
    selectedFilms: [],
    selectedFilm: {},
    selectedCharacters: [],
    selectedCharacter: {},
    starships: [],
    selectedStarships: [],
    selectedStarship: {},
    endPointApi: 'https://swapi.co/api'
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loading = status
    },

    SET_MIN_FILMS (state, res) {
      state.minFilms = res
    },

    SET_FILM (state, res) {
      state.films.push(res)
      state.selectedFilm = res
    },

    SET_SELECTED_FILM (state, res) {
      state.selectedFilm = res
    },

    SET_FILMS (state, res) {
      state.films.push(res)
    },

    SET_SELECTED_FILMS (state, res) {
      state.selectedFilms.push(res)
    },

    RESET_SELECTED_FILMS (state, res) {
      state.selectedFilms = []
    },

    SET_CHARACTERS (state, res) {
      state.characters.push(res)
    },

    SET_SELECTED_CHARACTERS (state, res) {
      state.selectedCharacters.push(res)
    },

    RESET_SELECTED_CHARACTERS (state, res) {
      state.selectedCharacters = []
    },

    SET_STARSHIPS (state, res) {
      state.starships.push(res)
    },

    SET_SELECTED_STARSHIPS (state, res) {
      state.selectedStarships.push(res)
    },

    RESET_SELECTED_STARSHIPS (state, res) {
      state.selectedStarships = []
    },

    SET_SELECTED_CHARACTER (state, res) {
      state.selectedCharacter = res
    },

    SET_SELECTED_STARSHIP (state, res) {
      state.selectedStarship = res
    }
  },

  getters: {
    minFilms: state => state.minFilms,
    films: state => state.films,
    selectedFilms: state => state.selectedFilms,
    selectedFilm: state => state.selectedFilm,
    loading: state => state.loading,
    characters: state => state.characters,
    starships: state => state.starships,
    selectedCharacters: state => state.selectedCharacters,
    selectedCharacter: state => state.selectedCharacter,
    selectedStarships: state => state.selectedStarships,
    selectedStarship: state => state.selectedStarship
  },

  actions: {
    loadMinFilms (context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get(`${this.state.endPointApi}/films`).then(res => {
        context.commit('SET_MIN_FILMS', res.data.results)
        context.commit('SET_LOADING_STATUS', false)
      })
    },

    loadFilm (context, payload) {
      context.commit('SET_LOADING_STATUS', true);
      context.commit('RESET_SELECTED_CHARACTERS');
      context.commit('RESET_SELECTED_STARSHIPS');
      axios.get(`${this.state.endPointApi}/films/${payload}`).then(res => {
        context.commit('SET_LOADING_STATUS', false)

        for (let characterUrl of res.data.characters) {
          let item = this.state.characters.find(x => x.url == characterUrl)
          if (item == undefined) {
            axios.get(characterUrl).then(x => {
              context.commit('SET_CHARACTERS', x.data)
              context.commit('SET_SELECTED_CHARACTERS', x.data)
            })
          } else context.commit('SET_SELECTED_CHARACTERS', item)
        }

        for (let starshipUrl of res.data.starships) {
          let item = this.state.starships.find(x => x.url == starshipUrl)
          if (item == undefined) {
            axios.get(starshipUrl).then(x => {
              context.commit('SET_STARSHIPS', x.data)
              context.commit('SET_SELECTED_STARSHIPS', x.data)
            })
          } else context.commit('SET_SELECTED_STARSHIPS', item)
        }

        context.commit('SET_FILM', res.data)
      })
    },

    setSelectedFilm (context, payload) {
      context.commit('RESET_SELECTED_CHARACTERS');
      context.commit('RESET_SELECTED_STARSHIPS');
      context.commit('SET_SELECTED_FILM', payload);
      for (let characterUrl of this.state.selectedFilm.characters) {
        let item = this.state.characters.find(x => x.url == characterUrl)
        if (item == undefined) {
          axios.get(characterUrl).then(x => {
            context.commit('SET_CHARACTERS', x.data)
            context.commit('SET_SELECTED_CHARACTERS', x.data)
          })
        } else context.commit('SET_SELECTED_CHARACTERS', item)
      }

      for (let starshipUrl of this.state.selectedFilm.starships) {
        let item = this.state.starships.find(x => x.url == starshipUrl)
        if (item == undefined) {
          axios.get(starshipUrl).then(x => {
            context.commit('SET_STARSHIPS', x.data)
            context.commit('SET_SELECTED_STARSHIPS', x.data)
          })
        } else context.commit('SET_SELECTED_STARSHIPS', item)
      }

    },

    setSelectedCharacter (context, payload) {
      context.commit('SET_SELECTED_CHARACTER', payload)
    },

    setSelectedStarship (context, payload) {
      context.commit('RESET_SELECTED_CHARACTERS')
      context.commit('RESET_SELECTED_FILMS')
      context.commit('SET_SELECTED_STARSHIP', payload)

      for (let filmUrl of this.state.selectedStarship.films) {
        let item = this.state.films.find(x => x.url == filmUrl)
        if (item == undefined) {
          axios.get(filmUrl).then(x => {
            context.commit('SET_FILMS', x.data)
            context.commit('SET_SELECTED_FILMS', x.data)
          })
        } else context.commit('SET_SELECTED_FILMS', item)
      }

      for (let characterUrl of this.state.selectedStarship.pilots) {
        let item = this.state.characters.find(x => x.url == characterUrl)
        if (item == undefined) {
          axios.get(characterUrl).then(x => {
            context.commit('SET_CHARACTERS', x.data)
            context.commit('SET_SELECTED_CHARACTERS', x.data)
          })
        } else context.commit('SET_SELECTED_CHARACTERS', item)
      }
    },

    loadCharacter (context, payload) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get(`${this.state.endPointApi}/people/${payload}`).then(res => {
        context.commit('SET_CHARACTERS', res.data)
        context.commit('SET_SELECTED_CHARACTER', res.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    },

    loadStarship (context, payload) {
      context.commit('RESET_SELECTED_CHARACTERS')
      context.commit('RESET_SELECTED_FILMS')
      context.commit('SET_LOADING_STATUS', true)
      axios.get(`${this.state.endPointApi}/starships/${payload}`).then(res => {
        for (let filmUrl of res.data.films) {
          let item = this.state.films.find(x => x.url == filmUrl)
          if (item == undefined) {
            axios.get(filmUrl).then(x => {
              context.commit('SET_FILMS', x.data)
              context.commit('SET_SELECTED_FILMS', x.data)
            })
          } else context.commit('SET_SELECTED_FILMS', item)
        }

        for (let characterUrl of res.data.pilots) {
          let item = this.state.characters.find(x => x.url == characterUrl)
          if (item == undefined) {
            axios.get(characterUrl).then(x => {
              context.commit('SET_CHARACTERS', x.data)
              context.commit('SET_SELECTED_CHARACTERS', x.data)
            })
          } else context.commit('SET_SELECTED_CHARACTERS', item)
        }

        context.commit('SET_STARSHIPS', res.data)
        context.commit('SET_SELECTED_STARSHIP', res.data)
        context.commit('SET_LOADING_STATUS', false)
      })
    }
  }
})
