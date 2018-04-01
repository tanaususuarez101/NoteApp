import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';




/**
 * Generated class for the ViewNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: DatabaseProvider
              ) {
  }

  ionViewDidLoad() {
    this.database.initialDataBase();
  }
  create(){
    this.database.createNote('nota 1','asdasdasdads').then(data =>{
      console.log(data);
    });
  }
  get(){
    this.database.getAllNotes().then(data =>{
      console.log(data);
    });
  }
}
