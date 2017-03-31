import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';

const propTypes = {
  searchInput: React.PropTypes.string,
  searchData: React.PropTypes.array
};

class MapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }
  handleInput(value) {
    this.props.dispatch({
      type: 'MAP_SEARCH_HANDLE_INPUT',
      value
    });
  }
  handleRequest(value, index) {
    this.props.dispatch({
      type: 'MAP_SEARCH_HANDLE_REQUEST',
      value,
      index
    });
  }
  render() {
    return (
      <AutoComplete
        hintText="Type name of the place"
        searchText={this.props.searchInput}
        onUpdateInput={this.handleInput}
        onNewRequest={this.handleRequest}
        dataSource={this.props.searchData}
        filter={AutoComplete.fuzzyFilter}
        openOnFocus={true}
        maxSearchResults={6}
        style={{
          position: 'absolute',
          left: '15px',
          top: '65px',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
        textFieldStyle={{
          padding: '0 15px'
        }}
      />
    )
  }
}

MapSearch.propTypes = propTypes;

const mapStateToProps = (state) => {
  const search = state.forms.mapSearch;
  return {
    searchInput: search.text,
    searchData: search.data
  }
};

MapSearch = connect(
  mapStateToProps
)(MapSearch);

export default MapSearch;