<template>
  <!-- <label for="receipt-modal" class="btn btn-primary modal-button"
    >open modal</label
  > -->
  <input type="checkbox" id="receipt-modal" class="modal-toggle" />
  <div class="modal px-4 flex flex-col place-items-center">
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
        <div class="memberId text-xl">
          {{
            receipt.status === STATIS_UNCONFIRM
              ? receipt.invNum
              : receipt.details === undefined
              ? ""
              : receipt.details[0].description
          }}
        </div>
      </div>
      <div class="title">
        <div class="time text-lifi-gray-light">{{ receipt.time }}</div>
        <div class="shopName">
          {{
            receipt.status === STATIS_UNCONFIRM
              ? "無店家資料"
              : receipt.sellerName
          }}
        </div>
      </div>
      <div class="overflow-y-scroll h-80">
        <ReceiptTable
          :list="
            receipt.status === STATIS_UNCONFIRM
              ? []
              : receipt.details === undefined
              ? []
              : receipt.details
          "
        />
      </div>
      <div
        class="
          absolute
          bottom-0
          left-0
          right-0
          border-t-2
          flex
          justify-between
          px-10
          pt-2
          h-12
          border-lifi-gray-light
        "
      >
        <div class="text-lifi-gray-light">總金額</div>
        <div class="total text-lifi-gray-light">{{ receipt.amount }}</div>
      </div>
    </div>
    <div
      class="relative place-self-start bt-6 mt-2"
      v-show="receipt.status === STATIS_UNCONFIRM"
    >
      <label for="receipt-modal" class="" @click="delteReceipt(receipt.id)"
        >刪除發票</label
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReceiptTable from "@/components/ReceiptTable.vue";
import { deleteReceipt } from "@/utils/api";

export default defineComponent({
  components: { ReceiptTable },
  props: ["receipt", "refresh"],
  emits: ["update:refresh"],
  setup(props, context) {
    const STATIS_UNCONFIRM = "驗證中";
    const delteReceipt = async (id: number) => {
      await deleteReceipt(id);

      context.emit("update:refresh", true);
    };

    return { STATIS_UNCONFIRM, delteReceipt, open };
  },
});
</script>


