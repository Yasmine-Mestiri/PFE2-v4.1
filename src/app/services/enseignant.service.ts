import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import {Enseignant} from '../models/Enseignant.model'
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  enseignants:Enseignant[] =[];
  enseignantssubject=new Subject<Enseignant[]>();
  picname:string;
  constructor() { }

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
//-------------------formation--------------------
uploadCourformation(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      this.picname=almostUniqueFileName + file.name;
      const upload = firebase.storage().ref()
        .child('Formation/' + almostUniqueFileName + file.name).put(file);
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
uploadvideoformation(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      this.picname=almostUniqueFileName + file.name;
      const upload = firebase.storage().ref()
        .child('Formation/' + almostUniqueFileName + file.name).put(file);
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

uploadimageformation(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      this.picname=almostUniqueFileName + file.name;
      const upload = firebase.storage().ref()
        .child('Formation/' + almostUniqueFileName + file.name).put(file);
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





//-------------------------cours--------------------------
uploadCour(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      this.picname=almostUniqueFileName + file.name;
      const upload = firebase.storage().ref()
        .child('Cours/' + almostUniqueFileName + file.name).put(file);
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
uploadvideo(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      this.picname=almostUniqueFileName + file.name;
      const upload = firebase.storage().ref()
        .child('Cours/' + almostUniqueFileName + file.name).put(file);
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


  saveenseignant(){
    firebase.database().ref('/Enseignants').set(this.enseignants);
  }
  emitenseignant(){
    this.enseignantssubject.next(this.enseignants);
  }
  
  
  creatnewenseignant(newense:Enseignant){
    
    this.enseignants.push(newense);
    firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).set(newense);
    this.emitenseignant();
    firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
      valideinscri:false
    });
  }
  
  
  getenseignant(uid:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Enseignants/'+uid).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  getMessageens(uid:String){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/enseignants/'+uid).child('MessageRecu').once('value').then(
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
