<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-10 col-lg-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Email address"
            aria-describedby="emailHelp"
            v-model="user.username"
            autofocus
            required
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            id="exampleInputPassword1"
            v-model="user.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/dashboard">dashboard</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'qqqq5953@gmail.com',
        password: 'andy90343'
      }
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;

      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.$router.push({ name: 'Products' });
          console.log('cookie expire:', new Date(expired));
        }
      });
    }
  }
};
</script>
