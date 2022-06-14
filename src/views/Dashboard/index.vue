<template>
    <div class="dashboard">
      <div class="show">
       <p>订单总量：{{ orderTotal }}</p>
    <p>销售总量：{{ salesTotal }}</p>
    <p>金额：{{ account }}</p>
</div>
<!-- 图标 -->
<radar></radar>
    </div>

</template>


<script>
import { getHomeData } from "@/api/http";
import radar from '../Dashboard/Radar.vue'
import Radar from '../Dashboard/Radar.vue';
export default {
  components: { Radar },
  name: "dashboard",
  compoments:{radar},
  data() {
    return {
      orderTotal: 0,
      salesTotal: 0,
      account: 0,
      isLoaded: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const loading = this.$loading({
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      getHomeData()
        .then((res) => {
            console.log(res)
          let { code, data } = res.data;
          if (code === 200) {
            this.orderTotal = data.orderTotal;
            this.salesTotal = data.salesTotal;
            this.account = data.account;
            this.isLoaded = true;
            loading.close();
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>