export interface Servicio {
    id_servicio: number;
    categoria: String;
    descripcion: String;
    direccion: String;
    dia_ini: number;
    dia_ter: number;
    hora_ini: number;
    hora_ter: number;
    precio: number;
    fecha_creacion: String;
    estado: String;
    id_usuario: number;
    latitud: number;
    longitud: number;
    id_comuna: number;
    nom_comuna: String;
}
