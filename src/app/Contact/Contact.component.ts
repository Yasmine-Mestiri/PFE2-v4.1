import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Etudient } from 'app/models/Etudient.model';



@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class TableListComponent implements OnInit {
  Message: FormGroup;
  etudient : Etudient;
  constructor(private formBuilder: FormBuilder) { }
  initForm() {
    this.Message = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      objet: ['', [Validators.required]],
      text: ['', [Validators.required]],
		
    });
  }
  sendmesint(){
    const name = this.Message.get('name').value;
    const email = this.Message.get('email').value;
    const objet = this.Message.get('objet').value;
    const text = this.Message.get('text').value;
    var timee=new Date().toUTCString();
    
    
    firebase.database().ref('/Admin').orderByChild('email').equalTo("admin@admin.com").once("value",snapshot => {
      if (snapshot.exists()){
        console.log(snapshot.exportVal());        
        snapshot.forEach(function(uid) {
          var uidval = uid.key;
          console.log(uidval);
          firebase.database().ref('/Admin').child(uidval).child('MessageRecu').push({
            uid:firebase.auth().currentUser.uid,
            Source:name,
            Email:email,
            Objet:objet,
            Message:text,
            Date:timee,
          })
          firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).once("value",snapshot => {
            firebase.database().ref('/Notifications').child('gHKJfbMlBJTbGDtcxK4MY6K67YW2').push({
              body:" vous avez reçu un message de "+snapshot.val().nom+" "+snapshot.val().prenom,
              title:"Message:",
              icon:snapshot.val().photo,
              show:false,
              time:timee,
              gotto:"message"
            })
          })
          
          firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').push({
            uid:uidval,
            Source:"Admin",
            Email:"admin@admin.com",
            Objet:objet,
            Message:text,
            Date:timee,
          })
      });
     
      
      
      this.Message.reset();

      }else{
        console.log("not exist",snapshot.val());
        this.Message.reset();
      }
  });
 
    

  }
  
  ngOnInit() {
    
    this.initForm();
    
    
    
    
  }

}
