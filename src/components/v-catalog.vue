<template>
	<div class="v-catalog">
		
		<router-link :to="{name: 'cart', params: {cart_data: cart}}">
			<div class="v-catalog__link-to-cart">Cart: {{ cart.length }}</div>
		</router-link>

		<h1>Catalog</h1>
		<div class="v-catalog__list">
			<v-catalog-item
			v-for="product in products"
			:key="product.article"
			:product_data="product"
			@sendProductToParent="(product) => {
				$store.commit('pushProductToCart', product)
			}" 
			/>
		</div>
	</div>
</template>
<script>
import vCatalogItem from './v-catalog-item'	
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'v-catalog',
  data () {
    return {
    	addedProducts: [],
    
    }
  },
  computed: {
  	...mapGetters([
  		'products',
  		'cart'
  	]),
  	// getProducts(){
  	// 	return this.products
  	// }
  },
  methods: {
  	...mapActions([
  		'getProductsFromAPI'
  	]),
  	...mapMutations([
  		'pushProductToCart'
  	])
  },
  mounted(){
  	this.getProductsFromAPI()
  	.then((response) => {

  	})
  },
  components: {
  	vCatalogItem
  }
}
</script>
<style lang="scss">
.v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    &__link_to_cart {
      position: fixed;
      top: 80px;
      right: 10px;
      padding: 16px;
      border: solid 1px #aeaeae;
      background: #ffffff;
    }
    &__link-to-cart {
    	position: absolute;
    	top: 10px;
    	right: 10px;
    	padding: 16px;
    	border: 1px solid #aeaeae;
    }
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }
  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
</style>