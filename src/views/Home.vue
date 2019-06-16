<template>
  <div class="home">
    <ItemList/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import ItemList from "@/components/main-page/ItemList.vue";

export default {
  name: "home",
  components: {
    ItemList
  },

  computed: {
    ...mapGetters(["minFilms"])
  },

  methods: {
    ...mapActions(["loadMinFilms"])
  },

  created() {
    if (this.minFilms.length == 0) this.loadMinFilms();
  }
};
</script>
