import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFirestoreModule
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
