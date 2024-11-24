export let bob: string;

function init() {
  setTimeout(() => (bob = 'fuck you'), 3000);
}

init();
