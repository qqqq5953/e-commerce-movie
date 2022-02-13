<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end mt-3">
    <button type="button" class="btn btn-primary" @click="openModal(true)">
      新增產品
    </button>
    <button type="button" class="btn btn-success" @click="getNowPlaying">
      快速新增 NowPlaying
    </button>
    <button type="button" class="btn btn-danger" @click="getUpcoming">
      快速新增 upComing
    </button>
    <button type="button" class="btn btn-danger" @click="getAllProducts">
      快速刪除全部產品
    </button>
  </div>
  <Pagination
    :pages="pagination"
    @change-page="getProducts"
    @previous-page="getProducts"
    @next-page="getProducts"
  ></Pagination>
  <!-- table -->
  <table class="table">
    <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col" class="text-end">原價</th>
        <th scope="col" class="text-end">售價</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <th scope="row">{{ item.category }}</th>
        <td>{{ item.title }}</td>
        <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-end">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="openModal(false, item, pagination)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openDeleteModal(item, pagination)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <Pagination
    :pages="pagination"
    @change-page="getProducts"
    @previous-page="getProducts"
    @next-page="getProducts"
  ></Pagination> -->
  <EditModal
    ref="editModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></EditModal>
  <DeleteModal
    :product="tempDeleteProduct"
    @delete-product="deleteProduct"
    ref="deleteModal"
  ></DeleteModal>
</template>

