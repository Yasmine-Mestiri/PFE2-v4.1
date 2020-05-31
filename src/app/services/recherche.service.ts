import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from '@angular/fire/database'
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class Recherche {

  constructor(private db: AngularFireDatabase) { }
  getEvent(
    start: BehaviorSubject<string>,
    end: BehaviorSubject<string>
    ): Observable<any[]> {
    return Observable.zip(start, end).switchMap(param => {
    return this.db
    .list("/Evénement", ref =>
    ref
    .orderByChild("Nom")
    .limitToFirst(10)
    .startAt(param[0])
    .endAt(param[1])
    )
    .snapshotChanges()
    .map(changes => {
    return changes.map(c => {
    return { key: c.payload.key, ...c.payload.val() };
    });
    });
    });
    }
    getForma(
     
      start: BehaviorSubject<string>,
      end: BehaviorSubject<string>
      ): Observable<any[]> {
      return Observable.zip(start, end).switchMap(param => {
        var  result:any;
        firebase.database().ref('/Enseignants').once('value', (snapshot) => {
          snapshot.forEach((child)=>{
            result =this.db
            .list("/Formations", ref =>
            ref.child(child.key)
            .orderByChild("Libelle")
            .limitToFirst(10)
            .startAt(param[0])
            .endAt(param[1])
            )
            .snapshotChanges()
            .map(changes => {
            return changes.map(c => {
            return { key: c.payload.key, ...c.payload.val() };
            });
            });
          })
        })
      return result
      });
      }

      getCourLAI1(
        start: BehaviorSubject<string>,
        end: BehaviorSubject<string>
        ): Observable<any[]> {
        return Observable.zip(start, end).switchMap(param => {
          var  result:any;
          firebase.database().ref('/Enseignants').on('value', (snapshot) => {
            snapshot.forEach((chiild)=>{
              result=this.db
                    .list("/Cours", ref =>
                    ref.child("LAI").child("Premiére").child(chiild.key)
                    .orderByChild("Matiere")
                    .limitToFirst(10)
                    .startAt(param[0])
                    .endAt(param[1]),
                    )
                    .snapshotChanges()
                    .map(changes => {
                    return changes.map(c => {
                    return { key: c.payload.key, ...c.payload.val() };
                    });
                    });
            })
          })
        return result
          })
        }
       
        getCourLAI2(
          start: BehaviorSubject<string>,
          end: BehaviorSubject<string>
          ): Observable<any[]> {
          return Observable.zip(start, end).switchMap(param => {
            var  result:any;
            firebase.database().ref('/Enseignants').on('value', (snapshot) => {
              snapshot.forEach((chiild)=>{
                result=this.db
                      .list("/Cours", ref =>
                      ref.child("LAI").child("Deuxième").child(chiild.key)
                      .orderByChild("Matiere")
                      .limitToFirst(10)
                      .startAt(param[0])
                      .endAt(param[1]),
                      )
                      .snapshotChanges()
                      .map(changes => {
                      return changes.map(c => {
                      return { key: c.payload.key, ...c.payload.val() };
                      });
                      });
              })
            })
          return result
            })
          }

          getCourLAI3(
            start: BehaviorSubject<string>,
            end: BehaviorSubject<string>
            ): Observable<any[]> {
            return Observable.zip(start, end).switchMap(param => {
              var  result:any;
              firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                snapshot.forEach((chiild)=>{
                  result=this.db
                        .list("/Cours", ref =>
                        ref.child("LAI").child("Troisième").child(chiild.key)
                        .orderByChild("Matiere")
                        .limitToFirst(10)
                        .startAt(param[0])
                        .endAt(param[1]),
                        )
                        .snapshotChanges()
                        .map(changes => {
                        return changes.map(c => {
                        return { key: c.payload.key, ...c.payload.val() };
                        });
                        });
                })
              })
            return result
              })
            }
            
            getCourLFI1(
              start: BehaviorSubject<string>,
              end: BehaviorSubject<string>
              ): Observable<any[]> {
              return Observable.zip(start, end).switchMap(param => {
                var  result:any;
                firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                  snapshot.forEach((chiild)=>{
                    result=this.db
                          .list("/Cours", ref =>
                          ref.child("LFI").child("Premiére").child(chiild.key)
                          .orderByChild("Matiere")
                          .limitToFirst(10)
                          .startAt(param[0])
                          .endAt(param[1]),
                          )
                          .snapshotChanges()
                          .map(changes => {
                          return changes.map(c => {
                          return { key: c.payload.key, ...c.payload.val() };
                          });
                          });
                  })
                })
              return result
                })
              }
             
              getCourLFI2(
                start: BehaviorSubject<string>,
                end: BehaviorSubject<string>
                ): Observable<any[]> {
                return Observable.zip(start, end).switchMap(param => {
                  var  result:any;
                  firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                    snapshot.forEach((chiild)=>{
                      result=this.db
                            .list("/Cours", ref =>
                            ref.child("LFI").child("Deuxième").child(chiild.key)
                            .orderByChild("Matiere")
                            .limitToFirst(10)
                            .startAt(param[0])
                            .endAt(param[1]),
                            )
                            .snapshotChanges()
                            .map(changes => {
                            return changes.map(c => {
                            return { key: c.payload.key, ...c.payload.val() };
                            });
                            });
                    })
                  })
                return result
                  })
                }
      
                getCourLFI3(
                  start: BehaviorSubject<string>,
                  end: BehaviorSubject<string>
                  ): Observable<any[]> {
                  return Observable.zip(start, end).switchMap(param => {
                    var  result:any;
                    firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                      snapshot.forEach((chiild)=>{
                        result=this.db
                              .list("/Cours", ref =>
                              ref.child("LFI").child("Troisième").child(chiild.key)
                              .orderByChild("Matiere")
                              .limitToFirst(10)
                              .startAt(param[0])
                              .endAt(param[1]),
                              )
                              .snapshotChanges()
                              .map(changes => {
                              return changes.map(c => {
                              return { key: c.payload.key, ...c.payload.val() };
                              });
                              });
                      })
                    })
                  return result
                    })
                  }
              

                  getCourARS1(
                    start: BehaviorSubject<string>,
                    end: BehaviorSubject<string>
                    ): Observable<any[]> {
                    return Observable.zip(start, end).switchMap(param => {
                      var  result:any;
                      firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                        snapshot.forEach((chiild)=>{
                          result=this.db
                                .list("/Cours", ref =>
                                ref.child("ARS").child("Premiére").child(chiild.key)
                                .orderByChild("Matiere")
                                .limitToFirst(10)
                                .startAt(param[0])
                                .endAt(param[1]),
                                )
                                .snapshotChanges()
                                .map(changes => {
                                return changes.map(c => {
                                return { key: c.payload.key, ...c.payload.val() };
                                });
                                });
                        })
                      })
                    return result
                      })
                    }
                   
                    getCourARS2(
                      start: BehaviorSubject<string>,
                      end: BehaviorSubject<string>
                      ): Observable<any[]> {
                      return Observable.zip(start, end).switchMap(param => {
                        var  result:any;
                        firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                          snapshot.forEach((chiild)=>{
                            result=this.db
                                  .list("/Cours", ref =>
                                  ref.child("ARS").child("Deuxième").child(chiild.key)
                                  .orderByChild("Matiere")
                                  .limitToFirst(10)
                                  .startAt(param[0])
                                  .endAt(param[1]),
                                  )
                                  .snapshotChanges()
                                  .map(changes => {
                                  return changes.map(c => {
                                  return { key: c.payload.key, ...c.payload.val() };
                                  });
                                  });
                          })
                        })
                      return result
                        })
                      }
            
                      getCourARS3(
                        start: BehaviorSubject<string>,
                        end: BehaviorSubject<string>
                        ): Observable<any[]> {
                        return Observable.zip(start, end).switchMap(param => {
                          var  result:any;
                          firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                            snapshot.forEach((chiild)=>{
                              result=this.db
                                    .list("/Cours", ref =>
                                    ref.child("ARS").child("Troisième").child(chiild.key)
                                    .orderByChild("Matiere")
                                    .limitToFirst(10)
                                    .startAt(param[0])
                                    .endAt(param[1]),
                                    )
                                    .snapshotChanges()
                                    .map(changes => {
                                    return changes.map(c => {
                                    return { key: c.payload.key, ...c.payload.val() };
                                    });
                                    });
                            })
                          })
                        return result
                          })
                        }


                        getCourMPASSR1(
                          start: BehaviorSubject<string>,
                          end: BehaviorSubject<string>
                          ): Observable<any[]> {
                          return Observable.zip(start, end).switchMap(param => {
                            var  result:any;
                            firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                              snapshot.forEach((chiild)=>{
                                result=this.db
                                      .list("/Cours", ref =>
                                      ref.child("MPASSR").child("Premiére").child(chiild.key)
                                      .orderByChild("Matiere")
                                      .limitToFirst(10)
                                      .startAt(param[0])
                                      .endAt(param[1]),
                                      )
                                      .snapshotChanges()
                                      .map(changes => {
                                      return changes.map(c => {
                                      return { key: c.payload.key, ...c.payload.val() };
                                      });
                                      });
                              })
                            })
                          return result
                            })
                          }
                          
                          getCourMPASSR2(
                            start: BehaviorSubject<string>,
                            end: BehaviorSubject<string>
                            ): Observable<any[]> {
                            return Observable.zip(start, end).switchMap(param => {
                              var  result:any;
                              firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                                snapshot.forEach((chiild)=>{
                                  result=this.db
                                        .list("/Cours", ref =>
                                        ref.child("MPASSR").child("Deuxième").child(chiild.key)
                                        .orderByChild("Matiere")
                                        .limitToFirst(10)
                                        .startAt(param[0])
                                        .endAt(param[1]),
                                        )
                                        .snapshotChanges()
                                        .map(changes => {
                                        return changes.map(c => {
                                        return { key: c.payload.key, ...c.payload.val() };
                                        });
                                        });
                                })
                              })
                            return result
                              })
                            }
                            

                            getCourMPTSD1(
                              start: BehaviorSubject<string>,
                              end: BehaviorSubject<string>
                              ): Observable<any[]> {
                              return Observable.zip(start, end).switchMap(param => {
                                var  result:any;
                                firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                                  snapshot.forEach((chiild)=>{
                                    result=this.db
                                          .list("/Cours", ref =>
                                          ref.child("MPTSD").child("Premiére").child(chiild.key)
                                          .orderByChild("Matiere")
                                          .limitToFirst(10)
                                          .startAt(param[0])
                                          .endAt(param[1]),
                                          )
                                          .snapshotChanges()
                                          .map(changes => {
                                          return changes.map(c => {
                                          return { key: c.payload.key, ...c.payload.val() };
                                          });
                                          });
                                  })
                                })
                              return result
                                })
                              }
                              
                              getCourMPTSD2(
                                start: BehaviorSubject<string>,
                                end: BehaviorSubject<string>
                                ): Observable<any[]> {
                                return Observable.zip(start, end).switchMap(param => {
                                  var  result:any;
                                  firebase.database().ref('/Enseignants').on('value', (snapshot) => {
                                    snapshot.forEach((chiild)=>{
                                      result=this.db
                                            .list("/Cours", ref =>
                                            ref.child("MPTSD").child("Deuxième").child(chiild.key)
                                            .orderByChild("Matiere")
                                            .limitToFirst(10)
                                            .startAt(param[0])
                                            .endAt(param[1]),
                                            )
                                            .snapshotChanges()
                                            .map(changes => {
                                            return changes.map(c => {
                                            return { key: c.payload.key, ...c.payload.val() };
                                            });
                                            });
                                    })
                                  })
                                return result
                                  })
                                }
        
        
        
        
        
        
        
        
        }