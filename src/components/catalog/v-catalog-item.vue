<template>
	<div class="v-catalog-item">
    <v-popup
      v-if="isPopupVisible"
      @closePopup="closePopup"
      @sendProductUp="sendProductToParent"
      rightBtnTitle="Add to cart"
      :popupTitle="product_data.name"
    >
      <img class="v-catalog-item__image" :src="require('../../assets/images/' + product_data.image)" alt="img">
    <div>
      <p class="v-catalog-item__name">{{ product_data.name }}</p>
      <p class="v-catalog-item__price">Price: {{ product_data.price }}</p>
      <p class="v-catalog-item__category">Category: {{ product_data.category }}</p>
    </div>
    </v-popup>


		<img class="v-catalog-item__image" :src="require('../../assets/images/' + product_data.image)" alt="img">
		<p class="v-catalog-item__name">{{ product_data.name }}</p>
		<p class="v-catalog-item__price">Price: {{ product_data.price }}</p>
    <button 
      class="v-catalog-item__show-info"
      @click="showPopupInfo"
      >Show info</button>
		<button class="v-catalog-item__btn btn" @click="sendProductToParent">Add to card</button>
	</div>
</template>
<script>
import vPopup from '../popup/v-popup'  
export default {
  name: 'v-catalog-item',
  props: {
  	product_data: {
  		type: Object,
  		default(){
  			return {
          
  			}
  		}
  	}
  },
  data () {
    return {
      isPopupVisible: false
    }
  },
  methods: {
  	sendProductToParent(){
  		this.$emit('sendProductToParent', this.product_data)
  	},
    showPopupInfo() {
      this.isPopupVisible = true
    },
    closePopup(){
      this.isPopupVisible = false
    }
  },
  mounted(){
    this.$set(this.product_data, 'quantity', 1)
  },
  components: {
    vPopup
  }
}
</script>
<style lang="scss">
.v-catalog-item {
	flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
    &__image {
      width: 100px;
    }
}
</style>