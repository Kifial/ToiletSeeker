import { submitCreatePlace } from './api';

export const submitCreatePlaceModal = () => (dispatch, getState) => {
  const modal = getState().modals.createPlaceModal;
  if (
    modal.addressInput !== ''
    || (modal.latInput !== '' && modal.lngInput !== '')
  ) {
    if (modal.addressInput === '') {
      const geocoder = new google.maps.Geocoder();
      let latLng = new google.maps.LatLng(modal.latInput, modal.lngInput);
      geocoder.geocode({
        latLng
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let vicinity = results[0].formatted_address.split(',').slice(0, 3).join();
          dispatch(submitCreatePlace({
            name: modal.nameInput,
            tags: modal.tagsInput,
            coords: {
              lat: modal.latInput,
              lng: modal.lngInput
            },
            vicinity
          }));
        }
      });
    } else {
      dispatch(submitCreatePlace({
        name: modal.nameInput,
        tags: modal.tagsInput,
        coords: {
          lat: modal.addressCoords.lat,
          lng: modal.addressCoords.lng
        },
        vicinity: modal.vicinity
      }));
    }
  }
};