<template>
  <div class="bg-dark">
    <div class="container py-4">
      <!-- test -->
      <!-- <ul class="">
        <li v-for="item in videoType" :key="item.title">
          <button class="" type="button">
            {{ item }}
          </button>
        </li>
      </ul> -->
      <header
        class="d-flex justify-content-md-between flex-wrap align-items-center border-bottom pb-4"
      >
        <div class="col text-white d-flex flex-wrap align-items-lg-center">
          <h2 class="flex-shrink-0 h1 mb-lg-0 text-white">Video Gallery：</h2>
          <h3 class="flex-shrink-0 h4 mb-md-0 mb-3 text-white">
            {{ titlePassIn }}
            <span class="text-muted me-2" v-if="product.release_date"
              >({{ product.release_date.split('-')[0] }})</span
            >
          </h3>
        </div>

        <div class="col-xl-2 col-lg-3 col-md-4 col-12 align-self-end">
          <div class="dropdown">
            <button
              class="btn btn-secondary btn-sm w-100 d-flex justify-content-between dropdown-toggle"
              type="button"
              id="videoTypeButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{{ selectedVideoType }}</span>
              <i class="bi bi-caret-down-fill"></i>
            </button>
            <ul class="dropdown-menu w-100" aria-labelledby="videoTypeButton">
              <li v-for="item in videoType" :key="item.title">
                <template v-if="item.content.length">
                  <button
                    class="dropdown-item py-2"
                    type="button"
                    @click="selectVideoType(item.type)"
                  >
                    {{ item.type }}
                  </button>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main class="pt-4">
        <ul class="text-white list-unstyled row justify-content-between">
          <li
            v-for="item in videoContent"
            :key="item"
            class="col-md-6 mb-md-3 mb-4 d-flex flex-column justify-content-between"
          >
            <h4 class="text-white bg-primary py-2 px-3 flex-grow-1">
              {{
                item.name.split(' | ')[2] ||
                item.name.split(' | ')[1] ||
                item.name.split(' | ')[0] ||
                item.name
              }}
            </h4>
            <iframe
              type="text/html"
              allowfullscreen
              width="100%"
              height="325px"
              :src="baseYoutubeUrl + item.key"
            >
            </iframe>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-toggle::after {
  display: none;
}
</style>

<script>
export default {
  props: {
    movieID: {
      type: String
    },
    movieTitle: {
      type: String
    },
    movieVideoType: {
      type: String
    }
  },
  inject: ['emitter'],
  data() {
    return {
      key: '7bbe6005cfda593dc21cceb93eaf9a8e',
      baseImageUrl: 'https://image.tmdb.org/t/p/w300',
      baseYoutubeUrl: 'https://www.youtube.com/embed/',
      idPassIn: '',
      titlePassIn: '',
      selectedVideoTypePassIn: '',
      selectedVideoType: '',
      product: [],
      videoType: {
        behind: { type: 'Behind the Scenes', content: [] },
        clips: { type: 'Clips', content: [] },
        teasers: { type: 'Teasers', content: [] },
        trailers: { type: 'Trailers', content: [] },
        featurettes: { type: 'Featurettes', content: [] },
        others: { type: 'Others', content: [] }
      }
    };
  },
  computed: {
    videoContent() {
      let temp = [];

      if (this.selectedVideoType === 'Behind the Scenes') {
        // 選擇 hehind the scenes 之調整
        temp = this.videoType.behind.content;
      } else {
        temp = this.videoType[this.selectedVideoType.toLowerCase()].content;
      }

      return temp.reverse();
    }
  },
  methods: {
    selectVideoType(type) {
      this.selectedVideoType = type;
    },
    async getData() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/movie/${this.idPassIn}?api_key=${this.key}&language=en-US&append_to_response=videos,images`
      );
      console.log('getData', response);

      this.product = response.data;

      // video 分類
      this.arrangeVideoType(response.data.videos.results);
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
          this.videoType.behind.content.push(item);
        } else {
          this.videoType.others.content.push(item);
        }
      });
    }
  },
  created() {
    window.scrollTo(0, -1000);

    this.idPassIn = this.movieID;
    this.titlePassIn = this.movieTitle;
    this.selectedVideoTypePassIn = this.movieVideoType;
    this.selectedVideoType = this.selectedVideoTypePassIn;
    this.getData();
  }
};
</script>
