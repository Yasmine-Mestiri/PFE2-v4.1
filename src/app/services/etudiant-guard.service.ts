import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EtudiantGuardService implements CanActivate{
  constructor(private router: Router,private authService:AuthService ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              
              this.authService.whoisit(firebase.auth().currentUser.email).then(
                (iset)=>{
                 if(iset=="etudient"){
                  
                  resolve(true);
                  
                  console.log("hey etudient");
                  
                }else{
                  this.router.navigate(['/Enseigantesp']);
                }
                },
                );
              
            } else {
              this.router.navigate(['/Accueil']);
              resolve(false);
              console.log(user);
              console.log(resolve());
            }
          }
        );
        
      }
      
      
    );
  }
}
