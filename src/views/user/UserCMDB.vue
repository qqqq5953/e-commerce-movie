<template>
  <Loading :active="isLoading"></Loading>

  <header class="position-relative">
    <div
      class="header"
      style="
        background: url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=800&q=80');
      "
    ></div>
    <div class="position-absolute top-0 bottom-0 w-100">
      <div
        class="row align-items-center m-auto h-100"
        style="background: rgba(255, 255, 255, 0.2)"
      >
        <div class="col-5">
          <h2
            class="display-5 p-4 mb-0 ms-3 text-white"
            style="background: rgba(0, 0, 0, 0.5)"
          >
            Offer
            <span class="text-warning">unequaled entertainment experience</span>
            that fits your lifestyle.
          </h2>
        </div>
      </div>
    </div>
  </header>

  <!-- <header class="position-relative">
    <div
      class="header position-relative top-0 bottom-0 w-100"
      style="
        background: url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=800&q=80');
      "
    ></div>
  </header> -->
  <!-- <header
    class="header"
    style="
      background: url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&h=400&q=80');
      min-height: 400px;
    "
  ></header> -->
  <!-- <header
    class="header"
    style="
      background: url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&h=300&q=80');
      min-height: 300px;
    "
  ></header> -->

  <div class="bg-primary">
    <div class="container py-5">
      <!-- Playing Now -->
      <h2 class="h1 d-inline-block">
        <a
          href="#"
          @click.prevent="moreResultsOfCMDB('nowplaying')"
          class="text-white text-decoration-none d-flex align-items-center"
        >
          <i class="bi bi-camera-reels text-warning me-3 fs-4"></i>
          <i class="bi bi-camera-reels-fill d-none text-warning me-3 fs-4"></i>
          <span>Now Playing</span>
          <i class="bi bi-chevron-right ms-2 fs-4"></i>
        </a>
      </h2>
      <div class="position-relative mt-3 mb-5">
        <section class="overflow-auto card-scrollbar position-relative">
          <CardVertical
            :results="nowPlaying"
            :language="language"
          ></CardVertical>
        </section>
        <div class="position-absolute right-blur"></div>
      </div>

      <!-- UpComing -->
      <h2 class="h1 d-inline-block">
        <a
          href="#"
          @click.prevent="moreResultsOfCMDB('upcoming')"
          class="text-white text-decoration-none d-flex align-items-center"
        >
          <i class="bi bi-camera-reels text-warning me-3 fs-4"></i>
          <i class="bi bi-camera-reels-fill d-none text-warning me-3 fs-4"></i>
          <span>UpComing</span>
          <i class="bi bi-chevron-right ms-2 fs-4"></i>
        </a>
      </h2>
      <div class="position-relative mt-3 mb-5">
        <section
          class="overflow-auto mt-3 mb-5 card-scrollbar position-relative"
        >
          <CardVertical :results="upComing" :language="language"></CardVertical>
        </section>
        <div class="position-absolute right-blur"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CardVertical from '@/components/CardVerticalTest.vue';
// import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    CardVertical
    // Navbar
  },
  inject: ['sortData', 'emitter'],
  data() {
    return {
      basrUrl: 'https://api.themoviedb.org/3/',
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      products: [],
      nowPlaying: [],
      upComing: [],
      language: 'en-US',
      region: 'US',
      isLoading: false
    };
  },
  methods: {
    moreResultsOfCMDB(genre) {
      this.$router.push({ name: 'AllResults', params: { genre } });
    },
    async getProducts() {
      this.isLoading = true;

      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });
      console.log('res', response.data);

      // 儲存資料
      this.products = response.data.products;

      // 將 nowPlaying 分離出來
      this.getNowPlaying();

      // 將 upComing 分離出來
      this.getUpcoming();

      this.isLoading = false;
    },
    getNowPlaying() {
      this.nowPlaying = this.products.filter((item) => {
        const genre = item.category.split('|')[1];
        return genre === 'nowplaying';
      });
    },
    getUpcoming() {
      this.upComing = this.products.filter((item) => {
        const genre = item.category.split('|')[1];
        return genre === 'upcoming';
      });
    }
  },
  created() {
    window.scrollTo(0, -1000);

    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-repeat: no-repeat !important;
  background-position: 0% 60% !important;
  background-size: cover !important;
  height: 70vh;
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
}

h2:hover {
  .bi-chevron-right {
    color: #f0ad4e;
  }

  .bi-camera-reels {
    display: none;
  }

  .bi-camera-reels-fill {
    display: block !important;
  }
}

.right-blur {
  width: 2.5rem;
  height: 435px;
  top: 0;
  right: 0;
  z-index: 10;
  background: linear-gradient(
    to left,
    rgba(24, 24, 24, 0.9) 15%,
    transparent 100%
  );
  // background: linear-gradient(to left, red 5%, transparent 100%);
}

.card-scrollbar {
  scroll-snap-type: x mandatory;
  overscroll-behavior-inline: contain;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    // background-color: rgba(85, 89, 92, 1);
    background-color: rgba(69, 67, 56, 0.7);
    border-radius: 100vw;
    margin-inline: 10vw;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.75);

    border-radius: 100vw;
    border: 2px solid rgba(85, 89, 92, 1);

    &:hover {
      background-color: rgba(26, 26, 26, 1);

      // background-color: #f0ad4e;
      border: 2px solid rgba(255, 255, 255, 0.7);
      border: 2px solid #f0ad4e;
    }
  }
}
</style>
