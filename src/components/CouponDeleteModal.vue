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
            <span>刪除 {{ tempCoupon.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <span class="text-danger fw-bold">{{ tempCoupon.title }}</span>
          ？（刪除後無法復原）
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
            @click="$emit('delete-coupon', tempCoupon)"
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
    coupon: {
      type: Object
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
      // console.log('DeleteModal tempCoupon', this.tempCoupon);
    }
  }
};
</script>
