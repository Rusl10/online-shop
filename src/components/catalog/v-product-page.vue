<template>
	<div class="v-product-page">
		 <img v-if="product.image" class="v-catalog-item__image" :src=" require('../../assets/images/' + product.image)"
         alt="img">
    <p>Product name: {{product.name}}</p>
    <p>Article: {{product.article}}</p>
    <p>Price: {{product.price | toFix | formattedPrice}}</p>
    <button
        class="v-catalog-item__add_to_cart_btn btn"
        @click="sendToCart"
    >Add to cart
    </button>
	</div>
</template>
<script>
import {mapState, mapActions}	from 'vuex'
import formattedPrice from '../../filters/price-format'
import toFix from '../../filters/toFix'
export default {
  name: 'v-product-page',
  data () {
    return {
    }
  },
  computed: {
  	...mapState([
  		'products'
  	]),
  	product(){
  		let result = {}
  		this.products.map(item => {
  			if (item.article === this.$route.query.product) {
  				result = item
  			}
  		}) 
  		return result
  		
  	}
  },
  methods: {
  	...mapActions([
  		'getProductsFromAPI',
  		'AddToCart'
  	]),
  	sendToCart(){
  		this.AddToCart(this.product)
  	}
  },
  mounted(){
  	if (!this.products.length) {
  		this.getProductsFromAPI()

  	}
  },
  filters: {
  	formattedPrice,
  	toFix
  }
}
</script>
<style lang="scss">

</style>