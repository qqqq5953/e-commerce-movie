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
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>是否刪除以下訂單？（刪除後無法復原）</h5>
          <table class="table table-borderless">
            <thead class="border-bottom">
              <tr>
                <th scope="col">名稱</th>
                <th scope="col">數量</th>
                <th scope="col" class="text-end">金額</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tempOrder.products" :key="item.id">
                <th>
                  {{ item.product.title }}
                </th>
                <td>{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="text-end">{{ item.final_total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('delete-order', tempOrder)"
          >
            確認刪除
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
      type: Object
    }
  },
  data() {
    return {
      modal: {},
      tempOrder: {}
    };
  },
  watch: {
    order() {
      this.tempOrder = this.order;
      // console.log('watch tempOrder', this.tempOrder);
    }
  }
};
</script>
