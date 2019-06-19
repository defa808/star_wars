<template>
  <router-link
    :to="{ path: '/film/'+ this.getIdFilm, params:{filmId:data.episode_id}}"
    class="note"
  >
    <md-card class="md-accent" md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{data.title}}</div>
          <div class="md-subhead">{{data.release_date}}</div>
        </md-card-header>

        <md-card-content>{{data.opening_crawl}}</md-card-content>

        <md-card-actions>
          <!-- <md-button>Action</md-button> -->
        </md-card-actions>
      </md-ripple>
    </md-card>
  </router-link>
</template>

<script>
export default {
  name: "Item",
  props: ["data"],

  computed: {
    getIdFilm() {
      let partURL = this.data.url.split("/");
      let idFilm = partURL[partURL.length - 2];
      return idFilm;
    }
  }
};
</script>
<style lang="scss" >
.columnTest {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}

.note {
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
}
.md-title {
  font-family: Star Jedi;
  color: #ff7f50;
}
.md-subhead {
  margin-top: 10px !important;
  font-family: Star Jedi;
  color: white !important;
}

::v-deep .md-card {
  &:hover {
    background: #252525;
  }
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  border-radius: 10px;
  // background: black;
  // box-shadow: 0 3px 1px -2px rgba(255, 166, 0, 0.2),
  //   0 2px 2px 0 rgba(255, 166, 0, 0.14), 0 0px 0px 0 rgba(255, 166, 0, 0.12);
}

::v-deep .md-card.md-with-hover:hover {
  // box-shadow: 0 5px 5px -3px rgba(255, 166, 0, 0.2),
  //   0 8px 10px 1px rgba(255, 166, 0, 0.14),
  //   0 3px 14px 2px rgba(255, 166, 0, 0.12);
}
</style>