import { WebGLRenderer } from "three";
import { ComponentPublicInstance, defineComponent, InjectionKey, PropType } from "vue";

export interface RendererInterface {
    canvas: HTMLCanvasElement,
    renderer: WebGLRenderer,
    renderFn : {(time: Number): void},
}

export interface RendererPublicInterface extends ComponentPublicInstance, RendererInterface  {}

export const RendererInjectionKey : InjectionKey<RendererPublicInterface> = Symbol('Renderer');

export default defineComponent({
    name : 'Renderer',
    props : { 
        resize : { type : [Boolean, String] as PropType<boolean | string>, default :false },
        antialias : Boolean,
        alpha : Boolean,
    },
    provide() {
        return {
            [RendererInjectionKey as symbol] : this,
        } 
    },
    setup(props, { attrs }) {
        const { antialias, alpha } = props;

        const canvas = document.createElement('canvas');
        const renderer = new WebGLRenderer({ canvas, antialias, alpha });

        // TODO change this to the parent's div Width and height
        renderer.setSize( window.innerWidth, window.innerHeight );

        const renderFn: {(time: Number): void} = () => {}

        return {
            canvas,
            renderer,
            renderFn
        };
    },
    mounted() {
        const { canvas, renderer } = this; 

        requestAnimationFrame(this.renderLoop);

        // Insert Canvas Into the App div
        this.$el.parentNode.insertBefore(canvas, this.$el);
    }, 
    methods:{
        render(time: number) {  
            this.renderFn(time);
        },
        renderLoop(time: number) {
            requestAnimationFrame(this.renderLoop);
            this.render(time);
        },
    },
    render() {
        return this.$slots.default ? this.$slots.default() : []
    },
});