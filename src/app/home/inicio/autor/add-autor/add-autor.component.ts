import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AutorService } from 'src/app/service/autor/autor.service';
import { Router } from '@angular/router';
import { Autor } from 'src/app/home/inicio/autor/autor';


@Component({
  selector: 'app-add-autor',
  templateUrl: './add-autor.component.html',
  styleUrls: ['./add-autor.component.css']
})
export class AddAutorComponent{


  formulario: FormGroup;
  listaAutores: Autor[] = [];
  autor: Autor = new Autor;
  public isError: boolean = false;
public errorMessage: string = 'Este campo es requerido';

constructor(private autorService: AutorService, private router: Router, private formBuilder: FormBuilder) {
  this.formulario = this.formBuilder.group({
    dniAutor: ['', [
      Validators.required,
      Validators.pattern(/^\d{8}[A-Z]$/)
    ]],
    nombreAutor: ['',Validators.required],
    apellidosAutor: ['',Validators.required],
    lenguaMaterna: ['',Validators.required]
  });
}

  guardarAutor(autor: Autor): void {
    if (this.formulario.valid) {
      const dniAutorValue = this.formulario.value.dniAutor;
      const nombreAutorValue = this.formulario.value.nombreAutor;
      const apellidosAutorValue = this.formulario.value.apellidosAutor;
      const lenguaMaternaValue = this.formulario.value.lenguaMaterna;
  
      // Verificar si hay campos vacíos
      if (!dniAutorValue || !nombreAutorValue || !apellidosAutorValue || !lenguaMaternaValue) {
        alert('Por favor, complete todos los campos');
        return;
      }
  
      // Validación del DNI
      if (!this.validarDNI(dniAutorValue)) {
        this.formulario.get('dniAutor')?.setErrors({ dniInvalido: true });
        alert('El DNI no es válido');
        return;
      }
  
      const nuevoAutor: Autor = {
        dniAutor: dniAutorValue,
        nombreAutor: nombreAutorValue,
        apellidosAutor: apellidosAutorValue,
        lenguaMaterna: lenguaMaternaValue
      };
  
      // Validar DNI repetido antes de guardar el autor
      this.autorService.listarAutorPorId(dniAutorValue).subscribe((autorExistente) => {
        if (autorExistente) {
          alert('Ya existe un autor con el mismo DNI');
        } else {
          this.autorService.guardarAutor(nuevoAutor).subscribe(() => {
            alert('Autor guardado exitosamente');
            this.listaAutores.push(nuevoAutor);
  
            // Redirigir a la página deseada después de guardar
            this.router.navigate(['/autor']);
          }, () => {
            alert('Error al guardar el autor');
          });
        }
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
validarDNI(dni: string): boolean {
  const numero = parseInt(dni.slice(0, -1), 10); // Convertir a número
  const letra = dni.slice(-1).toUpperCase();
  const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';

  if (isNaN(numero) || numero.toString().length !== 8) {
    return false;
  }

  const letraCalculada = letrasValidas.charAt(numero % 23);
  return letra === letraCalculada;
}
  listarAutor(): void {
    this.autorService.listarAutor()
      .subscribe(autores => {
        this.listaAutores = autores;
      });
  }

}
