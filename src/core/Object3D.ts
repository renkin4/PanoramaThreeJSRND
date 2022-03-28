import { Object3D, Scene } from "three";
import { ComponentPublicInstance, defineComponent, PropType, watch } from "vue";
import { bindProp } from "../utils/tools";
import { RendererInjectionKey, SceneInjectionKey } from "./index";
import { RendererInterface } from "./Renderer";
import { EulerPropInterface, Vector3PropInterface } from "./Types";

export interface Object3DSetupInterface {
    renderer?: RendererInterface
    scene?: Scene
    o3d?: Object3D
    parent?: ComponentPublicInstance
}

export default defineComponent({
    name : 'Object3D',
    props : {    
        position: { type: Object as PropType<Vector3PropInterface>, default: () => ({ x: 0, y: 0, z: 0 }) },
        rotation: { type: Object as PropType<EulerPropInterface>, default: () => ({ x: 0, y: 0, z: 0 }) },
        scale: { type: Object as PropType<Vector3PropInterface>, default: () => ({ x: 1, y: 1, z: 1, order: 'XYZ' }) },
        lookAt: { type: Object as PropType<Vector3PropInterface>, default: null },
        userData: { type: Object, default: () => ({}) },
        visible: { type: Boolean, default: true },
    },
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

            bindProp(this, 'position', o3d)
            bindProp(this, 'rotation', o3d)
            bindProp(this, 'scale', o3d)
            bindProp(this, 'userData', o3d.userData)
            bindProp(this, 'visible', o3d)

            if (this.lookAt) o3d.lookAt(this.lookAt.x ?? 0, this.lookAt.y, this.lookAt.z)
            watch(() => this.lookAt, (v) => { o3d.lookAt(v.x ?? 0, v.y, v.z) }, { deep: true })
      
            this.scene?.add(o3d);
        }
    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});
 