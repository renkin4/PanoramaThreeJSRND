import { PerspectiveCamera, Vector3 } from "three";
import { defineComponent, inject, PropType, watch } from "vue";
import Camera from "./Camera";
import { RendererInjectionKey } from "./Renderer";
import { SceneInjectionKey } from "./Scene";
import { Vector3PropInterface } from "./Types";


export default defineComponent({
    extends: Camera,
    name : 'PerspectiveCamera',
    props : {
        fov : { type : Number, default : 50 },
        aspect : { type : Number, default : 1 },
        near : { type : Number, default : 0.1 },
        far : { type : Number, default : 2000 },
        position: { type: Object as PropType<Vector3PropInterface>, default: () => ({ x: 0, y: 0, z: 0 }) },
        lookAt: { type: Object as PropType<Vector3PropInterface>, default: null },
    },
    setup(props){
        const { fov, aspect, near, far, position, lookAt } = props;

        const renderer = inject(RendererInjectionKey);
        const scene = inject(SceneInjectionKey);
        if(!renderer){
            console.error("Renderer Not Injected");
            return;
        }

        if(!scene){
            console.error("Scene Not Injected");
            return;
        }

        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.x = position.x || 0;
        camera.position.y = position.y || 0;
        camera.position.z = position.z || 0;
        
        // Hack 
        renderer.renderFn = () : void => {
            renderer.renderer.render(scene, camera);
        };

        // watch(() => lookAt, (v) => {camera.lookAt(v.x ?? 0, v.y ?? 0, v.z ?? 0) }, { deep : true });

        return {
            renderer,
            camera,
        }
    },
    methods: { 
    }
});
