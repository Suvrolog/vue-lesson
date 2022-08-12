export default {
    mounted(el,binding) {
        const arg = binding.arg
        el.style[arg] = binding.value
    },
    name:"colored"
}

