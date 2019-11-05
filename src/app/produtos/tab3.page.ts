import { Component } from '@angular/core';
import { product } from '../interfaces/product';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private product: product = {};
  private loading: any;
  private productId: string = null;
  private productSubscription: Subscription;
  
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController

  ) {
    this.productId = this.activeRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() { }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  async saveProduct() {
    await this.presentLoading();

    this.product.userId = this.authService.getAuth().currentUser.uid;

    if (this.productId) {

    } else {
      this.product.createdAt = new Date().getTime();

      try {
        await this.productService.addProduct(this.product);
        await this.loading.dismiss();

        //this.navCtrl.navigateBack();
      }
      catch (error) {
        this.presentToast('erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}

