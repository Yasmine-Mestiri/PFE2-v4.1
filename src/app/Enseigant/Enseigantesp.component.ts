import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnseignantService } from 'app/services/enseignant.service';
import { Enseignant } from 'app/models/Enseignant.model';
import swal from 'sweetalert';
import { Subject } from 'rxjs';
import { Cour } from 'app/models/Cour.model';
import { MessagingService } from 'app/services/messaging.service';





@Component({
  selector: 'app-Enseigantesp',
  templateUrl: './Enseigantesp.component.html',
  styleUrls: ['./Enseigantesp.component.css']
})
export class EnseigantespComponent implements OnInit {

  isAuth:boolean;
  enseignant : Enseignant;
  Form: FormGroup;
  FormComment:FormGroup;
  formationform:FormGroup;
  formationformon:FormGroup;
  sondageformmodif:FormGroup;
  Messagerep:FormGroup;
  sondageform:FormGroup;
  Commentform:FormGroup;
  Messageformation:FormGroup;
  fileIsUploading =false;
  fileUrl:String;
  fileUrlVideo:String;
  fileUrlPDF:String;
  fileUrlPDFformation:String;
  fileUrlVideoformation:String;
  fileUrlimageformation:String;
  fileUrlfich:String;
  fileUploaded =false;
  errorMessage: string;
  numcourrad: string;
  nomcourfor:string;
  noomchapfor:string
  msgs : Array<any>;
  msgse: Array<any>;
  events:Array<any>;
  test:boolean;
  planetsprofs:Array<any>;
  keys:Array<any>;
  sondevenementss:Array<any>;
  pattiiss:Array<any>;
  Matierssprof:Array<any>;
  evaluationfomr:Array<any>;
  cours:Array<any>;
  coordss:Array<any>;
  tableclasse:Array<any>;
  coursSubject = new Subject<Cour[]>();
  formations:Array<any>;
  coursforms:Array<any>;
  inscriiievent:boolean;
  numsond:string;
  numform:string;
  filier:string;
  niveau:string;
  classs:string;
  nomcour:string;
  noomchap:string
  Videoformationok:boolean;
  pdfformationok:boolean;
  imageformationok:boolean
  Videook:boolean;
  pdfok:boolean;
  numinformre:string;
  nuberjaime:number;
  nubercomment:number;
  eventsaujord:Array<any>;
  eventspros:Array<any>;
  eventsproseeedddd:Array<any>;
  showeventelect:Array<any>;
  showeventsel:boolean
  classsse:Array<any>;
  commenters:Array<any>;
  jaimes:Array<any>;
  myTable:Array<any>;
  particccpents:Array<any>;
  formationsone:Array<any>;
  publiicccc_cible:string
  picense:string;
  numcour:string;
  formationsoneloc:string;
  formationclass:string;
  i:number;
  formationhow:string;
  fomationnumber:string;
  form:string;
  done:boolean;
  evaluations:Array<any>;
  shoow:boolean;
  myTablecorr:Array<any>;
  coords:Array<any>;
  lesetuds:Array<any>;
  sondformations:Array<any>;
  numsondform:string
  numinform:string;
  claseeshow:Array<any>;
  shownow:boolean
  uidetuuuddd:string
  uidrep:string;
  objet:string
  emailrep:string
  namerep:string
  messaggeee:string
  message;
  constructor(private messagingService: MessagingService,private authService: AuthService,private enseignantService:EnseignantService,private formBuilder: FormBuilder,private router: Router) { 
    
  }
  

  
  modif(){
const nom = this.Form.get('Nom').value;
const prenom = this.Form.get('Prenom').value;
if(nom!="" && prenom!=""){
 firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
  nom: nom,
  prenom:prenom
 })
 this.enseignant.nom=nom;
 this.enseignant.prenom=prenom;
 $("#modifer").modal("hide");
 return this.enseignant;
 }else if(nom!="")
 {
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
    nom: nom
   })
   this.enseignant.nom=nom;
   $("#modifer").modal("hide");
   return this.enseignant;
 }else if(prenom !=""){
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
    prenom:prenom
   })
   this.enseignant.prenom=prenom;
   $("#modifer").modal("hide");
   return this.enseignant;
 }else {
  this.errorMessage = "champs required";
 } 


}





initForm(){
    this.Form = this.formBuilder.group({
    Nom: ['', [Validators.required]],
    Prenom: ['', [Validators.required]],
    });

    this.Messageformation= this.formBuilder.group({
      Class: [''],
      Sujet: ['', [Validators.required]],
      text: ['', [Validators.required]],
		
    });

    this.Commentform = this.formBuilder.group({
      Comment: ['', [Validators.required]],
      Matiere:['', [Validators.required]],
      LAI1:[''],LFI1:[''],ARS1:[''],MPASSR1:[''],MPTSD1:[''],
            LAI2:[''],LFI2:[''],ARS2:[''],MPASSR2:[''],MPTSD2:[''],
            LAI3:[''],LFI3:[''],ARS3:['']

      });

      this.FormComment = this.formBuilder.group({
        textComment: ['', [Validators.required]]
        
        });
        this.formationform = this.formBuilder.group({
          Name: ['', [Validators.required]],
          detail: ['', [Validators.required]],
          });
          this.formationformon= this.formBuilder.group({
            Libelle: ['', [Validators.required]],
            Prerequis: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Competences: ['', [Validators.required]],
            LAI1:[''],LFI1:[''],ARS1:[''],MPASSR1:[''],MPTSD1:[''],
            LAI2:[''],LFI2:[''],ARS2:[''],MPASSR2:[''],MPTSD2:[''],
            LAI3:[''],LFI3:[''],ARS3:['']
            

            });
            this.sondageform= this.formBuilder.group({
              form1: ['', [Validators.required]],
              form2: ['', [Validators.required]],
              form3: ['', ],
              form4: ['', ],
              form5: ['', ]
              });
              this.sondageformmodif= this.formBuilder.group({
                form1: ['', [Validators.required]],
                form2: ['',],
                form3: ['', ],
                form4: ['', ],
                form5: ['', ]
                });
                this.Messagerep=this.formBuilder.group({
                  objet: ['', [Validators.required]],
                  text:['', [Validators.required]]
            
                  });
   
}

