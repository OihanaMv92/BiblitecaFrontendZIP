import { Injectable } from '@angular/core';
import { Autor } from '../Modelo/autorInter';
import { Usuario } from '../Modelo/usuarioInter';



@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {
  autores: Autor[] = [];
  usuarios: Usuario[] = [];
  constructor() { }
}
