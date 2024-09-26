// Create an IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.4 // Adjust the threshold as needed (e.g., 0.1 for 10% visibility)
});

// Select all elements with the class 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');

// Observe each hidden element
hiddenElements.forEach(el => observer.observe(el));
