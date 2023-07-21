import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../usuario';
import { AutorService } from 'src/app/service/autor/autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-edit-usu',
  templateUrl: './edit-usu.component.html',
  styleUrls: ['./edit-usu.component.css']
})
export class EditUsuComponent implements OnInit{

  listaUsuario: Usuario[] = [];
  formulario: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formulario = new FormGroup({
      dniUsuario: new FormControl(''),
      nombreUsuario: new FormControl(''),
      apellidosUsuario: new FormControl(''),
      fechaInscripcionUsuario: new FormControl(''),
      telefonoUsuario: new FormControl(''),
      emailUsuario: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const dniUsuario = params['dniUsuario'];
      if (dniUsuario) {
        this.mostrarUsuarioPorId(dniUsuario);
      }
    });

    this.listarUsu();
  }

  mostrarUsuarioPorId(dniUsuario: string): void {
    this.usuarioService.listarUsuarioPorId(dniUsuario).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        this.formulario.patchValue({
          dniUsuario: usuario.dniUsuario,
          nombreUsuario: usuario.nombreUsuario,
          apellidosUsuario: usuario.apellidosUsuario,
          fechaInscripcionUsuario: usuario.fechaInscripcionUsuario,
          telefonoUsuario: usuario.telefonoUsuario,
          emailUsuario: usuario.emailUsuario
        });

        // Asignar los valores al formulario aquí
        this.asignarValoresFormulario();
      },
      (error: any) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  asignarValoresFormulario(): void {
    this.formulario.patchValue({
      dniUsuario: this.usuario.dniUsuario,
      nombreUsuario: this.usuario.nombreUsuario,
      apellidosUsuario: this.usuario.apellidosUsuario,
      fechaInscripcionUsuario: this.usuario.fechaInscripcionUsuario,
      telefonoUsuario: this.usuario.telefonoUsuario,
      emailUsuario: this.usuario.emailUsuario
    });
  }

  actualizarUsuario(): void {
    if (this.formulario.valid) {
      const dniUsuariovalue = this.formulario.value.dniUsuario;
      const dniPattern = /^\d{8}[A-Za-z]$/;

      if (!dniPattern.test(dniUsuariovalue)) {
        this.formulario.get('dniUsuario')?.setErrors({ dniInvalido: true });
        alert('El DNI debe tener 8 números y 1 letra');
        return;
      }

      const usuarioExistente = this.listaUsuario.find(
        (usu) => usu.dniUsuario === dniUsuariovalue
      );

      const fechaInscripcion = this.formulario.value.fechaInscripcionUsuario;
      const fechaParts = fechaInscripcion.split('/');
      const day = parseInt(fechaParts[0]);
      const month = parseInt(fechaParts[1]) - 1; // El mes se basa en cero en el objeto Date de JavaScript
      const year = parseInt(fechaParts[2]);
      const fechaInscripcionEuropea = new Date(year, month, day);
      const formatoFechaEuropeo = fechaInscripcionEuropea.toLocaleDateString('es-ES');


      if (usuarioExistente) {
        usuarioExistente.nombreUsuario = this.formulario.value.nombreUsuario;
        usuarioExistente.apellidosUsuario = this.formulario.value.apellidosUsuario;
        usuarioExistente.fechaInscripcionUsuario = formatoFechaEuropeo;
        usuarioExistente.telefonoUsuario = this.formulario.value.telefonoUsuario;
        usuarioExistente.emailUsuario = this.formulario.value.emailUsuario;


        this.usuarioService.actualizarUsuario(usuarioExistente).subscribe(() => {
          console.log('Usuario actualizado exitosamente');
          this.listarUsu();
          this.router.navigate(['/usuario']);
        });
      } else {
        alert('Usuario no encontrado en la lista');
      }
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  listarUsu(): void {
    this.usuarioService.listarUsuario().subscribe((usuarios) => {
      this.listaUsuario = usuarios;
    });
  }
}