<template>
	<div class="v-cart-item">
		<img class="v-cart-item__image" :src="require('../../assets/images/' + cart_item.image)" alt="img">
		<div class="v-cart-item__info">
			<p>
				{{cart_item.name}}
			</p>
			<p>{{ cart_item.price }}</p>
			<p>{{ cart_item.article }}</p>
		</div>
		<div class="v-cart-item__quantity">
			<p>Qty:</p>
			<span class="quantity__tools">
				<span class="quantity__btn" @click="decrementItem">-</span>
				{{cart_item.quantity}}
				<span class="quantity__btn" @click="incrementItem">+</span>
			</span>
		</div>
		<button @click="deleteFromCart">Delete</button>
	</div>
</template>
<script>
export default {
  name: 'v-cart-item',
  props: {
  	cart_item: {
  		type: Object,
  		default() {
  			return {}
  		}
  	}
  },
  data () {
    return {
    }
  },
  methods: {
  	deleteFromCart(){
  		this.$emit('deleteFromCart')
  	},
  	decrementItem(){
  		this.$emit('decrementItem')
  	},
  	incrementItem(){
  		this.$emit('incrementItem')
  	}
  }
}
</script>
<style lang="scss">
.v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
    &__image {
      max-width: 50px;
    }
    .quantity__btn {
      cursor: pointer;
    }
    .quantity__tools {
      user-select: none;
    }
  }
</style>