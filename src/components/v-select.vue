<template>
	<div class="v-select">
		<p 
			class="title"
			@click="areOptionsVisible = !areOptionsVisible"
		>
		{{selected || 'Select' }}</p>
		<div 
			class="options"
			v-if="areOptionsVisible"

			>
			<p
				v-for="category in categories"
				:key="category.value"
				@click="selectOption(category)"
			>
				{{category.name}}
			</p>
		</div>
	</div>
</template>
<script>
export default {
  name: 'v-select',
  props: {
  	categories: {
  		type: Array,
  		default(){
  			return []
  		} 
  	},
  	selected: {
  		type: String,
  		default: ''
  	}
  },
  data () {
    return {
    	areOptionsVisible: false
    }
  },
  methods: {
  	selectOption(category){
  		console.log('selectOption');
  		this.$emit('select', category)
  		this.areOptionsVisible = false
  	},
  	hideSelect(){
  		this.areOptionsVisible = false
  	}
  },
  mounted(){
  	document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy(){
  	document.removeEventListener('click', this.hideSelect)
  }
}
</script>
<style lang="scss">
	.title{
		border: 1px solid #aeaeae;
		cursor: pointer;
	}
	.v-select {
		position: relative;
		width: 200px; 
		margin-bottom: 70px; 
	}
	.v-select p{
		margin: 0;
	}

	.options{
		border: 1px solid #aeaeae;
		position: absolute;
		top: 20px;
		right: 0;
		width: 100%;
	}
	.options p:hover{
		background-color: #e7e7e7; 
	}
</style>