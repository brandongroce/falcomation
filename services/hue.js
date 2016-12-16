var hue = require('node-hue-api');

var hostname = '10.0.1.2',
    username = 'RS6pxsgc1Gy3EIxBi99g2CYbvJXn6ed6XqOIjO8H';

exports.HueService = class HueService {

    constructor(){
      this.api = new hue.HueApi(hostname, username);
      this.api.config().then(this.displayResult).done();
    }

    startLightMode(mode){
      this.mode = mode;
      this.api.lights()
          .then(this.updateLights.bind(this))
          .done();
    }

    displayResult(result) {
        console.log(JSON.stringify(result, null, 2));
    }

    updateLights(lights){
      lights = lights.lights;
      console.log('Lights: ', lights);
      var mycolors = this.mode.hues;
      var states = [];
      for(var i =0; i < lights.length;i++){

          //states[i] = hue.lightState.create().turnOff().turnOn().effect('colorloop');
          states[i] = hue.lightState.create().turnOff();
          states[i] = hue.lightState.create().turnOn().rgb(mycolors[i]);
          // states[i] = hue.lightState.create().turnOff().turnOn().effect('colorloop');
          this.api.setLightState(lights[i].id, states[i])
              .then(this.displayResult).done();

          // api.setLightState(lights[i].id, hue.lightState.create().off());
      }
    }
};
