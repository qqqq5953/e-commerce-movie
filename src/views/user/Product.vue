<template>
  <Loading :active="isLoading"></Loading>
  <div class="bg-primary">
    <div class="container py-4">
      <header class="text-white d-none">
        <section class="row">
          <div class="col-8">
            <h2 class="h1 text-white mb-3">{{ title }}</h2>
            <h3 class="h6 text-white">Original title: {{ originalTitle }}</h3>
            <span class="fs-6 me-2">{{ releaseDate.split('-')[0] }}</span> |
            <span class="fs-6 ms-2"
              >{{ runTime.hour }}h {{ runTime.minute }}m</span
            >
          </div>
          <div class="col-4 d-flex align-items-end">
            <div class="ms-auto">
              <h4 class="h6 text-white text-end">popularity</h4>
              <div class="d-block text-end">
                <i class="fs-4 bi bi-star-fill text-warning me-2"></i>
                <span class="fs-3">{{ popularity }}</span>
              </div>
            </div>
            <div class="ms-4">
              <h4 class="h6 text-white text-end">Vote Average</h4>
              <div class="d-block text-end">
                <i class="fs-4 bi bi-people-fill text-info me-2"></i>
                <span class="fs-3">{{ voteAverage }}</span>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main class="text-white mt-4">
        <div class="row">
          <section class="col-9">
            <div class="row h-100 w-100">
              <!-- poster -->
              <div class="col-5">
                <div
                  class="rounded-3 h-100 w-100 position-relative poster-box-shadow"
                  style=""
                >
                  <img
                    v-if="posterUrl"
                    class="img-fluid rounded-3 h-100 w-100"
                    style="object-fit: cover"
                    :src="baseImageUrl + posterUrl"
                    :alt="title"
                  />
                  <div
                    class="position-absolute top-0 bottom-0 w-100 rounded-3"
                    style="background: rgba(255, 255, 255, 0.1)"
                  ></div>
                </div>
              </div>

              <section class="col-7 d-flex flex-column">
                <h2 class="display-5 text-white mb-2">{{ title }}</h2>
                <h3 class="h6 text-white mb-1">
                  Original title:
                  <span class="fw-normal">{{ originalTitle }}</span>
                </h3>
                <div class="text-muted">
                  <span class="fs-6 me-2">{{ releaseDate.split('-')[0] }}</span>
                  |
                  <span class="fs-6 ms-2"
                    >{{ runTime.hour }}H {{ runTime.minute }}M</span
                  >
                </div>

                <!-- overview -->
                <p class="mt-3 fs-5">{{ overview }}</p>
                <!-- badge -->
                <div class="d-flex pb-3">
                  <span
                    class="badge rounded-pill border-secondary me-2"
                    v-for="item in genres"
                    :key="item"
                    >{{ item.name }}</span
                  >
                </div>
                <!-- price -->
                <div
                  class="d-flex justify-content-between align-items-center ms-auto mt-auto mb-3"
                  v-if="nowOrUpcoming === 'nowplaying'"
                >
                  <span>Subscribe:</span>
                  <span class="h3 text-danger ms-3">NT$330</span>
                </div>
                <!-- PURCHASE or subscribe -->
                <div
                  class="row justify-content-between"
                  :class="{ 'mt-auto': nowOrUpcoming === 'upcoming' }"
                  role="group"
                >
                  <div class="col">
                    <button
                      type="button"
                      class="btn btn-outline-light text-center fw-light rounded-3 w-100"
                      :class="{
                        active: status.isProductInList || status.isAdded
                      }"
                      @click="addProductToList"
                    >
                      <span
                        class="spinner-border spinner-grow-sm"
                        v-if="status.watchlistProductID === productID"
                      ></span>
                      <span v-else>
                        <i
                          class="bi bi-bookmark-plus me-2"
                          v-if="!status.isProductInList"
                        ></i>
                        <i class="bi bi-bookmark-check-fill me-2" v-else></i>
                      </span>
                      Watchlist
                    </button>
                  </div>
                  <div class="col" v-if="nowOrUpcoming === 'nowplaying'">
                    <button
                      type="button"
                      class="btn btn-outline-warning text-center text-warning rounded-3 w-100"
                      :disabled="status.subscribeProductID === productID"
                      @click="addProductToCart"
                    >
                      <span
                        class="spinner-border spinner-grow-sm"
                        v-if="status.subscribeProductID === productID"
                      ></span>
                      <i
                        v-if="status.subscribeProductID !== productID"
                        class="bi bi-arrow-right-circle me-2"
                      ></i>
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <aside
            class="col-3 p-3 rounded-3 d-flex flex-column aside-background"
          >
            <div class="row mb-3">
              <!-- popularity -->
              <div class="col d-flex flex-column">
                <h4 class="h6 text-white text-end">popularity</h4>
                <div class="text-end mt-auto">
                  <i class="bi bi-star-fill text-warning me-2"></i>
                  <span>{{ popularity }}</span>
                </div>
              </div>
              <!-- vote -->
              <div class="col d-flex flex-column">
                <h4 class="h6 text-white text-end">Vote Average</h4>
                <div class="text-end mt-auto">
                  <i class="bi bi-people-fill text-info me-2"></i>
                  <span>{{ voteAverage }}</span>
                </div>
              </div>
            </div>
            <ul
              class="d-flex flex-column justify-content-between flex-grow-1 list-unstyled more-video-list mb-0"
            >
              <li
                class="rounded-3 bg-dark"
                v-for="item in Object.values(videoType)"
                :key="item"
              >
                <a
                  href="#"
                  class="btn d-flex justify-content-between text-white w-100 p-3 text-decoration-none fs-6"
                  :class="{ disabled: !item.content.length }"
                  @click.prevent="moreVideos(item.type)"
                >
                  <div>
                    {{ item.type }}
                    <span> ({{ item.content.length }}) </span>
                  </div>

                  <i class="bi bi-chevron-compact-right"></i>
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div class="row mt-5">
          <!-- video -->
          <h2 class="h1 text-white d-flex align-items-center">
            <i class="bi bi-camera-reels text-warning me-3 fs-4"></i>Watch
            Trailer
          </h2>

          <section class="col-9">
            <iframe
              type="text/html"
              allowfullscreen
              width="100%"
              height="500px"
              v-if="trailers.length"
              :src="
                baseYoutubeUrl + trailers[0].key ||
                baseYoutubeUrl + teaser[0].key
              "
            >
            </iframe>
          </section>
          <div class="col-3">
            <!-- <ul
              class="h-100 d-flex flex-column justify-content-evenly list-unstyled border more-video-list"
            >
              <li
                class="flex-grow-1"
                v-for="item in Object.values(videoType)"
                :key="item"
              >
                <a
                  href="#"
                  class="d-block px-2 text-white w-100 h-100 d-flex justify-content-between align-items-center text-decoration-none"
                >
                  {{ item.name.toUpperCase() }}
                  <i class="bi bi-chevron-compact-right"></i>
                </a>
              </li>
            </ul> -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productID: {
      type: String
    }
  },
  inject: ['emitter'],
  data() {
    return {
      // TMDB
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      sessionID: 'd13bca7b7450c217c5af3127e3a0a984db98ccb2',
      account_id: 'qqqq5953',
      list_id: '8191517',
      baseImageUrl: 'https://image.tmdb.org/t/p/w300',
      baseYoutubeUrl: 'https://www.youtube.com/embed/',
      // watchlist
      listStatus: '',
      listStatusMessage: '',
      isLoading: false,
      // Movie
      title: '',
      originalTitle: '',
      imdbID: '',
      runTime: {
        hour: '',
        minute: ''
      },
      trailers: [],
      teasers: [],
      // TV
      seasons: [],
      createdBy: [],
      // 共用
      idPassIn: '',
      releaseDate: '',
      popularity: '',
      voteAverage: '',
      posterUrl: '',
      genres: [],
      overview: '',
      id: '',
      genre: '',
      nowOrUpcoming: '',
      language: 'en-US',
      videoType: {
        behindTheScenes: { type: 'Behind the Scenes', content: [] },
        clips: { type: 'Clips', content: [] },
        teasers: { type: 'Teasers', content: [] },
        trailers: { type: 'Trailers', content: [] },
        featurettes: { type: 'Featurettes', content: [] },
        others: { type: 'Others', content: [] }
      },
      // add to Cart status
      status: {
        subscribeProductID: '',
        watchlistProductID: '',
        isProductInList: ''
      }
    };
  },
  computed: {
    queriesChange() {
      return this.$route.params.productID;
    }
  },
  watch: {
    queriesChange(newVal) {
      // 防止跳回首頁會更新資料
      if (this.$route.name === 'UserProduct') {
        this.idPassIn = newVal;
        this.getProductDetails();
      }
    }
  },
  methods: {
    moreVideos(type) {
      this.$router.push({
        name: 'ProductVideos',
        params: { movieID: this.id, movieTitle: this.title, videoType: type }
      });
    },
    async getProductDetails() {
      this.isLoading = true;

      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.idPassIn}`;
      const response = await this.$http
        .get(api)
        .catch((err) => console.log(err));
      console.log('getProductDetails', response);

      // 產品在 TMDB api 中 的id
      this.id = response.data.product.content.split('|')[0];

      // 產品屬於 movie 或 tv 類別
      this.genre = response.data.product.category.split('|')[0];

      // 產品屬於 nowplaying 或 Upcoming 類別
      this.nowOrUpcoming = response.data.product.category.split('|')[1];

      // 再透過 TMDB api 獲得更多產品資料
      await this.getData();

      this.isLoading = false;
    },
    async getData() {
      // TMDB api
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/${this.genre}/${this.id}?api_key=${this.key}&language=${this.language}&append_to_response=videos,images`
      );
      console.log('getData', response);

      if (this.genre === 'movie') this.getMovieDetail(response);
      if (this.genre === 'tv') this.getTVDetail(response);

      this.posterUrl = response.data.poster_path;
      this.genres = response.data.genres;
      this.overview = response.data.overview;
      this.popularity = response.data.popularity;
      this.voteAverage = response.data.vote_average;

      // video 分類
      this.arrangeVideoType(response.data.videos.results);

      // 預設呈現 trailers (因為 videoType.trailers.content[0].key 抓不到值)
      this.trailers = response.data.videos.results.filter((item) => {
        return item.type === 'Trailer';
      });

      // 如果沒有 trailers 就呈現 teasers
      this.teasers = response.data.videos.results.filter((item) => {
        return item.type === 'Teaser';
      });
    },
    getMovieDetail(response) {
      this.title = response.data.title;
      this.originalTitle = response.data.original_title;
      this.releaseDate = response.data.release_date;

      this.runTime.hour = Math.floor(response.data.runtime / 60);
      this.runTime.minute = response.data.runtime % 60;
      // this.arrangeVideoType(response.data.videos.results);
      this.trailers = response.data.videos.results.filter((item) => {
        return item.type === 'Trailer';
      });
    },
    getTVDetail(response) {
      this.title = response.data.name;
      this.originalTitle = response.data.original_name;
      this.releaseDate = response.data.first_air_date;
      this.seasons = response.data.seasons;
      this.createdBy = response.data.created_by;
      this.runTime.hour = Math.floor(response.data.episode_run_time / 60);
      this.runTime.minute = response.data.episode_run_time % 60;
    },
    arrangeVideoType(types) {
      types.forEach((item) => {
        if (item.type === 'Clip') {
          this.videoType.clips.content.push(item);
        } else if (item.type === 'Teaser') {
          this.videoType.teasers.content.push(item);
        } else if (item.type === 'Trailer') {
          this.videoType.trailers.content.push(item);
        } else if (item.type === 'Featurette') {
          this.videoType.featurettes.content.push(item);
        } else if (item.type === 'Behind the Scenes') {
          this.videoType.behindTheScenes.content.push(item);
        } else {
          this.videoType.others.content.push(item);
        }
      });
    },
    async addProductToCart() {
      // spinner on
      this.status.subscribeProductID = this.idPassIn;

      // api
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      const requestBody = {
        data: { product_id: this.idPassIn, qty: 1 }
      };

      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });
      console.log('addProductToCart', response.data);

      // 更新購物車產品數量
      const cartLength = await this.getCartProductNumber();
      this.emitter.emit('calculate-product-number', cartLength);

      // spinner off
      this.status.subscribeProductID = '';
    },
    async checkProductStatus() {
      const api = `https://api.themoviedb.org/3/list/${this.list_id}/item_status?api_key=${this.key}&movie_id=${this.id}`;

      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      this.status.isProductInList = response.data.item_present;
      console.log('checkProductStatus', response);
    },
    async removeProductFromList() {
      // spinner on
      this.status.watchlistProductID = this.idPassIn;

      // api
      const api = `https://api.themoviedb.org/3/list/${this.list_id}/remove_item?api_key=${this.key}&session_id=${this.sessionID}`;

      const requestBody = {
        media_id: this.id
      };

      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });

      console.log('removeProductFromList', response);
      this.status.isProductInList = !response.data.success;
      this.listStatusMessage = response.data.status_message;

      // spinner off
      this.status.watchlistProductID = '';
    },
    async addProductToList() {
      // spinner on
      this.status.watchlistProductID = this.idPassIn;

      // 檢查是否已經加入 watchlist
      await this.checkProductStatus();
      if (this.status.isProductInList) {
        await this.removeProductFromList();
        return;
      }

      // api
      const api = `https://api.themoviedb.org/3/list/${this.list_id}/add_item?api_key=${this.key}&session_id=${this.sessionID}`;

      const requestBody = {
        media_id: this.id
      };

      const response = await this.$http.post(api, requestBody).catch((err) => {
        console.log(err);
      });

      console.log('addProductToList', response);
      this.status.isProductInList = response.data.success;
      this.listStatusMessage = response.data.status_message;

      // spinner off
      this.status.watchlistProductID = '';
    },
    async getCartProductNumber() {
      // axios
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const response = await this.$http.get(api).catch((err) => {
        console.log(err);
      });

      // 儲存回傳資料
      return response.data.data.carts.length;
    }
  },
  async created() {
    window.scrollTo(0, -1000);

    this.idPassIn = this.productID;
    await this.getProductDetails();
    this.checkProductStatus();
  }
};
</script>

<style lang="scss" scoped>
.poster-box-shadow {
  // box-shadow: rgba(223, 223, 223, 0.24) 1px 1px 20px 2px;
  box-shadow: rgba(178, 198, 206, 0.12) 0px 2px 4px 2px,
    rgba(174, 188, 194, 0.32) 0px 2px 16px 2px;
}

.aside-background {
  background: rgba(255, 255, 255, 0.05);
  background: rgba(52, 58, 64, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
}

.btn-outline-warning:hover {
  color: #000 !important;
}

.more-video-list {
  li a:hover {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0.3rem;
    outline: 1px solid rgba(255, 255, 255, 0.9);
  }
}
</style>
