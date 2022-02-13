<template>
  <ul class="row flex-nowrap list-unstyled" style="width: 90%">
    <li class="col-4" v-for="item in results" :key="item.id">
      <a href="#" class="text-decoration-none">
        <div class="card h-100 mb-3 border-dark">
          <div style="height: 544px">
            <img
              v-if="item.poster_path"
              :src="baseImageUrl + item.poster_path"
              class="card-img-top img-fluid d-block h-100"
              :alt="item.title"
              style="object-fit: cover; object-position: center top"
            />
          </div>

          <div class="card-body d-flex flex-column flex-grow-1">
            <!-- <div class="d-flex justify-content-between flex-grow-1">
              <h3 class="card-title">
                {{ item.title }}
              </h3>
              <small class="d-block fs-6 flex-shrink-0 ms-3">{{
                item.release_date
              }}</small>
            </div> -->
            <h3 class="card-title">
              {{ item.title }}
            </h3>

            <div class="card-text mt-auto">
              <p>{{ item.overview }}</p>
              <small class="d-block fs-6 text-end">{{
                item.release_date
              }}</small>
            </div>
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
    }
  },
  data() {
    return {
      baseImageUrl: 'https://image.tmdb.org/t/p/w300'
    };
  }
};
</script>

<style lang="scss" scoped>
.card-text p {
  display: -webkit-box;
  // max-width: 90%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
