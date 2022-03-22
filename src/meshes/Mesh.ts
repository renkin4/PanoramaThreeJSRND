import { defineComponent, ComponentPublicInstance } from "vue";
import Object3D from "../core/Object3D";


export interface MeshPublicInterface extends ComponentPublicInstance {}

const Mesh = defineComponent({
    name : 'Mesh', 
    extends : Object3D,
    

});