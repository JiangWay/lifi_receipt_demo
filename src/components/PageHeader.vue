<template>
  <header
    class="img w-full flex justify-center place-items-center bg-lifi-yellow"
  >
    <div class="prev absolute left-2" @click="$router.back()">
      <img src="@/assets/img/angle-small-left.svg" class="h-8" />
    </div>
    <div class="title">手動輸入發票</div>
    <div class="fn"></div>
  </header>
</template>

<script>
export default {
  name: "HomeHeader",
};
</script>
<style lang="scss" scoped>
.img {
  height: 45px;
}
</style>