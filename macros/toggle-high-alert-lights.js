/*
Toggle an high alert-like colo(u)r and animation on the lights whose
`kels-utilities.alertable` flag is defined.

This macro works in tandem with the `toggle-alertable-light-type.js` macro.
*/

let colorAlert = "#FF0000";
let animationTypeAlert = "witchwave";
let animationSpeedAlert = 1;
let animationIntensityAlert = 5;

for (let child of game.canvas.lighting.objects.children) {
  let moduleName = game.kelsUtilities.Constants.moduleName;
  let document = child.document;
  if (document.getFlag(moduleName, "alertable") != undefined) {
    let animation = document.config.animation;

    if (!document.getFlag(moduleName, "alertable").alert) {
      await document.setFlag(moduleName, "alertable", {
        alert: true,
        color: document.config.color,
        animationType: animation.type,
        animationSpeed: animation.speed,
        animationIntensity: animation.intensity,
      });

      animation.type = animationTypeAlert;
      animation.speed = animationSpeedAlert;
      animation.intensity = animationIntensityAlert;

      await document.update({
        config: {
          color: colorAlert,
          animation: animation,
        },
      });
    } else {
      await document.setFlag(moduleName, "alertable", {
        alert: false,
      });

      let alertable = document.getFlag(moduleName, "alertable");

      animation.type = alertable.animationType;
      animation.speed = alertable.animationSpeed;
      animation.intensity = alertable.animationIntensity;

      await document.update({
        config: {
          color: alertable.color,
          animation: animation,
        },
      });
    }
  }
}
