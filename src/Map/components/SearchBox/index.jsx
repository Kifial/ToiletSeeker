import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.setInputReference = this.setInputReference.bind(this);
  }
  componentDidMount() {
    const search = new google.maps.places.SearchBox(this._input);
    search.addListener('places_changed', () => {
      let places = search.getPlaces();
      this.props.handleInput({
        target: {
          name: 'addressInput',
          value: places[0].name
        }
      });
      this.props.onSelect({
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng(),
      }, places[0].formatted_address.split(',').slice(0, 3).join());
    });
  }
  setInputReference(node) {
    this._input = node;
  }
  render() {
    return (
      <input
        ref={this.setInputReference}
        type="text"
        name={this.props.name}
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.handleInput}
        disabled={this.props.disabled}
      />
    )
  }
}

export default SearchBox;