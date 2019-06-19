<template>
  <div>
    <h1>{{selectedStarship.name}}</h1>
    <div class="main">
      <div class="wrapColumn">
  <h2>In movie</h2>
        <md-list class="md-triple-line">
          <template v-for="item in selectedFilms">
            <router-link :to="{ path: '/film/'+ getId(item.url)}" :key="item.title">
              <md-list-item>
                <div>{{item.title}}</div>
              </md-list-item>
            </router-link>
            <md-divider class="md-inset" :key="item.title + '1'"></md-divider>
          </template>
        </md-list>
      </div>
      <div class="wrapColumn mainColumn">
        <div class="form">
          <div>Model:</div>
          <div class="value">{{selectedStarship.model}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Manufacturer:</div>
          <div class="value">{{selectedStarship.manufacturer}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Cost in creadis:</div>
          <div class="value">{{selectedStarship.cost_in_credits}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Consumables:</div>
          <div class="value">{{selectedStarship.consumables}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Hyperdrive Rating:</div>
          <div class="value">{{selectedStarship.hyperdrive_rating}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>MGLT:</div>
          <div class="value">{{selectedStarship.MGLT}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Starship class:</div>
          <div class="value">{{selectedStarship.starship_class}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Created:</div>
          <div class="value">{{selectedStarship.created}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
        <div class="form">
          <div>Edited:</div>
          <div class="value">{{selectedStarship.edited}}</div>
        </div>
        <md-divider class="md-inset"></md-divider>
      </div>
      <div class="wrapColumn">
        <h2>Pilots</h2>
        <md-list class="md-triple-line">
          <template v-for="item in selectedCharacters">
            <router-link :to="{ path: '/characters/'+ getId(item.url)}" :key="item.name">
              <md-list-item>
                <div>{{item.name}}</div>
              </md-list-item>
            </router-link>
            <md-divider class="md-inset" :key="item.name + '1'"></md-divider>
          </template>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CharacterDetails",

  methods: {
    ...mapActions(["setSelectedStarship", "loadStarship"]),

    getId(url) {
      let partURL = url.split("/");
      let idFilm = partURL[partURL.length - 2];
      return idFilm;
    }
  },

  computed: {
    ...mapGetters(["starships", "selectedStarship", "selectedCharacters", "selectedFilms"])
  },

  mounted() {
    let selectedStarship = this.starships.find(
      x => x != undefined && this.getId(x.url) == this.$route.params.id
    );
    if (selectedStarship == undefined) this.loadStarship(this.$route.params.id);
    else this.setSelectedStarship(selectedStarship);
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
}

.wrapColumn {
  width: 400px;
  display: flex;
  flex-flow: column nowrap;
  font-size: 18px;
  margin-right: 50px;
}

.mainColumn {
  width: 400px;
  margin-top: 30px;

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
.md-list {
  overflow: auto;
  border: 1px solid gray;
}

::v-deep .md-list-item-content {
  min-height: 48px !important;
}

::v-deep .md-list-item:hover{
  background: #484848;
  border-radius: 5px;
}

</style>
