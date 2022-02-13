<template>
  <div class="container py-5">
    <h2>Displaying {{ totalResult }} results for:{{ keywords }}</h2>

    <Pagination
      :pages="pagination"
      @change-page="getMovie"
      @previous-page="getMovie"
      @next-page="getMovie"
    ></Pagination>

    <div class="row">
      <div class="col-4 mb-4" v-for="item in results" :key="item.id">
        <div class="card h-100 mb-3 border-dark">
          <div style="height: 500px">
            <img
              v-if="item.poster_path"
              :src="baseImageUrl + item.poster_path"
              class="card-img-top img-fluid d-block"
              :alt="item.title"
            />
          </div>

          <div class="card-body flex-grow-1">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-text">
              {{ item.overview }}
            </p>
          </div>

          <div class="card-footer text-muted">
            <p>release_date：{{ item.release_date }}</p>
            <p>vote_average：{{ item.vote_average }}</p>
          </div>
        </div>
      </div>
    </div>
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
    }
  },
  data() {
    return {
      temp: '',
      basrUrl: 'https://api.themoviedb.org/3/',
      baseImageUrl: 'https://image.tmdb.org/t/p/w200',
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      auth: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmJlNjAwNWNmZGE1OTNkYzIxY2NlYjkzZWFmOWE4ZSIsInN1YiI6IjYxZjBhZGI1YzY2OWFkMDBjZWEzMDVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n5tebMbjgJK3rlc5_VPmShHCgLujieUY_rhasZD14Hg',
      results: [],
      totalResult: '',
      name: '',
      pagination: {}
    };
  },
  watch: {
    // keywords() {
    //   console.log('keywords', this.keywords);
    //   this.name = this.keywords;
    //   this.getMovie();
    // }
    // '$route.params.id': {
    //   handler: function (id) {
    //     this.name = id;
    //     // this.getMovie();
    //   },
    //   deep: true,
    //   immediate: true
    // }
    '$route.query.title': {
      handler: function (title) {
        this.name = title;
        this.getMovie();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    sortResultByDate() {
      const test = this.results.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date);
      });
      console.log('test', test);
    },
    async getMovie() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&query=${this.name}&page=1`
      );
      this.results = response.data.results;
      this.totalResult = response.data.total_results;
      console.log('getMovie', response);
    },
    async discoverMovie() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/discover/movie?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
      );
      console.log('discoverMovie', response);
    },
    async getPerson() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/search/person?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&query=Robert%20John%20Downey&page=1&include_adult=false'
      );
      console.log('getPerson', response);
    },
    async getMulti() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/search/multi?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&query=iron&page=1&include_adult=false'
      );
      console.log('getMulti', response);
    },
    async getGenres() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US'
      );
      console.log('getGenres', response);
    },
    async getKeywords() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/movie/1726/keywords?api_key=7bbe6005cfda593dc21cceb93eaf9a8e'
      );
      console.log('getKeywords', response);
    },
    async getCollections() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/search/collection?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&query=fast&page=1'
      );
      console.log('getCollections', response);
    },
    async getVideo() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/movie/1726/videos?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US'
      );
      console.log('getVideo', response);
    },
    async getRecommenations() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/movie/1726/recommendations?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&page=1'
      );
      console.log('getRecommenations', response);
    },
    async getNowPlaying() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&page=1&region=TW'
      );
      console.log('getNowPlaying', response);
    },
    async getUpcoming() {
      const response = await this.$http.get(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&page=1&region=TW'
      );
      console.log('getUpcoming', response);
    }
  },
  created() {
    // console.log('search result created', this.$route.params.id);
    // this.getMulti();
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 500px;
  object-fit: cover;
}
</style>
