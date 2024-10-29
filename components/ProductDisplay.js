const ProductDisplay = {
  template:
      /*html*/
      `
      <div class="product-display">
          <div class="product-container">
              <div class="product-image">
                  <img :src="image" :class="{'out-of-stock-img':!inStock}">
              </div>
          </div>
          <div class="product-info">
              <a v-bind:href="'https://www.camt.cmu.ac.th'" target="_blank">
                  <h1>{{ title }}</h1>
              </a>
              <p>{{ saleMessage }} </p>

              <button class="button" @click="updateInventory">Toggle InStock</button>
              <div class="cart">
              <h6>Stock({{ ifStock ? 'In Stock' : 'Out of Stock' }})</h6>
              </div>

              <p v-if="inStock > 10">In Stock</p>
              <p v-else-if="inStock <= 10 && inStock > 0">Almost out of Stock</p>
              <p v-else>Out Of Stock</p>
              <p>Shipping: {{ shipping }}</p>

              <p v-if="onSale">This product is on sale!</p>
              <p v-else>This product is not on sale.</p>
              <product-details :details="details"></product-details>

              <div v-for="(variant , index) in variants" :key="variant.id"
                  @mouseover="updateVariant(index)"
                  @click="updateVariant(index)"
                  class="color-circle" :style="{backgroundColor: variant.color}">
              </div>

              <button class="button" :disabled="!inStock" @click="addToCart" :class="{disabledButton:!inStock}">Add to Cart</button>
              
              <p>Available Sizes: 
                  <span v-for="size in sizes" :key="size">{{ size }}</span>
              </p>
          </div>
          <review-list :v-if="reviews.length" :reviews="reviews"></review-list>
          <review-form @review-submitted="addReview"></review-form>
      </div>
      `,
  props: {
      premium: Boolean,
      details: {
          type: Array,
          required: true
      }
  },
  setup(props, { emit }) {
      const product = ref('Boots');

      const brand = ref('SE 331');

      const inventory = ref(1);

      const onSale = ref(true);

      const reviews = ref([]);

      const ifStock=ref(true);

      const variants = ref([
          { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
          { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 20 }
      ]);
      const selectedVariant = ref(0);

      const sizes = ref(['S', 'M', 'L']);

      const title = computed(() => {
          return brand.value + ' ' + product.value;
      });
      const image = computed(() => {
          return variants.value[selectedVariant.value].image;
      });
      const inStock = computed(() => {
          return variants.value[selectedVariant.value].quantity;
      });
      const saleMessage = computed(() => {
          return onSale.value ? `${brand.value} ${product.value} is on sale!` : '';
      });
      const shipping = computed(() => {
        return props.premium ? 'Free' : 2.99;
      }) 

      function addToCart() {
          emit('add-to-cart', variants.value[selectedVariant.value].id);
      }
      function updateVariant(index) {
          selectedVariant.value = index;
      }
      function addReview(review) {
          reviews.value.push(review);
      }
      
      function updateInventory() {
        ifStock.value = !ifStock.value;
    }
      return {
          title,
          image,
          inStock,
          ifStock,
          shipping,
          inventory,
          onSale,
          variants,
          sizes,
          addToCart,
          updateVariant,
          addReview,
          updateInventory,
          reviews,
          saleMessage,
      };
  },
};
