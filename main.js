document.addEventListener("DOMContentLoaded", function () {
	const modal = document.getElementById("introModal");
	const closeButton = document.getElementById("closeModal");

	// Check localStorage to see if the user has visited before
	if (!localStorage.getItem("visitedUniverseSite")) {
		modal.style.display = "flex"; // show modal
	} else {
		modal.style.display = "none"; // hide modal -> if not the first time only
	}

	closeButton.addEventListener("click", function () {
		modal.style.display = "none";
		// Set flag in localStorage so modal doesn't show again
		localStorage.setItem("visitedUniverseSite", "true");
	});
});
