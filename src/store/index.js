import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	products: [],
  	cart: []
  },
  mutations: {
  	setProductsToState: (state, products) => {
  		state.products = products
  	},
  	pushProductToCart: (state, product) => {
  		if (state.cart.length) {
  			let isProductExists = false
  			state.cart.map(item => {
  				if (product.article === item.article) {
  					isProductExists = true
  					item.quantity++
  				}
  			})
  			if (!isProductExists) {
  				state.cart.push(product)  				
  			}
  		}else {
  			state.cart.push(product)

  		}
  	},
  	deleteFromCart: (state, productIndex) => {
  		state.cart.splice(productIndex, 1)
  	},
  	decrement(state, index){
  		if (state.cart[index].quantity > 1) {
  			state.cart[index].quantity-- 
  		}
  	},
  	increment(state, index){
  		state.cart[index].quantity++
  	}
  },
  actions: {
  	getProductsFromAPI({commit}){
  		return axios('http://localhost:3000/products', {
  			method: "GET"
  		})
  		.then((products) => {
  			commit('setProductsToState', products.data)
  			return products
  		})
  		.catch((error) => {
  			console.log('error', error)
  			return error
  		})
  	}
  },
  getters: {
  	products: s => s.products,
  	cart: s => s.cart
  },
  modules: {
  }
})
