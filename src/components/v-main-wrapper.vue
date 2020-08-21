<template>
	<div class="v-main-wrapper">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script>

import {mapGetters} from 'vuex'
export default{
	name: 'v-main-wrapper',
	data(){
		return {
		}
	},
	computed: {
	},
}	
</script>
<style>
.v-main-wrapper{
	 margin: 0 auto;
	 max-width: 900px; 
}	
</style>