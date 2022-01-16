<template>
  <!-- <label for="receipt-modal" class="btn btn-primary modal-button"
    >open modal</label
  > -->
  <input type="checkbox" id="receipt-modal" class="modal-toggle" />
  <div class="modal p-4 flex flex-col place-items-center">
    <div class="place-self-end">
      <label for="receipt-modal" class="h-8 pr-4">
        <img src="@/assets/img/cross.svg" class="h-8 pb-2" />
      </label>
    </div>
    <div class="modal-box h-2/3 rounded-lg flex-col">
      <div class="top felx justify-center">
        <div
          class="
            absolute
            left-4
            receipt-type
            rounded-full
            text-sm
            w-12
            place-self-start
          "
          :class="
            receipt.status === STATIS_UNCONFIRM
              ? 'bg-lifi-red'
              : 'bg-lifi-yellow'
          "
        >
          {{ receipt.status }}
        </div>
        <div class="memberId text-xl c">
          {{ receipt.details[0].description }}
        </div>
      </div>
      <div class="title">
        <div class="time">{{ receipt.time }}</div>
        <div class="shopName">{{ receipt.sellerName }}</div>
      </div>
      <div class="overflow-y-scroll h-80">
        <ReceiptTable :list="receipt.details" />
      </div>
    </div>
    <div
      class="place-self-start bt-1"
      v-show="receipt.status === STATIS_UNCONFIRM"
    >
      <label for="receipt-modal" class="">刪除發票</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import ReceiptTable from "@/components/ReceiptTable.vue";

export default defineComponent({
  components: { ReceiptTable },
  props: {
    receipt: {},
  },
  setup(props) {
    const STATIS_UNCONFIRM = "驗證中";
    return { STATIS_UNCONFIRM };
  },
});
</script>


<style>
</style>