repondremesage(msg:any){
  this.uidrep=msg.uid
  this.namerep=msg.Source
  this.emailrep=msg.Email
  
}
sendmesintrep(){
  this.objet=this.Messagerep.get('objet').value;
  this.messaggeee=this.Messagerep.get('text').value;
  var timee=new Date().toUTCString();
  firebase.database().ref('/Admin').once('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.key == this.uidrep){
        firebase.database().ref('/Admin').child(this.uidrep ).child('MessageRecu').push({
          uid:firebase.auth().currentUser.uid,
          Source:this.enseignant.nom+" "+this.enseignant.prenom,
          Email:this.enseignant.email,
          Objet:this.objet,
          Message:this.messaggeee,
          Date:timee,
        })
        
        firebase.database().ref('/Notifications').child(this.uidrep).push({
          body:"Vous avez reçu un message de "+this.enseignant.nom+" "+this.enseignant.prenom,
          title:"Message:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"messaaggee"
        })
      }
    })
  })
  firebase.database().ref('/Etudients').once('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.key == this.uidrep){
        firebase.database().ref('/Etudients').child(this.uidrep).child('MessageRecu').push({
          uid:firebase.auth().currentUser.uid,
          Source:this.enseignant.nom+" "+this.enseignant.prenom,
          Email:this.enseignant.email,
          Objet:this.objet,
          Message:this.messaggeee,
          Date:timee,
        })
        firebase.database().ref('/Notifications').child(this.uidrep).push({
          body:"Vous avez reçu un message de "+this.enseignant.nom+" "+this.enseignant.prenom,
          title:"Message:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"messaaggee"
        })
      }
    })
  })

  
  
  
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').push({
    uid:this.uidrep,
    Source:this.namerep,
    Email:this.emailrep,
    Objet:this.objet,
    Message:this.messaggeee,
    Date:timee,
    body:this.messaggeee,
    title:this.objet,
    icon:this.enseignant.photo
  })
  this.Messagerep.reset()
  swal(
    'Terminé!',
    'Message envoyé '
  )
}
supprimermessageenv(msg:any){
    
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').once('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Date == msg.Date){
        firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').child(child.key).remove()
      }
    })
    
  })

  
}
supprimermessageres(msg:any){
  
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('MessageRecu').once('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Date == msg.Date){
        firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('MessageRecu').child(child.key).remove()
      }
    })
    
  })
}
  
//-------------------------------------------------------------
detectFiles(event: { target: { files: File[]; }; }) {
  this.onUploadFile(event.target.files[0]);
  
  }
onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.enseignantService.uploadFile(file).then(
    (url: String) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
      //console.log('fichier charger');
      
firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
  photo :String(this.fileUrl)
})
this.enseignant.photo=this.fileUrl;
    }
  );
  
}

//---------------------cour------------------------------
detectcoure(event: { target: { files: File[]; }; }) {
  this.onUploadcour(event.target.files[0]);
  
  }
  onUploadcour(file: File) {
    this.fileIsUploading = true;
    this.enseignantService.uploadCour(file).then(
      (url: String) => {
        this.fileUrlPDF = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        //console.log('fichier PDF charger');
        this.pdfok =false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'Chargement effectué'
  )
      }
    );
  }


  

  detectvideo(event: { target: { files: File[]; }; }) {
    this.onUploadvideo(event.target.files[0]);
    
    }
    onUploadvideo(file: File) {
      this.fileIsUploading = true;
      this.enseignantService.uploadvideo(file).then(
        (url: String) => {
          this.fileUrlVideo = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
          
          //console.log('fichier Video charger');
          this.Videook=false;
    
    swal(
      'Terminé!',
      'Chargement effectué '
    )
        }
      );
      
    }

//-----------------------------------------------------------------------



today = new Date();


vider(){
  this.niveau="";
  this.filier="";
  this.Commentform.reset();
 // console.log("vider")
}
show(){
  if(this.niveau != ""){
    //console.log("true")
    return true;
    
  }else{
   // console.log("false")
    return false
    
  }
  
}




showcomment(cour:any){
  this.noomchap=cour.Comment;
  this.nomcour=cour.Matiere
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('photo').once('value', (snapshot) => {
    this.picense=snapshot.val();
  })

  firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
snapshot.forEach((child)=>{
  this.numcour=child.key
  if(child.child('Comment').val() === cour.Comment){
   // console.log(child.key)
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('/Commentaire').once('value', (snapshot) => {
      this.commenters = [];
      snapshot.forEach((comm) => {
          this.commenters.push(
            comm.val()
          );

      });
      });
  }
  
})




  })
//console.log(cour);

}
showjaime(cour:any){
      firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        snapshot.forEach((child)=>{
          if(child.child('Comment').val() === cour.Comment){
           // console.log(child.key)
            firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('/jaime').once('value', (snapshot) => {
              this.jaimes = [];
              snapshot.forEach((comm) => {
                  this.jaimes.push(
                    comm.val()
                  );
        
              });
              //console.log(this.jaimes)
              });
          }
          
        })
        
        
          })
//console.log(cour);

}

removecomment(comm :any){

  firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    snapshot.forEach((childd)=>{
     // console.log(childd.key)
      firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(childd.key).child('/Like').child('/Commentaire').orderByChild('datecoment').equalTo(comm.datecoment).once('value', (snapshot) => {
        snapshot.forEach((child) => {
         // console.log(child.key)
          firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(childd.key).child('/Like').child('/Commentaire').child(child.key).remove()
          //console.log("donne")
        })
          })


    })
    //console.log('donner')
  })
  
  

  

}

commentercour(){
  const textComment = this.FormComment.get('textComment').value;
  //console.log(this.picense)
  var timee=new Date().toUTCString();
  var numense=firebase.auth().currentUser.uid
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      firebase.database().ref('/Notifications').child(child.key).push({
        body:this.enseignant.nom+" "+this.enseignant.prenom+" a répondu à votre commentaires  de cours "+this.nomcour,
        title:"Commentaire:",
        icon:this.enseignant.photo,
        show:false,
        time:timee,
        gotto:"cours"
      })

    })
  })
  

  firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(this.numcour).child('/Like').child('/Commentaire').push({
    Commenter:textComment,
    photo:this.picense,
    datecoment:timee,
    numense:numense
        })
        this.FormComment.reset();

    
          
        
};




detect(){
 
}

//------------------------------------------------------------------------Sondage------
showform1(sondformation:any){
  var numfor:string
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondage').child(numfor).child('form1nbin').on('value', (snapshot) => {
    this.lesetuds = [];
    snapshot.forEach((child) => {
      this.lesetuds.push(
        child.val()
      );
    });
   //console.log(this.lesetuds);
    });
}

