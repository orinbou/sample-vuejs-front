const disable = (el, binding) => el.disabled = binding.value
const focus = (el) => el.focus()

export default {
    disable,
    focus,
}