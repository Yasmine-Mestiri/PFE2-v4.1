import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EtudientService } from 'app/services/etudient.service';
import { Event } from '../models/Event.model'
import { Subject } from 'rxjs';
import swal from 'sweetalert';
import { EnseignantService } from 'app/services/enseignant.service';
import { MessagingService } from "app/services/messaging.service";

@Component({
  selector: 'app-Adminesp',
  templateUrl: './Adminesp.component.html',
  styleUrls: ['./Adminesp.component.css']
})



export class AdminespComponent implements OnInit {
  msgs : Array<any>;
  msgse: Array<any>;
  coords:Array<any>;
   coordss:Array<any>;
  events:Array<any>;
  lesetuds:Array<any>;
  ajoutevent: FormGroup;
  editevent: FormGroup;
  matierform: FormGroup;
  Messagerep: FormGroup;
  formationform: FormGroup;
  sondageform:FormGroup;
  sondageformmodif:FormGroup;
  fileUrl:String;
  eventsSubject = new Subject<Event[]>();
  filier:string;
  niveau:string;
  accepptedd:boolean;
  Commentform:FormGroup;
  cours:Array<any>;
  planetsprofs:Array<any>;
  formations:Array<any>;
  nuberjaime:number;
  nubercomment:number;
  fileUrlimageformation:String;
  fileUrlVideoformation:String;
  fileUrlPDFformation:String;
  fileUrlVideo:String;
  fileUrlPDF:String;
  nomfile:String;
  fileIsUploading =false;
  fileUploaded =false;
  pdfformationok:boolean;
  Videoformationok:boolean;
  imageformationok:boolean;
  pdfok:boolean;
  Videook:boolean;
  commenters:Array<any>;
  jaimes:Array<any>;
  esegnients:Array<any>;
  picad:string;
  Matierss:Array<any>;
  numcour:string;
  FormComment:FormGroup;
  planetudformon:FormGroup;
  nuberPartcipent:number;
  numform:string;
  sondformations:Array<any>;
  Matierssprof:Array<any>;
  numevent:string
  editeventsss:Array<any>;
  showwnbpalce:boolean;
  numuns:string
  showmodif:boolean
  csvfileformationok:boolean
  numsondform:string
  tableclasse:Array<any>;
  tabecsv:Array<any>;
  Regime:string;
  PlageHoraire:string;
  anneeuniversitaire:string;
  semestre:string;
  messaggeee:string;
  uidrep:string;
  objet:string
  emailrep:string
  namerep:string


