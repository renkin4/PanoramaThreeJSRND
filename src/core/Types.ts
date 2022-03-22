export interface Vector2PropInterface {
    x?: number
    y?: number
    width?: number
    height?: number
}

export interface Vector3PropInterface extends Vector2PropInterface {
    z?: number
}
 
export interface EulerPropInterface extends Vector3PropInterface {
    order?: 'XYZ' | 'YZX' | 'ZXY' | 'XZY' | 'YXZ' | 'ZYX'
  }