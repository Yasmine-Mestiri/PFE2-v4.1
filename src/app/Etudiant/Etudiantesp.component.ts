import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { EtudientService } from '../services/etudient.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Etudient } from 'app/models/Etudient.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { MessagingService } from 'app/services/messaging.service';







@Component({
  selector: 'app-Etudiantesp',
  templateUrl: './Etudiantesp.component.html',
  styleUrls: ['./Etudiantesp.component.css']
})


export class EtudiantespComponent implements OnInit {
  isAuth: boolean;
  etudient: Etudient;
  Form: FormGroup;
  FormComment: FormGroup;
  Formchat: FormGroup;
  Messagerep: FormGroup;
  Messageformation: FormGroup;
  fileIsUploading = false;
  fileUrl: String;
  fileUploaded = false;
  errorMessage: string;
  ensegnum: string;
  msgs: Array<any>;
  msgse: Array<any>;
  events: Array<any>;
  eventspros: Array<any>;
  etudients: Array<any>;
  sondevenementss: Array<any>;
  eventsproseeedddd: Array<any>;
  color: string;
  test: boolean;
  keys: Array<any>;
  checkCheckBoxvalue = false;
  filier: string;
  niveau: string;
  nomchaiiiteer: string
  cours: Array<any>;
  eventsaujord: Array<any>;
  showing: boolean;
  prof: string;
  profform: string
  numcour: string;
  nommat: string;
  numform: string;
  showscoore: boolean
  formations: Array<any>;
  formationss: Array<any>;
  pressed = true;
  pressedfor = true
  commenters: Array<any>;
  Formas: Array<any>;
  lienurl: string;
  nomchaptcour: string;
  picetud: string;
  uidet: string
  nuberjaime: number;
  nuberjaimeform: number;
  cuuser: string;
  cuuserr: string;
  nubrecomment: number;
  numrja: string;
  uidetu: string;
  uidetuu: string;
  numrjaa: string;
  showeventelect: Array<any>;
  showeventsel: boolean
  inscriii: boolean;
  finalscooree: string;
  sondformations: Array<any>;
  messageshow: Array<any>;
  numsond: string;
  numinform: string;
  numinformre: string;
  etuduid: string;
  classetud: string;
  nubrepaticipent: number;
  nubrepaticipentplus: number;
  shoow: boolean;
  courss: Array<any>;
  evaluations: Array<any>;
  enseretud: Array<any>;
  evaluationscorrection: Array<any>;
  Formasev: Array<any>;
  dateshow: boolean
  numroformation: string;
  nomformation: string;
  inscriiievent: boolean;
  numroetud: string;
  claasssetud: string;
  nblimit: boolean
  uidrep: string;
  objet: string
  emailrep: string
  namerep: string
  messaggeee: string
  message;
  constructor(private messagingService: MessagingService, private authService: AuthService, private etudientservice: EtudientService, private etudientService: EtudientService, private formBuilder: FormBuilder, private router: Router) {

    this.uidet = firebase.auth().currentUser.uid;
  }



