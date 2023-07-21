import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from 'src/app/Modelo/autorInter';
import { Libro } from 'src/app/Modelo/libroInter';
import { Usuario } from 'src/app/Modelo/usuarioInter';
import { AutorService } from 'src/app/service/autor/autor.service';
import { LibroService } from 'src/app/service/libro/libro.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Genero } from '../genero.enum';

@Component({
  selector: 'app-edit-libro',
  templateUrl: './edit-libro.component.html',
  styleUrls: ['./edit-libro.component.css']
})
export class EditLibroComponent {
  libro: Libro;
  listaLibro: Libro[] = [];
  autores: Autor[];
  usuarios: Usuario[];
  usuario: Usuario;
  autor: Autor;
  formulario: FormGroup;
  generos: string[] = Object.values(Genero);
  
  constructor(
    private libroService: LibroService,
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {

  
  this.formulario = new FormGroup({
    isbnLibro: new FormControl(''),
    nombreLibro: new FormControl(''),
    descripcionLibro: new FormControl(''),
    tipoLibro: new FormControl(''),
    fechaAlquiler: new FormControl(''),
    idiomaLibro: new FormControl(''),
    dniUsuario: new FormControl(''),
    dniAutor: new FormControl('')
  });
}
ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe(params => {
    const isbnLibro = params['isbnLibro'];
    if (isbnLibro) {
      this.mostrarLibroPorId(isbnLibro);
    }
  });
  this.listarAutores();
  this.listarUsuarios();
  this.listarLibro();

  this.formulario = this.formBuilder.group({
    isbnLibro: new FormControl(''),
    nombreLibro: new FormControl(''),
    descripcionLibro: new FormControl(''),
    tipoLibro: new FormControl(''),
    fechaAlquiler: new FormControl(''),
    idiomaLibro: new FormControl(''),
    dniUsuario: new FormControl(''),
    dniAutor: new FormControl('')
  });
}

mostrarLibroPorId(isbnLibro: string): void {

    this.libroService.listarLibroPorId(isbnLibro).subscribe(
      (libro: Libro) => {
        this.libro = libro;
        if (this.libro) {
          this.formulario.patchValue({
            isbnLibro: this.libro.isbnLibro,
            nombreLibro: this.libro.nombreLibro,
            descripcionLibro: this.libro.descripcionLibro,
            tipoLibro: this.libro.tipoLibro,
            fechaAlquiler: this.libro.fechaAlquiler,
            idiomaLibro: this.libro.idiomaLibro,
            dniUsuario: this.libro.usuario?.dniUsuario,
            dniAutor: this.libro.autor?.dniAutor
          });
        }
      },
      (error: any) => {
        console.error('Error al obtener el Libro:', error);
      }
    );
  }

  

  listarLibro(): void{
    this.libroService.listarLibro().subscribe((libro) => {
      this.listaLibro = libro;
    });
  }
  actualizarLibro(): void {
    if (this.formulario.valid) {
      const isbnLibroValue = this.formulario.value.isbnLibro;
      const fechaAlquilerValue = this.formulario.value.fechaAlquiler;
      
      const fechaInscripcion = this.formulario.value.fechaAlquiler;
      const fechaParts = fechaInscripcion.split('/');
      const day = parseInt(fechaParts[0]);
      const month = parseInt(fechaParts[1]) - 1; // El mes se basa en cero en el objeto Date de JavaScript
      const year = parseInt(fechaParts[2]);
      
      // Validar si la fecha es válida
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert('Fecha inválida');
        return;
      }
      
      const fechaInscripcionEuropea = new Date(year, month, day);
      const formatoFechaEuropeo = fechaInscripcionEuropea.toLocaleDateString('es-ES');
      
      const autorSeleccionado = this.autores.find(
        (autor) => autor.dniAutor === this.formulario.value.dniAutor
      );
  
      const usuarioSeleccionado = this.usuarios.find(
        (usuario) => usuario.dniUsuario === this.formulario.value.dniUsuario
      );
  
      if (!autorSeleccionado) {
        alert('Seleccione un autor válido');
        return;
      }
  
      if (!usuarioSeleccionado) {
        alert('Seleccione un usuario válido');
        return;
      }
  
      const nuevoLibro: Libro = {
        isbnLibro: this.formulario.controls['isbnLibro'].value || '',
        nombreLibro: this.formulario.controls['nombreLibro'].value || '',
        tipoLibro: this.formulario.controls['tipoLibro'].value || '',
        descripcionLibro: this.formulario.controls['descripcionLibro'].value || '',
        fechaAlquiler: formatoFechaEuropeo, // Usar el valor del formulario
        idiomaLibro: this.formulario.controls['idiomaLibro'].value || '',
        usuario: usuarioSeleccionado,
        autor: autorSeleccionado
      };
  
      this.libroService.actualizarLibro(nuevoLibro).subscribe(() => {
        alert('Libro actualizado exitosamente');
        this.router.navigate(['/libro']);
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  listarAutores(): void {
    this.autorService.listarAutor().subscribe(autores => {
      this.autores = autores;
      console.log('Autores:', this.autores); 
      this.listarLibro(); 
    });
  }
  
  listarUsuarios(): void {
    this.usuarioService.listarUsuario().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log('Usuarios:', this.usuarios); 
      this.listarLibro(); 
    });
  }
}