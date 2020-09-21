<template>
	<div class="v-main-wrapper">
		<v-header />
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script>
import vHeader from './catalog/layouts/v-header'
import {mapGetters} from 'vuex'
export default{
	name: 'v-main-wrapper',
	data(){
		return {
		}
	},
	computed: {
	},
	components: {
		vHeader
	}
}	
</script>
<style>
.v-main-wrapper{
	 margin: 0 auto;
	 max-width: 900px; 
}	
</style>