  ngOnInit() {
    //----------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

    this.showscoore = false
    this.finalscooree = ""
    this.showeventsel = false
    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      console.log(snapshot.val().numinscrire)
      this.numroetud = snapshot.val().numinscrire


      firebase.database().ref('/Listeinscrit').once('value', (snapshot) => {
        snapshot.forEach((chilld) => {
          if (chilld.val().numinscrit == this.numroetud) {
            console.log(chilld.val().Class)
            this.claasssetud = chilld.val().Class
          }

        })



      })


    })


    //------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------

    firebase.database().ref('/Etudients').on('value', (snapshot) => {
      this.etudients = []

      snapshot.forEach((child) => {
        //console.log(child.val())
        if (child.key != firebase.auth().currentUser.uid) {
          this.etudients.push(
            child.val()
          );



        }
      })
      // console.log(this.etudients)

    })

    //--------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------


    this.niveau = "";
    this.filier = "";



    firebase.database().ref('/Sondage').on('value', (snapshot) => {
      this.sondformations = [];
      snapshot.forEach((child) => {
        this.sondformations.push(
          child.val()
        );
      });
      // console.log(this.sondformations);
    });

    firebase.database().ref('/Sondageeven').on('value', (snapshot) => {
      this.sondevenementss = [];
      snapshot.forEach((child) => {
        this.sondevenementss.push(
          child.val()
        );
      });
      // console.log(this.sondevenement);
    });

    firebase.database().ref('/Listeinscrit').once('value', (snapshot) => {
      snapshot.forEach((child) => {
        //console.log(child.child('numinscrit').val())
        if (child.child('numinscrit').val() == this.etudient.numinscrire) {
          this.classetud = child.child('Class').val();

        }
        // console.log(this.classetud);

      })
    })




    firebase.database().ref('/Formations').on('value', (snapshot) => {
      this.formations = [];
      snapshot.forEach((child) => {
        firebase.database().ref('/Formations').child(child.key).on('value', (snapshot) => {
          snapshot.forEach((childd) => {
            firebase.database().ref('/Formations').child(child.key).child(childd.key).on('value', (snapshot) => {

              snapshot.forEach((chillded) => {
                //console.log(chillded.val())
                if (chillded.key == this.classetud) {
                  this.formations.push(
                    snapshot.val()
                  );
                }
              })
            })
          })
        })
      })
      console.log(this.formations)
    })


    var show = false;

    //  console.log(this.today);



    firebase.database().ref('/Evénement').on('value', (snapshot) => {
      this.events = [];
      this.eventspros = []
      this.eventsproseeedddd = []
      this.eventsaujord = []
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
       

        if (child.child('Participez').hasChild(firebase.auth().currentUser.uid)) {
          this.inscriiievent = true
        }


      });






    }

    );


    const uid = firebase.auth().currentUser.uid;
    this.etudientService.getEtudient(uid).then(
      (etudient: Etudient) => {
        this.etudient = etudient;
        //console.log(this.etudient); 
      }
    );



    firebase.database().ref('/Etudients/' + uid).child('MessageRecu').on('value', (snapshot) => {
      this.msgs = [];
      snapshot.forEach((child) => {
        this.msgs.push(
          child.val()

        );

      });
      // console.log(this.msgs)
    }
    );

    firebase.database().ref('/Etudients/' + uid).child('MessageEnvoyer').on('value', (snapshot) => {
      this.msgse = [];
      snapshot.forEach((child) => {
        this.msgse.push(
          child.val()

        );

      });
      // console.log(this.msgs)
    });





    this.initForm();
    $('.progress-bar').each(function () {

      var valueNow = $(this).attr('aria-valuenow');


      $(this).animate({

        width: valueNow + '%',

        percent: 100

      }, {


        });

    });
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;

        } else {
          this.isAuth = false;
        }
      }
    );
    this.etudient = new Etudient('', '', 0, '', '', '', 0, '', '', '');










  };


  repondremesage(msg: any) {
    this.uidrep = msg.uid
    this.namerep = msg.Source
    this.emailrep = msg.Email

  }
  //rependres messagggeeee 
  sendmesintrep() {





    this.objet = this.Messagerep.get('objet').value;
    this.messaggeee = this.Messagerep.get('text').value;
    var timee = new Date().toUTCString();

    firebase.database().ref('/Admin').once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key == this.uidrep) {
          firebase.database().ref('/Admin').child(this.uidrep).child('MessageRecu').push({
            uid: firebase.auth().currentUser.uid,
            Source: this.etudient.nom + " " + this.etudient.prenom,
            Email: this.etudient.email,
            Objet: this.objet,
            Message: this.messaggeee,
            Date: timee,

          })
          firebase.database().ref('/Notifications').child(this.uidrep).push({
            body: "Vous avez reçu un message de " + this.etudient.nom + " " + this.etudient.prenom,
            title: "Message:",
            icon: this.etudient.photo,
            show: false,
            time: timee,
            gotto: "messaaggee"
          })

        }
      })
    })
    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key == this.uidrep) {
          firebase.database().ref('/Enseignants').child(this.uidrep).child('MessageRecu').push({
            uid: firebase.auth().currentUser.uid,
            Source: this.etudient.nom + " " + this.etudient.prenom,
            Email: this.etudient.email,
            Objet: this.objet,
            Message: this.messaggeee,
            Date: timee,

          })
          firebase.database().ref('/Notifications').child(this.uidrep).push({
            body: "Vous avez reçu un message de " + this.etudient.nom + " " + this.etudient.prenom,
            title: "Message:",
            icon: this.etudient.photo,
            show: false,
            time: timee,
            gotto: "messaaggee"
          })
        }
      })
    })



    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').push({
      uid: this.uidrep,
      Source: this.namerep,
      Email: this.emailrep,
      Objet: this.objet,
      Message: this.messaggeee,
      Date: timee,
      body: this.messaggeee,
      title: this.objet,
      icon: this.etudient.photo
    })
    this.Messagerep.reset()
    swal(
      'Terminé!',
      'Message envoyé '
    )
  }
  supprimermessageenv(msg: any) {

    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().Date == msg.Date) {
          firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').child(child.key).remove()
        }
      })

    })


  }
  supprimermessageres(msg: any) {

    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageRecu').once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().Date == msg.Date) {
          firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageRecu').child(child.key).remove()
        }
      })

    })


  }

  //---------------------------------------------------formation detail-------------------------------------------------------------

  detectformation(formationone: any) {

    firebase.database().ref('/Formations').child(this.ensegnum).child(formationone).on('value', (snapshot) => {
      this.formationss = [];
      this.formationss.push(
        snapshot.val()
      );
      //console.log(this.formations);
    });


  }

  //-----------------------------------------sondage--------------------------------------------------

  progress1click(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    //prondre numro de sondage
    firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })

    //ajouter a la nombre de sondage
    firebase.database().ref('/Sondage').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })

    //console.log((sondformation.forme1nb*100)/nbform)

    firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    //enregistrer l'utilisateur qui vote
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme1nb + 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme1nb: forme1nbplus,
        forme1nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      // console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform
        })
        this.numinformre = undefined
      }
      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme1nb - 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme1nb: forme1nbmoin,
        forme1nbpers: persoform
      })
      ok = false
    }


  }

  progress2click(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })


    firebase.database().ref('/Sondage').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })



    firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme2nb + 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme2nb: forme1nbplus,
        forme2nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform
        })
        this.numinformre = undefined
      }

      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme2nb - 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme2nb: forme1nbmoin,
        forme2nbpers: persoform
      })
      ok = false
    }
  }

  progress3click(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })

    firebase.database().ref('/Sondage').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })

    firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme3nb + 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme3nb: forme1nbplus,
        forme3nbpers: persoform

      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform

        })
        this.numinformre = undefined
      }

      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme3nb - 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme3nb: forme1nbmoin,
        forme3nbpers: persoform

      })
      ok = false
    }
  }

  progress4click(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })
    firebase.database().ref('/Sondage').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme4nb + 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme4nb: forme1nbplus,
        forme4nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      // console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform

        })
        this.numinformre = undefined
      }

      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme4nb - 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme4nb: forme1nbmoin,
        forme4nbpers: persoform

      })
      ok = false
    }
  }

  progress5click(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondage').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })
    firebase.database().ref('/Sondage').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme5nb + 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme5nb: forme1nbplus,
        forme5nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondage').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondage').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme5nb - 1;
      firebase.database().ref('/Sondage').child(this.numsond).child('form5nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondage').child(this.numsond).update({
        forme5nb: forme1nbmoin,
        forme5nbpers: persoform
      })
      ok = false
    }
  }
  //-------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------sondageevenmet--------------------------------------------------

  progress1clickev(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme1nb + 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme1nb: forme1nbplus,
        forme1nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      // console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform
        })
        this.numinformre = undefined
      }
      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme1nb - 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme1nb: forme1nbmoin,
        forme1nbpers: persoform
      })
      ok = false
    }
  }

  progress2clickev(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme2nb + 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme2nb: forme1nbplus,
        forme2nbpers: persoform

      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform
        })
        this.numinformre = undefined
      }

      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme2nb - 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme2nb: forme1nbmoin,
        forme2nbpers: persoform
      })
      ok = false
    }
  }

  progress3clickev(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme3nb + 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme3nb: forme1nbplus,
        forme3nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform
        })
        this.numinformre = undefined
      }

      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme3nb - 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme3nb: forme1nbmoin,
        forme3nbpers: persoform

      })
      ok = false
    }
  }

  progress4clickev(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme4nb + 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme4nb: forme1nbplus,
        forme4nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      // console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform
        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme5nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme5nb: forme1nbmoin,
          forme5nbpers: persoform

        })
        this.numinformre = undefined
      }

      //---------------------------------------------------------------------------------------
      //---------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme4nb - 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme4nb: forme1nbmoin,
        forme4nbpers: persoform

      })
      ok = false
    }
  }

  progress5clickev(sondformation: any) {
    var uid = firebase.auth().currentUser.uid;
    var ok = false;
    var nbform = 0;
    var persoform = 0
    console.log(uid)
    firebase.database().ref('/Sondageeven').orderByChild('Date').equalTo(sondformation.Date).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        this.numsond = child.key;
      })
    })

    firebase.database().ref('/Sondageeven').child(this.numsond).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.key)
        if (child.key == "forme1") {
          nbform = nbform + 1;
        }
        if (child.key == "forme2") {
          nbform = nbform + 1;
        }
        if (child.key == "forme3") {
          nbform = nbform + 1;
        }
        if (child.key == "forme4") {
          nbform = nbform + 1;
        }
        if (child.key == "forme5") {
          nbform = nbform + 1;
        }
      })
    })
    firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {

      snapshot.forEach((child) => {
        ok = true;
        this.numinform = child.key;
      })
    })

    console.log(ok)
    if (ok == false || ok == undefined) {
      var forme1nbplus = sondformation.forme5nb + 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').push({
        nom: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: uid
      })
      persoform = (forme1nbplus * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme5nb: forme1nbplus,
        forme5nbpers: persoform
      })
      //---------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form1nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme1nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme1nb: forme1nbmoin,
          forme1nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form2nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme2nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme2nb: forme1nbmoin,
          forme2nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form3nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme3nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme3nb: forme1nbmoin,
          forme3nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        snapshot.forEach((child) => {
          this.numinformre = child.key;
        })
      })
      //console.log(this.numinformre)
      if (this.numinformre != undefined) {
        firebase.database().ref('/Sondageeven').child(this.numsond).child('form4nbin').child(this.numinformre).remove()
        var forme1nbmoin = sondformation.forme4nb - 1;
        persoform = (forme1nbmoin * 100) / nbform
        firebase.database().ref('/Sondageeven').child(this.numsond).update({
          forme4nb: forme1nbmoin,
          forme4nbpers: persoform

        })
        this.numinformre = undefined
      }
      //-------------------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------------------


    } else {
      var forme1nbmoin = sondformation.forme5nb - 1;
      firebase.database().ref('/Sondageeven').child(this.numsond).child('form5nbin').child(this.numinform).remove()
      persoform = (forme1nbmoin * 100) / nbform
      firebase.database().ref('/Sondageeven').child(this.numsond).update({
        forme5nb: forme1nbmoin,
        forme5nbpers: persoform

      })
      ok = false
    }
  }
  //-------------------------------------------------------------------------------------------------------------------------
  removecomment(commdate: string) {

    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('/Commentaire').orderByChild('datecoment').equalTo(commdate).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('/Commentaire').child(child.key).remove()
      })
    })

    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).once('value', (snapshot) => {
      this.nubrecomment = snapshot.val().nubrecomment
    })
    this.nubrecomment = this.nubrecomment - 1;
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).update({
      nubrecomment: this.nubrecomment
    })

  }



  laodcomment() {

    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('/Commentaire').once('value', (snapshot) => {
      this.commenters = [];
      snapshot.forEach((comm) => {
        this.commenters.push(
          comm.val()
        );

      });
    });

    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').once('value', (snapshot) => {
      this.nuberjaime = snapshot.numChildren()


    });
  };

  modif() {
    const nom = this.Form.get('Nom').value;
    const prenom = this.Form.get('Prenom').value;
    if (nom != "" && prenom != "") {
      firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
        nom: nom,
        prenom: prenom
      })
      this.etudient.nom = nom;
      this.etudient.prenom = prenom;
      $("#modifer").modal("hide");
      return this.etudient;
    } else if (nom != "") {
      firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
        nom: nom
      })
      this.etudient.nom = nom;
      $("#modifer").modal("hide");
      return this.etudient;
    } else if (prenom != "") {
      firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
        prenom: prenom
      })
      this.etudient.prenom = prenom;
      $("#modifer").modal("hide");
      return this.etudient;
    } else {
      this.errorMessage = "champs required";
    }


  };


  commentercour() {
    const textComment = this.FormComment.get('textComment').value;
    //console.log(this.picetud)
    var timee = new Date().toUTCString();
    var numetud = firebase.auth().currentUser.uid

    firebase.database().ref('/Notifications').child(this.prof).push({
      body: this.etudient.nom + this.etudient.prenom + " a commenté le vidéo de " + this.nomchaptcour + " de cours " + this.nommat,
      title: "Commentaire:",
      icon: this.etudient.photo,
      show: false,
      time: timee,
      gotto: "cours"
    })

    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('/Commentaire').push({
      Commenter: textComment,
      photo: this.picetud,
      datecoment: timee,
      numetud: numetud
    })
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).once('value', (snapshot) => {
      this.nubrecomment = snapshot.val().nubrecomment
    })
    this.nubrecomment = this.nubrecomment + 1;
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).update({
      nubrecomment: this.nubrecomment
    })
    this.FormComment.reset();

    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('/Commentaire').once('value', (snapshot) => {
      this.commenters = [];
      snapshot.forEach((comm) => {
        this.commenters.push(
          comm.val()
        );

      });
    });
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').once('value', (snapshot) => {
      this.nuberjaime = snapshot.numChildren()
    });



  };

  addlike() {
    var testedd: any
    var timee = new Date().toUTCString();
    firebase.database().ref('/Notifications').child(this.prof).push({
      body: this.etudient.nom + this.etudient.prenom + " a aimé votre vidéo de " + this.nomchaptcour + " de cours " + this.nommat,
      title: "Commentaire:",
      icon: this.etudient.photo,
      show: false,
      time: timee,
      gotto: "cours"
    })
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      console.log(snapshot.val())
      testedd = snapshot.val()
      snapshot.forEach((chillldddd) => {
        this.numrjaa = chillldddd.key;
        this.uidetuu = chillldddd.child('uid').val();
        console.log(this.uidetu)
        console.log(this.numrja)
      })


    });



    if (this.uidetuu != firebase.auth().currentUser.uid || testedd == null) {
      console.log("yes ")

      $(".hey").addClass("press")
      this.pressed = false

      firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').push({
        name: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: firebase.auth().currentUser.uid
      })
      firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).update({
        nuberjaime: this.nuberjaime
      })


    } else if (this.uidetuu == firebase.auth().currentUser.uid) {


      console.log("no")
      $(".hey").removeClass("press")
      this.pressed = false

      firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').child(this.numrjaa).remove()

      firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).update({
        nuberjaime: this.nuberjaime
      })



    }


    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').once('value', (snapshot) => {
      this.nuberjaime = snapshot.numChildren()


    });

  };


  play(lien: string) {

    this.pressed = true
    this.cuuserr = ""
    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('photo').once('value', (snapshot) => {
      this.picetud = snapshot.val();
    })


    //fazet el jaime kifeh te7marmen louwel matet7al el page ken el utilisateur 3amel jaime
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).on('value', (snapshot) => {
      snapshot.forEach((child) => {
        // console.log(child.key)
        firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(child.key).orderByChild('Video').equalTo(lien).on('value', (snapshot) => {

          // console.log(this.prof)
          snapshot.forEach((childer) => {
            this.numcour = childer.key
            this.prof = snapshot.key
            firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(this.prof).child(this.numcour).child('/Like').child('jaime').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {

              console.log(this.pressed)
              snapshot.forEach((childdd) => {

                if (childdd.child('uid').val() == firebase.auth().currentUser.uid && this.pressed == true) {
                  $(".hey").toggleClass("press");
                  this.pressed = false;
                }

              })

            });

          });


        });
      });
      this.laodcomment()
    });
    if (this.cuuserr == firebase.auth().currentUser.uid && this.pressed == true) {
      $(".hey").addClass("press")

      // console.log("press")
    }
    if (this.cuuserr != firebase.auth().currentUser.uid && this.pressed == true) {
      $(".hey").removeClass("press")
      //console.log("ok")
    }
    console.log(lien);
    //afficehr vider dans html avec jquery
    // when the modal is opened autoplay it  
    $('#myvideo').on('shown.bs.modal', function (e) {
      // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get

      $("#videocour").attr('src', lien);

    });
    // stop playing the youtube video when I close the modal
    $('#myvideo').on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $("#videocour").attr('src' + '');
    });

  };
  //------------------------------------formations---------------------------------
  //envoyer message dans formaation
  sendmesg() {


    firebase.database().ref('/Enseignants').child(this.profform).child('MessageRecu').push({
      Email: this.etudient.email,
      Sujet: this.Messageformation.get('Sujet').value,
      Message: this.Messageformation.get('text').value
    })


    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('MessageEnvoyer').push({
      Sujet: this.Messageformation.get('Sujet').value,
      Message: this.Messageformation.get('text').value
    })
    this.Messageformation.reset()



  }
  //correction te3 el evaluation
  correction() {
    var scoooreeee = ''

    var result = 0
    this.enseretud = []
    var $inputsradio = $('#myFormevo :input[type="radio"]:checked');
    //console.log($inputsradio.length)
    var j = 0
    while (j < $inputsradio.length) {
      this.enseretud.push({
        QuestionRep: $inputsradio.eq(j).val()
      })
      j = j + 1
    }


    for (var j = 0; j < this.evaluationscorrection.length; j++) {

      if (this.evaluationscorrection[j].QuestionRep == this.enseretud[j].QuestionRep) {

        result = result + 1
      }

    }

    if (result >= this.evaluationscorrection.length / 2) {
      result = (result * 100) / this.evaluationscorrection.length
      firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').child('valide').child(firebase.auth().currentUser.uid).child(this.nomformation).set({
        Score: result.toString() + "%"
      })
      swal({
        title: "Votre score est: " + result.toString() + "%",
        text: "Bravo!, vous êtes Admis(e) dans l'évaluation",
        icon: "success",

      });
    } else {
      firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').child('refuse').child(firebase.auth().currentUser.uid).child(this.nomformation).set({
        Score: result.toString() + "%"
      })

      swal({
        title: "Votre score est: " + result.toString() + "%",
        text: "Désolé!, Vous êtes réfusé(e) dans l'évaluation",
        icon: "error",
      });
    }
    console.log(result)

    this.showscoore = true;
    scoooreeee = result.toString() + "%";



  }
