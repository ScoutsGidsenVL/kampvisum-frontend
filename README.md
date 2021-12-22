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

<br />

## openstreetmap API

To perform a search request with the endpoint https://nominatim.org/release-docs/develop/api/Search/ you dont need any credentials but it will have a limit based on the amount of times you perform a request within a time gap. (1 time per second as written in the policy): https://operations.osmfoundation.org/policies/nominatim/

## Photon Komoot

Terms of use: https://photon.komoot.io/#:~:text=your%20apps%20accordingly.-,Terms%20of%20Use,-You%20can%20use



