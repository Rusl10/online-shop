<template>
	<div 
		class="popup-wrapper"
		ref="popup-wrapper"
	>
		<div class="v-popup">
			<div class="v-popup__header"><span>{{ popupTitle }}</span>
				<span>
					<i 
						class="material-icons close-icon"
						@click="closePopup"
						>close</i></span>
				</div>
			<div class="v-popup__content">
				<slot></slot>
			</div>
			<div class="v-popup__footer">
				<button 
					class="close-modal"
					@click="closePopup"
				>close</button>
				<button 
					class="submit-btn"
					@click="sendProductUp"
				>{{rightBtnTitle}}</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'v-popup',
  props: {
  	rightBtnTitle: {
  		type: String,
  		default: 'Ok'
  	},
  	popupTitle: {
  		type: String,
  		default: 'Popup'
  	}
  },
  data () {
    return {

    }
  },
  methods: {
  	closePopup(){
  		this.$emit('closePopup')
  	},
  	sendProductUp(){
  		this.$emit('sendProductUp')
  	}
  },
  mounted(){
  	document.addEventListener('click', (item) => {
  		if (item.target === this.$refs['popup-wrapper']) {
  			this.$emit('closePopup')
  		}
  	})
  },
  beforeDestroy(){
  	document.removeEventListener('click', (item) => {
  		if (item.target === this.$refs['popup-wrapper']) {
  			this.$emit('closePopup')
  		}
  	})
  }
}
</script>
<style lang="scss">
.popup-wrapper{
	display: flex;
	position: fixed;
	justify-content: center;
	align-items: center;
	background: rgba(64,64,64, .4);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.v-popup {
	padding: 16px 40px;
	width: 400px;
	position: fixed;
	z-index: 100;
	background: #fff;
	top: 50%;
	transform: translate(-50%, -50%);
	left: 50%;
	box-shadow: 0 0 17px #e7e7e7;
	&__header, &__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	
	.submit-btn {
		padding: 8px;
		color: #fff;
		background: #26ae68;
	}
	.close-modal {
		padding: 8px;
		color: #fff;
		background: red;
	}
	.close-icon{
		cursor: pointer;
	}
}
</style>