//(importer)afficher levaluation
  evaluationshow(Forma: any) {


    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').once('value', (snapshot) => {
      this.evaluations = []


      snapshot.forEach((chilllele) => {
        if (chilllele.key != 'Class' && chilllele.key != 'Date' && chilllele.key != 'Inscri' && chilllele.key != 'nubrepaticipent') {
          this.evaluations.push(
            chilllele.val()
          )
        }
      })
      console.log(this.evaluations)
    })
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('EvoluationReponce').once('value', (snapshot) => {
      this.evaluationscorrection = []
      snapshot.forEach((chilllelerep) => {
        if (chilllelerep.key != 'Class' && chilllelerep.key != 'Date' && chilllelerep.key != 'Inscri' && chilllelerep.key != 'nubrepaticipent') {
          this.evaluationscorrection.push(
            chilllelerep.val()
          )
        }



      })

    })

    //console.log(this.evaluations)
    //console.log(this.evaluationscorrection)


  }
  //inscrire dans une formation
  inscri(forma: any) {
    var timee = new Date().toUTCString();
    console.log(this.profform)
    this.nubrepaticipent = 0
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').once('value', (snapshot) => {
      this.nubrepaticipent = snapshot.child('nubrepaticipent').val()
      console.log(this.nubrepaticipent)
    })
    //console.log(chil.key)
    // console.log(chil.val())
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').child('Inscri').child(firebase.auth().currentUser.uid).update({
      Nom: this.etudient.nom,
      prenom: this.etudient.prenom,
      Class: this.claasssetud
    })


    this.nubrepaticipent = this.nubrepaticipent + 1
    console.log(this.nubrepaticipent)
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').update({
      nubrepaticipent: this.nubrepaticipent
    })


    firebase.database().ref('/Notifications').child(this.profform).push({
      body: this.etudient.nom + " " + this.etudient.prenom + " inscrit dans l'évaluation de formation " + this.nomformation,
      title: "Formation:",
      icon: this.etudient.photo,
      show: false,
      time: timee,
      gotto: "formationn"
    })



    this.inscriii = true;
  }
