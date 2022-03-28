import { BufferGeometry, Material, Mesh as TMesh } from "three";
import { defineComponent, ComponentPublicInstance, InjectionKey, ComponentPropsOptions } from "vue";
import Object3D, { Object3DSetupInterface } from "../core/Object3D";

export interface MeshSetupInterface extends Object3DSetupInterface {
    mesh? : TMesh,
    geometry?: BufferGeometry,
    material? : Material,
}

export interface MeshPublicInterface extends ComponentPublicInstance {}

export const MeshInjectionKey: InjectionKey<MeshPublicInterface> = Symbol('Mesh')

const Mesh = defineComponent({
    name : 'Mesh', 
    extends : Object3D,
    props: {
        castShadow: Boolean,
        receiveShadow: Boolean,
    },
    setup() : MeshSetupInterface {
        return {};
    },
    provide() {
        return {
          [MeshInjectionKey as symbol]: this,
        }
    },
    mounted(){
        if(!this.mesh) this.initMesh();
    },
    methods : {
        initMesh() {
            const mesh = new TMesh(this.geometry, this.material);

            // Bind Props to Mesh

            this.mesh = mesh;
            this.InitObject3D(this.mesh);
        },
        createGeometry() {},
        addGeometryWatchers(props: Readonly<ComponentPropsOptions>) {
            Object.keys(props).forEach(prop => {
                // @ts-ignore
                watch(() => this[prop], () => {
                    this.refreshGeometry()
                })
            })
        },
        setGeometry(geometry: BufferGeometry) {
            this.geometry = geometry
            if (this.mesh) this.mesh.geometry = geometry
        },
        setMaterial(material: Material) {
            this.material = material
            if (this.mesh) this.mesh.material = material
        },
        refreshGeometry() {
            const oldGeo = this.geometry
            this.createGeometry()
            if (this.mesh && this.geometry) this.mesh.geometry = this.geometry
            oldGeo?.dispose()
        },
    },
    unmounted() {
        // for predefined mesh (geometry/material are not unmounted)
        if (this.geometry) this.geometry.dispose()
        if (this.material) this.material.dispose()
    },

});

export default Mesh

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function meshComponent<P extends Readonly<ComponentPropsOptions>>(
    name: string,
    props: P,
    createGeometry: {(c: any): BufferGeometry}
  ) {
    return defineComponent({
      name,
      extends: Mesh,
      props,
      created() {
        this.createGeometry()
        this.addGeometryWatchers(props)
      },
      methods: {
        createGeometry() {
          this.geometry = createGeometry(this)
        },
      },
    })
  }
  