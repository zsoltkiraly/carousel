/*
Carousel - Code by Zsolt Király
v1.0.2 - 2019-05-31
*/

'use strict';
var carousel = function() {

    function signatura() {
        if (window['console']) {
            const text = {
                black: '%c     ',
                blue: '%c   ',
                author: '%c  Zsolt Király  ',
                github: '%c  https://zsoltkiraly.com/'
            }

            const style = {
                black: 'background: #282c34',
                blue: 'background: #61dafb',
                author: 'background: black; color: white',
                github: ''
            }

            console.log(text.black + text.blue + text.author + text.github, style.black, style.blue, style.author, style.github);
        }
    }

    signatura();

    function disabled(id, config) {

        id.classList.add('disabled');

        setTimeout(() => {
            id.classList.remove('disabled');
        }, config.transitionTime); 
    }

    function setDevicesResolution(id, config) {

        var allElement = id.querySelectorAll('.carousel-content');

        allElement.forEach((allElements) => {

            allElements.style.WebkitTransitionDuration = config.transitionTime + 'ms';
            allElements.style.transitionDuration = config.transitionTime + 'ms';
        });

        function setNumberwidth(piece, element, id) {

            var carouselUl = id.querySelector('ul.carousel-list'),
                carouselInner = id.querySelector('.carousel-inner'),
                mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

            if(carouselInner) {

                var carouselInnerWidth = carouselInner.offsetWidth;

                if(carouselInnerWidth) {

                    var carouselDekstopNumber = Math.floor(carouselInnerWidth / piece);
                }

                if(carouselDekstopNumber) {

                    var carouselMaxWidth = carouselDekstopNumber * element.length;
                }
            }

            var centerMode = 0;

            if(config.centerMode == true && mediaQueriesData == 3 && config.pager == 'one') {

                centerMode = 1;
                carouselUl.classList.add('center-mode');
            } else {

                carouselUl.classList.remove('center-mode');
            }

            if(carouselUl) {

                carouselUl.style.width = '' + carouselMaxWidth + 'px';

                if(element.length > mediaQueriesData) {

                    if(!carouselUl.classList.contains('load')) {

                        carouselUl.classList.add('load');
                        carouselUl.style.marginLeft = '' + (carouselDekstopNumber * (mediaQueriesData - centerMode) * -1) + 'px';

                    } else {

                        var activeId = parseFloat(carouselUl.querySelector('li.carousel-item.active').getAttribute('data-carousel-id')) - 1;
                        carouselUl.style.marginLeft = '' + ((carouselDekstopNumber * (mediaQueriesData - centerMode) + activeId * carouselDekstopNumber) * -1) + 'px';
                    }
                }
            }

            element.forEach((carouselItems) => {

                carouselItems.style.width = carouselDekstopNumber + 'px';
            });
        }

        function setWidth(id, config) {

            var element = id.querySelectorAll('li.carousel-item');

            if (window.matchMedia('(max-width: ' + config.smallMobile.breakpoint + 'px)').matches) {

                setNumberwidth(config.smallMobile.slidesToShow, element, id);

            } else if (window.matchMedia('(max-width: ' + config.mobile.breakpoint + 'px)').matches) {

                setNumberwidth(config.mobile.slidesToShow, element, id);

            } else if (window.matchMedia('(max-width: ' + config.tablet.breakpoint + 'px)').matches) {

                setNumberwidth(config.tablet.slidesToShow, element, id);

            } else if (window.matchMedia('(min-width: ' + config.desktop.breakpoint + 'px)').matches) {

                setNumberwidth(config.desktop.slidesToShow, element, id);
            }
        }

        window.addEventListener('resize', function() {

            setWidth(id, config);
        }, false);

        setWidth(id, config);  
    }

    function navigationDOM(id, element) {

        var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

        if(element.length > mediaQueriesData) {

            var navigationLeftDiv = document.createElement('DIV'),
                navigationRightDiv = document.createElement('DIV');

            navigationLeftDiv.setAttribute('class', 'carousel-navigation-left');
            navigationLeftDiv.innerHTML = '<i class="arrow-left"></i>';

            navigationRightDiv.setAttribute('class', 'carousel-navigation-right');
            navigationRightDiv.innerHTML = '<i class="arrow-right"></i>';

            id.insertBefore(navigationLeftDiv, id.lastChild);
            id.insertBefore(navigationRightDiv, id.lastChild);
        }
    }

    function setCarouselAttribute(element) {

        element.forEach((itemElements, index) => {

            itemElements.setAttribute('data-carousel-id', index + 1);
        });

        element[0].classList.add('active');
    }

    function setDotsAttribute(dot) {

        dot.forEach((dotsElements, index) => {

            dotsElements.setAttribute('data-dots-id', index + 1);
        });
    }

    function dotsDOM(id, element, config) {

        var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

        if(element.length > mediaQueriesData) {

            var dotsDiv = document.createElement('NAV');

            dotsDiv.setAttribute('class', 'dots');
            dotsDiv.innerHTML = '<ul class="dots-list"></ul>';
            id.insertBefore(dotsDiv, id.lastChild);

            var carouselDots = id.querySelector('.dots'),
                dotsUl = carouselDots.querySelector('ul');

            function setDotsPiece(config, element) {

                if(config.pager == 'one') {

                    var carouselGetMediaQueries = 1;
                }

                var len = Math.ceil(element.length / carouselGetMediaQueries);

                var stop = 0;
                dotsUl.innerHTML = '';

                while (stop < len) {

                    dotsUl.innerHTML += '<li class="dots-item"><i class="circle"></i></li>';
                    stop++;
                }

                var dots = id.querySelectorAll('.dots ul.dots-list li.dots-item');
                setDotsAttribute(dots);
            }

            setDotsPiece(config, element);
            id.querySelectorAll('.dots ul.dots-list li.dots-item')[0].classList.add('active');

            window.addEventListener('resize', function() {

                var activeId = parseFloat(id.querySelector('.dots ul.dots-list li.dots-item.active').getAttribute('data-dots-id'));
                setDotsPiece(config, element);
                var dot = id.querySelectorAll('.dots ul.dots-list li.dots-item');

                dot.forEach((dotsElements) => {

                    if(parseFloat(dotsElements.getAttribute('data-dots-id')) == activeId) {
                        dotsElements.classList.add('active');
                    }
                });
            }, false);
        }
    }

    function cloneDOM(id, item, config) {

        var ul = id.querySelector('ul.carousel-list');

        function mediaQueries(id, config) {

            if (window.matchMedia('(max-width: ' + config.smallMobile.breakpoint + 'px)').matches) {

                id.setAttribute('data-media-queries', config.smallMobile.slidesToShow);

            } else if (window.matchMedia('(max-width: ' + config.mobile.breakpoint + 'px)').matches) {

                id.setAttribute('data-media-queries', config.mobile.slidesToShow);

            } else if (window.matchMedia('(max-width: ' + config.tablet.breakpoint + 'px)').matches) {

                id.setAttribute('data-media-queries', config.tablet.slidesToShow);

            } else if (window.matchMedia('(min-width: ' + config.desktop.breakpoint + 'px)').matches) {

                id.setAttribute('data-media-queries', config.desktop.slidesToShow);
            }
        }

        function remove(id) {

            var cloneElement = id.querySelectorAll('.carousel-item.clone');

            cloneElement.forEach((cloneElements) => {

                ul.removeChild(cloneElements);
            });
        }

        function cloneBefore(id, item) {

            var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

            var len = item.length-1,
                i = len;

            for(; i >= 0; i--) {

                var itemId = item[i].getAttribute('data-carousel-id');

                if(item.length - mediaQueriesData < itemId) {

                    var clone = document.createElement('LI');
                    clone.setAttribute('class', 'carousel-item clone');
                    clone.innerHTML = item[i].innerHTML;
                    ul.insertBefore(clone, ul.firstChild);
                }
            }
        }

        function cloneAfter(id, item) {

            var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

            var i = 0,
                len = item.length;
                
            for(; i < len; i++) {

                var itemId = item[i].getAttribute('data-carousel-id');

                if(itemId <= mediaQueriesData) {

                    var clone = document.createElement('LI');
                    clone.setAttribute('class', 'carousel-item clone');
                    clone.innerHTML = item[i].innerHTML;
                    ul.insertBefore(clone, ul.lastChild);
                }
            }
        }

        mediaQueries(id, config);
        var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

        if(item.length > mediaQueriesData) {

            remove(id);
            cloneAfter(id, item);
            cloneBefore(id, item);
        }
        
        window.addEventListener('resize', function() {

            mediaQueries(id, config);

            var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

            if(item.length > mediaQueriesData) {

                remove(id);
                cloneAfter(id, item);
                cloneBefore(id, item);
            }
        }, false);
    }

    function transition(element, value) {

        element.style.WebkitTransition = value;
        element.style.transition = value;
    }

    function setActiveDots(id, ul, direction) {

        var dots = id.querySelectorAll('.dots ul li.dots-item'),
            newActiveDots = id.querySelector('nav.dots ul.dots-list li.dots-item.active');

        if(direction == -1) {
            var way = newActiveDots.previousElementSibling;

            if (way !== null || way != undefined) {

                way.classList.add('active');
                newActiveDots.classList.remove('active');

            } else {

                dots[dots.length-1].classList.add('active');
                dots[0].classList.remove('active');
            }
        } else if(direction == 1) {

            var way = newActiveDots.nextElementSibling;

            if (way !== null || way != undefined) {

                way.classList.add('active');
                newActiveDots.classList.remove('active');

            } else {

                dots[dots.length-1].classList.remove('active');
                dots[0].classList.add('active');
            }
        }
    }

    function setActiveElements(id, ul) {

        var newActiveElement = ul.querySelectorAll('li.carousel-item'),
            newActiveDots = id.querySelector('nav.dots ul.dots-list li.dots-item.active');

        newActiveElement.forEach((newActiveElements) => {

            if(parseFloat(newActiveElements.getAttribute('data-carousel-id')) == parseFloat(newActiveDots.getAttribute('data-dots-id'))) {

                newActiveElements.classList.add('active');
            } else {

                newActiveElements.classList.remove('active');
            }
        });
    }

    function navigation(id, element, config) {

        var mediaQueriesData = parseFloat(id.getAttribute('data-media-queries'));

        if(element.length > mediaQueriesData) {

            function stepLeft(id, element, config) {

                var ul = id.querySelector('ul.carousel-list'),
                    mQdata = parseFloat(id.getAttribute('data-media-queries')),
                    elementWidth = element[0].offsetWidth;

                var centerMode = 0

                if(config.centerMode == true && mQdata == 3) {

                    centerMode = 1;
                }

                var thirdClone = ul.querySelectorAll('li.carousel-item')[2],
                    secondClone = ul.querySelectorAll('li.carousel-item')[1];

                var transitionValue;

                if(ul) {

                    var ulWidth = parseFloat(ul.style.width, 10),
                        marginLeft = parseFloat(ul.style.marginLeft, 10);

                    if(config.pager == 'one') {

                        var direction = -1;
                        setActiveDots(id, ul, direction);

                        if(Math.abs(marginLeft) > elementWidth) {

                            ul.style.marginLeft = (marginLeft + elementWidth) + 'px';

                            transitionValue = '' + config.transitionTime + 'ms ease-out';
                            transition(ul, transitionValue);

                            setTimeout(() => {

                                transitionValue = '';
                                transition(ul, transitionValue);
                            }, config.transitionTime);

                            var previousElementClone = ul.querySelector('li.carousel-item.active').previousElementSibling;

                            if(previousElementClone.classList.contains('clone') && centerMode == 1) {

                                thirdClone.classList.add('active-clone');
                            }

                        } else {

                            ul.style.marginLeft = (marginLeft + elementWidth) + 'px';
                            transitionValue = '' + config.transitionTime + 'ms ease-out';
                            transition(ul, transitionValue);

                            if(centerMode == 1) {

                                thirdClone.classList.remove('active-clone');
                                secondClone.classList.add('active-clone');

                                setTimeout(() => {

                                    secondClone.classList.remove('active-clone');
                                }, config.transitionTime);
                            }

                            setTimeout(() => {

                                transitionValue = 'none';
                                transition(ul, transitionValue);
                                ul.style.marginLeft = ((ulWidth - (mQdata * elementWidth * 2)) * -1) + 'px';
                            }, config.transitionTime);

                            setTimeout(() => {

                                transitionValue = '';
                                transition(ul, transitionValue);
                            }, config.transitionTime + 50);
                        }
                        setActiveElements(id, ul);
                    }
                }
            }

            id.querySelector('.carousel-navigation-left').addEventListener('click', function() {

                disabled(id, config);
                stepLeft(id, element, config);
            }, false);

            function stepRight(id, element, config) {

                var ul = id.querySelector('ul.carousel-list'),
                    mQdata = parseFloat(id.getAttribute('data-media-queries')),
                    elementWidth = element[0].offsetWidth,
                    active = ul.querySelector('.carousel-item.active');

                var centerMode = 0;

                if(config.centerMode == true && mQdata == 3) {

                    centerMode = 1;
                }

                var allItem = ul.querySelectorAll('li.carousel-item'),
                    endThirdClone = allItem[allItem.length - 3],
                    thirdClone = ul.querySelectorAll('li.carousel-item')[2];

                var transitionValue;

                if(ul) {
                    var marginLeft = parseFloat(ul.style.marginLeft, 10);

                    if(config.pager == 'one') {

                        var direction = 1;
                        setActiveDots(id, ul, direction);

                        if(Math.abs(marginLeft) < elementWidth * (element.length + mQdata - 1 - centerMode)) {

                            ul.style.marginLeft = (marginLeft - elementWidth) + 'px';

                            transitionValue = '' + config.transitionTime + 'ms ease-out';
                            transition(ul, transitionValue);

                            setTimeout(() => {

                                transitionValue = '';
                                transition(ul, transitionValue);
                            }, config.transitionTime);

                            if(thirdClone.classList.contains('active-clone')) {

                                thirdClone.classList.remove('active-clone');
                            }
                        } else {

                            ul.style.marginLeft = (marginLeft - elementWidth) + 'px';
                            transitionValue = '' + config.transitionTime + 'ms ease-out';
                            transition(ul, transitionValue);

                            var nextelementClone = ul.querySelector('li.carousel-item.active').nextElementSibling;

                            if(nextelementClone.classList.contains('clone') && centerMode == 1) {

                                endThirdClone.classList.add('active-clone');

                                setTimeout(() => {

                                    endThirdClone.classList.remove('active-clone');
                                }, config.transitionTime);
                            }

                            setTimeout(() => {

                                transitionValue = 'none';
                                transition(ul, transitionValue);
                                ul.style.marginLeft = ((mQdata - centerMode) * elementWidth * -1) + 'px';
                            }, config.transitionTime);

                            setTimeout(() => {

                                transitionValue = '';
                                transition(ul, transitionValue);
                            }, config.transitionTime + 50);
                        }

                        setActiveElements(id, ul);
                    }
                }
            }

            id.querySelector('.carousel-navigation-right').addEventListener('click', function() {

                disabled(id, config);
                stepRight(id, element, config);
            }, false);

            function dotsNavigation(id, element, config) {

                var dots = id.querySelectorAll('.dots ul li.dots-item'),
                    mQdata = parseFloat(id.getAttribute('data-media-queries'));

                var centerMode = 0;

                if(config.centerMode == true && mQdata == 3) {

                    centerMode = 1;
                }

                dots.forEach((dotsElements) => {

                    dotsElements.addEventListener('click', function() {

                        var obj = this,
                            ul  = id.querySelector('ul.carousel-list'),
                            objId = parseFloat(obj.getAttribute('data-dots-id')),
                            elementWidth = parseFloat(ul.querySelectorAll('li.carousel-item')[0].style.width, 10);

                       var transitionValue;

                        transitionValue = '' + config.transitionTime + 'ms ease-out';
                        transition(ul, transitionValue);

                        setTimeout(() => {

                            transitionValue = '';
                            transition(ul, transitionValue);
                        }, config.transitionTime);

                        dots.forEach((newDotsElements) => {

                            if(obj == newDotsElements) {
                                obj.classList.add('active');

                            } else {
                                newDotsElements.classList.remove('active');
                            }
                        });

                        if(config.pager == 'one') {

                            ul.style.marginLeft = ((mQdata - 1 - centerMode) * elementWidth * -1 + objId * elementWidth * -1) + 'px';

                            element.forEach((elements) => {

                                if(parseFloat(elements.getAttribute('data-carousel-id')) == objId) {
                                    elements.classList.add('active');

                                } else {

                                    elements.classList.remove('active');
                                }
                            });

                            var activeClone = ul.querySelectorAll('li.carousel-item.clone.active-clone');

                            activeClone.forEach((activeCloneElements) => {

                                activeCloneElements.classList.remove('active-clone')
                            });
                        }
                        disabled(id, config);
                    }, false);
                });
            }

            dotsNavigation(id, element, config);

            window.addEventListener('resize', function() {

                dotsNavigation(id, element, config);
            }, false);
        }
    }

    function loading(container) {

        setTimeout(() => {

            container.classList.remove('show');

            setTimeout(() => {

                container.classList.remove('loading');
            }, 1000);
        }, 1000);
    }

    function app(config) {

        var carouselId = document.querySelector('#' + config.render + '');

        if(carouselId) {

            var item = carouselId.querySelectorAll('.carousel-wrapper .carousel-inner ul.carousel-list li.carousel-item');

            setCarouselAttribute(item);
            cloneDOM(carouselId, item, config);
            setDevicesResolution(carouselId, config);
            navigationDOM(carouselId, item);
            dotsDOM(carouselId, item, config);
            navigation(carouselId, item, config);
            loading(carouselId);
        }
    }
    return {
        app:app
    }
}();