<script>
import { h } from 'vue'
export default {
  render() {
    return h(
      `${this.tag}`, 
      this.$slots.default()
    )
  },
  props: {
    tag: {
    type:String,
    required: true
    }
  }
}

// Если честно не особо уловил как и для чего так усложнять, сделал по аналогии примера из документации

</script>

