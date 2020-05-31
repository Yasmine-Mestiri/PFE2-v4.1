import { Injectable } from '@angular/core';
import { Etudient } from 'app/models/Etudient.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class EtudientService {
Etudients: Etudient[] =[];
Etudientssubject=new Subject<Etudient[]>();
picname:string;

  constructor() {
    
   }


  photoname(){
    return this.picname;
  }
  
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        this.picname=almostUniqueFileName + file.name;
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {

            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
    
}




/**-------------------------------Etudient-------------------------------------------- */
emitEtudient(){
  this.Etudientssubject.next(this.Etudients);
}

saveEtudient(){
  firebase.database().ref('/Etudients').set(this.Etudients);
}




creatnewetudient(newetud:Etudient){
  
  this.Etudients.push(newetud);
  firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).set(newetud);
  this.emitEtudient();
  firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
    valideinscri:false
  });
}
getEtudient(uid:string) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/Etudients/'+uid).once('value').then(
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}
getMessage(uid:String){
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/Etudients/'+uid).child('MessageRecu').once('value').then(
        (data) => {
           resolve(data.val());
           
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}





}
