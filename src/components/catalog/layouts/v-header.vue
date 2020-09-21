<template>
	<div class="v-header">
		<router-link :to="{name: 'mainPage'}">
			<img src="../../../assets/logo.png" alt="">
		</router-link>
		<div class="search-field">
			<input 
				type="text"
				v-model="searchValue"
			>
			<button 
				class="search_btn"
				@click="searchFilterByUser(searchValue)"
			>
				<i class="material-icons">search</i>
			</button>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'	
export default {
  name: 'v-header',
  data () {
    return {
    	searchValue: ''
    }
  },
  computed: {
  	...mapGetters([
  		'searchKey'
  	])
  },
  methods: {
  	searchFilterByUser(searchValue){
  		console.log('searchValue', searchValue);
  		this.$store.commit('addSearchFilterToState', searchValue)
  		const path = `/catalog`
if (this.$route.path !== path) this.$router.push(path)
  	}
  }
}
</script>
<style lang="scss">
.v-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: green;
    padding: 16px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    img {
      width: 50px;
    }
    .search-field {
      padding: 16px;
      position: relative;
      right: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search_btn {
      margin-left: 16px;
      background: transparent;
      border: none;
    }
  }
</style>