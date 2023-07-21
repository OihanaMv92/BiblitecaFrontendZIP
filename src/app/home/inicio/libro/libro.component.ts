import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { FormGroup } from '@angular/forms';
import { LibroService } from 'src/app/service/libro/libro.service';
import { Router } from '@angular/router';
import { DatosCompartidosService } from 'src/app/service/datos-compartidos.service';
import { Autor } from 'src/app/Modelo/autorInter';
import { Usuario } from 'src/app/Modelo/usuarioInter';
import { AutorService } from 'src/app/service/autor/autor.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  formulario: FormGroup;
  libros: Libro[];
  libro: Libro;
  autores: Autor[];
  usuarios: Usuario[];  


  constructor(private libroService: LibroService, private autorService: AutorService, private usuarioService: UsuarioService, private route: Router, private datosService: DatosCompartidosService) { }
  

  ngOnInit(): void {
    this.listarAutores();
    this.listarUsuarios();
    this.listarLibro();
  }


  listarLibro(): void {
    this.libroService.listarLibro()
      .subscribe(libros => {
        this.libros = libros;
  
        if (this.autores && this.autores.length > 0) {
          for (const libro of this.libros) {
            const autorEncontrado = this.autores.find(autor => autor.dniAutor === libro.autor?.dniAutor);
            if (autorEncontrado) {
              libro.autor = autorEncontrado;
            }
          }
        }
  
        if (this.usuarios && this.usuarios.length > 0) {
          for (const libro of this.libros) {
            if (libro.usuario) {
              const usuarioEncontrado = this.usuarios.find(usuario => usuario.dniUsuario === libro.usuario.dniUsuario);
              if (usuarioEncontrado) {
                libro.usuario = usuarioEncontrado;
              }
            }
          }
        }
      });
  }
  
  eliminarLibro(isbnLibro: string): void {
    this.libroService.eliminarLibro(isbnLibro)
      .subscribe(() => {
        console.log('Libro eliminado exitosamente');
        alert('Libro eliminado exitosamente');
        this.listarLibro();
      });
  }
  listarAutores(): void {
    this.autorService.listarAutor()
      .subscribe(autores => {
        this.autores = autores;
        console.log('Autores:', this.autores); // Verificar los datos de los autores en la consola
      });
  }
  
  listarUsuarios(): void {
    this.usuarioService.listarUsuario()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        console.log('Usuarios:', this.usuarios); // Verificar los datos de los usuarios en la consola
      });
  }

  editarLibro(isbnLibro: String): void {
    this.route.navigate(['/libro/editLibro'], { queryParams: { isbnLibro: isbnLibro } }); 
  }

}

