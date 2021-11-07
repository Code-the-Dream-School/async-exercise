function sleepWithCallbacks() {
  console.log("starts here");
  setTimeout(() => {
    console.log("after first sleep");
    setTimeout(() => {
      console.log("after second sleep");
      setTimeout(() => {
        console.log("after third sleep");
      }, 1000);
    }, 1000);
  }, 1000);
  console.log("ready to sleep");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function sleepWithThen() {
  console.log("starts here (2)");
  sleep(1000)
    .then(() => {
      console.log("after the first sleep (2)");
      return sleep(1000);
    })
    .then(() => {
      console.log("after the second sleep (2)");
      return sleep(1000);
    })
    .then(() => {
      console.log("after the third sleep (2)");
    });
  console.log("ready to sleep (2)");
}

async function sleepWithAwait() {
  console.log("starts here (3)");
  await sleep(1000);
  console.log("after the first sleep (3)");
  await sleep(1000);
  console.log("after the second sleep (3)");
  await sleep(1000);
  console.log("after the third sleep (3)");
  console.log("ready to sleep (3)");
}

sleepWithCallbacks();

sleepWithThen();

sleepWithAwait();

console.log("When do we get here?");