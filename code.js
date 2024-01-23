window.addEventListener('DOMContentLoaded', () => {
  // Check to see if the API is supported.
  if ('getInstalledRelatedApps' in navigator) {
    check();
  } else {
    document.getElementById('notSupported').classList.remove('hidden');
  }
});

function check() {
  navigator.getInstalledRelatedApps().then((apps) => {
    const installed = apps.some((app) => app.platform === "play" && app.id === "com.pitchbook.mobile")
    if (installed) {
      document.getElementById('status').innerText = "Installed";
    } else {
      document.getElementById('status').innerText = "Not Installed";
    }
  });
}