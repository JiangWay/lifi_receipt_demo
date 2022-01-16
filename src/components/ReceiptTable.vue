<template>
  <div class="flex flex-col">
    <div class="title flex flex-row bg-lifi-gray w-80 justify-end py-1">
      <div class="text-lifi-text-gray w-1/2">品項</div>
      <div class="text-lifi-text-gray w-1/6 text-right">數量</div>
      <div class="text-lifi-text-gray w-1/6 text-right">單價</div>
      <div class="text-lifi-text-gray w-1/6 text-right">小計</div>
    </div>
    <div
      class="item flex flex-row w-80 justify-end py-1"
      v-for="(detail, idx) in list"
      :key="idx"
    >
      <div class="w-1/2">{{ detail.description }}</div>
      <div class="w-1/6 text-right">{{ detail.quantity }}</div>
      <div class="w-1/6 text-right">{{ detail.unitPrice }}</div>
      <div class="w-1/6 text-right">{{ detail.amount }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    list: {},
  },
  setup(props) {
    return {};
  },
});
</script>


<style>
</style> 