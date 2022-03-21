import { Scene } from "three";
import { defineComponent, InjectionKey } from "vue"; 

export const SceneInjectionKey: InjectionKey<Scene> = Symbol('Scene')

export default defineComponent({
    name : 'Scene',
    setup() { 
        const scene = new Scene();

        return { 
            scene
        }
    },
    provide() {
        return{
            [SceneInjectionKey as symbol] : this.scene,
        };
    },
    created() {
         
    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});