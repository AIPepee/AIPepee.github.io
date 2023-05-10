document.addEventListener('DOMContentLoaded', function () {

    function copyToClipboard() {
        const tempElement = document.createElement('textarea');
        tempElement.value = document.querySelector('.contract-address').innerText;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);

        const copiedMessage = document.querySelector('.copied-message');
        copiedMessage.style.display = 'inline';
        setTimeout(() => {
            copiedMessage.style.display = 'none';
        }, 1500);
    }

    document.querySelector('.copy-button').addEventListener('click', copyToClipboard);


    // Get all the links that should scroll to a section
    const links = document.querySelectorAll('a[href^="#"]');

    // For each link, add an event listener to smooth scroll to the corresponding section
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));
            const topOffset = 50; // adjust this value to offset the scroll position

            window.scrollTo({
                top: target.offsetTop - topOffset,
                behavior: 'smooth'
            });
        });
    });

    const navSlide = () => {
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        // Toggle nav
        // Close nav when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            });
        });

        // Change navbar background color on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('nav');
            const topOffset = 100; // adjust this value to set when the background color should change

            if (window.pageYOffset > topOffset) {
                navbar.classList.add('scroll');
            } else {
                navbar.classList.remove('scroll');
            }
        });
    }
    navSlide();


    //Close infobox
    // Get the elements
    const infoBoxCloseButton = document.getElementById('close-btn');
    const infoBoxElement = document.querySelector('.infoBox');

    // Define the closeInfoBox function
    function closeInfoBox() {
        localStorage.setItem('infoBoxClosed', 'true'); // Store the value in localStorage
        infoBoxElement.style.display = 'none';
    }

    // Check if the infoBox should be shown
    const isInfoBoxClosed = localStorage.getItem('infoBoxClosed') === 'true';

    if (!isInfoBoxClosed) {
        infoBoxElement.style.display = 'flex';
        infoBoxElement.classList.add('electric-fade-in');
    }

    // Attach the event listeners
    infoBoxCloseButton.addEventListener('click', closeInfoBox);



    // Modal for localstorage
    const modalContainer = document.querySelector(".modal-container");
    const infoBox = document.querySelector('.infoBox');

    if (localStorage.getItem("modalShown") === "true") {
        const delay = 1; // set the delay in seconds
        infoBox.style.setProperty('animation-delay', `${delay}s`);
    }

    if (localStorage.getItem("modalShown") !== "true") {
        modalContainer.classList.add("shown");
        localStorage.setItem("modalShown", "true");

        // Remove the modal after the animation is finished
        setTimeout(() => {
            modalContainer.remove();
        }, 8000); // 8000ms corresponds to the duration of the modalFadeOut animation
    } else {
        modalContainer.remove();
        infoBox.classList.add('electric-fade-in');
    }



    // Chart data
    const chartdata = {
        labels: ['93% Locked liquidity pool', '7% Exchanges'],
        datasets: [
            {
                data: [93, 7], // <-- Change the percentages here
                backgroundColor: ['#4CAF50', '#2196F3'],
                hoverOffset: 4,
            },
        ],
    };

    // Chart options
    const chartoptions = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
            // Custom plugin to display percentages
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = '32px sans-serif';

                const dataset = chart.data.datasets[0];
                const total = dataset.data.reduce((acc, curr) => acc + curr, 0);

                dataset.data.forEach((value, index) => {
                    const metaData = chart.getDatasetMeta(0).data[index];
                    const percentage = (value / total * 100).toFixed(1) + '%';
                    const { x, y } = metaData.tooltipPosition();

                    ctx.fillStyle = dataset.backgroundColor[index];
                    ctx.fillText(percentage, x, y);
                });

                ctx.restore();
            },
        },
    };


    // Chart.js initialization
    const ctx = document.getElementById('doughnut-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: chartdata,
        options: chartoptions,
    });


    document.querySelector('.hamburger-menu').addEventListener('click', function () {
        const navLinks = document.querySelector('#nav-links');
        navLinks.classList.toggle('mobile-nav');
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }

        // Add this line to toggle the "open" class on the hamburger menu
        this.classList.toggle('open');
    });



    /* Scroll to top */
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Function to show or hide the button based on scroll position
    function checkScrollPosition() {
        const scrollPosition = window.pageYOffset;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition > pageHeight * 0.1) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    }

    // Add a scroll event listener to show or hide the button
    window.addEventListener("scroll", checkScrollPosition);

    // Function to smoothly scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    // Add a click event listener to the button to scroll the page to the top
    scrollToTopButton.addEventListener("click", scrollToTop);

});
