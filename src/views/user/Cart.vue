<template>
  <Loading :active="isLoading"></Loading>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" colspan="2" class="text-center">品名</th>
          <th scope="col">數量</th>
          <th scope="col" class="text-end">單價</th>
          <th scope="col" class="text-end">總共</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <th scope="row">
            <button
              @click.prevent="deleteProduct(item)"
              type="button"
              class="btn btn-outline-danger px-2 py-1"
            >
              <i class="bi bi-x"></i>
            </button>
          </th>
          <td>
            <div>{{ item.product.title }}</div>
            <span v-if="isCouponUsed" class="text-success">已套用優惠券</span>
          </td>
          <td class="w-25">
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                aria-label="number"
                v-model.number="item.qty"
                min="1"
                @change="updateProductTotal(item)"
              />
              <!-- :disabled="status.loadingItemsID === item.id" -->
              <span class="input-group-text">/ {{ item.product.unit }}</span>
            </div>
          </td>
          <td class="text-end">{{ item.product.price }}</td>
          <td class="text-end">
            <div v-if="!isCouponUsed">原價：{{ item.total }}</div>
            <div v-if="isCouponUsed">
              <del>原價：{{ item.total }}</del>
              <div class="text-success">
                折扣價： {{ item.final_total.toFixed() }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <th colspan="3"></th>
        <td class="text-end">
          <div>總計</div>
          <div v-if="isCouponUsed" class="text-success">折扣價</div>
        </td>
        <td class="text-end">
          <div v-if="!isCouponUsed">{{ totalAmount.total }}</div>
          <del v-if="isCouponUsed">{{ totalAmount.total }}</del>
          <div v-if="isCouponUsed" class="text-success">
            {{ totalAmount.finalTotal.toFixed() || 0 }}
          </div>
        </td>
      </tfoot>
    </table>
  </div>
  <!-- <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
      </tbody>
    </table>
  </div> -->

  <!-- 優惠券 -->
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="請輸入優惠碼"
      v-model="couponCode"
      aria-label="input coupon"
      aria-describedby="button-addon2"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="useCoupon"
      id="button-addon2"
    >
      套用優惠碼
    </button>
  </div>

  <!-- 送出訂單 -->
  <Form v-slot="{ errors }" @submit="onSubmit" v-if="cart.length">
    <!-- <div>error: {{ errors }}</div> -->
    <!-- <div>values: {{ values }}</div> -->

    <!-- email -->
    <div class="mb-3">
      <label for="email" class="form-label">Email*</label>

      <Field
        id="email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['email'] }"
        placeholder="請輸入 Email"
        rules="email|required"
        v-model="form.user.email"
      >
      </Field>

      <error-message name="email" class="invalid-feedback"></error-message>
    </div>

    <!-- name -->
    <div class="mb-3">
      <label for="name" class="form-label">姓名*</label>

      <Field
        id="name"
        name="name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['name'] }"
        placeholder="請輸入姓名"
        rules="required"
        v-model="form.user.name"
      ></Field>

      <error-message name="name" class="invalid-feedback"></error-message>
    </div>

    <!-- tel -->
    <div class="mb-3">
      <label for="tel" class="form-label">手機*</label>

      <Field
        id="tel"
        name="tel"
        type="tel"
        class="form-control"
        :class="{ 'is-invalid': errors['tel'] }"
        placeholder="請輸入手機"
        rules="numeric|length: 10|required"
        v-model="form.user.tel"
      ></Field>

      <error-message name="tel" class="invalid-feedback"></error-message>
    </div>

    <!-- address -->
    <div class="mb-3">
      <label for="address" class="form-label">地址*</label>

      <Field
        id="address"
        name="address"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['address'] }"
        placeholder="請輸入地址"
        rules="required"
        v-model="form.user.address"
      ></Field>

      <error-message name="address" class="invalid-feedback"></error-message>
    </div>

    <!-- message -->
    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <Field
        id="message"
        name="message"
        as="textarea"
        class="form-control"
        v-model="form.message"
      ></Field>
    </div>

    <button class="btn btn-danger" type="submit">送出訂單</button>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      discountTotal: '',
      couponCode: 'fifty',
      status: {
        loadingItemsID: ''
      },
      isLoading: false,
      isCouponUsed: false,
      // vee-validate
      form: {
        user: {
          name: 'Andy',
          email: '123@gmail.com',
          tel: '0987654321',
          address: 'asd'
        },
        message: ''
      }
    };
  },
  computed: {
    totalAmount() {
      const total = this.cart.reduce((total, item) => {
        return total + item.total;
      }, 0);
      const finalTotal = this.cart.reduce((total, item) => {
        return total + item.final_total;
      }, 0);
      return { total, finalTotal };
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true;

        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
        const order = this.form;
        const response = await this.$http.post(api, { data: order });
        console.log('onSubmit', response);

        this.isLoading = false;

        // 轉址
        this.$router.push({
          name: 'UserCheckout',
          params: { orderID: response.data.orderId }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async useCoupon() {
      try {
        // 取得優惠券資料
        const coupon = {
          code: this.couponCode
        };

        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
        const response = await this.$http.post(api, { data: coupon });
        console.log('useCoupon', response);

        // 重新渲染畫面
        await this.getCartProduct();

        // 儲存回傳資料
        this.isCouponUsed = response.data.success;
        this.discountTotal = response.data.data.final_total;
      } catch (err) {
        console.log(err);
      }
    },
    async updateProductTotal(item) {
      try {
        // this.status.loadingItemsID = item.id;
        // this.isLoading = true;

        // 取得優惠券資料
        const cart = {
          product_id: item.product_id,
          qty: item.qty
        };
        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        const response = await this.$http.put(api, { data: cart });

        // 重新渲染畫面
        await this.getCartProduct();

        // this.status.loadingItemsID = '';
        // this.isLoading = false;
        console.log('updateProductTotal', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getCartProduct() {
      try {
        this.isLoading = true;

        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
        const response = await this.$http.get(api);

        // 儲存回傳資料
        this.cart = response.data.data.carts;

        this.isLoading = false;
        console.log('getCartProduct', response);
        console.log('cart', this.cart);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct(item) {
      try {
        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        await this.$http.delete(api);

        // 重新渲染畫面
        await this.getCartProduct();

        // const response = await this.$http.delete(api);
        // console.log('deleteProduct', response);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getCartProduct();
  }
};
</script>
