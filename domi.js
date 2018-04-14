function handleDeviceAdded(device, client) {
  console.log(device.Name + " connected");

  console.log("Allowed messages:");
  console.log(device.AllowedMessages);

  if (device.AllowedMessages.indexOf("SingleMotorVibrateCmd") >= 0) {
    const button = document.createElement("button");
    button.innerHTML = "Click to vibrate";
    const body = document.querySelector("body");
    body.appendChild(button);
    button.addEventListener("click", () => {
      const onMsg = new Buttplug.SingleMotorVibrateCmd(0.5);
      client.SendDeviceMessage(device, onMsg);

      // Now we set a timeout for 3 seconds in the future, to stop the device.
      setTimeout(() => {
        const offMsg = new Buttplug.SingleMotorVibrateCmd(0);
        client.SendDeviceMessage(device, offMsg);
      }, 3000);
    });
  }

  // We have connected to a device so stop scanning for more.
  client.StopScanning();
}

function initialiseButtplug() {
  const client = new Buttplug.ButtplugClient("Tutorial Client");

  client.addListener("deviceadded", device => {
    handleDeviceAdded(device, client);
  });

  client.ConnectLocal().then(() => {
    client.StartScanning();
  });
}

const button = document.createElement("button");
button.innerHTML = "Scan for Device";
const body = document.querySelector("body");
body.appendChild(button);
button.addEventListener("click", initialiseButtplug);
