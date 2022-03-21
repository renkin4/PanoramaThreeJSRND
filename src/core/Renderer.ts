import { WebGLRenderer } from "three";
import { defineComponent, InjectionKey, PropType } from "vue";

export const RendererInjectionKey : InjectionKey<WebGLRenderer> = Symbol('Renderer');

interface RendererSetupInterface {
    canvas: HTMLCanvasElement
}

export default defineComponent({
    name : 'Renderer',
    props : { 
        resize : { type : [Boolean, String] as PropType<boolean | string>, default :false },
        antialias : Boolean,
        alpha : Boolean,
    },
    setup(props, { attrs }) {
        const { antialias, alpha } = props;

        const canvas = document.createElement('canvas');
        const renderer = new WebGLRenderer({ canvas, antialias, alpha });

        // TODO change this to the parent's div Width and height
        renderer.setSize( window.innerWidth, window.innerHeight );
        
        return {
            canvas,
            renderer
        };
    },
    mounted() {
        const { canvas, renderer } = this; 
        
        // Insert Canvas Into the App div
        this.$el.parentNode.insertBefore(canvas, this.$el);
    },
    provide() {
        return {
            [RendererInjectionKey as symbol] : this.renderer,
        } 
    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});