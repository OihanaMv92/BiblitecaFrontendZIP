import { Autor } from "../autor/autor";
import { Usuario } from "../usuario/usuario";

export class Libro {
    isbnLibro: string;
    nombreLibro: string;
    descripcionLibro: string;
    tipoLibro: string;
    fechaAlquiler: string;
    idiomaLibro: string;
    usuario: Usuario;
    autor: Autor;
  }