$(document).ready(function () {
    // ****** Mobile Nav
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function () {
        $('.menu-mobile').toggleClass('menu-mobile-active');
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
    });

    // ****** Sous-menu
    $('.clic-sub-menu').on('click', function () {
        if ($(this).children('.sub-menu').hasClass('sub-menu-active')) {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
        } else {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
            $(this).children('.sub-menu').addClass('sub-menu-active');
        }
    });

    // ****** Sous-menu langues
    $('.languages').on('click', function () {
        if ($(this).children('.dropdown-menu').hasClass('dropdown-menu-active')) {
            $('.languages .dropdown-menu').removeClass('dropdown-menu-active');
        } else {
            $('.languages .dropdown-menu').removeClass('dropdown-menu-active');
            $(this).children('.dropdown-menu').addClass('dropdown-menu-active');
        }
    });

    // Laisser en active le lien de la page sur lequel on a cliqué.
    // URL page
    var currentUrl = window.location.href;

    // Liens de la navigation
    var navLinks = document.querySelectorAll('.navbar li a');

    // Voir lien actif
    var activeLinkFound = false;

    // Parcourir chaque lien
    navLinks.forEach(function (link) {
        if (link.href === currentUrl) {
            link.classList.add('active');
            link.closest('li').classList.add('active');
            activeLinkFound = true;

            var parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('a').classList.add('active');
                parentDropdown.classList.add('active');
            }
        }
    });

    // Vérifiez les sous-liens aussi
    if (!activeLinkFound) {
        navLinks.forEach(function (link) {
            if (currentUrl.startsWith(link.href)) {
                link.classList.add('active');
                link.closest('li').classList.add('active');
                var parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('a').classList.add('active');
                    parentDropdown.classList.add('active');
                }
            }
        });
    }

    // Sélectionner tous les éléments <li> ayant une classe 'menu-header-li'
    var menuItems = document.querySelectorAll('.menu-header-li');

    // Ajouter un écouteur d'événements pour chaque <li>
    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            // Trouver l'élément <a> dans le <li> et le rediriger
            var link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });

    // ****** Pour chaque icône météo, ajoute la classe correspondante et applique l'image de fond
    $('.weather-icon').each(function () {
        var weatherIcon = $(this).attr('data');
        var baseUrl = $(this).closest('.meteo').find('.img-meteo').data('url');
        var iconPath = baseUrl + weatherIcon + '.jpeg';

        // Ajoute une classe basée sur l'icône météo
        $(this).closest('.meteo').find('.img-meteo').addClass('weather-' + weatherIcon);

        // Applique l'image de fond
        $(this).closest('.meteo').find('.img-meteo').css({
            'background-image': 'url(' + iconPath + ')',
            'background-size': 'cover'
        });

        // Traduction de l'icône météo pour afficher dans le weather
        var weatherTranslation;
        switch (weatherIcon) {
            case 'clear-day':
                weatherTranslation = 'Clair';
                break;
            case 'Cloudy':
                weatherTranslation = 'Nuageux';
                break;
            case 'fog':
                weatherTranslation = 'Brouillard';
                break;
            case 'partly-cloudy-day':
                weatherTranslation = 'Mi-couvert';
                break;
            case 'rain':
                weatherTranslation = 'Pluie';
                break;
            case 'sleet':
                weatherTranslation = 'Verglas';
                break;
            case 'snow':
                weatherTranslation = 'Neige';
                break;
            case 'wind':
                weatherTranslation = 'Vent';
                break;
            default:
                weatherTranslation = 'Undefined';
                break;
        }

        // Affiche la traduction dans le div .weather-trad
        $(this).closest('.weather-icon-contain').find('.weather-trad').text(weatherTranslation);
    });

    // ****** Texte presentation page Home
    if ($(".description").length > 0) {
        var $description = $(".description");
        var $seeMore2 = $("#seeMore2");
        var $seeLess2 = $("#seeLess2");

        // Check si le texte est limité, on affiche pas les boutons
        if ($description[0].scrollHeight <= $description.height()) {
            $seeMore2.hide();
            $seeLess2.hide();
        } else {
            $seeMore2.show();
            $seeLess2.hide();
        }

        // Voir plus presentation
        $seeMore2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').addClass("expanded");
            $seeMore2.hide();
            $seeLess2.show();
        });

        // Voir moins presentation
        $seeLess2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').removeClass("expanded");
            $seeMore2.show();
            $seeLess2.hide();
        });
    };

    // ****** Galerie images
    // Sélectionnez toutes les images de la galerie
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    // Convertir en tableau
    const imagesArray = Array.from(galleryImages);

    // Mélanger les images masquées (à partir de la 6ème)
    let hiddenImages = imagesArray.slice(5);

    // Ajouter des classes aux images et masquer à partir de la 6ième
    imagesArray.forEach((image, index) => {
        image.classList.add(`gallery-img-${index + 1}`);

        if (index >= 5) {
            image.style.display = 'none';
        }
    });

    // Fonction pour échanger les images
    function replaceImage() {
        // Trouver toutes les images visibles
        const visibleImages = imagesArray.filter(img => img.style.display !== 'none');

        if (visibleImages.length > 0 && hiddenImages.length > 0) {
            // Choisir une image visible aléatoire
            const randomVisibleIndex = Math.floor(Math.random() * visibleImages.length);
            const visibleImage = visibleImages[randomVisibleIndex];

            // Choisir une image masquée aléatoire
            const hiddenImageIndex = Math.floor(Math.random() * hiddenImages.length);
            const hiddenImage = hiddenImages[hiddenImageIndex];

            // Appliquer la classe fade-out à l'image visible
            visibleImage.classList.add('fade-out');

            // Attendre la fin de la transition avant de changer les src
            visibleImage.addEventListener('transitionend', function () {
                // Échanger le src de l'img visible et l'img masquée
                const tempSrc = visibleImage.src;
                visibleImage.src = hiddenImage.src;
                hiddenImage.src = tempSrc;

                // Mettre à jour texte photo qui va avec
                const tempAlt = visibleImage.alt;
                visibleImage.alt = hiddenImage.alt;
                hiddenImage.alt = tempAlt;

                // Réinitialiser opacité image visible
                visibleImage.classList.remove('fade-out');
                visibleImage.classList.add('fade-in');
            }, { once: true });

            // Retirer l'effet de fondu : image apparait de nouveau
            setTimeout(() => {
                visibleImage.classList.remove('fade-in');
                visibleImage.style.opacity = 1;
            }, 100);
        }
    }

    // Appeler replaceImage toutes les 4 secondes
    setInterval(replaceImage, 4000);

    // ****** Fonctions pour flèches en fonction de si trop d'items à afficher (comparer longueur .owl-stage et .owl-stage-outer)
    function checkNavVisibility() {
        var $carousel = $('.slider-others-pages');
        var $stage = $carousel.find('.owl-stage');
        var $stageOuter = $carousel.find('.owl-stage-outer');

        var stageWidth = $stage.outerWidth(true);
        var stageOuterWidth = $stageOuter.width();
        
        if ($(window).width() >= 768) {
            if (stageWidth > stageOuterWidth) {
                $carousel.find('.owl-nav').addClass('enabled').removeClass('disabled');
            } else {
                $carousel.find('.owl-nav').removeClass('enabled').addClass('disabled');
            }
        }
    }

    // Utilisation d'un timeout pour attendre que le carrousel soit complètement chargé
    setTimeout(function () {
        checkNavVisibility();
    }, 50);
    
    // Recalculer lorsque la fenêtre est redimensionnée
    $(window).on('resize', function () {
        checkNavVisibility();
    });

    // Écouter l'événement de changement du carrousel pour vérifier la visibilité des flèches
    $(window).on('changed.owl.carousel', function () {
        checkNavVisibility();
    });

    // Appel de la fonction après l'initialisation pour s'assurer que les flèches sont correctement gérées
    checkNavVisibility();

    // ****** Fonction des flocons de neige
    particlesJS("snow_fall", {
        "particles": {
            "number": {
                "value": 1500,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    }

    );

    // Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers a').on('click', function (event) {
        event.preventDefault();

        var targetId = $(this).attr('id');

        // Trouver l'élément correspondant dans le slider
        var targetElement = $(targetId);
        if (targetElement.length) {
            var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                return $(this).find(targetId).length > 0;
            }).index();

            // Si un index valide est trouvé, déplacer le slider
            if (index !== -1) {
                $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
            } else {
                console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
            }
        } else {
            console.error("Cible non trouvée pour :", targetId);
        }
    });

    // Détecter le changement dans Owl Carousel pour le .active
    $('.vouchers-slider').on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index;

        // Sélectionner l'élément actif dans le slider
        var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.presta-contain-voucher');

        if (activeSlide.length) {
            var activeId = activeSlide.attr('id');
            console.log("Élément actif dans le slider :", activeId);

            $('.all-prices-vouchers a').removeClass('active');

            $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

        }
    });
});

$(document).ready(function () {
    $('.slider-meteo').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.offers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 40,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.options-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.special-offers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 40,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.avis-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.giftcards-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 40,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.vouchers-two-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 40,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.news-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                margin: 32,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                items: 3,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1600: {
                items: 4,
                margin: 32,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-others-pages').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        autoWidth: true,
        responsiveClass: true,
        responsive: {
            0: {
                margin: 12,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                margin: 24,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,

            },
            1220: {
                margin: 24,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-page-page').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.detail-slider_img').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                margin: 20,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                margin: 20,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                margin: 20,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                margin: 0,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 20,
        items: 1,
        autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,

            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
});