//remove inscription de formation 
  removeinscri(forma: any) {

    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').once('value', (snapshot) => {

      this.nubrepaticipent = snapshot.child('nubrepaticipent').val()
      console.log(this.nubrepaticipent)

    })
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').child('Inscri').child(firebase.auth().currentUser.uid).remove()


    this.nubrepaticipent = this.nubrepaticipent - 1
    console.log(this.nubrepaticipent)
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').update({
      nubrepaticipent: this.nubrepaticipent
    })





    this.inscriii = false;

  }
//(import)afficehr le cour de formation 
  ditectformation(cou: any) {



    firebase.database().ref('/Formations').on('value', (snapshot) => {
      this.Formas = [];
      this.Formasev = []
      snapshot.forEach((childdeer) => {

        firebase.database().ref('/Formations').child(childdeer.key).child(cou.Libelle).on('value', (snapshot) => {

          if (snapshot.hasChild(this.classetud) == true) {
            this.ensegnum = childdeer.key
            firebase.database().ref('/Formations').child(childdeer.key).child(cou.Libelle).child('Cours').on('value', (snapshot) => {
              snapshot.forEach((chiilldd) => {

                this.Formas.push(
                  chiilldd.val()
                )
              })

            })
            firebase.database().ref('/Formations').child(childdeer.key).child(cou.Libelle).child('Evoluations').on('value', (snapshot) => {
              //console.log(snapshot.val())
              snapshot.forEach((child)=>{
                if(child.key != "EvoluationReponce"){
                  this.Formasev.push(
                    child.val()
                  )
                  if (child.child('Inscri').hasChild(firebase.auth().currentUser.uid) == true) {
                    this.inscriii = true
                  } else {
                    this.inscriii = false
                  }
                 
                  if ((child.val().Date.slice(0, 4) == this.today.getFullYear()) && ((child.val().Date.slice(5, 7)) == this.today.getMonth() + 1) && ((child.val().Date.slice(8, 10) == this.today.getDate()))) {
    
                    this.dateshow = true
          
                  }else{
                    this.dateshow = false
                  }
                }
                
              })
              

            })
            firebase.database().ref('/Formations').child(childdeer.key).child(cou.Libelle).child('Evoluations').child('Evoluation').child('valide').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
            snapshot.forEach((child)=>{
              this.finalscooree=child.val().Score

            })
            })
          }





          //console.log(this.Formasev);
        });
        this.nomformation = cou.Libelle
        firebase.database().ref('/Formations').child(childdeer.key).child(this.nomformation).orderByChild('photo').equalTo(cou.photo).on('value', (snapshot) => {

          this.profform = childdeer.key


        });
      })



    })
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').child('refuse').child(firebase.auth().currentUser.uid).child(this.nomformation).on('value', (snapshot) => {
      snapshot.forEach((chiolld) => {
        if (chiolld.val() != null) {
          this.finalscooree = chiolld.val();
          this.showscoore = true;
        }
      })
    })
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Evoluations').child('Evoluation').child('valide').child(firebase.auth().currentUser.uid).child(this.nomformation).on('value', (snapshot) => {
      snapshot.forEach((chilld) => {
        if (chilld.val() != null) {
          this.finalscooree = chilld.val();
          this.showscoore = true;
        }
      })
    })


  };

  //afficehr les precedent evenement
  showwtbd(eventspro: any) {

    $("#evenement").click();
    firebase.database().ref("/Evénement").orderByChild("Temps").equalTo(eventspro.Temps).once("value", snapshot => {
      this.showeventelect = []
      snapshot.forEach((chillddd) => {
        this.showeventelect.push(
          chillddd.val()
        )
      })

    })
    this.showeventsel = true

  }

  
