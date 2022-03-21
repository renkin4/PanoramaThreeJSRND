import { defineComponent, inject } from "vue";
import { RendererInjectionKey } from "./Renderer";

export default defineComponent({
    name : 'Scene',
    setup() {
        const renderer = inject(RendererInjectionKey);
        console.log(renderer);
        return {
            renderer,
        }
    },
    created() {
        

    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});