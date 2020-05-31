import { Component, OnInit } from '@angular/core';
import { AccueilComponent } from 'app/Accueil/Accueil.component';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/Accueil', title: 'Accueil',  icon: 'dashboard', class: '' },
    { path: '/Inscription', title: 'Inscription',  icon:'person', class: '' },
    { path: '/Contact', title: 'Contact',  icon:'content_paste', class: '' },
    { path: '/Apropos', title: 'Apropos',  icon:'library_books', class: '' },
    
];
export const RouteEtud: RouteInfo[] = [
  { path: '/Etudiantesp', title: 'Espace Etudiant',  icon:'bubble_chart', class: '' },
  
];
export const Routeadmine: RouteInfo[] = [
  { path: '/Accueil', title: 'Accueil',  icon: 'dashboard', class: '' },
  { path: '/Apropos', title: 'Apropos',  icon:'library_books', class: '' },
  { path: '/Adminesp', title: 'Espace Admin',  icon:'bubble_chart', class: '' },
  
];
export const RouteEnseg: RouteInfo[] = [
  { path: '/Enseigantesp', title: 'Espace Enseignant',  icon:'bubble_chart', class: '' },
  
];
export const Routenull: RouteInfo[] = [ ];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItemsEtud:any[];
  menuItemsAdmin:any[];
  menuItemsense:any[];
  isAuth:boolean;
  constructor(private router: Router,private authService:AuthService) { }

  ngOnInit() {
    
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth=true;
              this.authService.whoisit(firebase.auth().currentUser.email).then(
                (iset)=>{
                if(iset=="admin"){
                  this.menuItems = Routenull.filter(menuItem => menuItem);
                  this.menuItemsAdmin= Routeadmine.filter(menuItemAdmin =>menuItemAdmin);
                  console.log("admin");
                  console.log(user);
                }else
                if(iset=="etudient"){
                  console.log(iset);
                this.menuItems = ROUTES.filter(menuItem => menuItem);
                this.menuItemsEtud = RouteEtud.filter(menuItemEtud => menuItemEtud);
                this.menuItemsAdmin= Routenull.filter(menuItemsAdmin =>menuItemsAdmin);
                this.menuItemsense = Routenull.filter(menuItemsense => menuItemsense);
                console.log("etudient");
                console.log(user);}
                else if(iset=="enseignant"){
                  console.log(iset);
                  this.menuItems = ROUTES.filter(menuItem => menuItem);
                  this.menuItemsense = RouteEnseg.filter(menuItemsense => menuItemsense);
                  this.menuItemsEtud = Routenull.filter(menuItemEtud => menuItemEtud);
                  this.menuItemsAdmin= Routenull.filter(menuItemsAdmin =>menuItemsAdmin);
                  console.log("enseignant");
                console.log(user);
                  }
                else{
                  console.log("not exist")
                  }
                
                },
                
                
                );
              
          }else{

            this.isAuth=false;
                  this.menuItems = ROUTES.filter(menuItem => menuItem);
                  this.menuItemsEtud = Routenull.filter(menuItemsEtud => menuItemsEtud);
                  this.menuItemsAdmin= Routenull.filter(menuItemsAdmin =>menuItemsAdmin);
                  this.menuItemsense = Routenull.filter(menuItemsense => menuItemsense);
                  console.log("disconnect");
                  console.log(user);
                  
          }
          
        
        }
    );
    
    
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

 
}
