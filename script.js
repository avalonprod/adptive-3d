// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);








function setAnimation() {
  const modelViewer = document.querySelector('model-viewer');
  
  modelViewer.setAttribute('animation-name', 'ArmatureAction');
  

}

async function playHotspotAnim(animationName) {
  if (isAnimating) return;  // Ignore button clicks if an animation is in progress
  isAnimating = true;  // Set isAnimating to true when an animation starts
  
  const modelViewer = document.querySelector('model-viewer');
  console.log(modelViewer.availableAnimations);
  
  

  modelViewer.setAttribute('animation-name', animationName);

  await modelViewer.updateComplete;
  modelViewer.play({ repetitions: 1 });

  // When the animation finishes
  modelViewer.addEventListener("finished", (ev) => {
    console.log('animation finished');
    isAnimating = false;  // Set isAnimating to false when the animation finishes
  });


}


let animState = 'legPress';  // Default state
let isAnimating = false;  // Variable to track whether an animation is in progress

async function playAnim(targetState) {
  if (isAnimating) return;  // Ignore button clicks if an animation is in progress
  isAnimating = true;  // Set isAnimating to true when an animation starts
  
  const modelViewer = document.querySelector('model-viewer');
  console.log(modelViewer.availableAnimations);
  
  // Determine the animation to play based on the target state and current state
  let animationName;
  if (targetState === 'hackSquat') {
    animationName = animState === 'hackSquat' ? 'HackSquatActual' : 'ArmatureAction';
  } else if (targetState === 'legPress') {
    animationName = animState === 'hackSquat' ? 'SquatToLegPress' : 'LegPress';
  }
  modelViewer.setAttribute('animation-name', animationName);
  animState = targetState;  // Update animState to the new state

  console.log('state is ' + animState);
  console.log('anim is ' + modelViewer.animationName);
  
  // Await any asynchronous updates before playing the animation
  await modelViewer.updateComplete;

  // Play the animation once
  modelViewer.play({ repetitions: 1 });

  // When the animation finishes
  modelViewer.addEventListener("finished", (ev) => {
    console.log('animation finished');
    isAnimating = false;  // Set isAnimating to false when the animation finishes
  });
}

// Bind the playAnim function to button clicks, passing the target state as an argument
document.getElementById('hackSquatButton').addEventListener('click', () => playAnim('hackSquat'));
document.getElementById('legPressButton').addEventListener('click', () => playAnim('legPress'));

document.querySelectorAll('.Hotspot').forEach(hotspot => {
  hotspot.addEventListener('click', function() {
    const slotValue = this.getAttribute('slot');
  

    // Check slot value and run respective functions
    if (!this.classList.contains('active')) {
      if (slotValue === 'hotspot-6') {
        console.log('anim state is ' + animState);
        if (animState === 'hackSquat') {
          console.log('playing hacksquat anim because state is ' + animState);
          playHotspotAnim('HackSquatAdjust');
        } else {
          playHotspotAnim('LegPressAdjust');
          ('playing legpress anim because state is ' + animState);
        }
        console.log(1);
      } else {
        console.log(2);
      }

      
    }
    // Existing functionality
    this.classList.toggle('active');
  });
});




document.getElementById('hackSquatButton').addEventListener('click', playAnimHackSquat);


document.getElementById('legPressButton').addEventListener('click', playAnimLegPress);


function changeVariant(color) {
  const modelViewer = document.getElementById('modelViewer');


  switch (color) {
      case 'Black':
          modelViewer.variantName = 'Default';
          console.log(modelViewer.variantName);
          console.log('black');
          break;
      case 'White':
          modelViewer.variantName = 'White';
          break;
      case 'Blue':
          modelViewer.variantName = 'Blue';
          break;
      case 'Grey':
          modelViewer.variantName = 'Grey';
          break;
      case 'Yellow':
          modelViewer.variantName = 'Yellow';
          break;
      case 'Red':
          modelViewer.variantName = 'Red';
          break;
      case 'Green':
          modelViewer.variantName = 'Green';
          break;
      case 'Purple':
          modelViewer.variantName = 'Purple';
          break;
      default:
          console.error('Unknown color variant:', color);
  }
}

