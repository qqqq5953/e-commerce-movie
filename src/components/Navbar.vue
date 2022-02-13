<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link
        class="navbar-brand nav-link active"
        :to="{ name: 'UserCMDB' }"
        >CMDB</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse row" id="navbarSupportedContent">
        <div class="col">
          <form class="d-flex">
            <div class="position-relative w-100">
              <!-- search bar -->
              <input
                class="form-control form-control-sm h-100"
                type="search"
                placeholder="Search"
                v-model.trim="keywords"
                aria-label="Search with dropdown button"
                ref="searchBar"
                @input="searchInput"
              />
              <a
                href="#"
                class="position-absolute end-0 top-0 bottom-0 p-3 d-flex align-items-center"
                @click.prevent="clearSearchBar"
              >
                <i class="bi bi-x-lg"></i>
              </a>

              <!-- 搜尋結果 :class="{ 'd-none': !keywords.length }"-->
              <ul
                class="text-white list-unstyled position-absolute bg-dark mb-0 start-0 end-0 pt-3 search-list"
                ref="searchList"
                v-if="keywords"
              >
                <Loading :active="isLoading" :is-full-page="false"></Loading>
                <template v-if="match.length">
                  <li
                    class="px-4 py-2 search-item"
                    v-for="item in match"
                    :key="item"
                  >
                    <router-link
                      :to="{
                        name: 'Product',
                        params: {
                          productID: item.id
                        }
                      }"
                      class="text-decoration-none d-flex"
                      @click="clearSearchBar"
                    >
                      <img
                        v-if="item.imageUrl[0]"
                        :src="item.imageUrl[0]"
                        class="card-img-top img-fluid d-block"
                        :alt="item.title"
                      />
                      <div class="ms-3 text-light">
                        <h5 class="text-light mb-0">
                          {{ item.title }}
                        </h5>
                        <small class="text-light">{{
                          item.content.split('|')[2]
                        }}</small>
                      </div>
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider my-0" /></li>
                  <li class="px-4 py-3 search-item">
                    <a href="#" class="text-light" @click.prevent="toAllResult"
                      >See all results</a
                    >
                  </li>
                </template>
                <template v-else>
                  <li class="px-4 pb-3 search-item">no result</li>
                </template>
              </ul>
            </div>
          </form>
        </div>
        <div class="col d-flex">
          <ul class="navbar-nav ms-auto mb-2 mb-md-0 align-items-center">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Pricing' }">
                <span>Pricing</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'AllProducts' }">
                <span>Products</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Watchlist' }"
                >Watchlist</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Cart' }">
                <i class="bi bi-cart2 fs-3 position-relative">
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fs-6"
                  >
                    {{ cartLength }}
                    <span class="visually-hidden">items in cart</span>
                  </span>
                </i></router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Login' }"
                >Admin</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <!-- 測試區 -->
  <div class="row">
    <!-- <div class="col-4">
      <h3>finalData ({{ finalData.length }})</h3>
      <div class="" v-for="item in finalData" :key="item.id + 1">
        {{ item.title || item.name }} | {{ item.popularity }}
      </div>
    </div>
    <div class="col-4">
      <h3>matchedKeyword ({{ matchedKeyword.length }})</h3>
      <div class="" v-for="item in matchedKeyword" :key="item.id + 2">
        {{ item.title || item.name }} | {{ item.popularity }}
      </div>
    </div>
    <div class="col-4">
      <h3>noRepeatData ({{ noRepeatData.length }})</h3>
      <div class="" v-for="item in noRepeatData" :key="item.id">
        {{ item.title || item.name }} | {{ item.popularity }}
      </div>
      <h3>topEightResult ({{ topEightResult.length }})</h3>
      <div class="" v-for="item in topEightResult" :key="item.id">
        {{ item.title || item.name }} | {{ item.popularity }}
      </div>
      <hr />
      <h3>difference ({{ difference.length }})</h3>
      <div class="" v-for="item in difference" :key="item.id">
        {{ item.title || item.name }} | {{ item.popularity }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseImageUrl: 'https://image.tmdb.org/t/p/w200',
      keywords: '',
      language: '',
      isLoading: false,
      // new
      products: [],
      match: [],
      cartLength: ''
    };
  },
  inject: ['emitter'],
  methods: {
    async getCartProductNumber() {
      // axios
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      // 儲存回傳資料
      this.cartLength = response.data.data.carts.length;
    },
    async getProducts() {
      this.isLoading = true;

      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });
      // console.log('res', response.data);

      // 儲存資料
      this.products = response.data.products;

      this.isLoading = false;
    },
    searchInput() {
      if (!this.keywords) return;

      this.match = this.products.filter((item) => {
        return item.title
          .split('-')
          .join(' ')
          .toUpperCase()
          .match(this.keywords.toUpperCase());
      });
    },
    toggleSearchMenu() {
      window.addEventListener('click', (e) => {
        const target = e.target;

        // 點擊 searchBar 以外區域，將 searchList 關閉
        if (target !== this.$refs.searchBar && this.keywords.length) {
          this.$refs.searchList.classList.add('d-none');
        }

        // 點擊 searchBar 區域，將 searchList 打開
        if (target === this.$refs.searchBar && this.keywords.length) {
          this.$refs.searchList.classList.remove('d-none');
        }
      });
    },
    clearSearchBar() {
      this.keywords = '';
    },
    toAllResult() {
      if (!this.keywords) return;
      this.$router.push({
        name: 'AllResults',
        params: {
          genre: this.keywords
        }
      });
      this.clearSearchBar();
    }
  },
  mounted() {
    this.toggleSearchMenu();
    this.getProducts();
    this.getCartProductNumber();

    this.emitter.on('calculate-product-number', (data) => {
      this.cartLength = data;
    });
  }
};
</script>

<style lang="scss" scoped>
input[type='search']::-webkit-search-cancel-button {
  display: none;
}

img {
  height: 70px;
  width: 50px;
  object-fit: cover;
  // object-position: top center;
}

.search-list {
  z-index: 3;
}

.search-item:hover {
  background-color: rgba(81, 84, 87, 0.4);
  // background-color: #55595c;
}
</style>
