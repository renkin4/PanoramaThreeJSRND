import { Object3D, Scene } from "three";
import { defineComponent, InjectionKey } from "vue"; 

export interface SceneSetupInterface {
    scene?: Scene,
    add: (o: Object3D) => void,
    remove: (o: Object3D) => void,
}

export const SceneInjectionKey: InjectionKey<Scene> = Symbol('Scene')

export default defineComponent({
    name : 'Scene',
    setup() : SceneSetupInterface{ 
        const scene = new Scene();

        const add = (o: Object3D): void => { scene.add(o) }
        const remove = (o: Object3D): void => { scene.remove(o) }
    
        return { 
            scene,
            add,
            remove
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