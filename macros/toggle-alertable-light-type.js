/*
Toggle the `alertable` light type on selected lights, i.e. the
`kels-utilities.alertable` flag is set to `{alert: false}` or unset accordingly.

This macro works in tandem with the `toggle-high-alert-lights.js` macro.
*/

for (let child of game.canvas.lighting.objects.children) {
  if (child.controlled) {
    let moduleName = game.kelsUtilities.Constants.moduleName;
    let document = child.document;
    if (document.getFlag(moduleName, "alertable") == undefined) {
      await document.setFlag(moduleName, "alertable", { alert: false });
    } else {
      await document.unsetFlag(moduleName, "alertable");
    }
  }
}
