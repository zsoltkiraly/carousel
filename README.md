# Carousel v1.0.1

<br />
<a href="https://zsoltkiraly.com/developments/carousel/" target="_blank">DEMO PAGE</a><br /><br />

<img src="http://zsoltkiraly.com/developments/_images/carousel-001.jpg">

## SETTINGS

```html
    <script>
    window.addEventListener('load', function() {
        carousel.app(
            config = {
                render: 'carousel-1',
                centerMode: true, //works only in 3 units & pager = one
                desktop: {
                    breakpoint: 992,
                    slidesToShow: 3,
                },
                tablet: {
                    breakpoint: 992,
                    slidesToShow: 2
                },
                mobile: {
                    breakpoint: 768,
                    slidesToShow: 1
                },
                smallMobile: {
                    breakpoint: 500,
                    slidesToShow: 1
                },
                pager: 'one', //one or area
                transitionTime: 600
            }
        );
    }, false);
    </script>
```

#
<br />

<b>GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007</b>

Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.
