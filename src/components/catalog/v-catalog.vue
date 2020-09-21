<template>
	<div class="v-catalog">
    <v-notification 
      :messages="messages"
      ref="notification"
    />
		<router-link :to="{name: 'cart', params: {cart_data: cart}}">
			<div class="v-catalog__link-to-cart">Cart: {{ cart.length }}</div>
		</router-link>

		<h1>Catalog</h1>
    <div class="filters">
    <v-select 
    :categories="categories"
    :selected="selected"
    @select="sortByCategory"
    />
    <div class="range-slider">
      <input 
        type="range"
        min="0"
        max="10000"
        step="100"
        v-model.number="minPrice"
        @change="setRangeSlides"
      > 
      <input 
        type="range"
        min="0"
        max="10000"
        step="100"
        v-model.number="maxPrice"
        @change="setRangeSlides" 
      > 
    </div>  
    <div class="range-values">
      <p>{{ minPrice }}</p>
      <p>{{ maxPrice }}</p>
    </div>
    </div>
		<div class="v-catalog__list">
			<v-catalog-item
			v-for="product in filteredProducts"
			:key="product.article"
			:product_data="product"
			@sendProductToParent="addInCart"
      @productClick="productClick(product)"
			/>
		</div>
	</div>
</template>
<script>
import vCatalogItem from './v-catalog-item'
import vSelect from '../v-select'
import vNotification from '../notifications/v-notification'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'v-catalog',
  data () {
    return {
    	addedProducts: [],
      categories: [
        {name: 'Все', value: 'all'},
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'},
      ],
      selected: 'Все',
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 10000,
      messages: []
    }
  },
  computed: {
  	...mapState([
  		'products',
  		'cart',
      'searchKey'
  	]),
    filteredProducts(){
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.products
      }
    }
  },
  methods: {
  	...mapActions([
  		'getProductsFromAPI',
      'AddToCart'
  	]),
  	...mapMutations([
  		'pushProductToCart'
  	]),
    productClick(product){
      this.$router.push({ name: 'products', query: { 'product': product.article }})
    },
    addInCart(data){
      this.AddToCart(data)
      .then(() => {
        this.messages.unshift({
          name: 'Товар добавлен в корзину',
          id: Date.now().toLocaleString(),
          icon: 'check_circle'
        })
      })
      .then(() => {
        this.$refs.notification.hideNotification()
      })
    },
    setRangeSlides(){
      if (this.minPrice > this.maxPrice) {
        let temp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = temp
      }
      this.sortByCategory()
    },
    sortByCategory(category){
      this.sortedProducts = [...this.products]
      this.sortedProducts = this.sortedProducts.filter(item => {
          
          return item.price >= this.minPrice && item.price <= this.maxPrice
      })
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(e => {
          this.selected = category.name
          return e.category === category.name
        }) 
      } 
    },
    sortedProductsBySearchValue(value){
      this.sortedProducts = [...this.products]
      if (value) {

        this.sortedProducts = this.sortedProducts.filter(item => {
          return item.name.toLowerCase().includes(value.toLowerCase())

        })
      } else {
        this.sortedProducts = this.products
      }
    }
  },
  watch: {
    searchKey(){
      this.sortedProductsBySearchValue(this.searchKey)
    }
  },
  mounted(){
  	this.getProductsFromAPI()
  	.then((response) => {
      this.sortByCategory()
      this.sortedProductsBySearchValue(this.searchKey)
  	})
  },
  components: {
  	vCatalogItem,
    vSelect,
    vNotification
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