import { MeshBasicMaterial } from "three";
import { PropType } from "vue";
import { materialComponent } from "./Material";
import { BasicMaterialPropsInterface } from "./types";

export default materialComponent('BasicMaterial', 
    { 
        props: { 
            type: Object as PropType<BasicMaterialPropsInterface>, 
            default: () => ({}) 
        } 
    }, 
    (opts) => new MeshBasicMaterial(opts)
);
