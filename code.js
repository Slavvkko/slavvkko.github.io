window.addEventListener('DOMContentLoaded', () => {
  // Check to see if the API is supported.
  if ('getInstalledRelatedApps' in navigator) {
    check();
  } else {
    document.getElementById('status').innerText = "getInstalledRelatedApps not supported";
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

const btnAdd = document.getElementById('prompt');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log(e);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      alert('User accepted the A2HS prompt');
    } else {
      alert('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});