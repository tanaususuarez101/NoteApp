import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private database: SQLiteObject;
  private isOpen:boolean;
  constructor(public sqlite: SQLite) {

    //Si se descomenta el create peta

  }

  initialDataBase(){
    if(this.database == null){
      this.sqlite = new SQLite();
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT, namne TEXT, comment TEXT)',[])
          .then(()=>console.log("Base de datos y Tabla notas creada"));
        this.isOpen=true;
      });
    }
  }

  createNote(name: string, comment: string){
    return new Promise((resolve,reject)=> {
      let sql = 'INSERT INTO notes(title, comment) VALUES(?,?)';
      this.database.executeSql(sql,[name,comment]).then(data => {
        resolve(data);
      },(error)=>{
        reject(error);
      });
    });
  }
  getAllNotes(){
    return new Promise((resolve,reject)=>{
      this.database.executeSql('SELECT * FROM PAGES',[]).then(data =>{
        let noteList=[];
        if(data.rows.length > 0){
          for (var i = 0; i < data.rows.length; i++){
            noteList.push({
              name: data.rows.item(i).title,
              comment: data.rows.item(i).comment
              }
            );
          }
        }
        resolve(noteList)
      },(error)=>{
        reject(error);
      });

    });
  }



}
