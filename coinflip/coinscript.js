const coin = document.getElementById('coin');
const flipButton = document.getElementById('flipButton');
let flipped = false;

flipButton.addEventListener('click', () => {
	const isTrue = Math.random() < 0.5;
	const rotation = isTrue ? 1800 : 1980;

  coin.style.transform = `rotateY(${rotation}deg)`;
});
