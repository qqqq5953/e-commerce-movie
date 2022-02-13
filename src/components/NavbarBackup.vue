<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand nav-link active" to="/"
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link disabled" :to="{ name: 'Products' }"
              >Genres</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'SearchResult' }"
              >SearchResult</router-link
            >
          </li> -->
          <!-- <li class="nav-item">
            <router-link class="nav-link disabled" :to="{ name: 'Orders' }"
              >Watchlist</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link disabled" :to="{ name: 'Coupon' }"
              >Cart</router-link
            >
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserProducts' }"
              >ProductList</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Login' }"
              >Admin</router-link
            >
          </li>
        </ul>
        <form class="d-flex flex-grow-1">
          <div class="input-group">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Movie
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li v-for="genre in searchBy" :key="genre">
                <button class="dropdown-item" type="button">
                  {{ genre.displayName }}
                </button>
              </li>
            </ul>
            <div class="flex-grow-1 position-relative">
              <!-- search bar -->
              <input
                class="form-control h-100"
                type="search"
                placeholder="Search"
                v-model.trim="keywords"
                aria-label="Search with dropdown button"
              />
              <a
                href="#"
                class="position-absolute end-0 top-0 bottom-0 p-4 d-flex align-items-center"
                @click.prevent="clearKeywords"
              >
                <i class="bi bi-x-lg"></i>
              </a>

              <!-- 搜尋結果 -->
              <ul
                class="text-white list-unstyled position-absolute bg-dark mb-0 start-0 end-0 pt-3 search-list"
                :class="{ 'd-none': keywords.length }"
              >
                <Loading :active="isLoading" :is-full-page="false"></Loading>

                <li
                  class="px-4 py-2 search-item"
                  v-for="item in topEightResult"
                  :key="item"
                >
                  <a href="#" class="text-decoration-none d-flex">
                    <img
                      v-if="item.poster_path"
                      :src="baseImageUrl + item.poster_path"
                      class="card-img-top img-fluid d-block"
                      :alt="item.title"
                    />
                    <div class="ms-3 text-light">
                      <h5 class="text-light mb-0">
                        {{ item.title || item.name }}
                      </h5>
                      <small class="text-light">{{ item.release_date }}</small>
                    </div>
                  </a>
                </li>
                <li><hr class="dropdown-divider my-0" /></li>
                <li class="px-4 py-3 search-item">
                  <a href="#" class="text-light">See all results</a>
                </li>
              </ul>
            </div>
          </div>
          <button
            class="btn btn-outline-success"
            type="button"
            @click="searchMovie"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>

  <!-- 測試區 -->
  <div class="row">
    <div class="col-4">
      <h3>allData ({{ allData.length }})</h3>
      <div class="" v-for="item in allData" :key="item.id + 1">
        {{ item.index }}. {{ item.title || item.name }} | {{ item.popularity }}
      </div>
    </div>
    <!-- <div class="col-4">
      <h3>matchedKeyword ({{ matchedKeyword.length }})</h3>
      <div class="" v-for="item in matchedKeyword" :key="item.id + 2">
        {{ item.index }}. {{ item.title || item.name }} | {{ item.popularity }}
      </div>
    </div>
    <div class="col-4">
      <h3>topEightResult ({{ topEightResult.length }})</h3>
      <div class="" v-for="item in topEightResult" :key="item.id">
        {{ item.index }}. {{ item.title || item.name }} | {{ item.popularity }}
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
      allData: [],
      baseImageUrl: 'https://image.tmdb.org/t/p/w200',
      matchedKeyword: [],
      topEightResult: [],
      keywords: '',
      searchBy: [
        {
          displayName: 'All',
          apiKeyword: 'multi'
        },
        {
          displayName: 'Movie',
          apiKeyword: 'movie'
        },
        {
          displayName: 'TV',
          apiKeyword: 'tv'
        },
        {
          displayName: 'People',
          apiKeyword: 'person'
        }
      ],
      isLoading: false,
      difference: []
    };
  },
  watch: {
    keywords() {
      this.filterKeyword();
    }
  },
  methods: {
    closeMenu() {},
    clearKeywords() {
      console.log('clearKeywords');
      console.log('clearKeywords allData', this.allData.length);
      console.log('clearKeywords matchedKeyword', this.matchedKeyword.length);

      this.keywords = '';
      this.matchedKeyword.splice(0, this.matchedKeyword.length);
      this.topEightResult.splice(0, this.topEightResult.length);
      this.allData.splice(0, this.allData.length);
      // this.matchedKeyword.length = 0;
      // this.topEightResult.length = 0;
      // this.allData.length = 0;

      console.log('clearKeywords allData', this.allData);
      console.log('clearKeywords matchedKeyword', this.matchedKeyword);
      console.log('clearKeywords topEightResult', this.topEightResult);
    },
    async getAllData(page) {
      // avoid 422 error
      if (this.keywords === '') return;

      const response = await this.$http.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&query=${this.keywords}&page=${page}&include_adult=false`
      );
      response.data.results.forEach((item, i) => {
        this.allData.push({ ...item, index: i });
      });
    },
    async filterKeyword() {
      this.matchedKeyword.length = 0;
      this.topEightResult.length = 0;
      this.allData.length = 0;

      if (this.keywords === '') return;

      // this.isLoading = true;

      // 找出該關鍵字總共有幾頁結果
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/search/keyword?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=en-US&query=${this.keywords}&page=1&include_adult=false`
      );
      const totalPages = response.data.total_pages;
      const totalResults = response.data.total_results;
      console.log('=======================');
      console.log('keywords', this.keywords);
      console.log('totalPages', totalPages);
      console.log('totalResults', totalResults);
      console.log('response', response.data.results);

      // 將所有結果存進 allData
      setTimeout(() => {
        console.log('keywords', this.keywords);
      }, 1000);

      // for (let page = 1; page <= totalPages; page++) {
      //   await this.getAllData(page);
      // }
      // console.log('filterKeyword allData', this.allData.length);

      // 將 allData 與關鍵字比對
      // this.matchedKeyword = this.allData.filter((item) => {
      //   if (item.title) {
      //     return item.title
      //       .split('-')
      //       .join(' ')
      //       .toUpperCase()
      //       .match(this.keywords.toUpperCase());
      //   } else {
      //     return item.name
      //       .split('-')
      //       .join(' ')
      //       .toUpperCase()
      //       .match(this.keywords.toUpperCase());
      //   }
      // });

      // console.log('filterKeyword allData', this.allData.length);
      // console.log('filterKeyword matchedKeyword', this.matchedKeyword);

      // 依照熱度排名
      // this.matchedKeyword.sort(function (a, b) {
      //   return b.popularity - a.popularity;
      // });

      // 剔除重複
      // const result = this.matchedKeyword.filter(function (element, index, arr) {
      //   return arr.indexOf(element) === index;
      // });

      // 前8
      // this.topEightResult = this.matchedKeyword.slice(0, 8);
      // console.log('topEightResult', this.topEightResult);

      // this.isLoading = false;

      // this.difference = this.allData.filter(
      //   (x) => !this.matchedKeyword.includes(x)
      // );

      // console.log('difference', difference);
      // this.difference.forEach((item) => {
      //   if (item.title) {
      //     console.log('title', item.title);
      //   } else {
      //     console.log('name', item.name);
      //   }
      // });
    },
    searchMovie() {
      // this.$router.push({
      //   name: 'SearchResult',
      //   params: {
      //     title: this.keywords
      //   }
      // });

      this.$router.push({
        name: 'SearchResult',
        query: {
          title: this.keywords
        }
      });
      this.clearKeywords();
    }
  },
  created() {
    // this.filterKeyword();
    // this.getAllData();
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
  z-index: 2;
}

.search-item:hover {
  background-color: rgba(81, 84, 87, 0.4);
  // background-color: #55595c;
}
</style>
