const { createApp,ref ,computed } = Vue;

const app = createApp({
    setup(){
        const cart = ref([]);
        const premium = ref(true);
        const Pdetails = ref([
          '50% cotton',
          '30% wool',
          '20% polyester',
          '10% spandex'
        ]);
        function updateCart(id){
          if (cart.value[id]) {
            cart.value[id]++;
        } else {
            cart.value[id] = 1;
        }
        }
        function removeFromCart(id) {
          if (cart.value[id] > 1) {
              cart.value[id]--;
          } else {
              delete cart.value[id];
          }
      }
        const cartItems = computed(() => {
          return Object.entries(cart.value).map(([id, quantity]) => ({
              id,
              quantity
          }));
      });
        return {
          cart,
          premium,
          Pdetails,
          cartItems,
          updateCart,
          removeFromCart
        }
    }
})
app.component('product-display',ProductDisplay);
app.component('product-details',ProductDetails);
app.component('review-form',ReviewForm);
app.component('review-list',ReviewList);
app.mount('#app')