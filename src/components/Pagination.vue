<template>
  <nav aria-label="Page navigation example ">
    <ul class="pagination justify-content-center align-items-center">
      <!-- 上一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          @click.prevent="onPreviousPage(pages.current_page)"
          aria-label="Previous"
        >
          <i class="bi bi-chevron-double-left fs-2"></i>
        </a>
      </li>
      <!-- 數字 -->
      <li class="w-50">
        <ul class="pagination justify-content-center flex-wrap">
          <li
            class="page-item"
            :class="{ active: page === pages.current_page }"
            v-for="page in pages.total_pages"
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

      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          @click.prevent="onNextPage(pages.current_page)"
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
    pages: {
      type: Object
    }
  },
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
