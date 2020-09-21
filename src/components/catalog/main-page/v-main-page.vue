<template>
	<div class="v-main-page">
		<h1>Online shop</h1>
		<p>
			<router-link :to="{name: 'catalog'}">To catalog</router-link>
		</p>
	</div>
</template>
<script>
export default {
  name: 'v-main-page',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
</style>