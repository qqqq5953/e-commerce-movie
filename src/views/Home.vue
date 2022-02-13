<template>
  <!-- <div class="container-fluid"></div> -->
  <!-- <div class="position-absolute left-0 right-0 w-100" style="z-index: 1">
  </div> -->
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import sortData from '@/methods/sortData';
import emitter from '@/methods/emitter';

export default {
  components: {
    Navbar
  },
  provide() {
    return {
      sortData,
      emitter
    };
  },
  created() {
    // console.log('movieID', this.movieID);
  }
};
</script>
