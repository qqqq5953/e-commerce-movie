<template>
  <Loading :active="isLoading"></Loading>
  <div class="bg-light">
    <div class="container py-5">
      <h2>
        Displaying {{ allProducts.length }} results for: {{ genrePassIn }}
      </h2>

      <PaginationForResults
        :totalPages="totalPages"
        :currentPage="currentPage"
        @change-page="setPagination"
        @previous-page="setPagination"
        @next-page="setPagination"
      ></PaginationForResults>
      <div class="row justify-content-center">
        <div class="col-8">
          <ul class="list-unstyled">
            <li class="mb-5" v-for="item in products" :key="item.id">
              <a
                href="#"
                class="text-decoration-none d-block"
                @click.prevent="getProductDetails(item.id)"
              >
                <div class="movie-card">
                  <div class="info_section">
                    <div class="p-4" style="width: 60%">
                      <div class="row">
                        <div class="col-3">
                          <img
                            v-if="item.imageUrl[0]"
                            :src="item.imageUrl[0]"
                            class="card-img-top img-fluid d-block"
                            style="
                              object-fit: cover;
                              object-position: center center;
                              aspect-ratio: 2 / 3;
                              max-height: 250px;
                            "
                            :alt="item.title"
                          />
                        </div>
                        <div class="col-9">
                          <h3 class="card-title mb-1">
                            {{ item.title }}
                          </h3>
                          <small class="text-dark d-inline-block me-2">{{
                            item.content.split('|')[2]
                          }}</small>
                          |
                          <small class="ms-2 text-dark d-inline-block"
                            >Popularity:
                            <span class="">{{
                              parseFloat(item.content.split('|')[1]).toFixed(0)
                            }}</span></small
                          >
                        </div>
                      </div>
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
    </div>
  </div>
</template>

<script>
import PaginationForResults from '@/components/PaginationForResults.vue';

export default {
  props: {
    genre: {
      type: String
    }
  },
  components: {
    PaginationForResults
  },
  inject: ['emitter'],
  data() {
    return {
      allProducts: [],
      products: [],
      cart: [],
      status: {
        loadingItemsID: ''
      },
      isLoading: false,
      baseImageUrl: 'https://image.tmdb.org/t/p/w200',
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      pagination: {},
      genrePassIn: '',
      slicePages: undefined,
      totalPages: undefined,
      currentPage: 1,
      perPage: 3,
      lastPage: undefined
    };
  },
  computed: {
    queriesChange() {
      return this.$route.params.genre;
    }
  },
  watch: {
    queriesChange(newVal) {
      const newGenre = newVal;

      // 防止跳回首頁會更新資料
      if (this.$route.name === 'UserProducts') {
        this.genrePassIn = newGenre.toLowerCase();
        this.getProducts();
      }
    }
  },
  methods: {
    setMaxViewButtons() {
      if (this.currentPage === 1 && this.totalPages === 1) {
        this.slicePages = [1];
        console.log('第一頁，共一頁');
      }
      if (this.currentPage === 1 && this.totalPages !== 1) {
        this.slicePages = [
          this.currentPage,
          this.currentPage + 1,
          this.currentPage + 2
        ];
        console.log('第一頁，不只一頁');
      }
      if (this.currentPage !== 1 && this.currentPage !== this.totalPages) {
        this.slicePages = [
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1
        ];
        console.log('在中間頁');
      }
      if (this.currentPage !== 1 && this.currentPage === this.totalPages) {
        this.slicePages = [
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        ];
        console.log('在最後一頁');
      }
      this.lastPage = this.slicePages[this.slicePages.length - 1];
    },
    setPagination(page = 1) {
      this.currentPage = page;

      this.totalPages = Math.ceil(this.allProducts.length / this.perPage);
      const startPage = this.currentPage * this.perPage - this.perPage;
      const endPage = startPage + this.perPage;

      this.products = this.allProducts.slice(startPage, endPage);
    },
    async getProducts() {
      this.isLoading = true;

      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      if (this.genrePassIn === 'nowplaying') {
        // 首頁傳來為 NowPlaying
        this.allProducts = response.data.products.filter((item) => {
          const genre = item.category.split('|')[1];
          return genre === 'nowplaying';
        });

        console.log('nowplaying', this.allProducts);
      } else if (this.genrePassIn === 'upcoming') {
        // 首頁傳來為 Upcoming
        this.allProducts = response.data.products.filter((item) => {
          const genre = item.category.split('|')[1];
          return genre === 'upcoming';
        });

        console.log('upcoming', this.allProducts);
      } else {
        // see all results
        this.allProducts = response.data.products.filter((item) => {
          return item.title
            .split('-')
            .join(' ')
            .toUpperCase()
            .match(this.genrePassIn.toUpperCase());
        });
      }

      this.setPagination();

      // this.allProducts.reverse();

      this.isLoading = false;
      console.log('res', response.data);
    },
    getProductDetails(id) {
      this.$router.push({ name: 'Product', params: { productID: id } });
    }
  },
  created() {
    window.scrollTo(0, -1000);

    this.genrePassIn = this.$route.params.genre;
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
  }

  .backdrop_image {
    background-repeat: no-repeat;
    background-position: center center;
    background-position: -100% 10% !important;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    width: 80%;
  }
}

.card-text p {
  display: -webkit-box;
  // max-width: 90%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
