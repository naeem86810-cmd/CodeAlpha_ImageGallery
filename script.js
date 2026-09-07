const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const searchInput = document.getElementById("searchInput");

let currentFilter = "all";

// FILTER + SEARCH
function filterGallery() {

    const searchText = searchInput.value.toLowerCase().trim();

    galleryItems.forEach(item => {

        const image = item.querySelector("img");
        const category = item.dataset.category.toLowerCase();
        const imageName = image.alt.toLowerCase();

        const filterMatch =
            currentFilter === "all" ||
            category === currentFilter;

        const searchMatch =
            imageName.includes(searchText) ||
            category.includes(searchText);

        if (filterMatch && searchMatch) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }

    });
}


// FILTER BUTTONS
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterGallery();

    });

});


// SEARCH
searchInput.addEventListener("input", () => {
    filterGallery();
});


// ======================
// LIGHTBOX
// ======================

const images = document.querySelectorAll(".gallery img");

let currentIndex = 0;

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="close">&times;</button>
    <button class="prev">&#10094;</button>
    <img class="lightbox-image" src="" alt="">
    <button class="next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".close");
const prevButton = lightbox.querySelector(".prev");
const nextButton = lightbox.querySelector(".next");


images.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentIndex = index;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

    });

});


nextButton.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;

});


prevButton.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;

});


closeButton.addEventListener("click", () => {
    lightbox.classList.remove("active");
});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }

});


// KEYBOARD
document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

    if (event.key === "Escape") {
        closeButton.click();
    }

});


// ======================
// LIKE BUTTON
// ======================

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});