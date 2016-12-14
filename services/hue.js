var hue = require("node-hue-api");

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var hostname = "10.0.1.2",
    username = "RS6pxsgc1Gy3EIxBi99g2CYbvJXn6ed6XqOIjO8H",
    api;

api = new hue.HueApi(hostname, username);

// --------------------------
// Using a promise
api.config().then(displayResult).done();

api.lights()
    .then(updateLights)
    .done();
// Set light state to 'on' with warm white value of 500 and brightness set to 100%
function updateLights(lights){
  lights = lights.lights;
  console.log(lights);
  var mycolors = [
    [0, 0, 1],
    [128, 0, 255],
    [0, 0, 255],
    [128, 0, 255],
    [255, 0, 128] // Bloom
  ];
  var states = [];

  for(var i =0; i < lights.length;i++){

      //states[i] = hue.lightState.create().turnOff().turnOn().effect('colorloop');
      // states[i] = hue.lightState.create().turnOff();
      states[i] = hue.lightState.create().turnOn().rgb(mycolors[i]);
      // states[i] = hue.lightState.create().turnOff().turnOn().effect('colorloop');
      api.setLightState(lights[i].id, states[i])
          .then(displayResult).done();

      // api.setLightState(lights[i].id, hue.lightState.create().off());
  }
}
exports.hueapi = api;
exports.updateLights = updateLights;
