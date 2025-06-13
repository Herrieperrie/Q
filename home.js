document.addEventListener('DOMContentLoaded', () => {
    const enBtn = document.getElementById('en-btn');
    const nlBtn = document.getElementById('nl-btn');
    const currentLangBtn = document.getElementById('current-lang');
    const elements = document.querySelectorAll('[data-en]');

    // Set default language to Dutch
    elements.forEach(el => {
        el.textContent = el.getAttribute('data-nl');
    });
    currentLangBtn.textContent = 'Nederlands';

    enBtn.addEventListener('click', () => {
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
        currentLangBtn.textContent = 'English';
    });

    nlBtn.addEventListener('click', () => {
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-nl');
        });
        currentLangBtn.textContent = 'Nederlands';
    });

    // Slideshow functionality
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.slideshow img');
        const totalSlides = slides.length;

        // Clone the first three slides and append them to the end of the slideshow
        for (let i = 0; i < 3; i++) {
            const clone = slides[i].cloneNode(true);
            slideshow.appendChild(clone);
        }

        function showSlide(index) {
            slideshow.style.transition = 'transform 0.5s ease-in-out';
            slideshow.style.transform = `translateX(${-index * 33.33}%)`;
        }

        function nextSlide() {
            slideIndex++;
            showSlide(slideIndex);

            // Reset the slideshow to the start without transition when reaching the cloned slides
            if (slideIndex === totalSlides) {
                setTimeout(() => {
                    slideshow.style.transition = 'none';
                    slideshow.style.transform = 'translateX(0)';
                    slideIndex = 0;
                }, 500); // Match the transition duration
            }
        }

        setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    // navigatiebar interacties
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    let isScrolling = false;
    
    // Functie om de navbar te tonen
    function showNavbar() {
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
    }
    
    // Functie om de navbar te verbergen
    function hideNavbar() {
        navbar.classList.remove('visible');
        navbar.classList.add('hidden');
    }
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
            if (scrollTop > lastScrollTop) {
                // Naar beneden scrollen
                hideNavbar();
            } else {
                // Omhoog scrollen
                showNavbar();
            }
    
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            isScrolling = true;
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
            setTimeout(() => isScrolling = false, 1000); // Reset isScrolling flag after animation
        });
    });
    
    // Controleer of de pagina net is geladen
    window.addEventListener('load', function() {
        isScrolling = false;
        showNavbar();
    });         
});







