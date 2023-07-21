import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/Modelo/libroInter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LibroService } from 'src/app/service/libro/libro.service';
import { Router } from '@angular/router';
import { Autor } from 'src/app/Modelo/autorInter';
import { Usuario } from 'src/app/Modelo/usuarioInter';
import { AutorService } from 'src/app/service/autor/autor.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Genero } from 'src/app/home/inicio/libro/genero.enum';

@Component({
  selector: 'app-add-libro',
  templateUrl: './add-libro.component.html',
  styleUrls: ['./add-libro.component.css']
})
export class AddLibroComponent  {

  formulario: FormGroup;
  listaLibro: Libro[] = [];
  libro: Libro;
  autores: Autor[];
  usuarios: Usuario[];
  generos: string[] = Object.values(Genero);



  constructor(private libroService: LibroService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorService,private usuarioService: UsuarioService,
    ) {
      this.formulario = this.formBuilder.group({
        
        isbnLibro: ['', [Validators.required, Validators.maxLength(13), Validators.pattern('^[0-9]{13}$')]],
        nombreLibro: ['',Validators.required],
        descripcionLibro: ['',Validators.required],
        tipoLibro: ['',Validators.required],
        fechaAlquiler: ['',Validators.required],
        idiomaLibro: ['',Validators.required],
        dniUsuario: ['',Validators.required],
        dniAutor: ['',Validators.required]
    })
}
ngOnInit(): void {
  this.listarAutores();
  this.listarUsuarios();
  this.listarLibro();

}

guardarLibro(): void {
  if (this.formulario.valid) {
    const isbnLibroValue = this.formulario.value.isbnLibro;
    const fechaAlquilerValue = this.formulario.value.fechaAlquiler;

    const autorSeleccionado = this.autores.find(autor => autor.dniAutor === this.formulario.controls['dniAutor'].value);
    const usuarioSeleccionado = this.usuarios.find(usuario => usuario.dniUsuario === this.formulario.controls['dniUsuario'].value);

    if (!autorSeleccionado) {
      alert('Seleccione un autor válido');
      return;
    }

    if (!usuarioSeleccionado) {
      alert('Seleccione un usuario válido');
      return;
    }

    // Validar el ISBN del libro
    const isbnPattern = /^\d{13}$/;
    if (!isbnPattern.test(isbnLibroValue)) {
      alert('El ISBN del libro es inválido');
      return;
    }

    const fechaInscripcion = this.formulario.value.fechaAlquiler;
    const fechaInscripcionEuropea = new Date(fechaInscripcion);
    const formatoFechaEuropeo = fechaInscripcionEuropea.toLocaleDateString('es-ES');

    const nuevoLibro: Libro = {
      isbnLibro: isbnLibroValue,
      nombreLibro: this.formulario.controls['nombreLibro'].value,
      tipoLibro: this.formulario.controls['tipoLibro'].value,
      descripcionLibro: this.formulario.controls['descripcionLibro'].value,
      fechaAlquiler: formatoFechaEuropeo,
      idiomaLibro: this.formulario.controls['idiomaLibro'].value,
      usuario: usuarioSeleccionado,
      autor: autorSeleccionado
    };

    // Verificar si ya existe un libro con el mismo ISBN
    this.libroService.listarLibroPorId(isbnLibroValue).subscribe(libroExistente => {
      if (libroExistente) {
        alert('Ya existe un libro con el mismo ISBN');
      } else {
        this.libroService.guardarLibro(nuevoLibro).subscribe(() => {
          alert('Libro guardado exitosamente');
          this.router.navigate(['/libro']);
        });
      }
    });
  } else {
    alert('Por favor, complete todos los campos');
  }
}
  
listarLibro(): void {
  this.libroService.listarLibro()
    .subscribe(libros => {
      this.listaLibro = libros;
    });
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