//formtaion video
  playvidformation(Forma: any) {
    var lien = Forma.Video
    this.nomchaiiiteer = Forma.Chapiter
    this.pressed = true
    this.cuuser = ""
    firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child('photo').once('value', (snapshot) => {
      this.picetud = snapshot.val();
    })



    firebase.database().ref('/Formations').on('value', (snapshot) => {
      snapshot.forEach((child) => {
        // console.log(child.key)
        firebase.database().ref('/Formations').child(child.key).child(this.nomformation).child('Cours').orderByChild('Video').equalTo(lien).on('value', (snapshot) => {
          snapshot.forEach((childer) => {
            this.profform = child.key
            this.numform = childer.key
            console.log(this.profform)
            console.log(this.numform)
          });
        });
        firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('Like').child('jaime').once('value', (snapshot) => {
          snapshot.forEach((childdd) => {
            this.cuuser = childdd.child('uid').val();
            //console.log(childdd.val())


          })
        });
        firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('/Commentaire').on('value', (snapshot) => {
          this.commenters = [];
          snapshot.forEach((comm) => {
            this.commenters.push(
              comm.val()
            );

          });
        });

        firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('jaime').on('value', (snapshot) => {
          this.nuberjaimeform = snapshot.numChildren()


        });
      });





    });
    if (this.cuuser == firebase.auth().currentUser.uid && this.pressed == true) {
      $(".hey").addClass("press")

      // console.log("press")
    }
    if (this.cuuser != firebase.auth().currentUser.uid && this.pressed == true) {
      $(".hey").removeClass("press")
      //console.log("ok")
    }



    // console.log(lien);
    // when the modal is opened autoplay it  
    $('#myvideoform').on('shown.bs.modal', function (e) {
      // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get

      $("#video").attr('src', lien);

    });
    // stop playing the youtube video when I close the modal
    $('#myvideoform').on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $("#video").attr('src' + '');
    });


  };

