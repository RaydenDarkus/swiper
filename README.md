# Swiper

## Localsite for Model.earth Dev

View slider at [localhost:8887/swiper/](http://localhost:8887/swiper/) after [starting your localsite](https://model.earth/localsite/start/steps/).

Run `npm i swiper` once.

After making changes in src/components/MySwipper, run the command:

	npm run build

If you get an error, rename index.html to index1.html, and index2.html to index.html

You might also need to swith the base in vite.config.js to the second line here:

	base: '/swiper/',
 	base: './',

The build will generate new css, js files and index.html in dist/assets.  
Copy the files generated into the main swiper/assets folder.  

## Isolated Dev Server

To run only swipper in it's own port:

	npm i swiper

	npm run dev


## Related Setup

[Swiper Element in React Application](https://www.freecodecamp.org/news/how-to-set-up-swiper-element-in-a-react-application/)

[Filmstrip sample](https://www.sliderrevolution.com/templates/wordpress-media-gallery/)