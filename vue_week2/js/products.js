
const App = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'bella_vue',
      products:[],
      temp:{}
    }
  },methods: {
    checkLogin() {
      // 確認是否登入
      axios.post(`${this.url}/api/user/check`)
        .then((res) => {

          this.getProductsData();
        })
        .catch((err) => {
          alert(err.data.message);
          //coolkie不存在會導回登入頁面
          window.location = 'index.html';
        })
    },        
    getProductsData() {
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
        })
        .catch((err) => {
          alert(err.data.message);
          console.log(err);
        })
    },
    removeProduct(id) {
      axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`)
      .then((res) => {
        this.getProductsData();
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.data.message);
        console.log(err);
      })
    }
  },
  created() {
    // 取得 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('get Cookie token', token);
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin();
  }
}

Vue.createApp(App).mount("#app");