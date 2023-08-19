document.addEventListener("DOMContentLoaded", function () {
    var clickableElement = document.getElementById("clickable");
    
    clickableElement.addEventListener("click", function () {
        clickableElement.classList.add("clicked");
    });

    clickableElement.addEventListener("mouseleave", function () {
        clickableElement.classList.remove("clicked");
    });
});
