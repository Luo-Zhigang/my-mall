<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   class="tab-control"
                   @tabClick="tabClick"/>
      <goods-list :goods="goodShow"/>
    </scroll>
    <back-top @click.native="backClick"/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "@/network/home";

  import TabControl from "@/components/content/tabControl/TabControl";


  export default {
    name: "Home",
    components: {
      TabControl,
      FeatureView,
      NavBar,
      HomeSwiper,
      RecommendView,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {
            page: 0,
            list: []
          },
          new: {
            page: 0,
            list: []
          },
          sell: {
            page: 0,
            list: []
          }
        },
        currentType: 'pop'
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    computed: {
      goodShow: function () {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      backClick(){
        this.$refs.scroll.scrollTo(0,0,600);
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        });
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 43px;
    z-index: 2;
  }

  .content{
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 49px;
    overflow: hidden;
  }

</style>
