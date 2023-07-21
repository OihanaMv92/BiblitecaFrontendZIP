import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAutorComponent } from './home/inicio/autor/edit-autor/edit-autor.component';
import { AddAutorComponent } from './home/inicio/autor/add-autor/add-autor.component';
import { AutorComponent } from './home/inicio/autor/autor.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { EditUsuComponent } from './home/inicio/usuario/edit-usu/edit-usu.component';
import { UsuarioComponent } from './home/inicio/usuario/usuario.component';
import { AddUsuComponent } from './home/inicio/usuario/add-usu/add-usu.component';
import { EditLibroComponent } from './home/inicio/libro/edit-libro/edit-libro.component';
import { LibroComponent } from './home/inicio/libro/libro.component';
import { AddLibroComponent } from './home/inicio/libro/add-libro/add-libro.component';




const routes: Routes = [
  {path:'', component:InicioComponent},
  {path:'autor/editAutor', component:EditAutorComponent},
  {path:'autor', component:AutorComponent},
  {path:'autor', children: [
    {path:'addAutor', component:AddAutorComponent},
    {path:'editAutor', component:EditAutorComponent},
  ]},
  {path:'usuario/editUsuario', component:EditUsuComponent},
  {path:'usuario', component:UsuarioComponent},
  {path:'usuario', children: [
    {path:'addUsu', component:AddUsuComponent},
    {path:'editUsu', component:EditUsuComponent},
  ]},
  {path:'libro/editLibro', component:EditLibroComponent},
  {path:'libro', component:LibroComponent},
  {path:'libro', children: [
    {path:'addLibro', component:AddLibroComponent},
    {path:'editLibro', component:EditLibroComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
