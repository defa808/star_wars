<template>
  <div class="main">
    <h1>{{selectedCharacter.name}}</h1>
    <div class="wrapColumn mainColumn">
      <div class="form">
        <div>Height:</div>
        <div class="value">{{selectedCharacter.height}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>

      <div class="form">
        <div>Mass:</div>
        <div class="value">{{selectedCharacter.mass}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>
      <div class="form">
        <div>Hair Color:</div>
        <div class="value">{{selectedCharacter.hair_color}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>
      <div class="form">
        <div>Skip Color:</div>
        <div class="value">{{selectedCharacter.skin_color}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>

      <div class="form">
        <div>Eye Color:</div>
        <div class="value">{{selectedCharacter.eye_color}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>

      <div class="form">
        <div>Birth Year:</div>
        <div class="value">{{selectedCharacter.birth_year}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>
      <div class="form">
        <div>Gender:</div>
        <div class="value">{{selectedCharacter.gender}}</div>
      </div>
      <md-divider class="md-inset"></md-divider>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CharacterDetails",

  methods: {
    ...mapActions(["setSelectedCharacter", "loadCharacter"]),

    getId(url) {
      let partURL = url.split("/");
      let idFilm = partURL[partURL.length - 2];
      return idFilm;
    }
  },

  computed: {
    ...mapGetters(["characters", "selectedCharacter"])
  },

  mounted() {
    let selectedCharater = this.characters.find(
      x => x != undefined && this.getId(x.url) == this.$route.params.id
    );
    if (selectedCharater == undefined)
      this.loadCharacter(this.$route.params.id);
    else this.setSelectedCharacter(selectedCharater);
  }
};
</script>

<style lang="scss" >
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

.mainColumn {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  font-size: 18px;
  width: 400px;
  margin: 30px 0px;

  .md-divider {
    margin: 30px 0px;
  }
}
.md-divider {
  background-color: gray;
}

.form {
  display: flex;
  width: 400px;
}

.value {
  margin-left: 10px;
}
</style>
