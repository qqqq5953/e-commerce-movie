<template>
  <Loading :active="isLoading"></Loading>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit="payOrder">
      <table class="table align-middle">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th class="text-end">總共</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }} / {{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ totalAmount.toFixed() || 0 }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <!-- <span>尚未付款</span>
              <span class="text-success">付款完成</span> -->
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!order.is_paid" class="text-end">
        <button class="btn btn-danger" type="submit">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {},
      user: {},
      isLoading: false
    };
  },
  computed: {
    totalAmount() {
      const total = [];

      for (const key of Object.keys({ ...this.order.products })) {
        total.push(this.order.products[key].final_total);
      }

      const finalTotal = total.reduce((total, item) => {
        return total + item;
      }, 0);

      return finalTotal;
    }
  },
  methods: {
    async payOrder() {
      try {
        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
        const response = await this.$http.post(api);
        console.log('payOrder', response);

        // 重新渲染畫面
        this.getOrder();
      } catch (err) {
        console.log(err);
      }
    },
    async getOrder() {
      try {
        this.isLoading = true;

        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
        const response = await this.$http.get(api);

        // 儲存回傳資料
        this.order = response.data.order;
        this.user = response.data.order.user;

        this.isLoading = false;
        console.log('getOrder', response);
        console.log('this.order', this.order);
        console.log('this.user', this.user);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    this.orderId = this.$route.params.orderID;
    await this.getOrder();
  }
};
</script>
