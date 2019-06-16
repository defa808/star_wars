<template>
  <div>
    <h1>IT's work</h1>
    <template v-if="loadSelectedFilm">
      <h3>{{selectedFilm.title}}</h3>
      <div>Characters</div>
      <template v-for="item in selectedFilm.characters">
        <router-link
          :to="{ path: '/characters/'+ getIdCharacter(item)}"
          :key="getIdCharacter(item)"
        >{{getIdCharacter(item)}}</router-link> 
        <br />
      </template>
    </template>
  </div>
</template>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ItemDetails",

  created() {
    let idUrl = this.$route.params.id;
    let urlCorrectReg = new RegExp(
      `(?:https?:\/\/)?[^\/:]+\/.*?\/${idUrl}\/$`,
      "g"
    );
    let films = this.films.filter(x => x.url.match(urlCorrectReg));
    if (films.length == 0) this.loadFilm(idUrl);
    else this.setSelectedFilm(films[0]);
  },
  computed: {
    ...mapGetters(["films", "selectedFilm", "loadSelectedFilm"])
  },

  methods: {
    ...mapActions(["loadFilm", "setSelectedFilm"]),

    getIdCharacter(item) {
      let partURL = item.split("/");
      let idFilm = partURL[partURL.length - 2];
      return idFilm;
    }
  }
};
</script>

<style>
</style>
