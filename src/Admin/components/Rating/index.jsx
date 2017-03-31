import React from 'react';
import { connect } from 'react-redux';
import { getRatingFields, deleteRatingFields } from '../../actions/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/index.jsx';
import AddRatingModal from '../AddRatingModal/index.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

require('./index.scss');

const propTypes = {
  items: React.PropTypes.array,
  selected: React.PropTypes.array
};

class AdminRating extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteField = this.handleDeleteField.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.openConfirmDeleteModal = this.openConfirmDeleteModal.bind(this);
    this.closeConfirmDeleteModal = this.closeConfirmDeleteModal.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getRatingFields());
  }
  handleDeleteField() {
    this.props.dispatch(deleteRatingFields(this.props.selected));
    this.closeConfirmDeleteModal();
  }
  openAddModal() {
    this.props.dispatch({
      type: 'ADMIN_ADD_RATING_MODAL_OPEN'
    });
  }
  handleRowSelection(rowIdxs) {
    this.props.dispatch({
      type: 'ADMIN_RATING_FIELD_SELECTED',
      data: rowIdxs
    });
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
      <div className="admin-rating">
        <ConfirmDeleteModal
          title="Do you want to delete selected field?"
          onDeleteField={this.handleDeleteField}
        />
        <div className="admin-rating__head-box">
          <div className="admin-rating__title">Rating fields</div>
          <div className="admin-rating__buttons-row">
            {this.props.selected.length ?
              <RaisedButton
                label="Delete"
                secondary={true}
                onClick={this.openConfirmDeleteModal}
                style={{
                  margin: '0 10px 0 0'
                }}
              /> :
              ''
            }
            <RaisedButton
              label="Add"
              primary={true}
              onClick={this.openAddModal}
            />
          </div>
        </div>
        <Table
          onRowSelection={this.handleRowSelection}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="Rating field">Field</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover={true}
          >
            {this.props.items.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn>{item.name}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <AddRatingModal/>
      </div>
    )
  }
}

AdminRating.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    items: state.admin.ratingFields,
    selected: state.admin.selectedRatingFields
  }
};

AdminRating = connect(
  mapStateToProps
)(AdminRating);

export default AdminRating;