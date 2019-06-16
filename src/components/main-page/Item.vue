<template>
  <div class="column">
    <div>
      <router-link
        :to="{ path: '/film/'+ this.getIdFilm, params:{filmId:data.episode_id}}"
      >{{data.title}}</router-link>
    </div>
  </div>
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

<style>
</style>
