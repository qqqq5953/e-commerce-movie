<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th>姓名</th>
                    <td>{{ tempUser.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempUser.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempUser.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempUser.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th>訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>{{ $filters.date(tempOrder.paid_date) }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td :class="{ 'text-success': tempOrder.is_paid }">
                      {{ tempOrder.is_paid ? '已付款' : '未付款' }}
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ tempOrder.total }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="item in tempProducts" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">{{ item.final_total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="hideModal">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '@/mixins/modalMixin';

export default {
  mixins: [modalMixins],
  props: {
    order: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      modal: {},
      tempOrder: {},
      tempProducts: {},
      tempUser: {}
    };
  },
  watch: {
    order() {
      this.tempOrder = this.order;
      this.tempProducts = this.order.products;
      this.tempUser = this.order.user;
      // console.log('watch tempCoupon', this.tempCoupon);
    }
  }
};
</script>
