<template>
  <div>
    <template v-if="!loading">
      <h1 class="title">{{selectedFilm.title}}</h1>
      <div class="main">
        <div class="wrapColumn">
          <h2>Characters</h2>
          <md-list class="md-triple-line">
            <template v-for="item in selectedCharacters">
              <router-link :to="{ path: '/characters/'+ getIdCharacter(item.url)}" :key="item.name">
                <md-list-item>
                  <div>{{item.name}}</div>
                </md-list-item>
              </router-link>
              <md-divider class="md-inset" :key="item.name + '1'"></md-divider>
            </template>
          </md-list>
        </div>
        <div class="wrapColumn mainColumn">
          <h2>Description</h2>
          <div class="description">{{selectedFilm.opening_crawl}}</div>
          <md-divider class="md-inset"></md-divider>

          <h2>Producer</h2>
          <div class="description">{{selectedFilm.producer}}</div>
          <md-divider class="md-inset"></md-divider>

          <h2>Created</h2>
          <div class="description">{{selectedFilm.created}}</div>
          <md-divider class="md-inset"></md-divider>

          <h2>Edited</h2>
          <div class="description">{{selectedFilm.edited}}</div>
        </div>
        <div class="wrapColumn">
          <h2>Starships</h2>
          <md-list class="md-triple-line">
            <template v-for="item in selectedStarships">
              <router-link :to="{ path: '/starships/'+ getIdCharacter(item.url)}" :key="item.name">
                <md-list-item>
                  <div>{{item.name}}</div>
                </md-list-item>
              </router-link>
              <md-divider class="md-inset" :key="item.name + '1'"></md-divider>
            </template>
          </md-list>
        </div>
      </div>
    </template>
  </div>
</template>
  

<script>
import { mapGetters, mapActions, mapState } from "vuex";

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
    ...mapGetters([
      "films",
      "selectedFilm",
      "loading",
      "selectedCharacters",
      "selectedStarships"
    ])
  },

  methods: {
    ...mapActions(["loadFilm", "setSelectedFilm"]),

    getIdCharacter(item) {
      let partURL = item.split("/");
      let idFilm = partURL[partURL.length - 2];
      return idFilm;
    },

    getCharacters: function() {
      return this.selectedCharacters;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
.md-divider {
  background-color: gray;
}
.md-list {
  overflow: auto;

  border: 1px solid gray;
}

.main {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
.wrapColumn {
  width: 400px;
  margin-right:50px;
}
.mainColumn {
  .md-divider {
    margin:30px 0px;
  }
}

.description {
  font-size: 18px;
}

.title {
  font-family: Star Jedi;
  color: #ff7f50;
}

::v-deep .md-list-item-content {
  min-height: 48px !important;
}

::v-deep .md-list-item:hover{
  background: #484848;
  border-radius: 5px;

}
</style>

