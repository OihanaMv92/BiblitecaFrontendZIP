import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/Modelo/libroInter';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private backendURL: string = "http://localhost:8080/api/libro"
  $emitter: any;
  

  constructor(private httpClient: HttpClient) { 
   }
   
   listarLibro(): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${this.backendURL}/listarLibro`);
  }

  listarLibroPorId(IsbnLibro: string): Observable<Libro> {
    return this.httpClient.get<Libro>(`${this.backendURL}/obtenerLibro/${IsbnLibro}`);
  }
  

 
  guardarLibro(libro: Libro): Observable<Libro> {
    return this.httpClient.post<Libro>(`${this.backendURL}/guardarLibro`, libro);
  }

  actualizarLibro(libro: Libro): Observable<Libro> {
    const url = `${this.backendURL}/guardarLibro`;
    return this.httpClient.put<Libro>(url, libro);
  }


  eliminarLibro(IsbnLibro: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.backendURL}/eliminarLibro/${IsbnLibro}`);
  }

}

