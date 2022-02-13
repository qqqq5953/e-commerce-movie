<template>test</template>

<script>
export default {
  props: {
    language: {
      type: String
    },
    movieID: {
      type: String
    },
    genre: {
      type: String
    }
  },
  data() {
    return {
      languagePassIn: '',
      idPassIn: '',
      genrePassIn: ''
    };
  },
  methods: {
    async getMovie() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/${this.genrePassIn}/${this.idPassIn}?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=${this.languagePassIn}`
      );
      console.log('getPerson', response);
    },
    async getTV() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/${this.genrePassIn}/${this.idPassIn}?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=${this.languagePassIn}`
      );
      console.log('getTV', response);
    },
    async getPerson() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/${this.genrePassIn}/${this.idPassIn}?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=${this.languagePassIn}`
      );
      console.log('getPerson', response);
    },
    async getAll() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/${this.genrePassIn}/${this.idPassIn}?api_key=7bbe6005cfda593dc21cceb93eaf9a8e&language=${this.languagePassIn}&append_to_response=videos,images`
      );
      console.log('getAll', response);
    }
  },
  created() {
    console.log(
      this.$route.query.language,
      this.$route.query.id,
      this.$route.query.genre
    );

    this.languagePassIn = this.$route.query.language;
    this.idPassIn = this.$route.query.id;
    this.genrePassIn = this.$route.query.genre.toLowerCase();

    // if (this.genrePassIn === 'movie') this.getMovie();
    // if (this.genrePassIn === 'tv') this.getTV();
    // if (this.genrePassIn === 'person') this.getPerson();
    this.getAll();
  }
};
</script>
