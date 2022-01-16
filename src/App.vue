<template>
  <!-- 首頁Header -->
  <HomeHeader v-show="pageName === 'ReceiptList'" />
  <!-- 內頁Header -->
  <PageHeader v-show="pageName !== 'ReceiptList'" />
  <body>
    <router-view />
  </body>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import HomeHeader from "@/components/HomeHeader.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { HomeHeader, PageHeader },
  setup() {
    const route = useRoute();

    const pageName = ref("home");
    watch(route, (newValue) => {
      pageName.value = JSON.parse(JSON.stringify(newValue.name));
    });
    return { pageName };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
