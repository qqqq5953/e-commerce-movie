<template>
  <ul class="row flex-nowrap list-unstyled" style="width: 90%; height: 435px">
    <li
      class="col-4 movie-poster"
      v-for="item in results"
      :key="item.id"
      style="scroll-snap-align: start"
    >
      <a
        href="#"
        class="d-block text-decoration-none h-100"
        @click.prevent="getProductDetails(item.id)"
      >
        <div class="position-relative h-100">
          <img
            v-if="item.imageUrl[0]"
            :src="item.imageUrl[0]"
            class="img-fluid d-block h-100 w-100"
            :alt="item.title"
            style="object-fit: cover; object-position: center center"
          />
          <div
            class="movie-intro position-absolute top-0 bottom-0 left-0 right-0 w-100 h-100"
            style="background: rgba(0, 0, 0, 0.7)"
          >
            <div
              class="d-flex flex-column text-white position-absolute bottom-0 m-auto p-4 w-100"
              style="top: 150px"
            >
              <h3 class="text-white text-center">
                {{ item.title }} {{ item.content.split('|')[1] }}
              </h3>

              <p class="mt-auto">{{ item.description }}</p>
              <small class="d-block fs-6 text-end">{{
                item.content.split('|')[2]
              }}</small>
            </div>
            <!-- <div class="d-flex flex-column h-50 text-white movie-intro">
              <h3 class="text-white text-center flex-grow-1">
                {{ item.title }}
              </h3>

              <p class="">{{ item.overview }}</p>
            </div>
            <small class="d-block fs-6 text-end mt-auto">{{
              item.release_date
            }}</small> -->
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    results: {
      type: Array
    },
    language: {
      type: String
    }
  },
  data() {
    return {
      baseImageUrl: 'https://image.tmdb.org/t/p/w300',
      genre: 'movie'
    };
  },
  methods: {
    getProductDetails(id) {
      this.$router.push({ name: 'Product', params: { productID: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.movie-intro {
  opacity: 0;
  transition: opacity 0.5s;
  p {
    display: -webkit-box;
    // max-width: 90%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    // line-height: 1.4;
  }
}

.movie-poster:hover {
  .movie-intro {
    // border: 2px solid white;
    opacity: 1;
    width: 100%;
  }
}
</style>
