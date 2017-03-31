import React from 'react';
import { connect } from 'react-redux';
import { getPlaces, deletePlaceFields } from '../../actions/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/index.jsx';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

require('./index.scss');

const propTypes = {
  items: React.PropTypes.array,
  selected: React.PropTypes.array
};

class AdminPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteField = this.handleDeleteField.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.closeConfirmDeleteModal = this.closeConfirmDeleteModal.bind(this);
    this.openConfirmDeleteModal = this.openConfirmDeleteModal.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getPlaces(1));
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'ADMIN_CLEAR_PAGINATION'
    });
  }
  handleRowSelection(rowIdxs) {
    this.props.dispatch({
      type: 'ADMIN_PLACES_FIELD_SELECTED',
      data: rowIdxs
    });
  }
  handleDeleteField() {
    this.props.dispatch(deletePlaceFields(this.props.selected));
    this.closeConfirmDeleteModal();
  }
  openConfirmDeleteModal() {
    this.props.dispatch({
      type: 'ADMIN_OPEN_CONFIRM_DELETE_MODAL'
    });
  }
  closeConfirmDeleteModal() {
    this.props.dispatch({
      type: 'ADMIN_CLOSE_CONFIRM_DELETE_MODAL'
    });
  }
  render() {
    return (
      <div className="admin-places">
        <ConfirmDeleteModal
          title="Do you want to delete selected place?"
          onDeleteField={this.handleDeleteField}
        />
        <div className="admin-places__title-box">
          <div className="admin-places__title">All places</div>
          <div className="admin-places__buttons-row">
            {this.props.selected.length ?
              <RaisedButton
                label="Delete"
                secondary={true}
                onClick={this.openConfirmDeleteModal}
              /> :
              ''
            }
          </div>
        </div>
        <Table
          onRowSelection={this.handleRowSelection}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="Place vicinity">Vicinity</TableHeaderColumn>
              <TableHeaderColumn tooltip="Coords on map">Position</TableHeaderColumn>
              <TableHeaderColumn tooltip="Name of the place">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="User that created the place">Creator</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            deselectOnClickaway={false}
          >
            {this.props.items.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn>{item.vicinity}</TableRowColumn>
                <TableRowColumn>{item.coords}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.creator}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

AdminPlaces.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    items: state.admin.places,
    selected: state.admin.selectedPlacesFields
  }
};

AdminPlaces = connect(
  mapStateToProps
)(AdminPlaces);

export default AdminPlaces;