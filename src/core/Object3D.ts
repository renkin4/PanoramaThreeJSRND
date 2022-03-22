import { defineComponent, inject } from "vue";
import { RendererInjectionKey, SceneInjectionKey } from "./index";


export const Object3D = defineComponent({
    name : 'Object3D',
    props : {},
    setup(props){ 
        const renderer = inject(RendererInjectionKey);
        const scene = inject(SceneInjectionKey);

        return {
            renderer,
            scene,
        }
    },
    created(){
        console.log(this.renderer);
        if (!this.renderer) {
            console.error('Missing parent Renderer')
        }
    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});

export default Object3D;