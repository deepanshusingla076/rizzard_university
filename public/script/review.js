
document.getElementById('reviewForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const rating1 = document.querySelector('input[name="rating"]:checked');
    if (!rating1) {
        alert('Please provide a rating.');
        return;
    }

    const checked1 = document.getElementById('consent').checked;
    if (!checked1) {
        alert('You must give consent to submit the form.');
        return;
    }


    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const reviewText = document.getElementById('Review').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;



    const cards = document.querySelectorAll('.testimonial-section .card');

    const availableCard = cards[1];


    availableCard.querySelector('h5').innerText = name;
    availableCard.querySelector('h6').innerText = profession;
    availableCard.querySelector('p').innerText = reviewText;

    const rating2 = availableCard.querySelector('ul');
    rating2.innerHTML = '';


    for (let i = 0; i < 5; i++) {
        const star = document.createElement('li');
        star.innerHTML = i < rating ? '<i class="fas fa-star fa-sm"></i>' : '<i class="far fa-star fa-sm"></i>';
        rating2.appendChild(star);
    }


    document.getElementById('reviewForm').reset();
    document.getElementById('message').innerText = 'Thank you for your review!';
});
