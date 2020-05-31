import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from '../../Accueil/Accueil.component';
import { InscriptionComponent } from '../../Inscription/Inscription.component';
import { TableListComponent } from '../../Contact/Contact.component';
import { AproposComponent } from '../../Apropos/Apropos.component';
import { EtudiantespComponent } from '../../Etudiant/Etudiantesp.component';
import { EnseigantespComponent } from '../../Enseigant/Enseigantesp.component';
import { AdminespComponent } from '../../Admin/Adminesp.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from 'app/services/auth-guard.service';
import { EnseignantGuardService } from 'app/services/enseignant-guard.service';
import { EtudiantGuardService } from 'app/services/etudiant-guard.service';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'Accueil',
    //     component: AccueilComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'Apropos',
    //         component: AproposComponent
    //     }]
    // }
    
    { path: 'Accueil',      component: AccueilComponent },
    { path: 'Inscription',   component: InscriptionComponent },
    { path: 'Contact',     component: TableListComponent },
    { path: 'Apropos',     component: AproposComponent },
    { path: 'Etudiantesp',   canActivate: [EtudiantGuardService],     component: EtudiantespComponent },
    { path: 'Enseigantesp',    canActivate: [EnseignantGuardService],      component: EnseigantespComponent },
    { path: 'Adminesp', canActivate: [AuthGuardService], component: AdminespComponent },
    { path: '', component: AccueilComponent ,pathMatch: 'full' },
    { path: '**', component: AccueilComponent }
];


