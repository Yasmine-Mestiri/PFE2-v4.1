import { Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyC0KVikNY9KxB5vQzI0lDWEgpKQhBUlhLo",
      authDomain: "basetest-5e577.firebaseapp.com",
      databaseURL: "https://basetest-5e577.firebaseio.com",
      projectId: "basetest-5e577",
      storageBucket: "basetest-5e577.appspot.com",
      messagingSenderId: "646943490296"
    };
    firebase.initializeApp(config);
  }

}
