<template>
  <div class="bg-dark">
    <div class="container py-5">
      <header class="text-white">
        <section class="row">
          <div class="col-8">
            <h1 class="text-white mb-3">{{ title }}</h1>
            <h2 class="h6 text-white">Original title: {{ originalTitle }}</h2>
            <span class="fs-6 me-2">{{ releaseDate.split('-')[0] }}</span> |
            <span class="fs-6 ms-2"
              >{{ runTime.hour }}h {{ runTime.minute }}m</span
            >
          </div>
          <div class="col-4 d-flex align-items-end">
            <div class="ms-auto">
              <h3 class="h6 text-white text-end">popularity</h3>
              <div class="d-block text-end">
                <i class="fs-4 bi bi-star-fill text-warning me-2"></i>
                <span class="fs-3">{{ popularity }}</span>
              </div>
            </div>
            <div class="ms-4">
              <h3 class="h6 text-white text-end">Vote Average</h3>
              <div class="d-block text-end">
                <i class="fs-4 bi bi-people-fill text-info me-2"></i>
                <span class="fs-3">{{ voteAverage }}</span>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main class="text-white mt-4">
        <section class="row">
          <!-- poster -->
          <div class="col-3">
            <div class="h-100 rounded-3 border border-2 border-primary">
              <img
                v-if="posterUrl"
                class="img-fluid"
                :src="baseImageUrl + posterUrl"
                :alt="title"
              />
            </div>
          </div>
          <!-- video -->
          <div class="col-6">
            <iframe
              type="text/html"
              allowfullscreen
              width="100%"
              height="100%"
              v-if="trailers.length"
              :src="baseYoutubeUrl + trailers[0].key"
            >
            </iframe>
          </div>
          <div class="col-3">
            <ul
              class="h-100 d-flex flex-column justify-content-between list-unstyled more-video-list"
            >
              <li
                class="rounded-3"
                v-for="item in Object.values(videoType)"
                :key="item"
              >
                <a
                  href="#"
                  class="d-flex justify-content-between text-white w-100 p-3 text-decoration-none fs-6"
                >
                  {{ item.type.toUpperCase() }} ({{ item.content.length }})
                  <i class="bi bi-chevron-compact-right"></i>
                </a>
              </li>
            </ul>
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

        <article class="row mt-4">
          <div class="col-7">
            <div class="d-flex">
              <span
                class="badge rounded-pill border-secondary me-2 mb-3"
                v-for="item in genres"
                :key="item"
                >{{ item.name }}</span
              >
            </div>
            <p>{{ overview }}</p>
            <ul>
              <li></li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    language1: {
      type: String
    },
    movieID1: {
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
      movieID: '',
      language: '',
      title: '',
      originalTitle: '',
      releaseDate: '',
      popularity: '',
      imdbID: '',
      voteAverage: '',
      posterUrl: '',
      genres: [],
      overview: '',
      runTime: {
        hour: '',
        minute: ''
      },
      trailers: []
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
    async getData() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/movie/${this.movieID}?api_key=${this.key}&language=${this.language}&append_to_response=videos,images`
      );
      this.title = response.data.title;
      this.originalTitle = response.data.original_title;
      this.releaseDate = response.data.release_date;
      this.popularity = response.data.popularity;
      this.imdbID = response.data.imdb_id;
      this.voteAverage = response.data.vote_average;
      this.posterUrl = response.data.poster_path;
      this.genres = response.data.genres;
      this.overview = response.data.overview;
      this.runTime.hour = Math.floor(response.data.runtime / 60);
      this.runTime.minute = response.data.runtime % 60;
      this.arrangeVideoType(response.data.videos.results);
      this.trailers = response.data.videos.results.filter((item) => {
        return item.type === 'Trailer';
      });

      // console.log('getData', response.data);
      // console.log(
      //   'videoType',
      //   this.title,
      //   this.videoType.trailers.content[0].key
      // );

      // const featurette = arr.filter((item) => {
      //   return item.type === 'Featurette';
      // });

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
      return `${this.$route.query.language}|${this.$route.query.id}`;
    }
  },
  watch: {
    videoType: {
      handler: function () {
        if (this.videoType.trailers.content.length) {
          console.log('watch videoType', this.videoType.trailers.content[0]);
        }
      },
      deep: true,
      immediate: true
    },
    queriesChange(newVal) {
      const [newLanguage, newId] = newVal.split('|');
      console.log('language 變動', newLanguage);
      console.log('id 變動', newId);
      if (this.$route.name === 'Movie') {
        this.language = newLanguage;
        this.movieID = newId;
        this.getData();
      }
    }
    // '$route.query.language': {
    //   handler: function (language, id) {
    //     // console.log('lan', language, 'id', id);
    //     this.language = language;
    //     this.getData();
    //     console.log('language 變動');
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // '$route.query.id': {
    //   handler: function (id) {
    //     this.movieID = id;
    //     this.getData();
    //     console.log('id 變動');
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  created() {
    this.language = this.$route.query.language;
    this.movieID = this.$route.query.id;
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
