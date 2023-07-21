import { Autor } from "./autorInter";
import { Usuario } from "./usuarioInter";



export interface Libro {
    isbnLibro: string;
    nombreLibro: string;
    descripcionLibro: string;
    tipoLibro: string;
    fechaAlquiler: string;
    idiomaLibro: string;
    usuario: Usuario;
    autor: Autor;
  }