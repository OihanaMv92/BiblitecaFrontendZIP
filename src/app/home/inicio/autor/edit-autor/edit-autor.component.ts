import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Autor } from '../autor';
import { AutorService } from 'src/app/service/autor/autor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-autor',
  templateUrl: './edit-autor.component.html',
  styleUrls: ['./edit-autor.component.css']
})
export class EditAutorComponent implements OnInit{

  formulario: FormGroup;
  listaAutores: Autor[] = [];
  autor: Autor = new Autor();

  constructor(
    private autorService: AutorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    
  ) {
    this.formulario = this.formBuilder.group({
      dniAutor: [''],
      nombreAutor: [''],
      apellidosAutor: [''],
      lenguaMaterna: ['']
    });
    
  }

  ngOnInit(): void {
    this.listarAutor(); 
    this.formulario.patchValue({
      dniAutor: this.autor.dniAutor,
      nombreAutor: this.autor.nombreAutor,
      apellidosAutor: this.autor.apellidosAutor,
      lenguaMaterna: this.autor.lenguaMaterna
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const dniAutor = params['dniAutor'];
      if (dniAutor) {
        this.mostrarAutorPorId(dniAutor);
        this.formulario.patchValue({
          dniAutor: dniAutor,
        });
      }
    });
  }

  mostrarAutorPorId(dniAutor: string): void {
    this.autorService.listarAutorPorId(dniAutor).subscribe(
      (autor: Autor) => {
        this.autor = autor;
        this.formulario.patchValue({
          dniAutor: autor.dniAutor,
          nombreAutor: autor.nombreAutor,
          apellidosAutor: autor.apellidosAutor,
          lenguaMaterna: autor.lenguaMaterna
        });
      },
      (error: any) => {
        console.error('Error al obtener el autor:', error);
      }
    );
  }


  actualizarAutor(): void {
    if (this.formulario.valid) {
      const dniAutorValue = this.formulario.value.dniAutor;
      const dniPattern = /^\d{8}[A-Za-z]$/;
  
      if (!dniPattern.test(dniAutorValue)) {
        this.formulario.get('dniAutor')?.setErrors({ dniInvalido: true });
        alert('El DNI debe tener 8 números y 1 letra');
        return;
      }
  
      const autorExistente = this.listaAutores.find(
        (a) => a.dniAutor === dniAutorValue
      );
  
      if (autorExistente) {
        autorExistente.nombreAutor = this.formulario.value.nombreAutor;
        autorExistente.apellidosAutor = this.formulario.value.apellidosAutor;
        autorExistente.lenguaMaterna = this.formulario.value.lenguaMaterna;
  
        this.autorService.actualizarAutor(autorExistente).subscribe(() => {
          alert('Autor actualizado exitosamente');
          this.listarAutor();
          this.router.navigate(['/autor']);
        });
      } else {
        alert('Autor no encontrado en la lista');
      }
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  listarAutor(): void {
    this.autorService.listarAutor().subscribe((autores) => {
      this.listaAutores = autores;
    });
  }
}