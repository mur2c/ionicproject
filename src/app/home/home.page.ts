import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from  '@angular/fire/auth';
import { Item } from 'src/app/auth/item.model';
import { TaskI } from '../auth/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isAuthenticated: boolean;
  items: Observable<any>;      //import model Item
  todos: Observable<TaskI[]>;
  userId: string;

  //Prepare the document object for firebase snapShotChanges
  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
}
  
    constructor(private router: Router, private authService: AuthService, private db: AngularFirestore , private itemservice: ItemService, private afAuth: AngularFireAuth) {}

    ngOnInit() {
      
      this.itemservice.getTodos().subscribe((todos) =>{
  //      console.log('todoss', todos);
        this.todos = todos;
      })    
    }
    
    onLogout() {
      this.router.navigate(['/login']);
      this.isAuthenticated = false;
    }

    gotoConfig() {
      this.router.navigate(['/config']);
    }

    onRemove(idTask:string){
      this.itemservice.removeTodo(idTask);
    }


    
}
