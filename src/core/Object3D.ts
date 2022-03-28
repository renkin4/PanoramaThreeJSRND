import { Object3D, Scene } from "three";
import { ComponentPublicInstance, defineComponent } from "vue";
import { RendererInjectionKey, SceneInjectionKey } from "./index";
import { RendererInterface } from "./Renderer";

export interface Object3DSetupInterface {
    renderer?: RendererInterface
    scene?: Scene
    o3d?: Object3D
    parent?: ComponentPublicInstance
}

export default defineComponent({
    name : 'Object3D',
    props : {},
    inject: {
        renderer: RendererInjectionKey as symbol,
        scene: SceneInjectionKey as symbol,
    },
    setup(props) : Object3DSetupInterface { 
        return {}
    },
    created() {
        if (!this.renderer) {
            console.error('Missing parent Renderer');
            return;
        }
            
        if (!this.scene) {
            console.error('Missing parent Scene')
        }
    },
    methods: {
        InitObject3D(o3d: Object3D) {
            this.o3d = o3d
            o3d.userData.component = this

            this.scene?.add(o3d);
        }
    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});
 