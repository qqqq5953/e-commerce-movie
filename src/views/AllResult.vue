<template>
  <div class="container py-5">
    <h2>Displaying {{ totalResult }} results for: {{ titlePassIn }}</h2>

    <Pagination
      :pages="pagination"
      @change-page="getData"
      @previous-page="getData"
      @next-page="getData"
    ></Pagination>

    <ul class="row list-unstyled">
      <li class="col-9 mb-4" v-for="item in results" :key="item.id">
        <a
          href="#"
          class="text-decoration-none d-block"
          @click.prevent="getCardDetail(item.id)"
        >
          <div class="card mb-3 border-dark" style="height: 250px">
            <div class="row g-0 h-100">
              <div class="col-3 h-100">
                <div class="h-100">
                  <img
                    v-if="item.poster_path"
                    :src="baseImageUrl + item.poster_path"
                    class="card-img-top img-fluid d-block h-100"
                    style="object-fit: cover"
                    :alt="item.title"
                  />
                </div>
              </div>
              <div class="col-9">
                <div class="card-body h-100 d-flex flex-column">
                  <!-- title -->
                  <div class="d-flex align-items-center">
                    <h3 class="card-title mb-1">
                      {{ item.title || item.name }}
                    </h3>
                    <small class="ms-auto text-dark flex-shrink-0"
                      >popularity:
                      <span class="fs-5">{{
                        item.popularity.toFixed(0)
                      }}</span></small
                    >
                  </div>

                  <!-- overview -->
                  <div class="card-text">
                    <small class="text-dark">{{ item.release_date }}</small>

                    <p class="mt-3">{{ item.overview }}</p>
                  </div>

                  <!-- see more -->
                  <div class="text-end mt-auto px-2">
                    <span> &#171; see more &#187;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
export default {
  components: {
    Pagination
  },
  props: {
    keywords: {
      type: String
    },
    genre: {
      type: String
    },
    language: {
      type: String
    },
    region: {
      type: String
    }
  },
  data() {
    return {
      basrUrl: 'https://api.themoviedb.org/3/',
      baseImageUrl: 'https://image.tmdb.org/t/p/w200',
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      auth: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmJlNjAwNWNmZGE1OTNkYzIxY2NlYjkzZWFmOWE4ZSIsInN1YiI6IjYxZjBhZGI1YzY2OWFkMDBjZWEzMDVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n5tebMbjgJK3rlc5_VPmShHCgLujieUY_rhasZD14Hg',
      results: [],
      totalResult: '',
      titlePassIn: '',
      genrePassIn: '',
      languagePassIn: '',
      regionPassIn: 'TW',
      pagination: {
        current_page: '',
        total_pages: '',
        has_pre: false,
        has_next: true
      }
    };
  },
  inject: ['sortData', 'emitter'],
  computed: {
    queriesChange() {
      return `${this.$route.query.language}|${this.$route.query.title}|${this.$route.query.genre}`;
    }
  },
  watch: {
    queriesChange(newVal) {
      const [newLanguage, newTitle, newGenre] = newVal.split('|');
      console.log('language 變動', newLanguage);
      console.log('title 變動', newTitle);
      console.log('genre 變動', newGenre.toLowerCase());

      // 防止跳回首頁會更新資料
      if (this.$route.name === 'AllResults') {
        this.languagePassIn = newLanguage;
        this.titlePassIn = newTitle;
        this.genrePassIn = newGenre.toLowerCase();

        this.getData();
      }
    }
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    },
    getCardDetail(id) {
      this.$router.push({
        name: 'Details',
        query: {
          language: this.languagePassIn,
          id: id,
          genre: this.genrePassIn === 'tv' ? 'tv' : 'movie'
        }
      });
    },
    async getData(page = 1) {
      const todayDate = this.getTodayDate();
      let response = [];
      let filterResultsByDate = [];

      // Now playing 結果
      if (this.genrePassIn === 'nowplaying') {
        response = await this.$http.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=${this.languagePassIn}&region=${this.regionPassIn}&page=${page}`
        );

        // 篩選出今天日期以前的電影
        filterResultsByDate = response.data.results.filter((item) => {
          return new Date(item.release_date) <= new Date(todayDate);
        });
      }

      // Upcoming 結果
      if (this.genrePassIn === 'upcoming') {
        response = await this.$http.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=${this.languagePassIn}&region=${this.regionPassIn}&page=${page}`
        );

        // 篩選出今天日期以後的電影
        filterResultsByDate = response.data.results.filter((item) => {
          return new Date(item.release_date) >= new Date(todayDate);
        });
      }

      // 一般搜尋結果
      if (this.genrePassIn === 'movie' || this.genrePassIn === 'tv') {
        response = await this.$http.get(
          `https://api.themoviedb.org/3/search/${this.genrePassIn}?api_key=${this.key}&query=${this.titlePassIn}&page=${page}&language=${this.languagePassIn}&region=${this.regionPassIn}`
        );

        filterResultsByDate = response.data.results;
      }

      // 依照熱門度排列
      this.results = this.sortData(filterResultsByDate, 'popularity');
      console.log('getData', this.results);

      // pagination
      this.setPagination(response, page);

      // 總資料筆數
      this.totalResult = response.data.total_results;
      // console.log('getData', this.results);
    },
    setPagination(response, page) {
      console.log('page', page);
      console.log('this.pagination.total_pages', response.data.total_pages);

      this.pagination.total_pages = response.data.total_pages;
      this.pagination.current_page = response.data.page;

      // 第一頁
      if (page === 1 && page !== this.pagination.total_pages) {
        // 總頁數不等於一
        this.pagination.has_pre = false;
        this.pagination.has_next = true;
      } else {
        // 總頁數等於一
        this.pagination.has_pre = false;
        this.pagination.has_next = false;
      }

      // 中間頁
      if (page > 1 && page < this.pagination.total_pages) {
        this.pagination.has_pre = true;
        this.pagination.has_next = true;
      }

      // 最後一頁
      if (page === this.pagination.total_pages && page !== 1) {
        this.pagination.has_pre = true;
        this.pagination.has_next = false;
      }
    },
    async discoverMovie() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_cast=3223&with_crew=3223&with_people=3223&with_keywords=${this.titlePassIn}&with_watch_monetization_types=flatrate`
      );
      console.log('discoverMovie', response);
    }
  },
  created() {
    console.log('SearchResult created');

    this.titlePassIn = this.keywords;
    this.genrePassIn = this.genre.toLowerCase();
    this.languagePassIn = this.language;
    this.regionPassIn = this.region;
    this.getData();

    // if (this.genrePassIn === 'movie' || this.genrePassIn === 'tv') {
    // }
  }
};
</script>

<style lang="scss" scoped>
ul a:hover {
  .card {
    background-color: #343a40;
    background-color: #55595c;
    color: #fff;
  }

  & small {
    color: #fff !important;
  }
}

img {
  // height: 500px;
  object-fit: cover;
  object-position: top center;
}

.card-text p {
  display: -webkit-box;
  // max-width: 90%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
