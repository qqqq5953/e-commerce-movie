<template>
  <AdminNavbar></AdminNavbar>
  <div class="container-fluid position-relative">
    <router-view />
  </div>
  <ToastMessage></ToastMessage>
</template>

<script>
import emitter from '@/methods/emitter';
import pushMessageState from '@/methods/pushMessageState';
import sortData from '@/methods/sortData';
import ToastMessage from '@/components/ToastMessage.vue';
import AdminNavbar from '@/components/AdminNavbar.vue';
export default {
  components: {
    AdminNavbar,
    ToastMessage
  },
  provide() {
    return {
      emitter,
      pushMessageState,
      sortData
    };
  },
  created() {
    // 取出 cookie
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    // 加入 global headers
    this.$http.defaults.headers.common.Authorization = token;

    // 驗證登入狀態
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api).then((res) => {
      if (!res.data.success) this.$router.push({ name: 'Login' });
    });
  }
};
</script>

<style></style>
