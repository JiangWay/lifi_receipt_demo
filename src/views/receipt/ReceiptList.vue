<template>
  <div class="receipt-list">
    <div class="infoArea mt-1 p-3 border-b-2 border-lifi-gray-light">
      <div class="title text-xl font-bold">{{ receiptInfo.title }}</div>
      <div class="info">
        共{{ formatNumber(receiptInfo.count) }}張,總金額{{
          formatNumber(receiptInfo.amount)
        }}元
      </div>
    </div>
    <div class="list">
      <label
        for="receipt-modal"
        class="modal-button"
        v-for="receipt in receiptList"
        :key="receipt.id"
        @click="getCuerrentReceipt(receipt)"
      >
        <div
          class="grid grid-cols-12 gap-2 py-1 border-b-2 border-lifi-gray-light"
        >
          <div class="left col-span-2">
            <div class="date gap-2">{{ formatDate(receipt.time) }}</div>
            <div
              class="type btn btn-xs border-0"
              :class="
                receipt.status === STATIS_UNCONFIRM
                  ? 'bg-lifi-red'
                  : 'bg-lifi-yellow'
              "
            >
              {{ getReceiptType(receipt.status, receipt.type) }}
            </div>
          </div>
          <!-- 文字要靠左 -->
          <div class="mid col-span-8">
            <div class="invNum text-left">{{ receipt.invNum }}</div>
            <div
              class="sellerName text-xs gray-light-500 text-left truncate ..."
            >
              {{ receipt.sellerName ? receipt.sellerName : "無店家資料" }}
            </div>
          </div>
          <div class="right col-span-2">
            <div class="amount text-center">
              {{ formatNumber(receipt.amount) }}元
            </div>
          </div>
        </div>
      </label>
    </div>

    <div
      class="
        buttonArea
        grid grid-cols-2
        absolute
        inset-x-0
        bottom-0
        h-20
        border-t-2 border-lifi-gray-light
      "
    >
      <button class="">掃描輸入</button>
      <button class="" @click="goToAddReceipt()">手輸發票</button>
    </div>
    <ReceiptDetailModal
      class="overflow-y-scroll"
      :receipt="currentReceipt"
      v-model:refresh="refresh"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { fetchReceiptList } from "@/utils/api";
import { IReceiptInfo, IReceipt } from "@/utils/type";
import numeral from "numeral";
import moment from "moment";
import { useRouter } from "vue-router";
import ReceiptDetailModal from "@/components/ReceiptDetailModal.vue";

export default defineComponent({
  components: { ReceiptDetailModal },
  setup() {
    const router = useRouter();
    const STATIS_UNCONFIRM = "驗證中";
    const receiptList = ref([] as IReceipt[]);
    const currentReceipt = reactive({} as IReceipt);
    const receiptInfo = reactive({} as IReceiptInfo);
    const refresh = ref(false);
    const getReceiptList = async () => await fetchReceiptList();
    onMounted(async () => {
      try {
        receiptList.value = await getReceiptList();
        // 設定receiptInfo
        receiptInfo.count = receiptList.value.length;
        let amount = 0;
        receiptList.value.forEach((r: IReceipt) => {
          if (r.amount != undefined) {
            amount += r.amount;
          }
        });
        receiptInfo.amount = amount;
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * 格式化數字
     */
    const formatNumber = (n: number | string) => {
      if (n !== undefined) {
        return numeral(n).format("0,0");
      } else {
        return "--";
      }
    };

    /**
     * 格式化日期
     */
    const formatDate = (n: string, type = "MM/DD") => {
      return moment(n).format(type);
    };

    /**
     * mapping發票狀態中文名稱
     */
    const receiptTypeMap = () => {
      const map = new Map<number, string>();
      map.set(0, "載具");
      map.set(1, "電子");
      return map;
    };

    /**
     * 取得發票狀態中文名稱
     */
    const getReceiptType = (status: string, type: number) => {
      if (status === STATIS_UNCONFIRM) {
        return STATIS_UNCONFIRM;
      } else {
        return receiptTypeMap().get(type);
      }
    };

    /**
     * 前往新增發票頁
     */
    const goToAddReceipt = () => {
      router.push({
        name: "AddReceipt",
      });
    };

    /**
     * 取得現在檢視的發票
     */
    const getCuerrentReceipt = (receipt: IReceipt) => {
      console.log(receipt);
      // if (receipt.value.details.length <= 0) {
      //   console.log("aaa");
      // }
      Object.assign(currentReceipt, receipt);
    };

    /**
     * 是否需要重拿發票列表
     */
    watch(refresh, async (refresh) => {
      if (refresh) {
        receiptList.value = await getReceiptList();
      }
    });

    return {
      currentReceipt,
      STATIS_UNCONFIRM,
      receiptList,
      receiptInfo,
      refresh,
      goToAddReceipt,
      formatNumber,
      formatDate,
      getReceiptType,
      getCuerrentReceipt,
    };
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