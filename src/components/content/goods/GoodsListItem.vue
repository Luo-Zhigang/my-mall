<template>
  <div id="goodsListItem">
    <img :src="goodsItem.show.img"/>
    <div>
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="price">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {};
        }
      }
    }
  }
</script>

<style scoped>

</style>
