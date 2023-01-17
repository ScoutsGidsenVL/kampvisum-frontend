import RepositoryFactory from "@/repositories/repositoryFactory";
import { scoutsCountriesRepository, ScoutsCountry } from "@/repositories/scoutsCountriesRepository";
import { SearchedLocation } from "@/serializer/SearchedLocation";
import { ref } from 'vue'

declare var google: any;
const elementId: string = 'autocomplete';
const searchedLocation = ref<SearchedLocation>({});

interface Place {
  address_components: Array<any>
}

const enum GoogleEvents {
  PLACE_CHANGED = 'place_changed'
}

export enum SearchType {
  SUCCESS = 'sidebars.location-sidebar.success-move-pin',
  FAILED = 'sidebars.location-sidebar.failed-move-pin',
  LOADING = 'sidebars.location-sidebar.loading-move-pin' 
}

export const message = ref<string>('');

const enum PlaceType {
  STREET_NUMBER = 'street_number',
  ROUTE = 'route',
  LOCALITY = 'locality',
  POLITICAL = 'political',
  SUBLOCALITY_LEVEL_1 = 'sublocality_level_1',
  ADMINISTRATIVE_AREA_LEVEL_1 = 'administrative_area_level_1',
  ADMINISTRATIVE_AREA_LEVEL_2 = 'administrative_area_level_2',
  COUNTRY = 'country',
  POSTAL_CODE = 'postal_code'
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export const usePlaceAutocompleteHelper = (values?: any, searchedLocations?: any, map?: any): {
  initSearchAutocomplete: (countryCode: string) => void,
  stopAutocomplete: () => void,
  searchAddresCoordsWithGeocode: (address: string, countryCode: string) => void,
  getTranslationCountry: (en: string) => string,
  getCountryObjectByName: (en: string) => ScoutsCountry,
  emptyFields: () => void,
  emptyAutocompleteField: () => void
} => {

  const initSearchAutocomplete = (countryCode: string) => {
    initGeocoding();
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(elementId) as HTMLInputElement,
      {
        fields: ['name', 'geometry', 'address_components', 'formatted_address'],
        componentRestrictions: { 'country': [countryCode] },
      }
    );
    autocomplete.addListener(GoogleEvents.PLACE_CHANGED, () => {
      const place = autocomplete.getPlace();
      parseResultsForFields(place);
      searchedLocation.value.latitude = place.geometry.location.lat()
      searchedLocation.value.longitude = place.geometry.location.lng()
      searchedLocation.value.latLon = [place.geometry.location.lat(), place.geometry.location.lng()]
      searchedLocation.value.address = place.formatted_address
      searchedLocation.value.name = ''
      values.locations = [searchedLocation.value]
      searchedLocations.value = [searchedLocation.value]
      message.value = SearchType.SUCCESS
      if (map) {
        map.value.centerClickedLocation(searchedLocation.value.latitude, searchedLocation.value.longitude);
      }
    })
  }

  var geocoder: any = undefined;

  const initGeocoding = () => {
    geocoder = new google.maps.Geocoder();
  }

  const searchAddresCoordsWithGeocode = (address: string, countryCode: string) => {
    if (geocoder) {
      message.value = SearchType.LOADING
      geocoder.geocode({ 'address': address, 'componentRestrictions': { 'country': countryCode }  }, function (results: any, status: any) {
        if (results[0]) {
          searchedLocation.value.latitude = results[0].geometry.location.lat()
          searchedLocation.value.longitude = results[0].geometry.location.lng()
          searchedLocation.value.latLon = [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
          values.locations = [searchedLocation.value]
          searchedLocations.value = [searchedLocation.value]
          if (map) {
            map.value.centerClickedLocation(searchedLocation.value.latitude, searchedLocation.value.longitude);
          }
        } else {
          message.value = SearchType.FAILED
        }

        if (results[0].address_components.length > 1) {
          message.value = SearchType.SUCCESS
        } else {
          message.value = SearchType.FAILED
        }
      })
    }
  }

  const stopAutocomplete = () => {
    google.maps.event.clearListeners( document.getElementById(elementId) as HTMLInputElement);
  }

  const parseResultsForFields = (place: Place) => {
    emptyFields();
    place.address_components.forEach((component: AddressComponent) => {
      component.types.forEach((type: string) => {
        switch (type) {
          case PlaceType.POSTAL_CODE:
            values.postalcode = component.long_name
          break;
          case PlaceType.LOCALITY:
            values.township = component.long_name
            break;
          case PlaceType.ROUTE:
            values.street = component.long_name
            break;
          case PlaceType.STREET_NUMBER:
            values.houseNumber = component.long_name
          break;
          default:
            break;
        }        
      });
    });
  }

  const emptyAutocompleteField = () => {
    values.autocomplete = ''
  }

  const emptyFields = () => {
    values.postalcode = '';
    values.township = '';
    values.street = '';
    values.houseNumber = '';
  }

  const getTranslationCountry = (en: string): string => {
    const countries = RepositoryFactory.get(scoutsCountriesRepository).getCountries()
    let translated = 'NOT FOUND'
    countries.forEach((country: ScoutsCountry) => {
      if (country.en === en) {
        translated = country.nl
      }
    })
    return translated
  }

  const getCountryObjectByName = (en: string): ScoutsCountry => {
    const countries = RepositoryFactory.get(scoutsCountriesRepository).getCountries()
    let foundCountry = {
      code: "BE",
      en: "Belgium",
      nl: "België"
    };

    countries.forEach((country: ScoutsCountry) => {
      if (country.en === en) {
         foundCountry = country
      }
    })
    return foundCountry;
  }

  return {
    initSearchAutocomplete,
    stopAutocomplete,
    searchAddresCoordsWithGeocode,
    getTranslationCountry,
    emptyFields,
    emptyAutocompleteField,
    getCountryObjectByName
  }
}