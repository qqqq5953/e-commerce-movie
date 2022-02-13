<template>
  <Loading :active="isLoading"></Loading>
  <div class="bg-light">
    <div class="container py-5">
      <div class="row justify-content-center mb-5">
        <div class="col-8">
          <header>
            <div class="d-flex align-items-center">
              <!-- <i class="bi bi-film text-warning me-3 fs-4"></i> -->
              <i class="bi bi-play-btn-fill text-warning me-3 fs-3"></i>
              <!-- <i class="bi bi-play-circle-fill text-warning me-3 fs-3"></i> -->
              <!-- <i class="bi bi-badge-hd-fill text-warning me-3 fs-2"></i> -->
              <h2 class="h1 mb-0">Our Movies</h2>
            </div>
          </header>
          <ul class="mt-4 list-unstyled">
            <li class="mb-4" v-for="item in products" :key="item.id">
              <a
                href="#"
                class="text-decoration-none d-block"
                @click.prevent="getProductDetails(item.id)"
              >
                <!-- card -->
                <div class="movie-card">
                  <div class="info_section">
                    <div class="p-4" style="width: 60%">
                      <!-- card-header -->
                      <div class="row">
                        <div class="col-3">
                          <img
                            v-if="item.imageUrl[0]"
                            :src="item.imageUrl[0]"
                            class="card-img-top card-img-top-adjusted img-fluid d-block"
                            :alt="item.title"
                          />
                        </div>
                        <div class="col-9">
                          <h3 class="card-title mb-1">
                            {{ item.title }}
                          </h3>
                          <small class="d-inline-block me-2">{{
                            item.content.split('|')[2]
                          }}</small>
                          |
                          <small class="ms-2 d-inline-block"
                            >Popularity:
                            <span class="">{{
                              parseFloat(item.content.split('|')[1]).toFixed(0)
                            }}</span></small
                          >
                        </div>
                      </div>
                      <!-- card-body -->
                      <div class="row mt-4">
                        <div class="col-12">
                          <div class="card-text d-flex flex-column">
                            <p>{{ item.description }}</p>

                            <div class="text-end mt-auto px-2">
                              <span> &#171; see more &#187;</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="backdrop_image"
                    :style="{ backgroundImage: `url(${item.imageUrl[1]})` }"
                  ></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Pagination
        :pages="pagination"
        @change-page="getProducts"
        @previous-page="getProducts"
        @next-page="getProducts"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination
  },
  inject: ['emitter', 'sortData'],
  data() {
    return {
      products: [],
      cart: [],
      status: {
        loadingItemsID: ''
      },
      isLoading: false,
      baseImageUrl: 'https://image.tmdb.org/t/p/w200',
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      pagination: {}
      // genrePassIn: ''
    };
  },
  methods: {
    async getProducts(page = 1) {
      this.isLoading = true;

      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      // 資料存入
      this.pagination = response.data.pagination;
      this.products = response.data.products;

      this.products.reverse();
      // this.products = this.sortData(this.products, 'content.split[1]');

      this.isLoading = false;
      console.log('res', response.data);
    },
    getProductDetails(id) {
      this.$router.push({ name: 'Product', params: { productID: id } });
    }
  },
  created() {
    window.scrollTo(0, -1000);

    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
.movie-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 120px -20px rgba(0, 0, 0, 0.5);
  // box-shadow: 0px 0px 80px -25px rgba(0, 0, 0, 0.5);
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 80px -25px rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
  }

  .info_section {
    background: linear-gradient(to right, #e5e6e6 50%, transparent 90%);
    background-blend-mode: multiply;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;

    .card-img-top-adjusted {
      object-fit: cover;
      object-position: center center;
      aspect-ratio: 2 / 3;
      max-height: 250px;
    }
  }

  .backdrop_image {
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    width: 80%;
  }
}

.card-text {
  p {
    display: -webkit-box;
    // max-width: 90%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  span:hover {
    color: #f0ad4e;
    font-weight: bold;
  }
}
</style>
