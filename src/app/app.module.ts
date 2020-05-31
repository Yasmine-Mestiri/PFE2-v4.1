import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import * as $ from 'jquery';

import { AccueilComponent } from './Accueil/Accueil.component';
import { InscriptionComponent } from './Inscription/Inscription.component';
import { TableListComponent } from './Contact/Contact.component';
import { AproposComponent } from './Apropos/Apropos.component';
import { EtudiantespComponent } from './Etudiant/Etudiantesp.component';
import { EnseigantespComponent } from './Enseigant/Enseigantesp.component';
import { AdminespComponent } from './Admin/Adminesp.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from "app/services/messaging.service";
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  imports: [
    DataTablesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
    

  ],
  providers: [AuthService,
    MessagingService, AsyncPipe],
    
  bootstrap: [AppComponent]
  
})
export class AppModule { 
  
}
