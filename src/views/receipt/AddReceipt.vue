<template>
  <h1>I'm AddReceipt Page</h1>
  <div class="add-receipt flex flex-col px-6">
    <!-- <div class="form-control">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      <input type="text" placeholder="username" class="input" />
    </div> -->
    <div class="form-control receipt flex flex-col py-3">
      <label class="label">
        <div class="title">發票號碼</div>
      </label>
      <div class="input-area grid grid-cols-3 gap-2">
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="大寫英文"
        />
        <input
          type="text"
          class="
            receipt-num
            col-span-2
            input-ghost input-lg
            border-1 border-gray-600
          "
          placeholder="8碼發票號碼"
        />
      </div>
    </div>
    <div class="form-control time flex flex-col py-3">
      <label class="label">
        <div class="title">開立時間</div>
      </label>

      <div class="input-area grid grid-cols-3 gap-2">
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="西元年"
        />
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="月份"
        />
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="日期"
        />
      </div>
    </div>
    <button
      class="
        h-12
        w-48
        bg-lifi-yellow
        rounded
        border-transparent
        self-center
        mt-12
      "
    >
      提交
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    // const router = useRouter();
    const text = ref("text");
    return { text };
  },
});
</script>


<style lang="scss" scoped>
.sellerName {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}
</style>