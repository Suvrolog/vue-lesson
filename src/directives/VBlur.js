export default {
    mounted(el,binding) {
        el.onblur = binding.value;
        },
    name:"blur"
}


