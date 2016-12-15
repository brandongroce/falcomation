import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mode: Object;
  tabMap: Object = {
    't0-0':{
      mode:"iceland",
      title:"Iceland",
      titleTxt:"The Land of Fire and Ice",
      description:"Iceland is also the land of light and darkness. Long summer days with nearly 24-hours of sunshine are offset by short winter days with only few hours of daylight.",
      bgImage:"greenland.jpg",
      hues:"blue, amber, red",
      playlist:"MK Iceland",
      video:"Iceland Phantom"
    },
    't0-1':{
      mode:'space',
      title:"Space",
      titleTxt:"The Final Frontier",
      description:"So I sit and watch and yearn for what I cannot have, to try and touch the infinite in you, what seems so close yet so far beyond my reach. ",
      hues:"blue, purple",
      playlist:"I'm in Space",
      video:"Space in 4k",
      bgImage:"milkysky.jpg"
    },
    't0-2':{
      mode:'sleep',
      title:"Sleep",
      titleTxt:"zzzzZZZzzZ ZzzZZ",
      description:"Now I see the secret of making the best person: it is to grow in the open air and to eat and sleep with the earth.",
      hues:"blue-violet",
      playlist:"Jonn Serrie",
      video:"Counting Sheep",
      bgImage:"sleep1.jpg"
    },
    't0-3':{
      mode:'xoxo',
      title:"XOXO",
      titleTxt:"(Swoon)",
      description:"I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
      hues:"red, pink, violet",
      playlist:"Hay Rollin'",
      video:'Our personal adventures...',
      bgImage:"love.jpg"
    },
    't0-4':{
      mode:'bali',
      title:"Bali",
      titleTxt:"How I love thee",
      description:"Let me count the ways: Villas, Sunshine, Friends, Pools, Beaches, Oceans, Bike Rides... thats 7.  Clothing Optional.",
      hues:"aqua, green, orange",
      playlist:"Tibetian Singing Bowls",
      video:"Our Villa in Ubud",
      bgImage:"bali1.jpg"
    }
  }
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.mode = this.tabMap[navCtrl.id];
  }

  startMode(mode:String){
    console.log(mode);
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
