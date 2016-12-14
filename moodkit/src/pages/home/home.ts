import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Set your Mood Modes');

    alert.addInput({
      type: 'checkbox',
      label: 'Hue Lighting',
      value: 'hue',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Music Playlist',
      value: 'playlist'
    });


    alert.addInput({
      type: 'checkbox',
      label: 'Video Scenery',
      value: 'video'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
  }
}
