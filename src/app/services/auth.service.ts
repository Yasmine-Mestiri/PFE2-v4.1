import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import swal from 'sweetalert';

import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(private router: Router){
    
    
  }

  whoisit(email: string) {
    return new Promise(
      (resolve, reject) => {
        var iset="";
        /**---------------------------------------------------ensegnant----------------------------------------------------------- */
       firebase.database().ref().child("Enseignants").orderByChild("email").equalTo(email).once("value", snapshot=> {
         if (snapshot.exists()) {
          
           iset="enseignant"
            resolve(iset)
        }
        
        }
       );
       /**---------------------------------------------------edtudiant----------------------------------------------------------- */
       firebase.database().ref().child("Etudients").orderByChild("email").equalTo(email).once("value", snapshot=> {
        if (snapshot.exists()) {
          iset="etudient"
           resolve(iset)
       }
      
       }
      
      );
      /**---------------------------------------------------admin----------------------------------------------------------- */
      firebase.database().ref().child("Admin").orderByChild("email").equalTo(email).once("value", snapshot=> {
        if (snapshot.exists()) {
          iset="admin"
           resolve(iset)
       }
      
       }
      );
      
      }
      
      

    );
   }




   
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {

        /**---------------------------------------------------edtudiant----------------------------------------------------------- */
       firebase.database().ref().child("Listeinscrit").orderByChild("numinscrit").equalTo(password).once("value", snapshot=> {
         if (snapshot.exists()) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
              () => {
                
                swal(
                  
                    'Terminé!',
                    'Vous êtes inscrit dans le site web , vous recevrez un message pour la confirmation dans votre Email ',
                    "success"
                  
                )
                .then((value) => {
                  location.reload();
                })
                var useret="is etudiant" ;              
                resolve(useret);
               
              },
              (error) => {
                reject(error);
                
                
              });
        }
        
        
        }
        
       );
       /**---------------------------------------------------ensegnant----------------------------------------------------------- */
       firebase.database().ref().child("Listeensegnant").orderByChild("numinscrit").equalTo(password).once("value", snapshot=> {
        if (snapshot.exists()) {
           firebase.auth().createUserWithEmailAndPassword(email, password).then(
             () => {
               swal(
                'Terminé!',
                'Vous êtes inscrit dans le site web , vous recevrez un message pour la confirmation dans votre Email ',
                "success"
                 
               ).then((value) => {
                location.reload();
              })
               var useret="is enseignant" ;              
                resolve(useret);
               
             },
             (error) => {
               reject(error);
                            
               
             });
       }
       
      
       }
       
      );
      
      }
    );
   }


  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {+
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            console.log('valid');
          },
          (error) => {
            reject(error);
            console.log(error);
            
          }
        );
      }
    );
  }
signOutUser(){
  firebase.auth().signOut();
  
}
}

