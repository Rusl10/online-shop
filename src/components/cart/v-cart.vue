<template>
	<div class="v-cart">
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link-to-cart">Back to catalog</div>
		</router-link>
		<h2>cart</h2>
		<p v-if="!cart_data.length">There are no products in the cart</p>
		<v-cart-item
		v-for="(cart_item, index) in cart_data"
		:cart_item="cart_item"
		@deleteFromCart="deleteFromCart(index)"
		@decrementItem="decrement(index)"
		@incrementItem="increment(index)"
		/>
		<div class="v-cart__total"
		v-if="cart_data.length"
		>
			<p class="total__name">Total: </p>
			<p>{{ calcSum | toFix | formattedPrice }} Р.</p>
		</div>
	</div>
</template>
<script>
import vCartItem from './v-cart-item.vue'
import toFix from '../../filters/toFix'	
import formattedPrice from '../../filters/price-format' 
export default {
  name: 'v-cart',
  props: {
  	cart_data: {
  		type: Array,
  		default(){
  			return []
  		} 
  	}
  },
  data () {
    return {
    }
  },
  filters: {
    toFix, formattedPrice
  },
  computed: {
  	calcSum(){
  		let totalSum = 0
  		this.cart_data.forEach(cart_item => {
  			totalSum+=cart_item.price*cart_item.quantity
  		})
  		return totalSum
  	}
  },
  methods: {
  	decrement(index){
  		this.$store.commit('decrement', index)
  	},
  	increment(index){
  		this.$store.commit('increment', index)
  	},
  	deleteFromCart(index){
  		this.$store.commit('deleteFromCart', index)
  	}
  },
  components: {
  	vCartItem
  }
}
</script>
<style lang="scss">
.v-cart {
    margin-bottom: 100px;
    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 16px 24px;
      display: flex;
      justify-content: center;
      background: green;
      color: #ffffff;
      font-size: 20px;
    }
    .total__name {
      margin-right: 16px;
    }
  }
</style>