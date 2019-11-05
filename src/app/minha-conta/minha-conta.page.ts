import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserDataService } from './../services/user-data.service';
import { dadosUsuario } from './../interfaces/dadosUsuario';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {

  public profilePic: string;
  public nomeAe: string;
  private dadosUsuarioSubscription: Subscription;
  private dadosUsuario:dadosUsuario;
  private idUsuario: string = this.AuthService.getUserId();

  constructor(
    private svs: AuthService,
    private heehee: AlertController,
    private dadosUsuarioService: UserDataService,
    private AuthService: AuthService
  ) {
    this.dadosUsuarioSubscription = this.dadosUsuarioService.getUserData(this.idUsuario).subscribe(data => {
      this.dadosUsuario = data as dadosUsuario;
    })
  }

  ngOnInit() {
    this.profilePic = 'https://pbs.twimg.com/media/DhYu-gBW4AAzAVI.jpg';
    this.nomeAe = 'Jacaré Sorrindo';
  }

  profilePicImg() {
    return this.profilePic;
  }

  async presentAlert(header, buttons, subHeader?, message?) {
    const alert = await this.heehee.create({
      header,
      subHeader,
      message,
      buttons
    });

    await alert.present();
  }

  async sair() {
    this.svs.logout();
    await this.presentAlert('Logout', ['Ok'], '', 'Deslogado com sucesso!')
  }

}