  message;
  constructor(private messagingService: MessagingService,private formBuilder: FormBuilder,private enseignantService:EnseignantService,private etudientservice:EtudientService) { }
  


  
  initForm() {
    this.ajoutevent = this.formBuilder.group({
      nbplace: [''],
      inscriuon: [''],
      Lieu: [''],
      
      Nom: ['', [Validators.required]],
      Discription: ['', [Validators.required]],
      datetime: ['', [Validators.required]],
      photo: ['', [Validators.required]]
    });
    this.editevent = this.formBuilder.group({
      nbplace: [''],
      inscriuon: [''],
      Lieu: [''],
      Nom: [''],
      Discription: ['' ],
      datetime: ['' ],
      photo: ['' ]
    });
    this.Messagerep=this.formBuilder.group({
      objet: ['', [Validators.required]],
      text:['', [Validators.required]]

      });
    this.Commentform = this.formBuilder.group({
      Comment: ['', [Validators.required]],
      Matiere:['', [Validators.required]]

      });
      this.FormComment = this.formBuilder.group({
        textComment: ['', [Validators.required]]
        
        });
        this.formationform = this.formBuilder.group({
          Name: ['', [Validators.required]],
          detail: ['', [Validators.required]],
          datetimeformation: ['', [Validators.required]]
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
            this.matierform= this.formBuilder.group({
              Matiere1: ['', [Validators.required]],
              Matiere2: [''],
              Matiere3: [''],
              Matiere4: ['']
              });

              this.planetudformon= this.formBuilder.group({
                Horaire: ['', [Validators.required]],
                Regime: ['', [Validators.required]],
                AU:['', [Validators.required]],
                semestre:['', [Validators.required]],
                LAI1:[''],LFI1:[''],ARS1:[''],MPASSR1:[''],MPTSD1:[''],
                LAI2:[''],LFI2:[''],ARS2:[''],MPASSR2:[''],MPTSD2:[''],
                LAI3:[''],LFI3:[''],ARS3:['']
                
    
                });
	
  }

  sendplanetud(){
   
    var publiicccc_cible=""
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


 
console.log(this.tableclasse)
  for (var i=0; i<this.tableclasse.length; i++){
    if(this.tableclasse[i] != undefined){

      firebase.database().ref('/Enseignants').child(this.numuns).child('planetuds').child('planetud').child(this.tableclasse[i]).set({
        Plage_Horaire:this.planetudformon.get('Horaire').value,
        Regime:this.planetudformon.get('Regime').value,
        annee_universitaire:this.planetudformon.get('AU').value,
        semestre:this.planetudformon.get('semestre').value,
        [this.tableclasse[i]]:this.tableclasse[i],
        publiicccc_cible:this.tableclasse[i]

      })
      
      
      
      
    }
  }


  this.planetudformon.reset()

  }
  removeplantetud(planetsprof:any){


    firebase.database().ref('/Enseignants').child(this.numuns).child("planetuds").child("planetud").once('value', (snapshot) => {
      snapshot.forEach((child)=>{
        if(planetsprof.publiicccc_cible == child.val().publiicccc_cible){
          firebase.database().ref('/Enseignants').child(this.numuns).child("planetuds").child("planetud").child(child.key).remove()

        }

      })

    })



  }


  detectnuminssss(esegnient:any){
    this.numuns=''
    firebase.database().ref('/Enseignants').orderByChild('numinscrire').equalTo(esegnient.numinscrire).once('value', (snapshot) => {
      snapshot.forEach((chiilldd)=>{
        this.numuns=chiilldd.key
      })
      
    })

    firebase.database().ref('/Enseignants').child(this.numuns).child('planetuds').child('planetud').on('value', (snapshot) => {
      this.planetsprofs=[]
    snapshot.forEach((chilldd)=>{
      //console.log(chilldd.val())
      this.planetsprofs.push(
        chilldd.val()
      )
    })
    //console.log(this.planetsprofs)
    if(this.planetsprofs.length !=0){ 
      this.showmodif=true
    }else{
      this.showmodif=false
    }
      
      
    
    })

  }


  detectnumins(esegnient:any){
    this.numuns=''
    firebase.database().ref('/Enseignants').orderByChild('numinscrire').equalTo(esegnient.numinscrire).once('value', (snapshot) => {
      snapshot.forEach((chiilldd)=>{
        this.numuns=chiilldd.key
      })
      
    })

    firebase.database().ref('/Enseignants').child(this.numuns).child('Matieres').on('value', (snapshot) => {
      this.Matierssprof=[]
    snapshot.forEach((chilldd)=>{
      console.log(chilldd.val())
      this.Matierssprof.push(
        chilldd.val()
      )
    })
    console.log(this.Matierssprof)
    if(this.Matierssprof.length !=0){ 
      this.showmodif=true
    }else{
      this.showmodif=false
    }
      
      
    
    })

  }

  adddmatier(){

    firebase.database().ref('/Enseignants').child(this.numuns).child('Matieres').child('Matiere1').set({
      Matiere:this.matierform.get('Matiere1').value
    })
    if(this.matierform.get('Matiere2').value != ""){
      firebase.database().ref('/Enseignants').child(this.numuns).child('Matieres').child('Matiere2').set({
        Matiere:this.matierform.get('Matiere2').value
      })
    }
    if(this.matierform.get('Matiere3').value != ""){
      firebase.database().ref('/Enseignants').child(this.numuns).child('Matieres').child('Matiere3').set({
        Matiere:this.matierform.get('Matiere3').value
      })
    }
    if(this.matierform.get('Matiere4').value != ""){
      firebase.database().ref('/Enseignants').child(this.numuns).child('Matieres').child('Matiere4').set({
        Matiere:this.matierform.get('Matiere4').value
      })
    }
   
  
this.matierform.reset()
  }
  
  shownbplace(){
    if(this.showwnbpalce== false){
      this.showwnbpalce=true
    }else{
      this.showwnbpalce=false
    }
   
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

  onSubmit(){
    var today=new Date().toUTCString();
	const Discription = this.ajoutevent.get('Discription').value;
	const datetime = this.ajoutevent.get('datetime').value;
  const Nom = this.ajoutevent.get('Nom').value;
  if(this.fileUrl && this.fileUrl !== '') {
     var photo = this.fileUrl;
    
    }
 
    firebase.database().ref('/Evénement').push({
      Discription:Discription,
      Temps:datetime,
      Nom:Nom,
     photo:photo,
     uid:today,
     nbplace: this.ajoutevent.get('nbplace').value,
      inscriouiounon: this.ajoutevent.get('inscriuon').value,
      Lieu: this.ajoutevent.get('Lieu').value,
    })
    this.ajoutevent.reset();
    $(".previewev").css("background", "");
    $(".file-upload-text-event").val("");
  }
  detectevent(event:any){
    firebase.database().ref('/Evénement').orderByChild('uid').equalTo(event.uid).on('value', (snapshot) => {
      this.editeventsss=[]
      snapshot.forEach((child)=>{

        this.numevent=child.key
        //console.log(child.val())
        this.editeventsss.push(
          child.val()
        )
      })
    })
   
    console.log(this.editeventsss)
  }
  onEdit(){
    const Discription = this.editevent.get('Discription').value;
	const datetime = this.editevent.get('datetime').value;
  const Nom = this.editevent.get('Nom').value;
  if(this.fileUrl && this.fileUrl !== '') {
     var photo = this.fileUrl;
    
    }


//console.log(this.numevent)
    //console.log(Discription)
if(Discription != "" && Discription != null )
   { firebase.database().ref('/Evénement').child(this.numevent).update({
      Discription:Discription
    })
    }
    //console.log(datetime)
    if(datetime != "" && datetime != null){
      firebase.database().ref('/Evénement').child(this.numevent).update({
        Temps:datetime
      })
    }
    //console.log(Nom)
    if(Nom != "" && Nom != null){
      firebase.database().ref('/Evénement').child(this.numevent).update({
        Nom:Nom
      })
    }
    //console.log(photo)
    if(photo != undefined){
      firebase.database().ref('/Evénement').child(this.numevent).update({
        photo:photo
      })
    }
   
    this.editevent.reset();
    $(".previewev").css("background", "");
    $(".file-upload-text-event").val("");
   
    
  }

  detectvideo(event: { target: { files: File[]; }; }) {
    this.onUploadvideo(event.target.files[0]);
    
    }
    
    
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
        console.log('fichier PDF charger');
        this.Videook=false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'fichier PDF est charger '
  )
      }
    );
    
    
  }

  onUploadvideo(file: File) {
    this.fileIsUploading = true;
    this.enseignantService.uploadvideo(file).then(
      (url: String) => {
        this.fileUrlVideo = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        
        console.log('fichier Video charger');
        this.pdfok=false;
  
  swal(
    'Terminé!',
    'fichier vidéo est charger '
  )
      }
    );
    
  }
  
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

  ditectfilier(Fil :string){
    this.filier=Fil;
    
   //console.log(this.filier)
  }

  ditectnivou(niv :string){
    this.niveau=niv;
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.cours = [];
      snapshot.forEach((child) => {
        firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('jaime').once('value', (snapshot) => {
          this.nuberjaime=snapshot.numChildren()
          });
          firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('Commentaire').once('value', (snapshot) => {
            this.nubercomment=snapshot.numChildren()
            });
          firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(child.key).update({
            nuberjaime:this.nuberjaime,
            nubrecomment:this.nubercomment
            
          })
  
  
      });
     // console.log(this.cours);
      });
    
  
  
  
  
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.cours = [];
      snapshot.forEach((child) => {
        this.cours.push(
          child.val()
        );
      });
     // console.log(this.cours);
      });
    //console.log(this.niveau)
  }

  send(){
    //console.log(this.filier)
   // console.log(this.niveau)
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).push({
      Matiere:this.Commentform.get('Matiere').value,
      Comment :this.Commentform.get('Comment').value,
      PDF :String(this.fileUrlPDF),
      Video :String(this.fileUrlVideo)
    })
  
    this.Commentform.reset();
    swal(
      'Terminé!',
      'Cours est enregistrer '
    )
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
            console.log(this.jaimes)
            });
        }
        
      })
      
      
        })

  
 
 

