<template>
  <!-- <h1>I'm ReceiptList Page</h1> -->
  <div class="infoArea mt-1 p-3 border-b-2">
    <!-- <div>I'm ReceiptList Info</div> -->
    <div class="title text-xl font-bold">{{ receiptInfo.title }}</div>
    <div class="info">
      共{{ formatNumber(receiptInfo.count) }}張,總金額{{
        formatNumber(receiptInfo.amount)
      }}元
    </div>
  </div>
  <div class="list">
    <!-- <h1>I'm ReceiptList List</h1> -->
    <label
      for="receipt-modal"
      class="modal-button"
      v-for="receipt in receiptList"
      :key="receipt.id"
      @click="getCuerrentReceipt(receipt)"
    >
      <!-- {{ receipt.id }} -->
      <div class="grid grid-cols-12 gap-2 py-1 border-b-2">
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
          <div class="sellerName text-xs text-gray-500 text-left truncate ...">
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

  <div class="buttonArea grid grid-cols-2 absolute inset-x-0 bottom-0 h-20">
    <button class="border-2">掃描輸入</button>
    <button class="border-2" @click="goToAddReceipt()">手輸發票</button>
  </div>
  <ReceiptDetailModal class="overflow-y-scroll" :receipt="currentReceipt" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { fetchReceiptList, getMockReceiptList } from "@/utils/api";
import { IReceiptInfo, IReceipt } from "@/utils/type";
import numeral from "numeral";
import moment from "moment";
import { useRouter } from "vue-router";
import ReceiptDetailModal from "@/components/ReceiptDetailModal.vue";

export default defineComponent({
  components: { ReceiptDetailModal },
  setup() {
    const router = useRouter();
    let receiptList = reactive(getMockReceiptList().invoices);
    // const getReceiptList = async () => await fetchReceiptList();
    // const getReceiptList = () => getMockReceiptList();
    // onBeforeMount(async () => {
    //   try {
    //     let res = await getReceiptList();
    //     receiptList = res.invoices;
    //     console.log(receiptList);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    const STATIS_UNCONFIRM = "驗證中";
    const receiptInfo = reactive({
      title: "110年12月",
      count: receiptList.length,
      amount: "",
    } as IReceiptInfo);
    receiptInfo.count = receiptList.length;
    receiptInfo.amount = receiptList
      .filter((receipt: any) => receipt.status !== STATIS_UNCONFIRM)
      .reduce((previousReceipt: any, receipt: any) => {
        return previousReceipt.amount + receipt.amount;
      });

    const formatNumber = (n: number | string) => {
      if (n !== undefined) {
        return numeral(n).format("0,0");
      } else {
        return "--";
      }
    };
    const formatDate = (n: string, type = "MM/DD") => {
      return moment(n).format(type);
    };
    const receiptTypeMap = () => {
      const map = new Map<number, string>();
      map.set(0, "載具");
      map.set(1, "電子");
      return map;
    };
    const getReceiptType = (status: string, type: number) => {
      if (status === STATIS_UNCONFIRM) {
        return STATIS_UNCONFIRM;
      } else {
        console.log(type);
        console.log(receiptTypeMap().get(type));
        return receiptTypeMap().get(type);
      }
    };

    const goToAddReceipt = () => {
      router.push({
        name: "AddReceipt",
      });
    };

    // 給個初始值
    let currentReceipt = reactive(receiptList[0]);
    const getCuerrentReceipt = (receipt: IReceipt) => {
      Object.assign(currentReceipt, receipt);
    };

    return {
      currentReceipt,
      STATIS_UNCONFIRM,
      receiptList,
      receiptInfo,
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