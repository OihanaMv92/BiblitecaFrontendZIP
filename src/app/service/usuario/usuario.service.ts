import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Modelo/usuarioInter';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private backendURL: string = "http://localhost:8080/api/usuario"
  $emitter: any;
  

  constructor(private httpClient: HttpClient) { 
   }
   
   listarUsuario(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.backendURL}/listarUsuario`);
  }

  listarUsuarioPorId(dniUsuario: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.backendURL}/obtenerUsuario/${dniUsuario}`);
  }
  

  @Injectable()
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.backendURL}/guardarUsuario`, usuario);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.backendURL}/guardarUsuario`;
    return this.httpClient.put<Usuario>(url, usuario);
  }


  eliminarUsuario(dniUsuario: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.backendURL}/eliminarUsuario/${dniUsuario}`);
  }

}

