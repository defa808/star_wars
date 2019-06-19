<template>
  <div class="notes-grid" ref="grid">
    <Item v-for="item in minFilms" :data="item" :key="item.episode_id"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Item from "@/components/main-page/Item.vue";
import Masonry from "masonry-layout";
export default {
  name: "ItemList",
  components: {
    Item,
  },

  beforeMount() {
    const grid = this.$refs.grid;
    this.msnry = new Masonry(grid, {
      itemSelector: ".note",
      gutter: 15
    });
  },

  computed: {
    ...mapGetters(["minFilms"])
  }
};
</script>

<style lang="scss" >
.grid-item {
  margin-bottom: 10px;
}
</style>
