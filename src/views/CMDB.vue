<template>
  <div class="bg-dark">
    <div class="container py-5">
      <!-- test -->
      <div class="row">
        <!-- <div class="col">
          <h3 class="text-white">nowPlaying 全 ({{ nowPlaying.length }})</h3>
          <div class="text-white" v-for="item in nowPlaying" :key="item.id">
            {{ item.title }} |
            <span :class="{ 'bg-info': item.popularity > 325 }">{{
              item.popularity
            }}</span>
            |
            {{ item.release_date }}
          </div>
        </div> -->
        <!-- <div class="col">
          <h3 class="text-white">
            nowPlaying1 一半 ({{ nowPlaying1.length }})
          </h3>
          <div class="text-white" v-for="item in nowPlaying1" :key="item.id">
            {{ item.title }} |
            <span class="bg-info">{{ item.popularity }}</span> |
            {{ item.release_date }}
          </div>
        </div> -->
        <!-- <div class="col">
          <h3 class="text-white">Top 20 ({{ top20nowPlaying.length }})</h3>
          <div
            class="text-white"
            v-for="item in top20nowPlaying"
            :key="item.id"
          >
            {{ item.title }} |
            <span class="bg-info">{{ item.popularity }}</span> |
            {{ item.release_date }}
          </div>
        </div> -->
        <!-- <div class="col">
          <h3 class="text-white">difference ({{ difference.length }})</h3>
          <div class="text-white" v-for="item in difference" :key="item.id">
            {{ item.title || item.name }} | {{ item.popularity }}
          </div>
        </div> -->
      </div>

      <!-- Playing Now -->
      <div class="d-flex align-items-center">
        <h2 class="h1 mb-0">
          <a
            href="#"
            @click.prevent="moreResultsOfCMDB('nowPlaying')"
            class="text-white text-decoration-none d-block"
          >
            Now Playing
            <i class="bi bi-chevron-right"></i>
          </a>
        </h2>
        <!-- 語言切換 -->
        <div
          class="btn-group btn-group-sm ms-auto text-right"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            class="btn btn-outline-light"
            :class="{
              active: btnState.nowPlaying.language === 'en-US'
            }"
            @click="switchLanguage('en-US', 'nowPlaying', 'US')"
          >
            US
          </button>
          <button
            type="button"
            class="btn btn-outline-light"
            :class="{
              active: btnState.nowPlaying.language === 'zh-TW'
            }"
            @click="switchLanguage('zh-TW', 'nowPlaying', 'TW')"
          >
            TW
          </button>
        </div>
      </div>
      <section class="overflow-auto mt-3 mb-5 card-scrollbar position-relative">
        <Loading
          :active="isLoadingNowPlaying"
          :is-full-page="false"
          :background-color="'rgba(255, 255, 255, 0.1)'"
        ></Loading>
        <CardVertical
          :results="top20nowPlaying"
          :language="language"
        ></CardVertical>
      </section>

      <!-- UpComing -->
      <div class="d-flex align-items-center">
        <h2 class="h1 mb-0">
          <a
            href="#"
            @click.prevent="moreResultsOfCMDB('upComing')"
            class="text-white text-decoration-none d-block"
          >
            Upcoming
            <i class="bi bi-chevron-right"></i>
          </a>
        </h2>
        <!-- 語言切換 -->
        <div
          class="btn-group btn-group-sm ms-auto text-right"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            class="btn btn-outline-light"
            :class="{
              active: btnState.upComing.language === 'en-US'
            }"
            @click="switchLanguage('en-US', 'upComing', 'US')"
          >
            US
          </button>
          <button
            type="button"
            class="btn btn-outline-light"
            :class="{
              active: btnState.upComing.language === 'zh-TW'
            }"
            @click="switchLanguage('zh-TW', 'upComing', 'TW')"
          >
            TW
          </button>
        </div>
      </div>
      <section class="overflow-auto mt-3 mb-5 card-scrollbar position-relative">
        <Loading
          :active="isLoadingUpComing"
          :is-full-page="false"
          :background-color="'rgba(255, 255, 255, 0.1)'"
        ></Loading>
        <CardVertical
          :results="top20upComing"
          :language="language"
        ></CardVertical>
      </section>
    </div>
  </div>
</template>

<script>
import CardVertical from '../components/CardVerticalTest.vue';

