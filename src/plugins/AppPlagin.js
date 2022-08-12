import { h } from 'vue'

export default {
  install: (app) => {
    app.mixin({
      mounted() {
        console.log('component mounted ', this.sum)
      },
      created() {
        console.log('component created ', this.sum)
      },
      updated() {
        console.log('component updated ', this.sum)
      },
    })
    app.directive('colored', {
      mounted(el, binding) {
        const arg = binding.arg
        el.style[arg] = binding.value
      },
    })
    app.directive('blur', {
      mounted(el, binding) {
        el.onblur = binding.value;
      },
    })
    app.component("app-button", {
      render() {
        return h(
          `${this.tag}`,
          this.$slots.default()
        )
      },
      props: {
        tag: {
          type: String,
          required: true
        }
      }
    }
    )

    app.component("app-convert", {
      
      data() {
        return {
          price: "",
        };
      },
      template:`
      <div>
        <h3>Задание 3</h3>
        <input type="number" class="input-group mb-1" v-model.trim="price" />
        <ul class="list-group">
          <li class="list-group-item">
            {{ convert }}
          </li>
        </ul>
      </div>
      `,
      props: {
        sum: Number,
        todoLength: Number,
      },
      computed: {
        convert: function () {
          var num = this.price.toString();
          return (
            num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ") + " руб."
          );
        },
      },
    }
    )
  }
}