//commenter formation
  commenterform() {
    const textComment = this.FormComment.get('textComment').value;
    console.log(this.picetud)
    var timee = new Date().toUTCString();
    var numetud = firebase.auth().currentUser.uid


    firebase.database().ref('/Notifications').child(this.profform).push({
      body: this.etudient.nom + this.etudient.prenom + " a commenté votre vidéo de " + this.nomchaiiiteer + " de formation " + this.nomformation,
      title: "Commentaire:",
      icon: this.etudient.photo,
      show: false,
      time: timee,
      gotto: "formationn"
    })


    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('/Commentaire').push({
      Commenter: textComment,
      photo: this.picetud,
      datecoment: timee,
      numetud: numetud
    })
    this.FormComment.reset();

    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('/Commentaire').once('value', (snapshot) => {
      this.commenters = [];
      snapshot.forEach((comm) => {
        this.commenters.push(
          comm.val()
        );

      });
    });
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('jaime').once('value', (snapshot) => {
      this.nuberjaimeform = snapshot.numChildren()


    });



  };
  //remove comment formation
  removecommentform(commdate: string) {



    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('/Commentaire').orderByChild('datecoment').equalTo(commdate).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('/Commentaire').child(child.key).remove()
      })
    })




  }

//j'aime  formation

  addlikeform() {
    var tested: any
    var timee = new Date().toUTCString();
    firebase.database().ref('/Notifications').child(this.profform).push({
      body: this.etudient.nom + this.etudient.prenom + " a aimé votre vidéo de " + this.nomchaiiiteer + " de formation " + this.nomformation,
      title: "Commentaire:",
      icon: this.etudient.photo,
      show: false,
      time: timee,
      gotto: "formationn"
    })
    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('jaime').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      console.log(snapshot.val())
      tested = snapshot.val()
      snapshot.forEach((chillldddd) => {
        this.numrja = chillldddd.key;
        this.uidetu = chillldddd.child('uid').val();
        console.log(this.uidetu)
        console.log(this.numrja)
      })

    });


    if (this.uidetu != firebase.auth().currentUser.uid || tested == null) {

      // console.log("yes ")
      $(".hey").addClass("press")
      this.pressed = false
      firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('jaime').push({
        name: this.etudient.nom,
        prenom: this.etudient.prenom,
        uid: firebase.auth().currentUser.uid
      })



    }

    else

      if (this.uidetu == firebase.auth().currentUser.uid) {
        //  console.log("no")
        $(".hey").removeClass("press")
        this.pressed = false



        firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('jaime').child(this.numrja).remove()




      }


    firebase.database().ref('/Formations').child(this.profform).child(this.nomformation).child('Cours').child(this.numform).child('/Like').child('jaime').once('value', (snapshot) => {
      this.nuberjaimeform = snapshot.numChildren()


    });



  };
  //--------------------------------------cours-----------------------------------------

  ditectcour(cou: any) {
    this.nomchaptcour = cou.Comment;
    this.nommat = cou.Matiere
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).on('value', (snapshot) => {
      this.courss = [];
      snapshot.forEach((childdeer) => {

        firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(childdeer.key).orderByChild('Comment').equalTo(cou.Comment).on('value', (snapshot) => {

          snapshot.forEach((child) => {
            this.courss.push(
              child.val()
            );
          });
          //console.log(this.cours);
        });


      })
    })


  };




  initForm() {
    this.Form = this.formBuilder.group({
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
    });
    this.FormComment = this.formBuilder.group({
      textComment: ['', [Validators.required]]

    });
    this.Formchat = this.formBuilder.group({
      textchat: ['', [Validators.required]]

    });
    this.Messageformation = this.formBuilder.group({
      Sujet: ['', [Validators.required]],
      text: ['', [Validators.required]]

    });
    this.Messagerep = this.formBuilder.group({
      objet: ['', [Validators.required]],
      text: ['', [Validators.required]]

    });

  };


  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.etudientservice.uploadFile(file).then(
      (url: String) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        console.log('fichier charger');

        firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
          photo: String(this.fileUrl)
        })
        this.etudient.photo = this.fileUrl;
      }
    );

  };




  detectFiles(event: { target: { files: File[]; }; }) {
    this.onUploadFile(event.target.files[0]);

  };




  today = new Date();

  ditectfilier(Fil: string) {
    this.filier = Fil;

    console.log(this.filier)
  };
  ditectnivou(niv: string) {
    this.niveau = niv;
    console.log(this.niveau)
    firebase.database().ref('/Cours').child(this.filier).child(this.niveau).on('value', (snapshot) => {
      this.cours = [];
      snapshot.forEach((childdeer) => {
        firebase.database().ref('/Cours').child(this.filier).child(this.niveau).child(childdeer.key).on('value', (snapshot) => {

          snapshot.forEach((child) => {
            this.cours.push(
              child.val()
            );
          });
          console.log(this.cours);
        });


      })
    })




  };
  vider() {
    this.niveau = "";
    this.filier = "";
    console.log("vider")
  };
  show() {
    if (this.niveau != "") {
      //console.log("true")
      return true;

    } else {
      // console.log("false")
      return false

    }

  };
 

