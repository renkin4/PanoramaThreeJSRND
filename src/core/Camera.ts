import { defineComponent } from "vue";

export function cameraSetProp(camera: any, key: string, value: any, updateProjectionMatrix = true) {
    camera[key] = value
    if (updateProjectionMatrix) camera.updateProjectionMatrix()
}
  
export default defineComponent({
    name : 'Camera',
    // methods: {
    //     cameraSetProp(updateProjectionMatrix = true){
            
    //     }
    // },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});
