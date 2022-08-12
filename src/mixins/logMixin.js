export default {
  data() {
    return {
      name: 'logMixin',
    }
  },

      mounted() {
        console.log('component mounted ', this.sum)
      },
      created() {
        console.log('component created ', this.sum)
      },
      updated() {
        console.log('component updated ', this.sum)
      },
    
}
