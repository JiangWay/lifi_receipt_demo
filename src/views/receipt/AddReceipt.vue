<template>
  <div class="add-receipt flex flex-col px-6">
    <div class="form-control receipt flex flex-col py-3">
      <label class="label">
        <div class="title">發票號碼</div>
      </label>
      <div class="input-area grid grid-cols-3 gap-2">
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="大寫英文"
          v-model="receipt.eng"
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
          v-model="receipt.num"
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
          v-model="date.year"
        />
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="月份"
          v-model="date.month"
        />
        <input
          type="text"
          class="receipt-eng input-ghost input-lg"
          placeholder="日期"
          v-model="date.day"
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
      @click="doAddReceipt()"
    >
      提交
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { addReceipt } from "@/utils/api";
import { IReceiptInfo, IReceipt } from "@/utils/type";

// import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const receipt = reactive({
      eng: "",
      num: "",
    });
    const date = reactive({
      year: "",
      month: "",
      day: "",
    });
    const time = computed((): string => {
      return date.year + "-" + date.month + "-" + date.day + " 00:00:00";
    });
    const invNum = computed((): string => {
      return receipt.eng + "-" + receipt.num;
    });

    const doAddReceipt = async () => {
      let receipt = {
        id: 0,
        invNum: invNum.value,
        status: "驗證中",
        type: 1,
        time: time.value,
      };
      await addReceipt(receipt);
      cleanInput();
    };

    const cleanInput = () => {
      receipt.eng = "";
      receipt.num = "";
      date.year = "";
      date.month = "";
      date.day = "";
    };
    return { doAddReceipt, receipt, date };
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