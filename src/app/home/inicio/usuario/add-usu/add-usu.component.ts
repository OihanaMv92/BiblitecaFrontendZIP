import { Component } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-add-usu',
  templateUrl: './add-usu.component.html',
  styleUrls: ['./add-usu.component.css']
})
export class AddUsuComponent {

  formulario: FormGroup;
  listaUsuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();

  constructor(private usuService: UsuarioService, private router: Router, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
        dniUsuario: ['', [
          Validators.required,
          Validators.pattern(/^\d{8}[A-Z]$/)
        ]],
      nombreUsuario: ['', Validators.required],
      apellidosUsuario: ['', Validators.required],
      fechaInscripcionUsuario: ['', Validators.required],
      telefonoUsuario: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      emailUsuario: ['', [Validators.required, Validators.email]]
    });
  }

  guardarUsuario(usuario: Usuario): void {
    if (this.formulario.valid) {
      const dniUsuarioValue = this.formulario.value.dniUsuario;
  
      // Validación del DNI
      if (!this.validarDNI(dniUsuarioValue)) {
        this.formulario.get('dniUsuario')?.setErrors({ dniInvalido: true });
        alert('El DNI no es válido');
        return;
      }
  
      const emailUsuarioValue = this.formulario.value.emailUsuario;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailPattern.test(emailUsuarioValue)) {
        this.formulario.get('emailUsuario')?.setErrors({ emailInvalido: true });
        alert('El correo electrónico no es válido');
        return;
      }
  
      const telefonoUsuarioValue = this.formulario.value.telefonoUsuario;
      const telefonoPattern = /^\d{9}$/;
  
      if (!telefonoPattern.test(telefonoUsuarioValue)) {
        this.formulario.get('telefonoUsuario')?.setErrors({ telefonoInvalido: true });
        alert('El número de teléfono debe tener exactamente 9 dígitos');
        return;
      }
  
      const fechaInscripcion = this.formulario.value.fechaInscripcionUsuario;
      const fechaInscripcionEuropea = new Date(fechaInscripcion);
      const formatoFechaEuropeo = fechaInscripcionEuropea.toLocaleDateString('es-ES');
  
      const nuevoUsuario: Usuario = {
        dniUsuario: dniUsuarioValue,
        nombreUsuario: this.formulario.value.nombreUsuario,
        apellidosUsuario: this.formulario.value.apellidosUsuario,
        fechaInscripcionUsuario: formatoFechaEuropeo,
        telefonoUsuario: telefonoUsuarioValue,
        emailUsuario: emailUsuarioValue
      };
  
      // Validar DNI repetido antes de guardar el usuario
      this.usuService.listarUsuarioPorId(dniUsuarioValue).subscribe((usuarioExistente) => {
        if (usuarioExistente) {
          alert('Ya existe un usuario con el mismo DNI');
        } else {
          this.usuService.guardarUsuario(nuevoUsuario).subscribe(() => {
            alert('Usuario guardado exitosamente');
            this.listaUsuarios.push(nuevoUsuario);
                   // Redirigir a la página deseada después de guardar
                   this.router.navigate(['/usuario']);
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

  listarUsuarios(): void {
    this.usuService.listarUsuario()
      .subscribe(usuarios => {
        this.listaUsuarios = usuarios;
      });
  }
}