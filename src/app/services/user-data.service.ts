import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { dadosUsuario } from './../interfaces/dadosUsuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private dadosUsuarioCollection: AngularFirestoreCollection<dadosUsuario>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.dadosUsuarioCollection = this.afs.collection<dadosUsuario>('Dados_Usuarios')
   }

  getUserData(idUsuario) {
    return this.dadosUsuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data}
        })
      })
    )
  }

  addUserData(dadosUsuario) {

  }

  updateUserData(idUsuario: string, dadosUsuario: dadosUsuario) {

  }

  alface(idUsuario: string) {
    
  }
}