export default {
  components: { CardVertical },
  inject: ['sortData', 'emitter'],
  data() {
    return {
      btnState: {
        nowPlaying: {
          language: 'en-US'
        },
        upComing: {
          language: 'en-US'
        }
      },
      temp: '',
      basrUrl: 'https://api.themoviedb.org/3/',

      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      nowPlaying: [],
      top20nowPlaying: [],
      upComing: [],
      top20upComing: [],
      // difference: [],
      // upComing1: [],
      // original: [],
      nowPlaying1: [],
      totalResult: '',
      language: 'en-US',
      region: 'US',
      isLoadingNowPlaying: false,
      isLoadingUpComing: false,
      pagination: {
        current_page: '',
        total_pages: '',
        has_pre: false,
        has_next: true
      }
    };
  },
  methods: {
    async getPopular() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en-US&page=1`
      );

      console.log('getPopular', response);
    },
    moreResultsOfCMDB(type) {
      this.$router.push({
        name: 'AllResults',
        query: {
          genre: type,
          title: type,
          language: this.language,
          region: this.region
        }
      });
    },
    switchLanguage(language, movieType, region) {
      // console.log('this.language', this.language);
      // console.log('this.region', this.region);
      this.language = language;
      this.region = region;

      if (movieType === 'nowPlaying') {
        this.btnState.nowPlaying.language = language;
        this.getNowPlaying();
      }
      if (movieType === 'upComing') {
        this.btnState.upComing.language = language;
        this.getUpcoming();
      }
    },
    async getNowPlaying() {
      this.isLoadingNowPlaying = true;

      const response = await this.$http.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=${this.language}&region=${this.region}&page=1`
      );
      console.log('getNowPlaying', response);

      const totalPages = response.data.total_pages;
      let allData;
      if (totalPages > 1) {
        allData = await this.getAllNowPlayingData(totalPages);
      }
      allData = response.data.results;
      console.log('totalPages', totalPages);
      console.log('allData', allData);

      const todayDate = this.getTodayDate();

      // 篩選出今天日期以前的電影
      const filterDate = allData.filter((item) => {
        return new Date(item.release_date) <= new Date(todayDate);
      });

      // 按熱門度
      // this.nowPlaying = this.sortData(filterDate, 'popularity');
      // console.log('nowPlaying', this.nowPlaying);

      // 以上篩選結果與這兩行（未篩選）結果一樣
      // this.nowPlaying = response.data.results;
      // this.nowPlaying = this.sortData(this.nowPlaying, 'popularity');

      // 取前 20
      this.top20nowPlaying = this.sortData(filterDate, 'popularity').slice(
        0,
        20
      );

      this.isLoadingNowPlaying = false;
    },
    async getAllNowPlayingData(totalPages) {
      const temp = [];
      for (let page = 1; page <= totalPages; page++) {
        const response = await this.$http.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=${this.language}&region=${this.region}&page=${page}`
        );

        response.data.results.forEach((item) => {
          temp.push(item);
        });
      }
      // console.log('temp', temp);

      return temp;
    },
    getTodayDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    },
    async getUpcoming() {
      this.isLoadingUpComing = true;

      const response = await this.$http.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=${this.language}&region=${this.region}&page=1`
      );
      console.log('getUpcoming', response);

      // 獲得所有資料
      const totalPages = response.data.total_pages;
      const allData = await this.getAllUpComingData(totalPages);

      // 獲得今天日期
      const todayDate = this.getTodayDate();

      // 篩選出今天日期以後的電影
      const filterDate = allData.filter((item) => {
        return new Date(item.release_date) >= new Date(todayDate);
      });

      // 依照熱門度排序
      this.upComing = this.sortData(filterDate, 'popularity');

      // 取前 20
      this.top20upComing = this.upComing.slice(0, 20);

      this.isLoadingUpComing = false;
    },
    async getAllUpComingData(totalPages) {
      const temp = [];
      for (let page = 1; page <= totalPages; page++) {
        const response = await this.$http.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=${this.language}&region=${this.region}&page=${page}`
        );

        response.data.results.forEach((item) => {
          temp.push(item);
        });
      }
      // console.log('temp', temp);

      return temp;
    }
  },
  created() {
    this.getNowPlaying();
    this.getUpcoming();
    this.getPopular();
  }
};
</script>

<style lang="scss" scoped>
.card-scrollbar {
  scroll-snap-type: x mandatory;
  overscroll-behavior-inline: contain;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(85, 89, 92, 1);
    border-radius: 100vw;
    margin-inline: 10vw;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(26, 26, 26, 1);
    border-radius: 100vw;
    border: 2px solid rgba(85, 89, 92, 1);

    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
