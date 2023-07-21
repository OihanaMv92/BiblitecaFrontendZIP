import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/usuarioInter';
import { DatosCompartidosService } from 'src/app/service/datos-compartidos.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  formulario: FormGroup;
  usuarios: Usuario[];
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private route: Router,) { }

  ngOnInit(): void {
    this.listarUsuario();
  }


  listarUsuario(): void {
    this.usuarioService.listarUsuario()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      });
  }

  eliminarUsuario(dniUsuario: string): void {
    this.usuarioService.eliminarUsuario(dniUsuario)
      .subscribe(() => {
        console.log('Usuario eliminado exitosamente');
        alert('Usuario eliminado exitosamente');
        this.listarUsuario();
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
        alert('El usuario no puede ser eliminado tiene libros que entregar!');
      });
  }

  editarUsuario(dniUsuario: String): void {
    this.route.navigate(['/usuario/editUsuario'], { queryParams: { dniUsuario: dniUsuario } }); 
  }

}
