const ProductDetails = {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <div class="product-details">
        <h2>product details</h2>
        <ul>
          <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
        </ul>
      </div>
    `
  };