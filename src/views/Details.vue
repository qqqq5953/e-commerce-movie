<template>
  <div class="bg-dark">
    <div class="container py-5">
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
      <main class="row text-white mt-4">
        <section class="col-9">
          <div class="row">
            <!-- poster -->
            <div class="col-4">
              <div class="rounded-3 h-100">
                <img
                  v-if="posterUrl"
                  class="img-fluid rounded-3 h-100"
                  style="object-fit: cover"
                  :src="baseImageUrl + posterUrl"
                  :alt="title"
                />
              </div>
            </div>

            <section class="col-8 d-flex flex-column">
              <h2 class="h1 text-white mb-2">{{ title }}</h2>
              <h3 class="h6 text-white mb-1">
                Original title:
                <span class="fw-normal">{{ originalTitle }}</span>
              </h3>
              <div>
                <span class="fs-6 me-2">{{ releaseDate.split('-')[0] }}</span> |
                <span class="fs-6 ms-2"
                  >{{ runTime.hour }}H {{ runTime.minute }}M</span
                >
              </div>

              <!-- overview -->
              <p class="mt-3 fs-6">{{ overview }}</p>
              <!-- badge -->
              <div class="d-flex">
                <span
                  class="badge rounded-pill border-secondary me-2"
                  v-for="item in genres"
                  :key="item"
                  >{{ item.name }}</span
                >
              </div>
              <!-- price -->
              <div class="ms-auto mt-auto mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span>Subscribe:</span>
                  <span class="h3 text-danger ms-3">NT$330</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Pruchase:</span>
                  <span class="text-white ms-3">NT$450</span>
                </div>
              </div>
              <!-- PURCHASE or subscribe -->
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-outline-light text-center fw-light"
                >
                  <i class="bi bi-plus-lg me-2"></i>
                  Watchlist
                </button>
                <button
                  type="button"
                  class="btn btn-outline-light text-center fw-light"
                  @click="addProductToCart"
                >
                  <span class="spinner-border spinner-grow-sm"></span>
                  <i class="bi bi-cart-check fs-5 me-1"></i>
                  PURCHASE
                </button>
                <button
                  type="button"
                  class="btn btn-outline-light text-center text-warning"
                >
                  <span class="spinner-border spinner-grow-sm"></span>
                  <i class="bi bi-arrow-right-circle"></i>
                  SUBSCRIBE
                </button>
              </div>
            </section>
          </div>
        </section>

        <aside class="col-3">
          <ul
            class="d-flex flex-column justify-content-between list-unstyled more-video-list"
          >
            <li
              class="rounded-3 mb-2"
              v-for="item in Object.values(videoType)"
              :key="item"
            >
              <a
                href="#"
                class="d-flex justify-content-between text-white w-100 p-3 text-decoration-none fs-6"
                :class="{ disabled: !item.content.length }"
              >
                {{ item.type.toUpperCase() }} ({{ item.content.length }})
                <i class="bi bi-chevron-compact-right"></i>
              </a>
            </li>
          </ul>
        </aside>

        <section class="row mt-5">
          <!-- video -->
          <div class="col-9">
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
          </div>
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
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: String
    },
    id: {
      type: String
    },
    genre: {
      type: String
    }
  },
  data() {
    return {
      // youtube
      YTkey: 'AIzaSyAii__SjHcD1CNWD4VOpD4adpeaQNT1gSw',
      videoID: '',
      // TMDB
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      baseImageUrl: 'https://image.tmdb.org/t/p/w300',
      baseYoutubeUrl: 'https://www.youtube.com/embed/',
      videoType: {
        behindTheScenes: { type: 'Behind the Scenes', content: [] },
        clips: { type: 'Clips', content: [] },
        teasers: { type: 'Teasers', content: [] },
        trailers: { type: 'Trailers', content: [] },
        featurettes: { type: 'Featurettes', content: [] },
        others: { type: 'Others', content: [] }
      },
      idPassIn: '',
      languagePassIn: '',
      genrePassIn: '',
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
      // person
      biography: '',
      birthday: '',
      personName: '',
      profileImgage: '',
      // 共用
      releaseDate: '',
      popularity: '',
      voteAverage: '',
      posterUrl: '',
      genres: [],
      overview: '',
      // add to Cartstatus: {
      status: {
        loadingItemsID: ''
      }
    };
  },
  methods: {
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
    getPersonDetail(response) {
      this.personName = response.data.name;
      this.biography = response.data.biography;
      this.birthday = response.data.birthday;
      this.profileImgage = response.data.profileI_path;
    },
    async addProductToCart() {
      try {
        this.status.loadingItemsID = this.idPassIn;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
        const response = await this.$http.post(api, {
          data: { product_id: this.idPassIn, qty: 1 }
        });
        this.status.loadingItemsID = {};
        console.log('addProductToCart', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getData() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/${this.genrePassIn}/${this.idPassIn}?api_key=${this.key}&language=${this.languagePassIn}&append_to_response=videos,images`
      );
      console.log('getData', response);

      if (this.genrePassIn === 'movie') this.getMovieDetail(response);
      if (this.genrePassIn === 'tv') this.getTVDetail(response);
      if (this.genrePassIn === 'person') {
        this.getPersonDetail(response);
        return;
      }

      this.popularity = response.data.popularity;
      this.voteAverage = response.data.vote_average;
      this.posterUrl = response.data.poster_path;
      this.genres = response.data.genres;
      this.overview = response.data.overview;

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

      console.log('trailers', this.trailers);
      console.log('teasers', this.teasers);
      console.log('videoType', this.videoType);

      // console.log('getData', response.data);
      // console.log(
      //   'videoType',
      //   this.title,
      //   this.videoType.trailers.content[0].key
      // );

      // console.log('teaser', teaser);
      // console.log('trailer', trailer);
      // console.log('featurette', featurette);

      // this.getYoutube();
      // this.getVideo();
    },
    async getVideo() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/movie/1726/videos?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US'
      );
      console.log('getVideo', response);
    },
    async getYoutube() {
      const response = await this.$http.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.title}%20trailer&type=video&key=${this.YTkey}`
      );
      console.log('youtube', response.data.items[0].id.videoId);
      this.videoID = response.data.items[0].id.videoId;
    }
  },
  computed: {
    queriesChange() {
      return `${this.$route.query.language}|${this.$route.query.id}|${this.$route.query.genre}`;
    }
  },
  watch: {
    // videoType: {
    //   handler: function () {
    //     if (this.videoType.trailers.content.length) {
    //       console.log('watch videoType', this.videoType.trailers.content[0]);
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    queriesChange(newVal) {
      const [newLanguage, newId, newGenre] = newVal.split('|');
      console.log('language 變動', newLanguage);
      console.log('id 變動', newId);
      console.log('genre 變動', newGenre.toLowerCase());

      // 防止跳回首頁會更新資料
      if (this.$route.name === 'Details') {
        this.languagePassIn = newLanguage;
        this.idPassIn = newId;
        this.genrePassIn = newGenre.toLowerCase();

        this.getData();
      }
    }
    // '$route.query.language': {
    //   handler: function (language, id) {
    //     // console.log('lan', language, 'id', id);
    //     this.languagePassIn = language;
    //     this.getData();
    //     console.log('language 變動');
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // '$route.query.id': {
    //   handler: function (id) {
    //     this.idPassIn = id;
    //     this.getData();
    //     console.log('id 變動');
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {
    this.languagePassIn = this.language;
    this.idPassIn = this.id;
    this.genrePassIn = this.genre.toLowerCase();
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.more-video-list {
  li {
    background-color: rgba(26, 26, 26, 0.4);
  }

  li:hover {
    background-color: rgba(81, 84, 87, 0.4);
  }
}
</style>
