# Swiper

## Localsite for Model.earth Dev

View slider at [localhost:8887/swiper/dist/](http://localhost:8887/swiper/dist/) after [starting your localsite](https://model.earth/localsite/start/steps/).

If you want to host it locally, make a webroot folder that contains the localsite and home repo.

	git clone https://github.com/ModelEarth/swiper.git
	yarn

If you want to make changes, do so in src/components/MySwiper or in src/components/SwiperLoop, run the below command and push changes to the repository for hosting on Github Pages.

	yarn build

Use base in vite.config.js to the second line here:

	base: ''

The build will generate new css, js files and index.html, loop.html in in dist/.  

## Isolated Dev Server

To run only swiper in it's own port:

	yarn dev

## Display Options

In the original layout the coverflow effect ensures that the active slide is always centered and is at center on default.
If you want to change it, view the comments on src/MySwiper/MySwiper.jsx so that we can make the swiper on middle slide when loading.

View the live website at [model.earth/swiper/dist](https://model.earth/swiper/dist/) and the looped filmstrip at [model.earth/swiper/dist/loop](https://model.earth/swiper/dist/loop). View the widget at [model.earth/home](https://model.earth/home/).

If you want to make changes to the original layout or display the loop filmstrip on home or feed, you can create an object/iframe element and set the src to link provided above for loop.

## Related Setup

[Swiper Element in React Application](https://www.freecodecamp.org/news/how-to-set-up-swiper-element-in-a-react-application/)

[Filmstrip sample](https://www.sliderrevolution.com/templates/wordpress-media-gallery/)