//add utiliateur to particier un evenement
  check(evt: string) {
    var timee = new Date().toUTCString();
    firebase.database().ref("/Evénement").orderByChild("Nom").equalTo(evt).once("value", snapshot => {
      snapshot.forEach((child) => {
        if (child.child("Participez/" + firebase.auth().currentUser.uid + "/name").val() == this.etudient.nom) {

          console.log("supp");
          firebase.database().ref('/Evénement').orderByChild('Nom').equalTo(evt).once("value", snapshot => {
            snapshot.forEach((child) => {
              firebase.database().ref('/Evénement').child(child.key).child('Participez').child(firebase.auth().currentUser.uid).remove();
            });
          })

          this.inscriiievent = false

        } else {
          console.log("add");
          firebase.database().ref('/Evénement').orderByChild('Nom').equalTo(evt).once("value", snapshot => {
            snapshot.forEach((child) => {
              firebase.database().ref('/Evénement').child(child.key).child('Participez').child(firebase.auth().currentUser.uid).update({
                name: this.etudient.nom,
                prenom: this.etudient.prenom,
                Confimer: "red"
              })

            });
            firebase.database().ref('/Notifications').child('gHKJfbMlBJTbGDtcxK4MY6K67YW2').push({
              body: this.etudient.nom + " " + this.etudient.prenom + " participe l'événement " + evt,
              title: "Événement:",
              icon: this.etudient.photo,
              show: false,
              time: timee,
              gotto: "evenement"
            })
            this.inscriiievent = true

          });

        }



      });

    })



  };






}
