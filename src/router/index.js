import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/user/Cart.vue')
      },
      {
        path: 'watchlist',
        name: 'Watchlist',
        component: () => import('../views/user/Watchlist.vue')
      },
      {
        path: 'CMDB',
        name: 'UserCMDB',
        component: () => import('../views/user/UserCMDB.vue')
      },
      {
        path: 'all-results/:genre',
        name: 'AllResults',
        component: () => import('../views/user/AllResults.vue'),
        props: (route) => {
          console.log('route', route);
          return {
            genre: route.params.genre
          };
        }
      },
      {
        path: 'product-videos/:movieID/:videoType/:movieTitle',
        name: 'ProductVideos',
        component: () => import('../views/user/ProductVideos.vue'),
        props: (route) => {
          console.log('route', route);
          return {
            // key 可以自訂，要與UserProduct的props變數一致
            movieID: route.params.movieID,
            movieTitle: route.params.movieTitle,
            movieVideoType: route.params.videoType
          };
        }
      },
      {
        path: 'coupon',
        name: 'UserCoupon',
        component: () => import('../views/user/Coupon.vue')
      },
      {
        path: 'products',
        name: 'AllProducts',
        component: () => import('../views/user/AllProducts.vue')
      },
      {
        path: 'product/:productID',
        name: 'Product',
        component: () => import('../views/user/Product.vue'),
        props: (route) => {
          console.log('route', route);
          return {
            // key 可以自訂，要與UserProduct的props變數一致
            productID: route.params.productID
          };
        }
      },
      {
        path: 'checkout/:orderID',
        name: 'UserCheckout',
        component: () => import('../views/user/Checkout.vue')
      },
      {
        path: 'pricing',
        name: 'Pricing',
        component: () => import('../views/Pricing.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/dashboard/Coupon.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'UserBoard',
    component: () => import('../views/user/UserBoard.vue'),
    children: [
      // {
      //   path: 'cart',
      //   name: 'Cart',
      //   component: () => import('../views/user/Cart.vue')
      // },
      // {
      //   path: 'CMDB',
      //   name: 'UserCMDB',
      //   component: () => import('../views/user/UserCMDB.vue')
      // },
      // {
      //   path: 'all-results/:genre',
      //   name: 'UserProducts',
      //   component: () => import('../views/user/ProductList.vue'),
      //   props: (route) => {
      //     console.log('route', route);
      //     return {
      //       genre: route.params.genre
      //     };
      //   }
      // },
      // {
      //   path: 'all-videos/:movieID/:videoType/:movieTitle',
      //   name: 'AllVideos',
      //   component: () => import('../views/user/AllVideos.vue'),
      //   props: (route) => {
      //     console.log('route', route);
      //     return {
      //       // key 可以自訂，要與UserProduct的props變數一致
      //       movieID: route.params.movieID,
      //       movieTitle: route.params.movieTitle,
      //       movieVideoType: route.params.videoType
      //     };
      //   }
      // },
      // {
      //   path: 'coupon',
      //   name: 'UserCoupon',
      //   component: () => import('../views/user/Coupon.vue')
      // },
      // {
      //   path: 'product/:productID',
      //   name: 'UserProduct',
      //   component: () => import('../views/user/Product.vue'),
      //   props: (route) => {
      //     console.log('route', route);
      //     return {
      //       // key 可以自訂，要與UserProduct的props變數一致
      //       productID: route.params.productID
      //     };
      //   }
      // },
      // {
      //   path: 'checkout/:orderID',
      //   name: 'UserCheckout',
      //   component: () => import('../views/user/Checkout.vue')
      // }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
