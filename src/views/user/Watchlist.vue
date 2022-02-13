<template>
  <div class="bg-primary">
    <div class="container py-4">
      <header>
        <div class="d-flex align-items-center">
          <i class="bi bi-bookmark-plus text-warning me-3 fs-4"></i>
          <h2 class="h1 text-white mb-0">watchlist</h2>
        </div>
      </header>
      <main class="mt-4">
        <ul class="row flex-wrap list-unstyled mb-0">
          <li class="col-3 mb-4" v-for="item in listResult" :key="item.id">
            <div
              class="card rounded-3 border-0 card-img-box-shadow h-100 position-relative"
            >
              <a
                href="#"
                @click.prevent="removeProductFromList(item.id)"
                class="position-absolute watchlist-item-delete d-block"
              >
                <i class="bi bi-x-lg"></i>
              </a>
              <a
                href="#"
                class="text-decoration-none d-block overflow-hidden"
                @click.prevent="getProductID(item.id)"
              >
                <div
                  class="card-background rounded-3 card-img-border-adjusted"
                  :style="{
                    backgroundImage: `url(${baseImageUrl + item.poster_path})`
                  }"
                ></div>
              </a>

              <div class="card-body d-flex flex-column">
                <h5 class="card-title h4">{{ item.title }}</h5>
                <small class="mt-auto">{{ item.release_date }}</small>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>

  <!-- test -->
  <div>
    <!-- <h3>Step 1</h3>
  <button class="btn btn-primary" type="button" @click="getRequestToken">
    create request token
  </button>
  requestToken:{{ requestToken }} -->

    <!-- <h3>Step 2</h3>
  <a
    :href="approvedPageUrl"
    target="blank"
    @click="goToAuthentication"
    class="d-inline-block"
    >authentication</a
  > -->

    <!-- <h3>Step 3</h3>
  <button class="btn btn-primary" type="button" @click="createSessionID">
    create sessionID
  </button>
  sessionID:{{ sessionID }} -->

    <!-- <h3>Step 4</h3>
    <button class="btn btn-primary" type="button" @click="getList">
      get List
    </button>
    listResult:{{ listResult }} -->

    <!-- <h3>Step 5</h3>
  <button class="btn btn-primary" type="button" @click="addToWatchList">
    add To WatchList
  </button>
  WatchList:{{ watchListStatus }} -->

    <!-- <h3>Step 6</h3>
  <button class="btn btn-primary" type="button" @click="getMovieWatchList">
    get WatchList
  </button>
  WatchList:{{ watchList }} -->

    <!-- <ul v-for="item in watchList" :key="item.id">
    <li>{{ item.title }}</li>
  </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      baseImageUrl: 'https://image.tmdb.org/t/p/w300',
      list_id: '8191517',
      sessionID: 'd13bca7b7450c217c5af3127e3a0a984db98ccb2',
      listResult: null,
      listStatusMessage: '',
      products: [],
      productID: '',
      // test
      requestToken: '',
      approvedPageUrl: '',
      listResponse: '',
      listResponseMessage: '',
      listID: '',
      id: '646385',
      watchListStatus: null,
      watchList: null,
      account_id: 'qqqq5953'
    };
  },
  methods: {
    async getList() {
      const api = `https://api.themoviedb.org/3/list/${this.list_id}?api_key=${this.key}&language=en-US`;

      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      this.listResult = response.data.items;
      console.log('getList', response);
    },
    async getProducts() {
      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      console.log('getProducts', response.data);
      this.products = response.data.products;
    },
    getProductID(id) {
      const filterProductArray = this.products.filter((item) => {
        return item.content.split('|')[0] === id.toString();
      });

      this.productID = filterProductArray[0].id;

      this.$router.push({
        name: 'Product',
        params: {
          productID: this.productID
        }
      });
    },
    async removeProductFromList(id) {
      // api
      const api = `https://api.themoviedb.org/3/list/${this.list_id}/remove_item?api_key=${this.key}&session_id=${this.sessionID}`;

      const requestBody = {
        media_id: id
      };

      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });

      console.log('removeProductFromList', response);

      this.listStatusMessage = response.data.status_message;

      this.getList();
    },
    // test
    async getRequestToken() {
      // api
      const api = `https://api.themoviedb.org/3/authentication/token/new?api_key=${this.key}`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      console.log('getRequestToken', response);

      this.requestToken = response.data.request_token;
    },
    goToAuthentication() {
      this.approvedPageUrl = `https://www.themoviedb.org/authenticate/${this.requestToken}`;
    },
    async createSessionID() {
      // api
      const api = `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.key}`;
      const requestBody = {
        request_token: this.requestToken
      };
      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });

      console.log('createSessionID', response);

      this.sessionID = response.data.session_id;
    },
    async createList() {
      const api = `https://api.themoviedb.org/3/list?api_key=${this.key}&session_id=${this.sessionID}`;

      const requestBody = {
        name: 'Test 1',
        description: 'Test 1',
        language: 'en'
      };

      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });

      this.listResponse = response.data.success;
      this.listResponseMessage = response.data.status_message;
      this.listID = response.data.list_code;
      console.log('createList', response);
    },
    async addToWatchList() {
      const api = `https://api.themoviedb.org/3/account/${this.account_id}/watchlist?api_key=${this.key}&session_id=${this.sessionID}`;

      const requestBody = {
        media_type: 'movie',
        media_id: this.id,
        watchlist: true
      };

      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });

      this.watchListStatus = response;
      console.log('addToWatchList', response);
    },
    async getMovieWatchList() {
      const api = `https://api.themoviedb.org/3/account/${this.account_id}/watchlist/movies?api_key=${this.key}&language=en-US&session_id=${this.sessionID}&sort_by=created_at.asc&page=1`;

      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      this.watchList = response.data.results;
      console.log('getMovieWatchList', response);
    }
  },
  created() {
    this.getList();
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
.watchlist-item-delete {
  top: 10px;
  right: 10px;
  z-index: 2;

  color: rgba(255, 255, 255, 0.5);
  padding: 4px 7px 3px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);

  // pointer-events: none !important;

  &:hover {
    color: white;
  }
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 80px -25px rgba(0, 0, 0, 0.5);
  transition: all 0.4s;
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
}

.card-background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  // height: 344px;
  padding: 65.8% 0;
}

.card-img-box-shadow {
  box-shadow: rgba(178, 198, 206, 0.12) 0px 3px 4px 2px,
    rgba(174, 188, 194, 0.32) 0px 3px 10px 2px;
}

.card-img-border-adjusted {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>
