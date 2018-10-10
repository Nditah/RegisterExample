import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { User } from '../../_models/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  signUp(user){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    .then(credential=>{
      this.updateUserData(credential.user, user.displayName);
    })
    .catch(error=> console.log("註冊失敗:",error));
  }

  signOut(){
    return this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/']);
    });
  }

  private updateUserData(user, displayName){
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`)
    const data:User = {
      email: user.email,
      displayName: displayName
    }
    return userRef.set(data);
  }
}
