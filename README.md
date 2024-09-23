# Swiper

## Localsite for Model.earth Dev

View slider at [localhost:8887/swiper/](http://localhost:8887/swiper/) after [starting your localsite](https://model.earth/localsite/start/steps/).

If you want to host it locally, make a webroot folder which has your localsite and home repo.

	git clone https://github.com/ModelEarth/swiper.git
	npm i

If you want to make changes, do so in src/components/MySwiper or in src/components/SwiperLoop, push to the repository and run the command for hosting on Github Pages:

	npm run deploy

Use base in vite.config.js to the second line here:

	base: '/swiper/'

The build will generate new css, js files and index.html, loop.html in gh-pages branch and in dist/.  
This will happen automatically when you run the command and you don't need to update the files manually.
The latest build files are located in gh-pages branch while the files of the previous build are in dist/.

## Isolated Dev Server

To run only swiper in it's own port:

	npm i 
	npm run dev

## Display Options

In the original layout the coverflow effect ensures that the active slide is always centered and is at center on default.
If you want to change it, view the comments on src/MySwiper/MySwiper.jsx so that we can make the swiper is on middle slide on loading.

View the live website at [model.earth/swiper](https://model.earth/swiper/) and the looped filmstrip at [model.earth/swiper/loop](https://model.earth/swiper/loop). View the widget at [model.earth/home](https://model.earth/home/).

If you want to make changes or display the loop filmstrip on home, you can create an object/iframe element and set the src to link provided 
above for loop.

See the homepage link in package.json and set it to something else if you want a custom homepage on your forked repo.

## Related Setup

[Swiper Element in React Application](https://www.freecodecamp.org/news/how-to-set-up-swiper-element-in-a-react-application/)

[Filmstrip sample](https://www.sliderrevolution.com/templates/wordpress-media-gallery/)