<script>
import EditModal from '@/components/EditModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';
export default {
  components: {
    EditModal,
    DeleteModal,
    Pagination
  },
  inject: ['emitter', 'pushMessageState', 'sortData'],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      tempDeleteProduct: {},
      isNew: false,
      isLoading: false,
      // ref
      // editModal: {},
      // deleteModal: {}
      // CMDB
      top20nowPlaying: [],
      language: 'en-US',
      region: 'US',
      baseImageUrl: 'https://image.tmdb.org/t/p/w300',
      key: '7bbe6005cfda593dc21cceb93eaf9a8e'
    };
  },
  methods: {
    async getNowPlaying() {
      const response = await this.$http.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=${this.language}&region=${this.region}&page=1`
      );
      console.log('getNowPlaying', response);

      const totalPages = response.data.total_pages;

      let allData;
      if (totalPages > 1) {
        allData = await this.getAllNowPlayingData();
      } else {
        allData = response.data.results;
      }
      console.log('totalPages', totalPages);
      console.log('allData', allData);

      const todayDate = this.getTodayDate();

      // 篩選出今天日期以前的電影
      const filterDate = allData.filter((item) => {
        return new Date(item.release_date) <= new Date(todayDate);
      });

      // 依照熱門度排序 取前 20
      this.top20nowPlaying = this.sortData(filterDate, 'popularity').slice(
        0,
        20
      );

      // 暫時 for 快速新增
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;

      for (let i = 0; i < 6; i++) {
        this.tempProduct = {};
        this.tempProduct.title = this.top20nowPlaying[i].title;
        this.tempProduct.category = 'movie|nowplaying';
        this.tempProduct.origin_price = 330;
        this.tempProduct.price = 300;
        this.tempProduct.unit = '月';
        this.tempProduct.description = this.top20nowPlaying[i].overview;
        this.tempProduct.is_enabled = true;
        this.tempProduct.imageUrl = [
          this.baseImageUrl + this.top20nowPlaying[i].poster_path,
          this.baseImageUrl + this.top20nowPlaying[i].backdrop_path
        ];
        // 透過content傳送其餘資料
        this.tempProduct.content = `${this.top20nowPlaying[i].id}|${this.top20nowPlaying[i].popularity}|${this.top20nowPlaying[i].release_date}`;
        const response = await this.$http.post(api, {
          data: this.tempProduct
        });

        console.log('測試寫入', response);
      }

      // 重新渲染畫面
      await this.getProducts();
    },
    async getAllNowPlayingData() {
      const temp = [];
      for (let page = 1; page <= 2; page++) {
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

      // 依照熱門度排序 取前 20
      this.top20upComing = this.sortData(filterDate, 'popularity').slice(0, 20);

      // 暫時 for 快速新增
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;

      for (let i = 0; i < 6; i++) {
        this.tempProduct = {};
        this.tempProduct.title = this.top20upComing[i].title;
        this.tempProduct.category = 'movie|upcoming';
        this.tempProduct.origin_price = 330;
        this.tempProduct.price = 300;
        this.tempProduct.unit = '月';
        this.tempProduct.description = this.top20upComing[i].overview;
        this.tempProduct.is_enabled = true;
        this.tempProduct.imageUrl = [
          this.baseImageUrl + this.top20upComing[i].poster_path,
          this.baseImageUrl + this.top20upComing[i].backdrop_path
        ];
        // 透過content傳送其餘資料
        this.tempProduct.content = `${this.top20upComing[i].id}|${this.top20upComing[i].popularity}|${this.top20upComing[i].release_date}`;
        const response = await this.$http.post(api, {
          data: this.tempProduct
        });

        console.log('測試寫入', response);
      }

      // 重新渲染畫面
      await this.getProducts();
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
    },
    getTodayDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    },
    async getProducts(page) {
      try {
        this.isLoading = true;

        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
        const response = await this.$http.get(api);

        // 儲存回傳資料
        this.products = response.data.products;
        this.pagination = response.data.pagination;

        this.isLoading = false;
        console.log('getProducts', response);
      } catch (err) {
        console.log(err);
      }
    },
    async updateProduct(item) {
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // 編輯
      let currentPage;
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';

        // 存取當前頁面
        currentPage = item.pagination.current_page;
      }

      // 刪除 pagination 這個 key
      delete item.pagination;

      // item 存進 tempProduct（API參數）
      this.tempProduct = item;

      try {
        // axios
        const response = await this.$http[httpMethod](api, {
          data: this.tempProduct
        });

        // 重新渲染畫面
        await this.getProducts(currentPage);

        // 關閉modal
        this.$refs.editModal.hideModal();

        // toast
        this.pushMessageState(response, item, currentPage ? '更新' : '新增');
      } catch (err) {
        console.log(err);
      }
    },
    // async getAllProducts() {
    //   // api
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
    //   const response = await this.$http.get(api).catch((err) => {
    //     console.log(err);
    //   });
    //   console.log('res', response.data);

    //   // 儲存資料
    //   this.deleteAllProducts(response.data.products);
    // },
    // async deleteAllProducts(items) {
    //   for (let i = 0; i < items.length; i++) {
    //     const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${items[i].id}`;
    //     const response = await this.$http.delete(api);
    //     console.log('deleteAllProducts', response.data);
    //   }
    // },
    async deleteProduct(item) {
      try {
        // axios
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        const response = await this.$http.delete(api);

        // 重新渲染畫面
        await this.getProducts(item.current_page);

        // 關閉modal
        this.$refs.deleteModal.hideModal();

        // toast
        this.pushMessageState(response, item, '刪除');
      } catch (err) {
        console.log(err);
      }
    },
    openModal(isNew, item, pagination) {
      // 新增
      if (isNew) this.tempProduct = {};

      // 編輯
      this.tempProduct = { ...item, pagination };

      // 打開 modal
      this.$refs.editModal.showModal();

      // 儲存modal狀態
      this.isNew = isNew;
    },
    openDeleteModal(item, pagination) {
      this.tempDeleteProduct = { ...item, ...pagination };
      this.$refs.deleteModal.showModal();
    }
  },
  created() {
    this.getProducts();
    // this.getNowPlaying();
  },
  mounted() {
    // this.editModal = this.$refs.editModal;
    // this.deleteModal = this.$refs.deleteModal;
  }
};
</script>
