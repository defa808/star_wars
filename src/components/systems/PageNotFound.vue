<template>
  <div class="error">
    <h1 style="font-size:50px;">Error 404</h1>
    <h2>You lost your own way my son</h2>
    <h1>
      Go back to
      <router-link to="/">Earth</router-link>
    </h1>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style>
.error {
    height:100% !important;
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  font-family: Star Jedi;
  color: #ff7f50;
}
</style>
