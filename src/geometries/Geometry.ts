import { defineComponent } from "vue";


const Geometry = defineComponent({
    name : 'Geometry',
    props : {
        rotateX: Number,
        rotateY: Number,
        rotateZ: Number,
    },

});


export default Geometry;