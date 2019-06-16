<template>
<div>
  <template v-for="item in minFilms">
    <Item :data="item" :key="item.episode_id"/>
  </template>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import Item from "@/components/main-page/Item.vue";

export default {
  name: "ItemList",
  components: {
    Item
  },

  computed: {
    ...mapGetters(["minFilms"])
  }
};
</script>

<style>
</style>
