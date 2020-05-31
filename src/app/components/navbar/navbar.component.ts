import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from "bootstrap";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { MessagingService } from 'app/services/messaging.service';
import { Etudient } from 'app/models/Etudient.model';
import { EtudientService } from 'app/services/etudient.service';
import { EnseignantService } from 'app/services/enseignant.service';
import { Enseignant } from 'app/models/Enseignant.model';
import { Subject } from 'rxjs/Subject';
import { Recherche } from '../../services/recherche.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  display = 'none';
  isAuth: boolean;
  etudient: Etudient;
  enseignant: Enseignant
  signInForm: FormGroup;
  Formchat: FormGroup;
  nbmesgcam: number;
  showens: boolean
  errorMessage: string;
  uidutilis: string;
  access: string;
  messageshow: Array<any>;
  etuduid: string;
  etudconn: boolean
  uidet: string;
  enssss: string
  changecol: string
  message;
  notif: Array<any>;
  notifnew: Array<any>;
  etudients: Array<any>;
  enseignants: Array<any>;
  etudientsssss: Array<any>;
  enseignantssss: Array<any>;
  nbnewnotif: number;
  recherchesevents;
  rechercheformats;
  recherchescouurssslai3;
  recherchescouurssslai2;
  recherchescouurssslai1;
  recherchescouurssslfi3;
  recherchescouurssslfi2;
  recherchescouurssslfi1;
  recherchescouursssars1;
  recherchescouursssars2;
  recherchescouursssars3;
  recherchescouursssMPTSD2;
  recherchescouursssMPTSD1;
  recherchescouursssMPASSR1;
  recherchescouursssMPASSR2;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string | null> = new BehaviorSubject("\uf8ff");

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = 'none';
  }
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(private recherche: Recherche, private enseignantservice: EnseignantService, private etudientService: EtudientService, private messagingService: MessagingService, location: Location, private element: ElementRef, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.location = location;
    this.sidebarVisible = false;
  }
  vue() {
    $('.showbadgge').hide();

    // console.log('hide')
  }
  vuechat() {

    if (this.etuduid != undefined) {
      firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).once('value', (snapshot) => {
        snapshot.forEach((childdd) => {
          if (childdd.val().messagerecu != undefined) {
            firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).child(childdd.key).update({
              showwww: true
            })
            firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })
                }
              })
            })
            firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })
                }
              })
            })
          }
        })

      })
    }
    if (this.etuduid != undefined) {
      firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).once('value', (snapshot) => {
        snapshot.forEach((childdd) => {
          if (childdd.val().messagerecu != undefined) {
            firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).child(childdd.key).update({
              showwww: true
            })
            firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })
                }
              })
            })
            firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })
                }
              })
            })
          }
        })

      })
    }
    // console.log('hide')
  }
  vueee() {
    $(".friend").each(function () {
      $(this).click(function () {

        console.log($(this))
        console.log($(this).offset())
        if ($(this).offset().top != 0) {
          var childOffset = $(this).offset();
          var parentOffset = $(this).parent().parent().offset();

          var childTop = childOffset.top - parentOffset.top;
          var clone = $(this).find('img').eq(0).clone();
          var top = childTop + 12 + "px";

          $(clone).css({ 'top': top }).addClass("floatingImg").appendTo("#chatbox");

          setTimeout(function () { $("#profile p").addClass("animate"); $("#profile").addClass("animate"); }, 100);
          setTimeout(function () {
            $("#chat-messages").addClass("animate");
            $('.cx, .cy').addClass('s1');
            setTimeout(function () { $('.cx, .cy').addClass('s2'); }, 100);
            setTimeout(function () { $('.cx, .cy').addClass('s3'); }, 200);
          }, 150);

          $('.floatingImg').animate({
            'width': "68px",
            'left': '108px',
            'top': '20px'
          }, 200);

          var name = $(this).find("p strong").html();
          var email = $(this).find("p span").html();
          $("#profile p").html(name);
          $("#profile span").html(email);

          $(".message").not(".right").find("img").attr("[src]", $(clone).attr("[src]"));
          $('#friendslist').fadeOut();
          $('#chatview').fadeIn();


          $('#close').unbind("click").click(function () {
            $("#chat-messages, #profile, #profile p").removeClass("animate");
            $('.cx, .cy').removeClass("s1 s2 s3");
            $('.floatingImg').animate({
              'width': "40px",
              'top': top,
              'left': '12px'
            }, 200, function () { $('.floatingImg').remove() });

            setTimeout(function () {
              $('#chatview').fadeOut();
              $('#friendslist').fadeIn();
            }, 50);
          });

        }
      });

    });
  }



  vuenotif(notifn: any) {
    $('.showwweing').on('hide.dropdown', function () {
      return false;
    });
    // console.log(notifn)
    firebase.database().ref('/Notifications').child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (notifn.body == child.val().body) {
          firebase.database().ref('/Notifications').child(firebase.auth().currentUser.uid).child(child.key).update({
            show: true
          })
        }
      })
    })
  }

  showapp(gotoo: any) {
    if (gotoo == "messaaggee") {
      $("#messaaggee").click();
    }
    if (gotoo == "cours") {
      $("#cours").click();
    }
    if (gotoo == "formationn") {
      $("#formationn").click();
    }
    if (gotoo == "evenement") {
      $("#evenement").click();
    }
    if (gotoo == "inscription") {
      $("#inscription").click();
    }

  }
  search($event) {
    if (this.isAuth == true) {
      let q = $event.target.value
      this.startAt.next(q)
      this.endAt.next(q + "\uf8ff")
      if (q.length != 0) {
        this.recherche.getForma(this.startAt, this.endAt).subscribe((rechercheformats: any) => this.rechercheformats = rechercheformats)
        this.recherche.getEvent(this.startAt, this.endAt).subscribe((recherchesevents: any) => this.recherchesevents = recherchesevents)


        this.recherche.getCourLAI1(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouurssslai1 = recherchescouursss)
        this.recherche.getCourLAI2(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouurssslai2 = recherchescouursss)
        this.recherche.getCourLAI3(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouurssslai3 = recherchescouursss)


        this.recherche.getCourLFI1(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouurssslfi1 = recherchescouursss)
        this.recherche.getCourLFI2(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouurssslfi2 = recherchescouursss)
        this.recherche.getCourLFI3(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouurssslfi3 = recherchescouursss)


        this.recherche.getCourARS1(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssars1 = recherchescouursss)
        this.recherche.getCourARS2(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssars2 = recherchescouursss)
        this.recherche.getCourARS3(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssars3 = recherchescouursss)

        this.recherche.getCourMPASSR1(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssMPASSR1 = recherchescouursss)
        this.recherche.getCourMPASSR2(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssMPASSR2 = recherchescouursss)

        this.recherche.getCourMPTSD1(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssMPTSD1 = recherchescouursss)
        this.recherche.getCourMPTSD2(this.startAt, this.endAt).subscribe((recherchescouursss: any) => this.recherchescouursssMPTSD2 = recherchescouursss)


      }

    }
  }

  vue2() {




    $(document).ready(function () {
      var preloadbg = document.createElement("img");
      preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
      lunch()
      $(".chatboxxxx").click(this.vue2)
      function lunch() {

        $(".friend").each(function () {

          $(this).on('click', function () {


            console.log($(this))
            console.log($(this).offset())
            if ($(this).offset().top != 0) {

              var childOffset = $(this).offset();
              var parentOffset = $(this).parent().parent().offset();

              var childTop = childOffset.top - parentOffset.top;
              var clone = $(this).find('img').eq(0).clone();
              var top = childTop + 12 + "px";

              $(clone).css({ 'top': top }).addClass("floatingImg").appendTo("#chatbox");

              setTimeout(function () { $("#profile p").addClass("animate"); $("#profile").addClass("animate"); }, 100);
              setTimeout(function () {
                $("#chat-messages").addClass("animate");
                $('.cx, .cy').addClass('s1');
                setTimeout(function () { $('.cx, .cy').addClass('s2'); }, 100);
                setTimeout(function () { $('.cx, .cy').addClass('s3'); }, 200);
              }, 150);

              $('.floatingImg').animate({
                'width': "68px",
                'left': '108px',
                'top': '20px'
              }, 200);

              var name = $(this).find("p strong").html();
              var email = $(this).find("p span").html();
              $("#profile p").html(name);
              $("#profile span").html(email);

              $(".message").not(".right").find("img").attr("[src]", $(clone).attr("[src]"));
              $('#friendslist').fadeOut();
              $('#chatview').fadeIn();


              $('#close').unbind("click").click(function () {
                $("#chat-messages, #profile, #profile p").removeClass("animate");
                $('.cx, .cy').removeClass("s1 s2 s3");
                $('.floatingImg').animate({
                  'width': "40px",
                  'top': top,
                  'left': '12px'
                }, 200, function () { $('.floatingImg').remove() });

                setTimeout(function () {
                  $('#chatview').fadeOut();
                  $('#friendslist').fadeIn();
                }, 50);
              });

            } else {
              $(".friend").each(function () {

                $(this).mouseover(function () {


                  console.log($(this))
                  console.log($(this).offset())
                  if ($(this).offset().top != 0) {

                    var childOffset = $(this).offset();
                    var parentOffset = $(this).parent().parent().offset();

                    var childTop = childOffset.top - parentOffset.top;
                    var clone = $(this).find('img').eq(0).clone();
                    var top = childTop + 12 + "px";

                    $(clone).css({ 'top': top }).addClass("floatingImg").appendTo("#chatbox");

                    setTimeout(function () { $("#profile p").addClass("animate"); $("#profile").addClass("animate"); }, 100);
                    setTimeout(function () {
                      $("#chat-messages").addClass("animate");
                      $('.cx, .cy').addClass('s1');
                      setTimeout(function () { $('.cx, .cy').addClass('s2'); }, 100);
                      setTimeout(function () { $('.cx, .cy').addClass('s3'); }, 200);
                    }, 150);

                    $('.floatingImg').animate({
                      'width': "68px",
                      'left': '108px',
                      'top': '20px'
                    }, 200);

                    var name = $(this).find("p strong").html();
                    var email = $(this).find("p span").html();
                    $("#profile p").html(name);
                    $("#profile span").html(email);

                    $(".message").not(".right").find("img").attr("[src]", $(clone).attr("[src]"));
                    $('#friendslist').fadeOut();
                    $('#chatview').fadeIn();


                    $('#close').unbind("click").click(function () {
                      $("#chat-messages, #profile, #profile p").removeClass("animate");
                      $('.cx, .cy').removeClass("s1 s2 s3");
                      $('.floatingImg').animate({
                        'width': "40px",
                        'top': top,
                        'left': '12px'
                      }, 200, function () { $('.floatingImg').remove() });

                      setTimeout(function () {
                        $('#chatview').fadeOut();
                        $('#friendslist').fadeIn();
                      }, 50);
                    });

                  }
                  document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
                  $(".friend").each(function () {
                    $(this).unbind("mouseover")
                  })
                });


              });
              lunch()

            }

          });

        });
      }
    });


    $('.showbadggeee').hide();

  }






  ngOnInit() {

    //----------------------------------------------------------------------------------
    $(document).ready(function () {

      $("#searchid").keyup(function () {
        $("#search-result").find('li').hide();
      })



    })
    //---------------------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------
    $(document).ready(function () {
      document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    })
    //--------------------------------------------------------------------------------


    $(function () {
      $("#allchat").attr('hidden')
      $("#chatbox").hide()
      $(".showbadggeee").hide()

      $('#chatboxxxx').on('click', function (event) {
        $("#chatbox").slideToggle('slow')
      });

      $('.dropdown-menu').on('click', function (event) {
        event.stopPropagation();
      });



    });







    this.message = this.messagingService.currentMessage
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });


    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          firebase.database().ref('/Notifications').child(firebase.auth().currentUser.uid).orderByChild("time").on('value', (snapshot) => {
            this.notifnew = []
            this.notif = []
            this.nbnewnotif = 0

            snapshot.forEach((childddd) => {
              //console.log(childddd.val())
              if (childddd.val().show == false) {
                this.notifnew.push(
                  childddd.val()
                )
                this.nbnewnotif = this.nbnewnotif + 1
              }
              if (childddd.val().show == true) {
                this.notif.push(
                  childddd.val()
                )
              }
            })
            if (this.nbnewnotif != 0) {
              $('.showbadgge').show()
            } else {
              $('.showbadgge').hide()
            }

            //console.log(this.nbnewnotif)
            //console.log(this.notifnew)
            //console.log(this.notif)
          })
          //----------------------------------------------------------------------------------


          this.etudientService.getEtudient(firebase.auth().currentUser.uid).then(
            (etudient: Etudient) => {
              this.etudient = etudient;
              //console.log(this.etudient); 
            }
          );
          this.enseignantservice.getenseignant(firebase.auth().currentUser.uid).then(
            (enseignant: Enseignant) => {
              this.enseignant = enseignant;
              //console.log(this.etudient); 
            }
          );
          this.etudconn = false

          firebase.database().ref('/Etudients').on('value', (snapshot) => {
            snapshot.forEach((child) => {
              if (child.key == firebase.auth().currentUser.uid) {
                $("#allchat").removeAttr('hidden')
                $("#chatboxxxx").show()
                $(".showbadggeee").show()

              }
              //console.log(child.val())
            })
            // console.log(this.etudients)
          })
          firebase.database().ref('/Enseignants').on('value', (snapshot) => {
            snapshot.forEach((child) => {
              if (child.key == firebase.auth().currentUser.uid) {
                $("#allchat").removeAttr('hidden')
                $("#chatboxxxx").show()
                $(".showbadggeee").show()
              }
              //console.log(child.val())

            })
            // console.log(this.enseignants)
          })


          var etensss = ""




          this.showens = false

          firebase.database().ref('/Etudients').on('value', (snapshot) => {
            this.etudients = []
            var s = 0
            var ok: boolean
            snapshot.forEach((chiiiiiiild) => {
              if (chiiiiiiild.key != firebase.auth().currentUser.uid) {
                this.etudients.push(
                  chiiiiiiild.val()
                )

                this.etudients[s].num = s
                this.etudients[s].uidu = chiiiiiiild.key

                firebase.database().ref('/Etudients').child(chiiiiiiild.key).child('Room').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
                  ok = false
                  snapshot.forEach((child) => {

                    if (child.val().showwww == false && child.val().messageenv != undefined) {
                      ok = true
                    }
                  })
                  // console.log(ok)
                })
                if (ok == true) {
                  this.etudients[s].unred = "chatmsgunread"
                } else {
                  this.etudients[s].unred = "readed"
                }
                s++
              }


            })

            //console.log(this.etudients)
          })
          firebase.database().ref('/Enseignants').on('value', (snapshot) => {
            this.enseignants = []
            var s = 0
            var ok: boolean
            snapshot.forEach((chiiiiiiild) => {

              if (chiiiiiiild.key != firebase.auth().currentUser.uid) {
                this.enseignants.push(
                  chiiiiiiild.val()
                )

                this.enseignants[s].num = s
                this.enseignants[s].uidu = chiiiiiiild.key
                firebase.database().ref('/Enseignants').child(chiiiiiiild.key).child('Room').child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
                  ok = false
                  snapshot.forEach((child) => {
                    //console.log(child.val().messageenv)

                    if (child.val().showwww == false && child.val().messageenv != undefined) {
                      ok = true
                    }
                  })
                  //console.log(ok)
                })
                if (ok == true) {
                  this.enseignants[s].unred = "chatmsgunread"
                } else {
                  this.enseignants[s].unred = "readed"
                }
                s++
              }
            })
            //console.log(this.enseignants)
          })



          //---------------------------------------------ennss-----------------------------------------------------------

          //---------------------------------------------------------------------------------------------------------












          var etens = ""
          firebase.database().ref('/Etudients').on('value', (snapshot) => {
            if (snapshot.hasChild(firebase.auth().currentUser.uid) == true) {
              etens = "/Etudients"
            }

            firebase.database().ref('/Enseignants').on('value', (snapshot) => {
              if (snapshot.hasChild(firebase.auth().currentUser.uid) == true) {
                etens = "/Enseignants"
              }
              firebase.database().ref('/Admin').on('value', (snapshot) => {
                if (snapshot.hasChild(firebase.auth().currentUser.uid) == true) {
                  etens = "/Admin"
                }
                firebase.database().ref(etens).child(firebase.auth().currentUser.uid).child("Room").on('value', (snapshot) => {
                  this.nbmesgcam = 0

                  snapshot.forEach((chiiild) => {
                    firebase.database().ref(etens).child(firebase.auth().currentUser.uid).child("Room").child(chiiild.key).on('value', (snapshot) => {
                      snapshot.forEach((child) => {
                        //console.log(child.val().showwww)

                        if (child.val().showwww == false && child.val().messagerecu != undefined) {
                          this.nbmesgcam = this.nbmesgcam + 1
                        }
                      })






                    })
                  })

                  //console.log(this.nbmesgcam)
                  if (this.nbmesgcam != 0) {
                    $('.showbadggeee').show()
                  } else {
                    $('.showbadggeee').hide()
                  }
                })
              })
            })
          })



          //console.log(this.nbmesgcam)


          //---------------------------------------------------------------------------


          //----------------------------------------------------------------------------
        } else {
          this.isAuth = false;
          $("#allchat").attr('hidden')
          $("#chatboxxxx").hide()
          $(".showbadggeee").hide()
          $("#chatbox").hide()
        }
      }
    );
    this.initForm();

    //--------------------------------------------------------------


  }

  onSignOut() {
    $("#allchat").attr('hidden')
    $("#chatboxxxx").hide()
    $(".showbadggeee").hide()
    $("#chatbox").hide()
    this.authService.signOutUser();
    firebase.database().ref('/Admin').once('value', (snapshot) => {
      snapshot.forEach((chilld) => {
        if (chilld.key == firebase.auth().currentUser.uid) {
          firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).update({
            enligne: false
          })
        }
      })
    })
    firebase.database().ref('/Etudients').once('value', (snapshot) => {
      snapshot.forEach((chilld) => {
        if (chilld.key == firebase.auth().currentUser.uid) {
          firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
            enligne: false
          })
        }
      })
    })
    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((chilld) => {
        if (chilld.key == firebase.auth().currentUser.uid) {
          firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
            enligne: false
          })
        }
      })
    })



  }
  initForm() {

    this.signInForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]

    });
    this.Formchat = this.formBuilder.group({
      textchat: ['', [Validators.required]]

    });

  }

  sendmessage() {
    this.vue2()
    const textchat = this.Formchat.get('textchat').value;
    firebase.database().ref('/Etudients').once('value', (snapshot) => {
      snapshot.forEach((chilld) => {
        if (chilld.key == firebase.auth().currentUser.uid) {
          firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).push({
            messageenv: textchat,
            photo: this.etudient.photo,
            showwww: false
          })


          firebase.database().ref('/Enseignants').once('value', (snapshot) => {
            snapshot.forEach((chilld) => {
              if (this.etuduid == chilld.key) {
                firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).push({
                  messagerecu: textchat,
                  photo: this.etudient.photo,
                  showwww: false
                })
              }
            })
          })

          firebase.database().ref('/Etudients').once('value', (snapshot) => {
            snapshot.forEach((chilld) => {
              if (this.etuduid == chilld.key) {
                firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).push({
                  messagerecu: textchat,
                  photo: this.etudient.photo,
                  showwww: false
                })
              }
            })
          })
        }
      })
    })
    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((chilld) => {
        if (chilld.key == firebase.auth().currentUser.uid) {
          firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).push({
            messageenv: textchat,
            photo: this.enseignant.photo,
            showwww: false
          })


          firebase.database().ref('/Enseignants').once('value', (snapshot) => {
            snapshot.forEach((chilld) => {
              if (this.etuduid == chilld.key) {
                firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).push({
                  messagerecu: textchat,
                  photo: this.enseignant.photo,
                  showwww: false
                })
              }
            })
          })

          firebase.database().ref('/Etudients').once('value', (snapshot) => {
            snapshot.forEach((chilld) => {
              if (this.etuduid == chilld.key) {
                firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).push({
                  messagerecu: textchat,
                  photo: this.enseignant.photo,
                  showwww: false
                })
              }
            })
          })
        }



      })


    })




    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;



    this.Formchat.reset();
  }

  shomessage(utillistauer: any) {
    //---------------------------------------------------------------------------------------------------
    this.vue2()
    //----------------------------------etd-----------------------------------------------------------------------
    var etens = ""
    this.etuduid = utillistauer.uidu
    firebase.database().ref('/Etudients').on('value', (snapshot) => {
      $(document).ready(function () {
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
      })
      if (snapshot.hasChild(firebase.auth().currentUser.uid) == true) {
        etens = "/Etudients"
      }

      firebase.database().ref('/Enseignants').on('value', (snapshot) => {
        if (snapshot.hasChild(firebase.auth().currentUser.uid) == true) {
          etens = "/Enseignants"
        }



        firebase.database().ref(etens).child(firebase.auth().currentUser.uid).child("Room").child(utillistauer.uidu).on('value', (snapshot) => {
          this.messageshow = []
          snapshot.forEach((childe) => {

            this.messageshow.push(
              childe.val()
            )
          })
        })



      })
    })





    if (this.etuduid != undefined) {
      firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).once('value', (snapshot) => {
        snapshot.forEach((childdd) => {
          if (childdd.val().messagerecu != undefined) {
            firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).child(childdd.key).update({
              showwww: true
            })
            firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })


                }
              })

            })
            firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })


                }
              })

            })
          }
        })

      })

    }

    //----------------------------------------ense--------------------------------------------

    if (this.etuduid != undefined) {

      firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).once('value', (snapshot) => {
        snapshot.forEach((childdd) => {
          //console.log(childdd.val().messagerecu)
          if (childdd.val().messagerecu != undefined) {
            firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).child("Room").child(this.etuduid).child(childdd.key).update({
              showwww: true
            })


            firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Enseignants').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })


                }
              })
            })
            firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              snapshot.forEach((chilllddd) => {
                if (chilllddd.val().messageenv != undefined) {
                  firebase.database().ref('/Etudients').child(this.etuduid).child("Room").child(firebase.auth().currentUser.uid).child(chilllddd.key).update({
                    showwww: true
                  })


                }
              })
            })
          }

        })

      })
    }

  }

  onSubmit() {

    const email = this.signInForm.get('email').value;

    const password = this.signInForm.get('password').value;
    /*--------------------------------Ensegnant----------------------------------*/
    firebase.database().ref('/Enseignants').once('value', (snapshot) => {
      snapshot.forEach((childd) => {
        if (childd.val().email == email) {
          this.uidutilis = childd.key
          firebase.database().ref('/Enseignants').child(this.uidutilis).once('value', (snapshot) => {
            if (snapshot.val().valideinscri == true) {
              this.authService.signInUser(email, password).then(
                () => {
                  this.authService.whoisit(firebase.auth().currentUser.email).then(
                    (iset) => {
                      if (iset == "enseignant") {

                        this.router.navigate(['/Enseigantesp']);
                        this.signInForm.reset();
                        $("#elegantModalForm").modal("hide");
                        firebase.database().ref('/Enseignants').child(firebase.auth().currentUser.uid).update({
                          enligne: true
                        })

                      }

                    })
                },

                (error) => {

                  this.errorMessage = error;

                }

              );

            } else {
              this.errorMessage = "Inscription une autre fois";
            }
          });

        }
      })


    });
    //------------------------Etudients------------------------
    firebase.database().ref('/Etudients').once('value', (snapshot) => {
      snapshot.forEach((childd) => {
        if (childd.val().email == email) {
          this.uidutilis = childd.key
          firebase.database().ref('/Etudients').child(this.uidutilis).once('value', (snapshot) => {
            if (snapshot.val().valideinscri == true) {
              this.authService.signInUser(email, password).then(
                () => {
                  this.authService.whoisit(firebase.auth().currentUser.email).then(
                    (iset) => {
                      if (iset == "etudient") {

                        this.router.navigate(['/Etudiantesp']);
                        this.signInForm.reset();
                        $("#elegantModalForm").modal("hide");
                        firebase.database().ref('/Etudients').child(firebase.auth().currentUser.uid).update({
                          enligne: true
                        })
                      }
                    })
                },

                (error) => {

                  this.errorMessage = error;

                }

              );

            } else {
              this.errorMessage = "Inscription une autre fois";
            }
          });
        }
      })


    });
    //--------------------Admin-----------------
    firebase.database().ref('/Admin').once('value', (snapshot) => {
      snapshot.forEach((childd) => {
        if (childd.val().email == email) {
          this.uidutilis = childd.key
          firebase.database().ref('/Admin').child(this.uidutilis).once('value', (snapshot) => {
            if (snapshot.val().valideinscri == "true") {
              this.authService.signInUser(email, password).then(
                () => {
                  this.authService.whoisit(firebase.auth().currentUser.email).then(
                    (iset) => {
                      if (iset == "admin") {
                        this.router.navigate(['/Adminesp']);
                        this.signInForm.reset();
                        $("#elegantModalForm").modal("hide");
                        firebase.database().ref('/Admin').child(firebase.auth().currentUser.uid).update({
                          enligne: true
                        })
                      }
                    })
                },

                (error) => {

                  this.errorMessage = error;

                }

              );
            } else {
              this.errorMessage = "Inscription une autre fois";
            }


          });
        }
      })


    });



  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };


  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Accueil';
  }


  //----------------------------------------------------------------------------


};