showform2(sondformation:any){
  var numfor:string
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondage').child(numfor).child('form2nbin').on('value', (snapshot) => {
    this.lesetuds = [];
    snapshot.forEach((child) => {
      this.lesetuds.push(
        child.val()
      );
    });
   // console.log(this.lesetuds);
    });
}
showform3(sondformation:any){
  var numfor:string
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondage').child(numfor).child('form3nbin').on('value', (snapshot) => {
    this.lesetuds = [];
    snapshot.forEach((child) => {
      this.lesetuds.push(
        child.val()
      );
    });
    //console.log(this.lesetuds);
    });
}
showform4(sondformation:any){
  var numfor:string
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondage').child(numfor).child('form4nbin').on('value', (snapshot) => {
    this.lesetuds = [];
    snapshot.forEach((child) => {
      this.lesetuds.push(
        child.val()
      );
    });
    //console.log(this.lesetuds);
    });
}
showform5(sondformation:any){
  var numfor:string
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondage').child(numfor).child('form5nbin').on('value', (snapshot) => {
    this.lesetuds = [];
    snapshot.forEach((child) => {
      this.lesetuds.push(
        child.val()
      );
    });
    //console.log(this.lesetuds);
    });
}


detecctttcodesondform(sondformation:any){
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot) => {
    
   snapshot.forEach((child)=>{
     //console.group(child.key)
     this.numsondform=child.key
   })
    
    });

}
modifsondage(){

  var timee=new Date().toUTCString();
  if(this.sondageformmodif.get('form3').value == ''){
  firebase.database().ref('/Sondage').child(this.numsondform).update({
    forme1:this.sondageformmodif.get('form1').value,
    forme1nb:0,
    forme2:this.sondageformmodif.get('form2').value,
    forme2nb:0,
    Date:timee
        })
      }else
      if(this.sondageformmodif.get('form4').value == ''){
        firebase.database().ref('/Sondage').child(this.numsondform).update({
          forme1:this.sondageformmodif.get('form1').value,
          forme1nb:0,
          forme2:this.sondageformmodif.get('form2').value,
          forme2nb:0,
          forme3:this.sondageformmodif.get('form3').value,
          forme3nb:0,
          Date:timee
              })
            }else
            if(this.sondageformmodif.get('form5').value == ''){
              firebase.database().ref('/Sondage').child(this.numsondform).update({
                forme1:this.sondageformmodif.get('form1').value,
                forme1nb:0,
                forme2:this.sondageformmodif.get('form2').value,
                forme2nb:0,
                forme3:this.sondageformmodif.get('form3').value,
                forme3nb:0,
                forme4:this.sondageformmodif.get('form4').value,
                forme4nb:0,
                Date:timee
                    })
                  }
                  else{
                    firebase.database().ref('/Sondage').child(this.numsondform).update({
                      forme1:this.sondageformmodif.get('form1').value,
                      forme1nb:0,
                      forme2:this.sondageformmodif.get('form2').value,
                      forme2nb:0,
                      forme3:this.sondageformmodif.get('form3').value ,
                      forme3nb:0,
                      forme4:this.sondageformmodif.get('form4').value ,
                      forme4nb:0,
                      forme5:this.sondageformmodif.get('form5').value,
                      forme5nb:0,
                      Date:timee
                          })
                        }
this.sondageformmodif.reset();
swal(
  'Terminé!',
  'Enregitrement terminé'
)
}

sendsondage(){

  var timee=new Date().toUTCString();
  if(this.sondageform.get('form3').value == ''){
  firebase.database().ref('/Sondage').push({
    forme1:this.sondageform.get('form1').value,
    forme1nb:0,
    forme2:this.sondageform.get('form2').value,
    forme2nb:0,
    Date:timee
        })
      }else
      if(this.sondageform.get('form4').value == ''){
        firebase.database().ref('/Sondage').push({
          forme1:this.sondageform.get('form1').value,
          forme1nb:0,
          forme2:this.sondageform.get('form2').value,
          forme2nb:0,
          forme3:this.sondageform.get('form3').value,
          forme3nb:0,
          Date:timee
              })
            }else
            if(this.sondageform.get('form5').value == ''){
              firebase.database().ref('/Sondage').push({
                forme1:this.sondageform.get('form1').value,
                forme1nb:0,
                forme2:this.sondageform.get('form2').value,
                forme2nb:0,
                forme3:this.sondageform.get('form3').value,
                forme3nb:0,
                forme4:this.sondageform.get('form4').value,
                forme4nb:0,
                Date:timee
                    })
                  }
                  else{
                    firebase.database().ref('/Sondage').push({
                      forme1:this.sondageform.get('form1').value,
                      forme1nb:0,
                      forme2:this.sondageform.get('form2').value,
                      forme2nb:0,
                      forme3:this.sondageform.get('form3').value ,
                      forme3nb:0,
                      forme4:this.sondageform.get('form4').value ,
                      forme4nb:0,
                      forme5:this.sondageform.get('form5').value,
                      forme5nb:0,
                      Date:timee
                          })
                        }
this.sondageform.reset();
swal(
  'Terminé!',
  'Enregistrement terminé '
)
}
removesondage(sondformation :any){
  var num:string
  firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot) => {
snapshot.forEach((child)=>{
  num=child.key
})
  })
  firebase.database().ref('/Sondage').child(num).remove();


}
onclick(){
firebase.database().ref('/Etudients').on('value', (snapshot) =>{
  this.coords=[];
  snapshot.forEach((child)=>{
    this.coords.push(
      child.val()
      );

  
  
  })
})
}


onclicks(){
  firebase.database().ref('/Enseignants').on('value', (snapshot) =>{
    this.coordss=[];
    snapshot.forEach((child)=>{
      this.coordss.push(
        child.val()
        );
  
    
    
    })
  })
  }
  

