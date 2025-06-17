import DOMPurify from 'dompurify';
import { DirectiveBinding } from 'vue';

// 安全HTML指令 v-safe-html
export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.innerHTML = DOMPurify.sanitize(binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    el.innerHTML = DOMPurify.sanitize(binding.value);
  },
};
