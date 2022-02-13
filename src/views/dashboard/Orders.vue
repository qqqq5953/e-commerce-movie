<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-5">
    <thead>
      <tr>
        <th scope="col">購買時間</th>
        <th scope="col">Email</th>
        <th scope="col">購買品項</th>
        <th scope="col" class="text-end">應付金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <th scope="row">{{ $filters.date(order.paid_date) }}</th>
        <td>{{ order.user.email }}</td>
        <td>
          <ul>
            <li v-for="item in order.products" :key="item.id">
              {{ item.product.title }}
            </li>
          </ul>
        </td>
        <td class="text-end">{{ order.total }}</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              :checked="order.is_paid"
              disabled
            />
            <label
              class="form-check-label"
              for="flexSwitchCheckChecked"
              v-if="order.is_paid"
              >已付款</label
            >
            <label class="form-check-label" for="flexSwitchCheckChecked" v-else
              >未付款</label
            >
          </div>
          <!-- <div :class="{ 'text-success': order.is_paid }">
            {{ order.is_paid ? '已付款' : '未付款' }}
          </div> -->
        </td>
        <td>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="openOrderModal(order)"
            >
              檢視
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              @click="openOrderDeleteModal(order, pagination)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination
    :pages="pagination"
    @change-page="getOrders"
    @previous-page="getOrders"
    @next-page="getOrders"
  ></Pagination>
  <OrderEditModal ref="orderEditModal" :order="tempOrder"></OrderEditModal>
  <OrderDeleteModal
    ref="orderDeleteModal"
    :order="tempDeleteOrder"
    @delete-order="deleteOrder"
  ></OrderDeleteModal>
</template>

<script>
import OrderEditModal from '@/components/OrderEditModal.vue';
import OrderDeleteModal from '@/components/OrderDeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    OrderEditModal,
    OrderDeleteModal,
    Pagination
  },
  inject: ['pushMessageState'],
  data() {
    return {
      isLoading: false,
      tempOrder: {},
      tempDeleteOrder: {},
      orders: [],
      pagination: {}
    };
  },
  methods: {
    openOrderModal(order) {
      this.tempOrder = order;
      this.$refs.orderEditModal.showModal();
      console.log('openOrderModal', order);
    },
    openOrderDeleteModal(order, pagination) {
      this.tempDeleteOrder = { ...order, ...pagination };
      this.$refs.orderDeleteModal.showModal();
    },
    async deleteOrder(order) {
      try {
        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
        const response = await this.$http.delete(api);
        console.log('deleteOrder response', response);

        // 取得分頁資料
        const currentPage = order.current_page;

        // 重新渲染畫面
        this.getOrders(currentPage);

        // 關閉modal
        this.$refs.orderDeleteModal.hideModal();

        // toast
        this.pushMessageState(response, order, '刪除');
      } catch (err) {}
    },
    async getOrders(page) {
      try {
        this.isLoading = true;

        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
        const response = await this.$http.get(api);

        // 儲存回傳資料
        this.orders = response.data.orders;
        this.pagination = response.data.pagination;

        this.isLoading = false;
        console.log('getOrders', response);
        console.log('this.orders', this.orders);
        console.log('this.pagination', this.pagination);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getOrders();
  }
};
</script>
