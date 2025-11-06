document.addEventListener("DOMContentLoaded", function () {

    const likeIcons = document.querySelectorAll('.fa-thumbs-up');

    likeIcons.forEach(function (icon) {

        let likeText = icon.nextSibling.textContent.trim();
        let likeCount = parseInt(likeText) || 0;


        icon.addEventListener('click', function () {

            likeCount++;

            icon.nextSibling.textContent = ` ${likeCount} Likes`;
        });
    });
});
