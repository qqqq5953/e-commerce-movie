<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center align-items-center">
      <!-- 上一頁 -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          @click.prevent="onPreviousPage(currentPage)"
          aria-label="Previous"
        >
          <i class="bi bi-chevron-double-left fs-2"></i>
        </a>
      </li>
      <!-- 數字 'd-none':
                page !== currentPage - 1 &&
                page !== currentPage + 1 &&
                page !== currentPage &&
                !(currentPage === 1 && page === 3)-->
      <li class="w-50">
        <ul class="pagination justify-content-center flex-wrap">
          <li
            class="page-item"
            :class="{
              active: page === currentPage
            }"
            v-for="page in totalPages"
            :key="page"
          >
            <a
              class="page-link border"
              href="#"
              @click.prevent="onChangePage(page)"
              >{{ page }}</a
            >
          </li>
        </ul>
      </li>
      <!-- <li class="w-50">
        <ul class="pagination justify-content-center flex-wrap">
          <li
            class="page-item"
            :class="{
              active: page === currentPage
            }"
            v-for="page in slicePages"
            :key="page"
          >
            <a
              class="page-link border"
              href="#"
              @click.prevent="onChangePage(page)"
              >{{ page }}</a
            >
          </li>
        </ul>
      </li> -->

      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          href="#"
          @click.prevent="onNextPage(currentPage)"
          aria-label="Next"
        >
          <i class="bi bi-chevron-double-right fs-2"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    // slicePages: {
    //   type: Array
    // },
    totalPages: {
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tempProducts: []
    };
  },
  emits: ['change-page', 'previous-page', 'next-page'],
  methods: {
    onChangePage(page) {
      this.$emit('change-page', page);
    },
    onPreviousPage(page) {
      this.$emit('previous-page', page - 1);
    },
    onNextPage(page) {
      this.$emit('next-page', page + 1);
    }
  }
};
</script>
