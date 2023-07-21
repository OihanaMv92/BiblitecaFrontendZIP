
import { Component } from '@angular/core';
import { AutorService } from './service/autor/autor.service';
import { UsuarioService } from './service/usuario/usuario.service';
import { LibroService } from './service/libro/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  autorForm: FormGroup;
  
 constructor(
  public fb: FormBuilder,
  public autorService: AutorService,
  public usuarioService: UsuarioService,
  public libroService: LibroService,
  private dialog: MatDialog
  
 ){}

 ngOnInit(){
  // añadir los datos de autor
this.autorForm = this.fb.group({
  DniAutor : ['',Validators.required],
	NombreAutor : ['',Validators.required],
	apellidosAutor : ['',Validators.required],
	lenguaMaterna : ['',Validators.required],
	libro : ['',Validators.required]
})
 }

}
