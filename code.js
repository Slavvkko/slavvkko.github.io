const status = document.getElementById('status');

window.addEventListener('DOMContentLoaded', () => {
  // Check to see if the API is supported.
  if ('getInstalledRelatedApps' in navigator) {
    check();
  } else {
    status.innerText = "getInstalledRelatedApps not supported";
  }
});

function check() {
  navigator.getInstalledRelatedApps().then((apps) => {
    const installed = apps.some((app) => app.platform === "play" && app.id === "com.pitchbook.mobile")
    if (installed) {
      status.innerText = "Installed";
    } else {
      status.innerText = "Not Installed";
    }
  });
}