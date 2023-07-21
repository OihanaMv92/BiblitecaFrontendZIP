import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Autor } from 'src/app/home/inicio/autor/autor';
import { AutorService } from 'src/app/service/autor/autor.service';
import {DatosCompartidosService} from 'src/app/service/datos-compartidos.service'


@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  formulario: FormGroup;
  autores: Autor[];
  autor: Autor;
  nombreBusqueda: string;
  
  constructor(private autorService: AutorService, private route: Router, private datosService: DatosCompartidosService) { }

  ngOnInit(): void {
    this.listarAutor();
  }


  listarAutor(): void {
    this.autorService.listarAutor()
      .subscribe(autores => {
        this.autores = autores;
      });
  }


  eliminarAutor(dniAutor: string): void {
    this.autorService.eliminarAutor(dniAutor)
    .subscribe(() => {
      console.log('Autor eliminado exitosamente');
      alert('Autor eliminado exitosamente');
      this.listarAutor();
    },
    (error) => {
      console.error('Error al eliminar autor:', error);
      alert('El autor no puede ser eliminado! Elimine primero el libro del autor.');
    });
}

  editarAutor(dniAutor: String): void {
    this.route.navigate(['/autor/editAutor'], { queryParams: { dniAutor: dniAutor } }); 

  }
}