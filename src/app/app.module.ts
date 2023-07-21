import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { InicioComponent } from './home/inicio/inicio.component'
import {MatButtonModule} from '@angular/material/button';
import { AutorComponent } from './home/inicio/autor/autor.component';
import { AddAutorComponent } from './home/inicio/autor/add-autor/add-autor.component';
import { EditAutorComponent } from './home/inicio/autor/edit-autor/edit-autor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './home/inicio/usuario/usuario.component';
import { EditUsuComponent } from './home/inicio/usuario/edit-usu/edit-usu.component';
import { AddUsuComponent } from './home/inicio/usuario/add-usu/add-usu.component';
import { LibroComponent } from './home/inicio/libro/libro.component';
import { AddLibroComponent } from './home/inicio/libro/add-libro/add-libro.component';
import { EditLibroComponent } from './home/inicio/libro/edit-libro/edit-libro.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    AutorComponent,
    AddAutorComponent,
    EditAutorComponent,
    UsuarioComponent,
    EditUsuComponent,
    AddUsuComponent,
    LibroComponent,
    AddLibroComponent,
    EditLibroComponent,
    


  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    // añadir el http para comunicarse con el back-end
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