//----------------------------------------------formation------------
showinscrriiii(evaluationfom:any){
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('Evoluation').child('Inscri').once('value', (snapshot) => {
    this.particccpents=[]
    snapshot.forEach((chillddddd)=>{
    //console.log(chillddddd.val())
    this.particccpents.push(
      chillddddd.val()
    )
  })
  
  })
}
print(){
  
  let printContents: string, popupWin: Window;
  printContents = document.getElementById('print-section').innerHTML;
  
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title></title>
        <style>  </style>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      </head>
  <body onload="window.print();window.close()">${printContents}
  </body>
    </html>`
  );
  popupWin.document.close();
 }
sendmesg(){
  var classrep=""
  var timee=new Date().toUTCString();
  if(this.Messageformation.get('Class').value == ""){
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('Evoluation').child('Inscri').once('value', (snapshot) => {
      snapshot.forEach((child)=>{
        //console.log(this.Messageformation.get('Class').value)
         // console.log("without")
          if(this.fileUrlfich != undefined)
          {
            firebase.database().ref('/Etudients').child(child.key).child('MessageRecu').push({
              Ressource:this.fileUrlfich,
            uid:firebase.auth().currentUser.uid,
            Source:this.enseignant.nom,
            Email:this.enseignant.email,
            Objet:this.Messageformation.get('Sujet').value,
            Message:this.Messageformation.get('text').value,
            Date:timee,
          })
        }else{
          firebase.database().ref('/Etudients').child(child.key).child('MessageRecu').push({
            uid:firebase.auth().currentUser.uid,
            Source:this.enseignant.nom,
            Email:this.enseignant.email,
            Objet:this.Messageformation.get('Sujet').value,
            Message:this.Messageformation.get('text').value,
            Date:timee,
          })
        }
      })
      })

    }else{
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('Evoluation').child('Inscri').orderByChild('Class').equalTo(this.Messageformation.get('Class').value).once('value', (snapshot) => {
        snapshot.forEach((child)=>{
         // console.log(this.Messageformation.get('Class').value)
           // console.log("to"+this.Messageformation.get('Class').value)
            if(this.fileUrlfich != undefined)
            {
              firebase.database().ref('/Etudients').child(child.key).child('MessageRecu').push({
                Ressource:this.fileUrlfich,
              uid:firebase.auth().currentUser.uid,
              Source:this.enseignant.nom+" "+this.enseignant.prenom,
              Email:this.enseignant.email,
              Objet:this.Messageformation.get('Sujet').value,
              Message:this.Messageformation.get('text').value,
              Date:timee,
            })
          }else{
            firebase.database().ref('/Etudients').child(child.key).child('MessageRecu').push({
              uid:firebase.auth().currentUser.uid,
              Source:this.enseignant.nom+" "+this.enseignant.prenom,
              Email:this.enseignant.email,
              Objet:this.Messageformation.get('Sujet').value,
              Message:this.Messageformation.get('text').value,
              Date:timee,
            })
          }
          classrep=classrep +"_"+ this.Messageformation.get('Class').value
        })
        })
          
      }
      
     


  
  
      
  
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').push({
    Ressource:this.fileUrlfich,
    Source:classrep,
    Email:classrep,
    Objet:this.Messageformation.get('Sujet').value,
    Message:this.Messageformation.get('text').value,
    Date:timee,
  })
  this.Messageformation.reset()



}

detectfichiermsg(event: { target: { files: File[]; }; }) {
  this.onUploadfichiermsg(event.target.files[0]);
  
  }
  onUploadfichiermsg(file: File) {
    this.fileIsUploading = true;
    this.enseignantService.uploadCourformation(file).then(
      (url: String) => {
        this.fileUrlfich = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        //console.log('fichier PDF charger');
        this.pdfformationok=false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'Chargement effectué'
  )
      }
    );
}

modifferform(){
  if($("#Competences").val() != '')
  {
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).update({
    Competences:$("#Competences").val()
  })

$("#Competences").val('')
}
  if($("#Description").val() != '')
  {
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).update({
    Description:$("#Description").val()
  })
  $("#Description").val('')
}
  if($("#Prerequis").val() != '')
  {
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).update({
    Prerequis:$("#Prerequis").val()
  })
  $("#Prerequis").val('')
}

}
showevaluation(evaluationfom:any){
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('Evoluation').on('value', (snapshot) => {
    this.evaluations= []  
    snapshot.forEach((chilllele)=>{
      if(chilllele.key != 'Date'&&chilllele.key != 'Class'&&chilllele.key != 'nubrepaticipent' )
      {
        this.evaluations.push(
        chilllele.val()
      )
    }


    })
    //console.log(this.evaluations)
  })
}
removeevaluation(evaluationfom:any){
firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').remove()
}
eregestrercorrection(){
  this.myTablecorr=[]
  var $inputsradio = $('#myFormevo :input[type="radio"]:checked');
  //console.log($inputsradio.length)
  var j=0
  while (j<$inputsradio.length) {
    this.myTablecorr.push({
      QuestionRep:$inputsradio.eq(j).val()
    })
    j=j+1
    }
    

      
    for(var j = 0; j < this.myTablecorr.length; j++){
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('EvoluationReponce').update({
        [j]:this.myTablecorr[j]
      })
    }

 // console.log(this.myTablecorr)

}


newQ(){
  
//console.log(this.i)
$("#myTable").append('<tr id="new'+(this.i)+'"><td><input type="text" placeholder="Question'+(this.i)+'" class="form-control" ></td><td><input type="text"  placeholder="reponse'+(this.i+1)+'" class="form-control col-sm-5" ></td><td><input type="text"   placeholder="reponse'+(this.i+2)+'" class="form-control col-sm-5" ></td><td><input type="text"  placeholder="reponse'+(this.i+3)+'" class="form-control col-sm-5" ></td><td><button type="button" class="removebutton close ">&times;</button></td></tr>');

this.i=this.i+4
}

detectformation(formation:any){
  //console.log(this.form)
      
            this.formationhow=formation.Class
             
                //console.log(chil.key)
              
                    
                    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.form).child(formation.Class).orderByChild('Class').equalTo(formation.Class).once('value', (snapshot) => {
            
                      snapshot.forEach((chilllleesss)=>{
                        this.fomationnumber=chilllleesss.key
                        this.shoow=chilllleesss.hasChild('Evoluation')
                        
                      })
                  })
              
          

   
 
}
Anouterevaluation(){
  this.myTable = []
  
  //console.log("ok")
  var $inputs = $('#myForm :input[type="text"]');
  //console.log($inputscheckbox)
 //console.log($inputs.length)
    var j=0
    while (j<$inputs.length) {
if($inputs.eq(j).val() != "")
      {this.myTable.push({
        Question:$inputs.eq(j).val(),
        reponse1:$inputs.eq(j+1).val(),
        reponse2:$inputs.eq(j+2).val(),
        reponse3:$inputs.eq(j+3).val()
      })
      }
      j=j+4
      }
      
              //console.log(this.formationsoneloc)
      var date=$( "#dateInput" ).val()
console.log(date);
//console.log(this.myTable);
if(date != undefined)
      {
        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).once('value', (snapshot) => {
          this.classs=""
snapshot.forEach((childdd)=>{

 
//console.log(childdd.key)
if(childdd.key!='Competences'&&childdd.key!='Cours'&&childdd.key!='Description'&&childdd.key!='Libelle'&&childdd.key!='NomEnsegnient'&&childdd.key!='PrenomEnsegnient'&&childdd.key!='Prerequis'&&childdd.key!='nbcour'&&childdd.key!='photo'&&childdd.key!='publiicccc_cible')
{
  this.classs=this.classs+"/"+childdd.key
  for(var jj = 0; jj < this.myTable.length; jj++){
          
          
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('Evoluation').update({
    [jj]:this.myTable[jj],
    Date:date,
    Class:this.classs,
    nubrepaticipent:0
  })
  


}
}

})
        
    })
      
      
    
        
      
      
      
    }else{
      swal(
        'Erreur!',
        'Question undefined '
      )

    }
    $('#myForm :input[type="text"]').val('')
    $( '#Date' ).val('')
    $('#myForm :input[type="checkbox"]:checked').prop('checked', false);
    this.shoow=true
  
    //console.log(this.myTable)

    
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Evoluations').child('Evoluation').once('value', (snapshot) => {
      this.evaluations= []  
      snapshot.forEach((chilllele)=>{
        if(chilllele.key != 'Date'&&chilllele.key != 'Class'&&chilllele.key != 'nubrepaticipent' )
        {
          this.evaluations.push(
          chilllele.val()
        )
      }


      })
     // console.log(this.evaluations)
    })

}

participants(formation:any){

  
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        this.pattiiss=[];
        snapshot.forEach((childd)=>{
          
              firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(childd.key).child(formation.Class).once('value', (snapshot) => {
                
                  snapshot.forEach((chil)=>{
                   // console.log(chil.key)
                  
                        //console.log(chillllee.key)
                        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(childd.key).child(formation.Class).child(chil.key).child('Inscri').once('value', (snapshot) => {
                
                          snapshot.forEach((chilllleesss)=>{
                            //console.log(chilllleesss.val())
                            this.pattiiss.push(
                              chilllleesss.val()
                            )
                          })
                      })
                  })
              })
        })
      })
}
removeformationone(formationone:any){
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).remove()

}

detecttypeformation(formationone:any){
this.formationsoneloc=formationone.Libelle;


firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).on('value', (snapshot) => {
  this.formations = [];
  this.formations.push(
    snapshot.val()
  );
 //console.log(this.formations);
  });
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).on('value', (snapshot) => {
    snapshot.forEach((child) => {
      
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).child(child.key).child('/Like').child('jaime').once('value', (snapshot) => {
        this.nuberjaime=snapshot.numChildren()
        });
        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).child(child.key).child('/Like').child('Commentaire').once('value', (snapshot) => {
          this.nubercomment=snapshot.numChildren()
          });
         /* if(child.key !='nbcour' ){
        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone).child(child.key).update({
          nuberjaime:this.nuberjaime,
          nubrecomment:this.nubercomment
          
        })
      }*/

    });
  });
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).child('Cours').on('value', (snapshot) => {
    this.coursforms=[]
    
    snapshot.forEach((child) => {
      //console.log(child.val())
      this.coursforms.push(
        child.val()
      )
      

    });
  });
    
    
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formationone.Libelle).child('Evoluations').on('value', (snapshot) => {
        this.evaluationfomr=[]
        snapshot.forEach((chilldddd)=>{
          if(chilldddd.key!='EvoluationReponce'&&chilldddd.key!='Evoluations')
            {
              this.evaluationfomr.push(
              chilldddd.val()
          )
            

        
       
        //console.log(snapshot.val())
        if((chilldddd.val().Date.slice(0, 4)>this.today.getFullYear()) || ((chilldddd.val().Date.slice(5, 7))>this.today.getMonth()+1) || ((chilldddd.val().Date.slice(8, 10)>this.today.getDate()))){
          this.shownow=true
       }else{
        this.shownow=false
       }
      }
       //console.log(chilldddd.val())
      })
      });



    
    //console.log(this.evaluationfomr)
    
   
  

  


}
playvidformation(lien :string){
 
   // console.log(lien);
    // when the modal is opened autoplay it  
    $('#myvideoform').on('shown.bs.modal', function (e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    
    $("#video").attr('src',lien  ); 
    
    });
    // stop playing the youtube video when I close the modal
    $('#myvideoform').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src'+''); 
    });
    
   
};
sendformationone(){
  var timee=new Date().toUTCString();
  this.tableclasse = []
  this.tableclasse.push(
    $('.LAI1:checked').val(),
    $('.LAI2:checked').val(),
    $('.LAI3:checked').val(),
    $('.LFI1:checked').val(),
    $('.LFI2:checked').val(),
    $('.LFI3:checked').val(),
    $('.ARS1:checked').val(),
    $('.ARS2:checked').val(),
    $('.ARS3:checked').val(),
    $('.MPASSR1:checked').val(),
    $('.MPASSR2:checked').val(),
    $('.MPTSD1:checked').val(),
    $('.MPTSD2:checked').val()
  );
  
  
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationformon.get('Libelle').value).set({
    NomEnsegnient:this.enseignant.nom,
    PrenomEnsegnient:this.enseignant.prenom,
    Libelle:this.formationformon.get('Libelle').value,
    Prerequis:this.formationformon.get('Prerequis').value,
    Description:this.formationformon.get('Description').value,
    Competences:this.formationformon.get('Competences').value,
    photo:this.fileUrlimageformation,
    nbcour:0,
    
  })
  var cible:string
  var publiicccc_cible=''
  var libb=this.formationformon.get('Libelle').value
  for (var i=0; i<this.tableclasse.length; i++){
    if(this.tableclasse[i] != undefined){
      publiicccc_cible=publiicccc_cible+"/"+this.tableclasse[i]+"/"
      cible=this.tableclasse[i]


      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(libb).update({
        [cible]:cible
        
      })
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(libb).update({
        publiicccc_cible:publiicccc_cible
        
      })

      firebase.database().ref('/Etudients').on('value', (snapshot) => {
        snapshot.forEach((child)=>{
          if(child.val().Class == cible){
            firebase.database().ref('/Notifications').child(child.key).push({
              body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté une nouvelle formation "+libb,
              title:"Formation:",
              icon:this.enseignant.photo,
              show:false,
              time:timee,
              gotto:"formationn"
            })
          }
        })
      })
      
    }
  }
  
  this.formationformon.reset();
 // console.log(this.tableclasse)
}

detectcoureformation(event: { target: { files: File[]; }; }) {
  this.onUploadcourformation(event.target.files[0]);
  
  }
onUploadcourformation(file: File) {
    this.fileIsUploading = true;
    this.enseignantService.uploadCourformation(file).then(
      (url: String) => {
        this.fileUrlPDFformation = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        //console.log('fichier PDF charger');
        this.pdfformationok=false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'Votre PDF est chargé '
  )
      }
    );
}




detectvideoformation(event: { target: { files: File[]; }; }) {
    this.onUploadvideoformation(event.target.files[0]);   
}   
onUploadvideoformation(file: File) {
      this.fileIsUploading = true;
      this.enseignantService.uploadvideoformation(file).then(
        (url: String) => {
          this.fileUrlVideoformation = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
          //console.log('fichier PDF charger');
          this.Videoformationok=false;
         // console.log(this.Videook);
   
    swal(
      'Terminé!',
      'Chargement effectué '
    )
        }
      );
}
detectimageformation(event: { target: { files: File[]; }; }) {
  this.onUploadimageformation(event.target.files[0]);   
}   
onUploadimageformation(file: File) {
    this.fileIsUploading = true;
    this.enseignantService.uploadvideoformation(file).then(
      (url: String) => {
        this.fileUrlimageformation = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        //console.log('fichier JPG charger');
        this.imageformationok=false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'Chargement effectué '
  )
      }
    );
}



sendformation(formation:any){
  


   
   firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').push({
    
    Chapiter:this.formationform.get('Name').value,
    Detail :this.formationform.get('detail').value,
    nuberjaime:0,
    nubrecomment:0,
    PDF :String(this.fileUrlPDFformation),
    Video :String(this.fileUrlVideoformation),
    
    
  })
  var nbcour:number
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).once('value', (snapshot) => { 
    nbcour=snapshot.val().nbcour
    
  })
  nbcour=nbcour+1
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).update({
    nbcour:nbcour
    
  })
  
  this.formationform.reset();
  swal(
    'Terminé!',
    'Cours enregistré '
  )
}


removeformation(coursform:any,formation: any) {
  /*
  if(formation.PDF !== "undefined"){
  if(formation.PDF) {
    const storageRef = firebase.storage().refFromURL(formation.PDF);
    storageRef.delete().then(
      () => {
        console.log('PDF removed!');
      },
      (error) => {
        console.log('Could not remove PDF! : ' + error);
      }
    );

  }
}
if(formation.Video !== "undefined"){
  if(formation.Video) {
    const storageRef = firebase.storage().refFromURL(formation.Video);
    storageRef.delete().then(
      () => {
        console.log('Video removed!');
      },
      (error) => {
        console.log('Could not remove Video! : ' + error);
      }
    );

  }
}
if(formation.image !== "undefined"){
  if(formation.image) {
    const storageRef = firebase.storage().refFromURL(formation.image);
    storageRef.delete().then(
      () => {
        console.log('image removed!');
      },
      (error) => {
        console.log('Could not remove image! : ' + error);
      }
    );

  }
}*/


  
  //console.log(coursform.Detail)
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').orderByChild('Detail').equalTo(coursform.Detail).once('value', (snapshot) => {
    snapshot.forEach((childd)=>{
      console.log(childd.key)
     firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').child(childd.key).remove();
    })
   
   })
   var nbcour:number
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).once('value', (snapshot) => { 
    nbcour=snapshot.val().nbcour
    
  })
  nbcour=nbcour-1
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).update({
    nbcour:nbcour
    
  })



 
  
  swal(
    'Terminé!',
    'Suppression effectuée  '
  )
}
showjaimeform(coursform:any,formation:any){
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').orderByChild('Detail').equalTo(coursform.Detail).on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      
       // console.log(child.key)
        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').child(child.key).child('/Like').child('/jaime').once('value', (snapshot) => {
          this.jaimes = [];
          snapshot.forEach((comm) => {
              this.jaimes.push(
                comm.val()
              );
    
          });
          //console.log(this.jaimes)
          });
      
      
    })
    
    
      })
//console.log(cour);

}
showcommentform(coursform:any,formation:any){
  this.noomchapfor=coursform.Chapiter
  this.nomcourfor=formation.Libelle
  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('photo').once('value', (snapshot) => {
    this.picense=snapshot.val();
  })

  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').orderByChild('Detail').equalTo(coursform.Detail).on('value', (snapshot) => {
snapshot.forEach((child)=>{
  this.numform=child.key
  
   // console.log(child.key)
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(formation.Libelle).child('Cours').child(child.key).child('/Like').child('/Commentaire').once('value', (snapshot) => {
      this.commenters = [];
      snapshot.forEach((comm) => {
          this.commenters.push(
            comm.val()
          );

      });
    });
  
  
})




  })
//console.log(cour);

}
commenterform(){

  
  const textComment = this.FormComment.get('textComment').value;
  //console.log(this.picense)
  var timee=new Date().toUTCString();
  var numense=firebase.auth().currentUser.uid
  
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      firebase.database().ref('/Notifications').child(child.key).push({
        body:this.enseignant.nom+" "+this.enseignant.prenom+" a répondu à votre commentaires  de formation "+this.nomcourfor,
        title:"Commentaire:",
        icon:this.enseignant.photo,
        show:false,
        time:timee,
        gotto:"cours"
      })

    })
  })



  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Cours').child(this.numform).child('/Like').child('/Commentaire').push({
    Commenter:textComment,
    photo:this.picense,
    datecoment:timee,
    numense:numense
        })
        this.FormComment.reset();

    
          
        
};
removecommentform(comm :any){

 
     
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Cours').child(this.numform).child('/Like').child('/Commentaire').orderByChild('datecoment').equalTo(comm.datecoment).once('value', (snapshot) => {
        snapshot.forEach((child) => {
         // console.log(child.key)
          firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.formationsoneloc).child('Cours').child(this.numform).child('/Like').child('/Commentaire').child(child.key).remove()
          //console.log("donne")
        })
          })


    
  
  

  

}


//-----------------------------------------------------------------

send(){
  var timee=new Date().toUTCString();
  //console.log($('.LAI1:checked').val())
if($('.LAI1:checked').val() == "LAI1"){
  firebase.database().ref('/Cours').child('LAI').child('Premiére').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"LAI1",
    nubrecomment:0,
    nuberjaime:0
  })

  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "LAI1"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
  
  
}
if($('.LAI2:checked').val() == "LAI2"){
  firebase.database().ref('/Cours').child('LAI').child('Deuxième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"LAI2",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "LAI2"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.LAI3:checked').val() == "LAI3"){
  firebase.database().ref('/Cours').child('LAI').child('Troisième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"LAI3",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "LAI3"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.LFI1:checked').val() == "LFI1"){
  firebase.database().ref('/Cours').child('LFI').child('Premiére').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"LFI1",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "LFI1"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.LFI2:checked').val() == "LFI2"){
  firebase.database().ref('/Cours').child('LFI').child('Deuxième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"LFI2",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "LFI2"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.LFI3:checked').val() == "LFI3"){
  firebase.database().ref('/Cours').child('LFI').child('Troisième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"LFI3",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "LFI3"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.ARS1:checked').val() == "ARS1"){
  firebase.database().ref('/Cours').child('ARS').child('Premiére').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"ARS1",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "ARS1"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.ARS2:checked').val() == "ARS2"){
  firebase.database().ref('/Cours').child('ARS').child('Deuxième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"ARS2",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "ARS2"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.ARS3:checked').val() == "ARS3"){
  firebase.database().ref('/Cours').child('ARS').child('Troisième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"ARS3",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "ARS3"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.MPASSR1:checked').val() == "MPASSR1"){
  firebase.database().ref('/Cours').child('MPASSR').child('Premiére').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"MPASSR1",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "MPASSR1"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.MPASSR2:checked').val() == "MPASSR2"){
  firebase.database().ref('/Cours').child('MPASSR').child('Deuxième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"MPASSR2",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "MPASSR2"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.MPTSD1:checked').val() == "MPTSD1"){
  firebase.database().ref('/Cours').child('MPTSD').child('Premiére').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"MPTSD1",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "MPTSD1"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
if($('.MPTSD2:checked').val() == "MPTSD2"){
  firebase.database().ref('/Cours').child('MPTSD').child('Deuxième').child(firebase.auth().currentUser.uid).push({
    Matiere:this.Commentform.get('Matiere').value,
    Comment :this.Commentform.get('Comment').value,
    PDF :String(this.fileUrlPDF),
    Video :String(this.fileUrlVideo),
    nomens:this.enseignant.nom,
    prenomens:this.enseignant.prenom,
    Class:"MPTSD2",
    nubrecomment:0,
    nuberjaime:0
  })
  firebase.database().ref('/Etudients').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.val().Class == "MPTSD2"){
        firebase.database().ref('/Notifications').child(child.key).push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" a ajouté un nouveau chapitre d'un cours "+this.Commentform.get('Matiere').value,
          title:"Cours:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"cours"
        })
      }
    })
  })
}
  


  //console.log(this.filier)
 // console.log(this.niveau)


  this.Commentform.reset();
  swal(
    'Terminé!',
    'Cours enregistré '
  )
 



}



removeCour(cour: Cour) {
  
  if(cour.PDF !== "undefined"){
  if(cour.PDF) {
    const storageRef = firebase.storage().refFromURL(cour.PDF);
    storageRef.delete().then(
      () => {
        console.log('PDF removed!');
      },
      (error) => {
        console.log('Could not remove PDF! : ' + error);
      }
    );

  }
}
if(cour.Video !== "undefined"){
  if(cour.Video) {
    const storageRef = firebase.storage().refFromURL(cour.Video);
    storageRef.delete().then(
      () => {
        console.log('Video removed!');
      },
      (error) => {
        console.log('Could not remove Video! : ' + error);
      }
    );

  }
}

  
 // console.log(this.cours)
//console.log(eventIndexToRemove)
 
  this.saveevent(cour);
  
  swal(
    'Terminé!',
    'Suppression effectuée '
  )
}

saveevent(cour: Cour) {
  //console.log(cour)
firebase.database().ref('/Cours').on('value', (snapshot) => {
  snapshot.forEach((chilld)=>{
    firebase.database().ref('/Cours').child(chilld.key).on('value', (snapshot) => {
      snapshot.forEach((chillddd)=>{
        firebase.database().ref('/Cours').child(chilld.key).child(chillddd.key).child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
         snapshot.forEach((chiildddd)=>{
           if(chiildddd.val().Comment === cour.Comment)
          {
            firebase.database().ref('/Cours').child(chilld.key).child(chillddd.key).child(firebase.auth().currentUser.uid).child(chiildddd.key).remove()

          }


            
          


         })
         
          }); 
        
      })
      })
  
  })
  })
}





showwtbd(eventspro:any){
      
  $("#evenement").click();
  firebase.database().ref("/Evénement").orderByChild("Temps").equalTo(eventspro.Temps).once("value", snapshot=> {
    this.showeventelect=[]
    snapshot.forEach((chillddd)=>{
      this.showeventelect.push(
        chillddd.val()
      )
    })

  })
  this.showeventsel=true

}

check(evt:string){
  var timee=new Date().toUTCString();
  firebase.database().ref("/Evénement").orderByChild("Nom").equalTo(evt).once("value", snapshot=> {
    snapshot.forEach((child) => {
      if (child.child("Participez/"+firebase.auth().currentUser.uid+"/name").val()==this.enseignant.nom) {
        
        //console.log("supp");
        firebase.database().ref('/Evénement').orderByChild('Nom').equalTo(evt).once("value", snapshot=> {
          snapshot.forEach((child) => {
            firebase.database().ref('/Evénement').child(child.key).child('Participez').child(firebase.auth().currentUser.uid).remove();
          });
           })
           this.inscriiievent=false
        
     }else{
      //console.log("add");
      firebase.database().ref('/Evénement').orderByChild('Nom').equalTo(evt).once("value", snapshot=> {
        snapshot.forEach((child) => {
          firebase.database().ref('/Evénement').child(child.key).child('Participez').child(firebase.auth().currentUser.uid).update({
            name :this.enseignant.nom,
            prenom :this.enseignant.prenom,
            Confimer:"red"
          })
          
        });
         
        firebase.database().ref('/Notifications').child('gHKJfbMlBJTbGDtcxK4MY6K67YW2').push({
          body:this.enseignant.nom+" "+this.enseignant.prenom+" participe l'événement "+evt,
          title:"Événement:",
          icon:this.enseignant.photo,
          show:false,
          time:timee,
          gotto:"evenement"
        })
         
         });
         this.inscriiievent=true
     }



    });
    
  })


  
    

  
};

detectcour(){
 
  

  firebase.database().ref('/Cours').on('value', (snapshot) => {
    this.cours = [];
  snapshot.forEach((chilld)=>{
    this.filier=chilld.key;
    firebase.database().ref('/Cours').child(this.filier).on('value', (snapshot) => {
      snapshot.forEach((chillddd)=>{
        this.niveau=chillddd.key
        firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
          snapshot.forEach((child) => {
            
              this.cours.push(
                child.val()
              );
          });
          
         //console.log(this.cours);
          });
          
          
      })
      
      })
  
  })
  
  
  })

  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('planetuds').child('planetud').on('value', (snapshot)=>{
    this.claseeshow=[]
    snapshot.forEach((child)=>{
      this.claseeshow.push(
        child.val()
      )
  })

})

}




ngOnInit() {

  this.messagingService.requestPermission()
  this.messagingService.receiveMessage()
  this.message = this.messagingService.currentMessage


  this.niveau="";
  this.filier="";
  this.Videook=true;
  this.pdfok=true;
  this.pdfformationok=true;
  this.Videoformationok=true;
  this.imageformationok=true
  //console.log(this.filier);
 //console.log(this.cours);
 //console.log(this.Videook);
 this.done=true
 this.i=4
 this.shoow=false
 this.showeventsel=false
  var show=false;
//---------------------------------------------------------------------------
firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('planetuds').child('planetud').on('value', (snapshot) => {
  this.planetsprofs=[]
snapshot.forEach((chilldd)=>{
  //console.log(chilldd.val())
  this.planetsprofs.push(
    chilldd.val()
  )
})

  
  

})
//---------------------------------------------------------------------------
$(document).ready(function(){
  var elem:any
   elem = document.getElementById("dateInput")
  var iso = new Date().toISOString();
  var minDate = iso.substring(0,iso.length-1);
  //console.log(iso)
  elem.value = minDate
  elem.min = minDate
});







  firebase.database().ref('/Evénement').on('value', (snapshot) => {
    this.events = [];
    this.eventspros = []
    this.eventsproseeedddd =[]
    this.eventsaujord=[]
    snapshot.forEach((child) => {
       
      this.events.push(
        child.val()
      );
        //calendrier aujourd'hui
        if ((child.val().Temps.slice(0, 4) == this.today.getFullYear()) && ((child.val().Temps.slice(5, 7)) == this.today.getMonth() + 1) && ((child.val().Temps.slice(8, 10) == this.today.getDate()))) {

          this.eventsaujord.push(
            child.val()
          );

        }


        //prouchaine evénement
        if (child.val().Temps.slice(0, 4) > this.today.getFullYear()) {
          this.eventspros.push(
            child.val()
          );
        }else if(child.val().Temps.slice(0, 4) == this.today.getFullYear()){
          if(((child.val().Temps.slice(5, 7)) > this.today.getMonth() + 1)){
            this.eventspros.push(
              child.val()
            );
          }else if(((child.val().Temps.slice(5, 7)) == this.today.getMonth() + 1)){
            if(((child.val().Temps.slice(8, 10) > this.today.getDate()))){
              this.eventspros.push(
                child.val()
              );
            }
          }
        }
          
          

       
        //precédent evénement

        if (child.val().Temps.slice(0, 4) < this.today.getFullYear()) {
          this.eventsproseeedddd.push(
            child.val()
          );
        }else if(child.val().Temps.slice(0, 4) == this.today.getFullYear()){
          if(((child.val().Temps.slice(5, 7)) < this.today.getMonth() + 1)){
            this.eventsproseeedddd.push(
              child.val()
            );
          }else if(((child.val().Temps.slice(5, 7)) == this.today.getMonth() + 1)){
            if(((child.val().Temps.slice(8, 10) < this.today.getDate()))){
              this.eventsproseeedddd.push(
                child.val()
              );
            }
          }
        }
       
    if(child.child('Participez').hasChild(firebase.auth().currentUser.uid)){
      this.inscriiievent=true
    }
      
        //console.log(child.child('Participez').hasChild(firebase.auth().currentUser.uid))
      
    });
   //console.log(this.events)
/**  if(child.child('Participez/'+firebase.auth().currentUser.uid+'/Confimer').exists()){
  part["color"]=child.child('Participez/'+firebase.auth().currentUser.uid+'/Confimer').val()
  console.log(part);
}
else{
part["color"]="white"
console.log(part);
}*/
this.keys = [];

    

    
    this.events.forEach((part)=>{
      //console.log(part)
      for(const key in part.Participez ){
        this.keys.push(key)
      }
     // console.log(this.keys)
    for(const key in part.Participez ){
     // console.log(key)
      if(this.keys.indexOf(firebase.auth().currentUser.uid) !== -1){
        part["color"]=part.Participez[firebase.auth().currentUser.uid].Confimer
        this.test=true
        //console.log(part);
      }
      else{
      part["color"]="white"
      this.test=false
      //console.log(part);
      }
    }
  })
    
    
    }
    
  );


    firebase.database().ref('/Sondageeven').on('value', (snapshot) => {
      this.sondevenementss = [];
      snapshot.forEach((child) => {
        this.sondevenementss.push(
          child.val()
        );
      });
     // console.log(this.sondevenement);
      });
  
  firebase.database().ref('/Sondage').on('value', (snapshot) => {
    this.sondformations = [];
    snapshot.forEach((child) => {
      this.sondformations.push(
        child.val()
      );
    });
   // console.log(this.sondformations);
    });






  firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child('Matieres').on('value', (snapshot) => {
    this.Matierssprof=[]
  snapshot.forEach((chilldd)=>{
    //console.log(chilldd.val())
    this.Matierssprof.push(
      chilldd.val()
    )
  })
    
    
  
  })



  $(document).on('click', 'button.removebutton', function () {
    $(this).closest('tr').remove();
    return false;
});



  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    this.formationsone = [];
    this.publiicccc_cible=""
    snapshot.forEach((child) => {
      this.formationsone.push(
      child.val() 
      );
      //console.log(child.val())
      
      
     
     
    });
    
   
    });
    

 



  
         
  const uid=firebase.auth().currentUser.uid;
  this.enseignantService.getenseignant(uid).then(
    (enseignant : Enseignant) => {
      this.enseignant = enseignant;
     // console.log(this.enseignant)
    }
  );
  
 

  firebase.database().ref('/Enseignants/'+uid).child('MessageRecu').on('value', (snapshot) => {
    this.msgs = [];
    snapshot.forEach((child) => {
      this.msgs.push(
        child.val()
       
      );
      
    });
   // console.log(this.msgs)
    }
  );



  firebase.database().ref('/Enseignants/'+uid).child('MessageEnvoyer').on('value', (snapshot) => {
    this.msgse = [];
    snapshot.forEach((child) => {
      this.msgse.push(
        child.val()
       
      );
      
    });
    //console.log(this.msgs)
    }
  );
  
  
    this.initForm();
    $('.progress-bar').each(function() {

    var valueNow = $(this).attr('aria-valuenow');
  

    $(this).animate({
      
      width: valueNow + '%',
  
      percent: 100
  
    }, {
  
  
    });
  
  });
  firebase.auth().onAuthStateChanged(
    (user)=>{
      if(user){
        this.isAuth=true;
      }else{
        this.isAuth=false;
      }
    }
  );
  this.enseignant = new Enseignant('', '',0,'','','',0,'','','');
  
  }





}