//console.log(cour);

}





showParcipent(event:any){
  firebase.database().ref('/Evénement').on('value', (snapshot) => {
    snapshot.forEach((child)=>{
      if(child.child('Temps').val() == event.Temps){
       // console.log(child.key)
        firebase.database().ref('/Evénement').child(child.key).once('value', (snapshot) => {snapshot.forEach((chillld)=>{
            firebase.database().ref('/Evénement').child(child.key).child('Participez').once('value', (snapshot) => {
              this.jaimes = [];
              snapshot.forEach((comm) => {
                this.jaimes.push(
                  comm.val()
                );
      
            });


            })
          })
          
          
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


showcomment(cour:any){
  firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('photo').once('value', (snapshot) => {
    this.picad=snapshot.val();
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
commentercour(){

  
  const textComment = this.FormComment.get('textComment').value;
  //console.log(this.picense)
  var timee=new Date().toUTCString();
  var numead=firebase.auth().currentUser.uid
  
  firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(firebase.auth().currentUser.uid).child(this.numcour).child('/Like').child('/Commentaire').push({
    Commenter:textComment,
    photo:this.picad,
    datecoment:timee,
    numead:numead
        })
        this.FormComment.reset();

    
          
        
};














    
  removeBook(event: Event) {
    if(event.photo) {
      const storageRef = firebase.storage().refFromURL(event.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );

    }

    const eventIndexToRemove = this.events.findIndex(
      (evente) => {
        if(evente === event) {
          return true;
        }
        
      }
    );
    this.events.splice(eventIndexToRemove, 1);
    this.saveevent();
    this.emitevents();
}
saveevent() {
  firebase.database().ref('/Evénement').set(this.events);
}



  emitevents() {
    this.eventsSubject.next(this.events);
  }



  //--------------------------------------formation----------------------------------------------
  sendformation(){
    //console.log(this.filier)
   // console.log(this.niveau)
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).push({
      Name:this.formationform.get('Name').value,
      Detail :this.formationform.get('detail').value,
      Date:this.formationform.get('datetimeformation').value,
      PDF :String(this.fileUrlPDFformation),
      Video :String(this.fileUrlVideoformation),
      image:String(this.fileUrlimageformation)
    })
  
    this.formationform.reset();
    swal(
      'Terminé!',
      'Formation est enregistrer '
    )
  }
  
  
  removeformation(formation: any) {
    
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
  }
  
   
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).orderByChild('Date').equalTo(formation.Date).once('value', (snapshot) => {
     
   snapshot.forEach((child)=>{
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(child.key).remove();
   })
  
  })
   
    
    swal(
      'Terminé!',
      'Suppression effectuée '
    )
  }
  showjaimeform(formation:any){
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      snapshot.forEach((child)=>{
        if(child.child('Detail').val() === formation.Detail){
         // console.log(child.key)
          firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('/jaime').once('value', (snapshot) => {
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
  showcommentform(cour:any){
    firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('photo').once('value', (snapshot) => {
      this.picad=snapshot.val();
    })
  
    firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
  snapshot.forEach((child)=>{
    this.numform=child.key
    if(child.child('Detail').val() === cour.Detail){
     // console.log(child.key)
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('/Commentaire').once('value', (snapshot) => {
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
        console.log('fichier PDF charger');
        this.pdfformationok=false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'fichier PDF est charger '
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
          console.log('fichier PDF charger');
          this.Videoformationok=false;
         // console.log(this.Videook);
   
    swal(
      'Terminé!',
      'fichier Video est charger '
    )
        }
      );
}

detectimageformation(event: { target: { files: File[]; }; }) {
  this.onUploadimageformation(event.target.files[0]);   
}   
onUploadimageformation(file: File) {
  
    this.fileIsUploading = true;
    this.enseignantService.uploadimageformation(file).then(
      (url: String) => {
        this.fileUrlimageformation = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        console.log('fichier PDF charger');
        this.imageformationok=false;
       // console.log(this.Videook);
 
  swal(
    'Terminé!',
    'fichier Photo est charger '
  )
      }
    );

    


}






public csvChanged(event: { target: any; }) {
  
//var CSVConstants:any
//this.onUploadfilecsvformation(event.target.files[0]);
this.tabecsv=[]
   var input = event.target;
   var reader = new FileReader();
   reader.readAsText(input.files[0]);

   reader.onload = (data) => {
       let csvData: any = reader.result;
       let csvRecordsArray = csvData.split(",",4);
        
      firebase.database().ref('/Enseignants').child(this.numuns).child('planetuds').child('planetud').child(event.target.files[0].name.split('.').slice(0, -1).join('.')).set({
        [event.target.files[0].name.split('.').slice(0, -1).join('.')]:event.target.files[0].name.split('.').slice(0, -1).join('.'),
        publiicccc_cible:event.target.files[0].name.split('.').slice(0, -1).join('.'),
        annee_universitaire:csvRecordsArray[0],
        semestre:csvRecordsArray[1],
        Plage_Horaire:csvRecordsArray[2],
        Regime:csvRecordsArray[3],
      })
   }
 
   swal(
    'Terminé!',
    'Chargement terminé'
  )
   
}
  





commenterform(){

  
  const textComment = this.FormComment.get('textComment').value;
  //console.log(this.picense)
  var timee=new Date().toUTCString();
  var numense=firebase.auth().currentUser.uid
  
  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(this.numform).child('/Like').child('/Commentaire').push({
    Commenter:textComment,
    photo:this.picad,
    datecoment:timee,
    numense:numense
        })
        this.FormComment.reset();

    
          
        
};
removecommentform(comm :any){

  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    snapshot.forEach((childd)=>{
     // console.log(childd.key)
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(childd.key).child('/Like').child('/Commentaire').orderByChild('datecoment').equalTo(comm.datecoment).once('value', (snapshot) => {
        snapshot.forEach((child) => {
         // console.log(child.key)
          firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(childd.key).child('/Like').child('/Commentaire').child(child.key).remove()
          //console.log("donne")
        })
          })


    })
    //console.log('donner')
  })
  
  

  

}

//------------------------------sondage---------------------------------------------------------------------
showform1(sondformation:any){
  var numfor:string
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondageeven').child(numfor).child('form1nbin').on('value', (snapshot) => {
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
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondageeven').child(numfor).child('form2nbin').on('value', (snapshot) => {
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
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondageeven').child(numfor).child('form3nbin').on('value', (snapshot) => {
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
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondageeven').child(numfor).child('form4nbin').on('value', (snapshot) => {
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
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot)=>{
    snapshot.forEach((child)=>{
      numfor=child.key;
    })
  })
  firebase.database().ref('/Sondageeven').child(numfor).child('form5nbin').on('value', (snapshot) => {
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
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot) => {
    
   snapshot.forEach((child)=>{
     //console.group(child.key)
     this.numsondform=child.key
   })
    
    });

}

modifsondage(){

  var timee=new Date().toUTCString();
  if(this.sondageformmodif.get('form3').value == ''){
  firebase.database().ref('/Sondageeven').child(this.numsondform).update({
    forme1:this.sondageformmodif.get('form1').value,
    forme1nb:0,
    forme2:this.sondageformmodif.get('form2').value,
    forme2nb:0,
    Date:timee
        })
      }else
      if(this.sondageformmodif.get('form4').value == ''){
        firebase.database().ref('/Sondageeven').child(this.numsondform).update({
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
              firebase.database().ref('/Sondageeven').child(this.numsondform).update({
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
                    firebase.database().ref('/Sondageeven').child(this.numsondform).update({
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
  'Sondage enregistrer '
)
}

sendsondage(){

  var timee=new Date().toUTCString();
  if(this.sondageform.get('form3').value == ''){
  firebase.database().ref('/Sondageeven').push({
    forme1:this.sondageform.get('form1').value,
    forme1nb:0,
    forme2:this.sondageform.get('form2').value,
    forme2nb:0,
    Date:timee
        })
      }else
      if(this.sondageform.get('form4').value == ''){
        firebase.database().ref('/Sondageeven').push({
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
              firebase.database().ref('/Sondageeven').push({
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
                    firebase.database().ref('/Sondageeven').push({
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
  'Sondage enregistrer '
)
}
removesondage(sondformation :any){
  var num:string
  firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).on('value', (snapshot) => {
snapshot.forEach((child)=>{
  num=child.key
})
  })
  firebase.database().ref('/Sondageeven').child(num).remove();


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
  acceptinvit(coo:any){
    
    

    

    


    firebase.database().ref('/Etudients').once('value', (snapshot) => {
      snapshot.forEach((childd)=>{
       if(childd.val().email == coo.email){
        var actionCodeSettings = {
          // The URL to redirect to for sign-in completion. This is also the deep
          // link for mobile redirects. The domain (www.example.com) for this URL
          // must be whitelisted in the Firebase Console.
          url: 'http://localhost:4200/icons',
          // This must be true.
          handleCodeInApp: true
        };
        firebase.auth().sendSignInLinkToEmail(coo.email, actionCodeSettings)
        .then(function() {
         console.log("done")
        })
        .catch(function(error) {
          console.log(error)
        });
        firebase.database().ref('/Etudients').child(childd.key).update( {
          valideinscri:true
        })
       }
      })
    })
    
    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((childd)=>{
       if(childd.val().email == coo.email){
        var actionCodeSettings = {
          // The URL to redirect to for sign-in completion. This is also the deep
          // link for mobile redirects. The domain (www.example.com) for this URL
          // must be whitelisted in the Firebase Console.
          url: 'http://localhost:4200/icons',
          // This must be true.
          handleCodeInApp: true
        };
        firebase.auth().sendSignInLinkToEmail(coo.email, actionCodeSettings)
        .then(function() {
         console.log("done")
        })
        .catch(function(error) {
          console.log(error)
        });
        firebase.database().ref('/Enseignants').child(childd.key).update( {
          valideinscri:true
        })
       }
      })
    })
  }
  supprimermessageenv(msg:any){
    
    firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').once('value', (snapshot) => {
      snapshot.forEach((child)=>{
        if(child.val().Date == msg.Date){
          firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').child(child.key).remove()
        }
      })
      
    })

    
  }
  supprimermessageres(msg:any){
    
    firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('MessageRecu').once('value', (snapshot) => {
      snapshot.forEach((child)=>{
        if(child.val().Date == msg.Date){
          firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('MessageRecu').child(child.key).remove()
        }
      })
      
    })

    
  }
  supprimerinscri(coo:any){
    
    firebase.database().ref('/Etudients').once('value', (snapshot) => {
      snapshot.forEach((childd)=>{
       if(childd.val().email == coo.email){
        firebase.database().ref('/Etudients').child(childd.key).remove()
        
       }
      })
    })
    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((childd)=>{
       if(childd.val().email == coo.email){
        firebase.database().ref('/Enseignants').child(childd.key).remove()
       }
      })
    })


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
    firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').push({
      uid:this.uidrep,
      Source:this.namerep,
      Email:this.emailrep,
      Objet:this.objet,
      Message:this.messaggeee,
      Date:timee,
      body:this.messaggeee,
      title:this.objet,
      icon:"https://image.flaticon.com/icons/svg/78/78948.svg"

    })
    
    firebase.database().ref('/Etudients').once('value', (snapshot) => {
      snapshot.forEach((child)=>{
        if(child.key == this.uidrep){
    firebase.database().ref('/Etudients').child(this.uidrep).child('MessageRecu').push({
      uid:firebase.auth().currentUser.uid,
      Source:"Admin",
      Email:"admin@admin.com",
      Objet:this.objet,
      Message:this.messaggeee,
      Date:timee,
      body:this.messaggeee,
      title:this.objet,
      icon:"https://image.flaticon.com/icons/svg/78/78948.svg"
    })
       }
      })
    })

    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((child)=>{
        if(child.key == this.uidrep){
          firebase.database().ref('/Enseignants').child(this.uidrep).child('MessageRecu').push({
            uid:firebase.auth().currentUser.uid,
            Source:"Admin",
            Email:"admin@admin.com",
            Objet:this.objet,
            Message:this.messaggeee,
            Date:timee,
            body:this.messaggeee,
            title:this.objet,
            icon:"https://image.flaticon.com/icons/svg/78/78948.svg"
          })
        }
      })
      })
    this.Messagerep.reset()
    swal(
      'Terminé!',
      'Message envoyé '
    )
  }

  

//-------------------------------------------------------------------------------------------------
  ngOnInit() {
    
    //------------------------------------------------------------------

//--------------------------------------------------------------
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage


    uploadImage();
    this.initForm();
this.niveau="";
  this.filier="";
  this.Videook=true;
  this.pdfok=true;
this.showwnbpalce=false
this.csvfileformationok=true

$(document).ready(function(){
  var elem:any
   elem = document.getElementById("dateInput")
  var iso = new Date().toISOString();
  var minDate = iso.substring(0,iso.length-1);
  console.log(iso)
  elem.value = minDate
  elem.min = minDate
});


firebase.database().ref('/Matierescour').on('value', (snapshot) => {
  this.Matierss=[]
snapshot.forEach((chilldd)=>{
  console.log(chilldd.val())
  this.Matierss.push(
    chilldd.val()
  )
})
  
  

})

  firebase.database().ref('/Sondageeven').on('value', (snapshot) => {
    this.sondformations = [];
    snapshot.forEach((child) => {
      this.sondformations.push(
        child.val()
      );
    });
   // console.log(this.sondformations);
    });


    firebase.database().ref('/Enseignants').on('value', (snapshot) => {
      this.esegnients = [];
      snapshot.forEach((child) => {
        this.esegnients.push(
          child.val()
        );
      });
     // console.log(this.esegnients);
      });

    


  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    snapshot.forEach((child) => {
      firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('jaime').once('value', (snapshot) => {
        this.nuberjaime=snapshot.numChildren()
        });
        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(child.key).child('/Like').child('Commentaire').once('value', (snapshot) => {
          this.nubercomment=snapshot.numChildren()
          });
          
        firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).child(child.key).update({
          nuberjaime:this.nuberjaime,
          nubrecomment:this.nubercomment
          
        })

    });
    });

  firebase.database().ref('/Formations').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
    this.formations = [];
    snapshot.forEach((child) => {
      this.formations.push(
        child.val()
      );
    });
   // console.log(this.formations);
    });
    
   

  firebase.database().ref('/Evénement').on('value', (snapshot) => {
    snapshot.forEach((child) => {
      firebase.database().ref('/Evénement').child(child.key).child('/Participez').once('value', (snapshot) => {
        this.nuberPartcipent=snapshot.numChildren()
        });
       
        firebase.database().ref('/Evénement').child(child.key).update({
          nuberPartcipent:this.nuberPartcipent
          
          
        })

    });
    });








    const uid=firebase.auth().currentUser.uid;
    firebase.database().ref('/Admin/'+uid).child('MessageRecu').on('value', (snapshot) => {
      this.msgs = [];
      snapshot.forEach((child) => {
        this.msgs.push(
          child.val()
         
        );
        
      });
      console.log(this.msgs)
      }
    );
    firebase.database().ref('/Admin/'+uid).child('MessageEnvoyer').on('value', (snapshot) => {
      this.msgse = [];
      snapshot.forEach((child) => {
        this.msgse.push(
          child.val()
         
        );
        
      });
      console.log(this.msgs)
      }
    );
   

    firebase.database().ref('/Evénement').on('value', (snapshot) => {
      this.events = [];
      snapshot.forEach((child) => {
        this.events.push(
          child.val()
        );
      });
      console.log(this.events);
      }
    );
   




    $(function() {
 
      function maskImgs() {
        //$('.img-wrapper img').imagesLoaded({}, function() {
        $.each($('.img-wrapper img'), function(index: any, img: any) {
          var src = $(img).attr('src');
          var parent = $(img).parent();
          parent
            .css('background', 'url(' + src + ') no-repeat center center')
            .css('background-size', 'cover');
          $(img).remove();
        });
        //});
      }
      var previewev = {
        init: function() {
          previewev.setPreviewImg(null);
          previewev.listenInput();
        },
        setPreviewImg: function(fileInput: any) {
          var path = $(fileInput).val();
          var uploadText = $(fileInput).siblings('.file-upload-text-event');
          if (!path) {
            $(uploadText).val('');
          } else {
            path = path['replace'](/^C:\\fakepath\\/, "");
            $(uploadText).val(path);
            previewev.showPreview(fileInput, path, uploadText);
          }
        },
        showPreview: function(fileInput: any, path: any, uploadText: { val: (arg0: any) => void; }) {
          var file = $(fileInput)[0].files;
          if (file && file[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
              var previewImg = $(fileInput).parents('.file-upload-wrapper-event').siblings('.previewev');
              var img = $(previewImg).find('img');
              if (img.length == 0) {
                $(previewImg).html('<img src="' + e.target['result'] + '" alt=""/>');
              } else {
                img.attr('src', e.target['result']);
              }
              uploadText.val(path);
              maskImgs();
            }
            reader.onloadstart = function() {
              $(uploadText).val('uploading..');
            }
            reader.readAsDataURL(file[0]);
          }
        },
        listenInput: function() {
          $('.file-upload-native-event').on('change', function() {
            previewev.setPreviewImg(this);
          });
        }
      };
      previewev.init();
     });


    
  }
  onUploadFile(file: File) {
    
    this.etudientservice.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
				console.log('fichier charger');
				
      }
    );
 }
 detectFiles(event: { target: { files: File[]; }; }) {
    this.onUploadFile(event.target.files[0]);
 }
 
  
 

}








function uploadImage() {
  
  var button = $('.images .pic')
  var uploader = $('<input type="file" "  accept="image/*" />')
  var images = $('.pic')
  var ajou=$('.Ajouter')
  

  var reader = new FileReader()
   
    

    
  button.on('click', function () {
    ajou.remove();
    uploader.click()
    
    
    
    
    
  })
  
  uploader.on('change', function () {
      
      
      
      reader.onload = function(event) {
        
        
        images.prepend('<div class="img" id="img"  name="img" style="background-image: url(\'' + event.target['result'] + '\');" rel="'+ event.target['result']  +'"><span>Ajouter</span></div>')
        // console.log(event.target['result']);
      
      }

      
      reader.readAsDataURL(uploader[0].files[0])
      
      


      
   })
  
  images.on('click', '.img', function () {
    $(this).remove();
    
  })

}

