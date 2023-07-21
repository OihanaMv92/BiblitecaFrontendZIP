import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from 'src/app/Modelo/autorInter';



@Injectable({
  providedIn: 'root'
})
export class AutorService {
  getAutor(dniAutor: number) {
    throw new Error('Method not implemented.');
  }
  private backendURL: string = "http://localhost:8080/api/autor"
  $emitter: any;
  

  constructor(private httpClient: HttpClient) { 
   }
   
   //el metodo listarAutor retorna un observable que emite la lista de objetos Autor
   listarAutor(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(`${this.backendURL}/listarAutor`);
  }

  listarAutorPorId(dniAutor: string): Observable<Autor> {
    return this.httpClient.get<Autor>(`${this.backendURL}/obtenerAutor/${dniAutor}`);
  }

  @Injectable()
  guardarAutor(autor: Autor): Observable<Autor> {
    return this.httpClient.post<Autor>(`${this.backendURL}/guardarAutor`, autor);
  }

  actualizarAutor(autor: Autor): Observable<Autor> {
    const url = `${this.backendURL}/guardarAutor`;
    return this.httpClient.put<Autor>(url, autor);
  }


  eliminarAutor(dniAutor: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.backendURL}/eliminarAutor/${dniAutor}`);
  }

}

