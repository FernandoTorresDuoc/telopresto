export interface Marker {
    id_servicio?: number;
    categoria?: string;
    descripcion?: string;
    direccion?: string;
    dia_ini?: number;
    dia_ter?: number;
    hora_ini?: number;
    hora_ter?: number;
    precio?: number;
    fecha_creacion?: Date;
    estado?: string;
    latitud?:  number;
    longitud?: number;
    id_usuario?: number;

    // lat?: number;
    // lng?: number;
    // title?: string;
    image?: string;
    // text: string;
    markerObj?: any;
}