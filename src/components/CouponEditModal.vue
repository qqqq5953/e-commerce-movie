<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="title" class="form-label">名稱</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入優惠券名稱"
                v-model="tempCoupon.title"
              />
            </div>

            <div class="mb-3">
              <label for="code" class="form-label">代碼</label>
              <input
                type="text"
                class="form-control"
                id="code"
                placeholder="請輸入優惠券代碼"
                v-model="tempCoupon.code"
              />
            </div>

            <div class="mb-3">
              <label for="percent" class="form-label">折扣百分比</label>
              <input
                type="text"
                class="form-control"
                id="percent"
                placeholder="請輸入折扣百分比"
                v-model.number="tempCoupon.percent"
              />
            </div>

            <div class="mb-3">
              <label for="due_date" class="form-label">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                placeholder="請輸入到期日"
                v-model="tempCoupon.due_date"
              />
            </div>

            <hr />

            <div class="mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否套用
                </label>
              </div>
            </div>
          </form>
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
            class="btn btn-primary"
            @click="$emit('update-coupon', tempCoupon)"
          >
            新增
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
    coupon: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      modal: {},
      tempCoupon: {}
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // console.log('watch tempCoupon', this.tempCoupon);
    }
  }
};
</script>
