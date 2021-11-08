# scouts-kampvisum-frontend

## Project setup

The project setup has to be done from within the scouts-kampvisum-docker repository.


<br />

## Important NPM packages that are used in the project


<br />

**V-Switch (by lmiller1990)**

This package helps us to dynamically load in components depending from what information has been given by the backend API. A switchcase within the html (see ConcernSwitch.vue component)

Source: https://www.npmjs.com/package/@lmiller1990/v-switch



<br />

**Litepie Datepicker**

This component is till now a very nice way to select single or multiple dates within a vue3 application. It has a good amount of props that can be configured depending on what you want (see DateField.vue component).

Source: https://litepie.com/



<br />

**Vue leaflet**

This package is used to display a map and setting up pinpoints depending on the given latitude and longitude coordinates. Keep in mind this does not provide a search engine and only displays the location grafically. 

Currently the vue 3 version is still being worked on and if there is a poor documentation the vue2 documentation should cover most functionallity that also works with the vue 3 package: https://vue2-leaflet.netlify.app/

Source: https://www.npmjs.com/package/@vue-leaflet/vue-leaflet
