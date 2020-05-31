import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AccueilComponent } from '../../Accueil/Accueil.component';
import { InscriptionComponent } from '../../Inscription/Inscription.component';
import { TableListComponent } from '../../Contact/Contact.component';
import { AproposComponent } from '../../Apropos/Apropos.component';
import { EtudiantespComponent } from '../../Etudiant/Etudiantesp.component';
import { EnseigantespComponent } from '../../Enseigant/Enseigantesp.component';
import { AdminespComponent } from '../../Admin/Adminesp.component';
import { MatButtonModule,MatInputModule, MatRippleModule,MatFormFieldModule, MatTooltipModule, MatSelectModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    AccueilComponent,
    InscriptionComponent,
    TableListComponent,
    AproposComponent,
    EtudiantespComponent,
    EnseigantespComponent,
    AdminespComponent,
  ]
})

export class AdminLayoutModule {}
