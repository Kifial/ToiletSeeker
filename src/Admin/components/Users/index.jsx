import React from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUserFields } from '../../actions/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/index.jsx';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableBody
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

require('./index.scss');

const propTypes = {
  items: React.PropTypes.array,
  selected: React.PropTypes.array
};

class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteField = this.handleDeleteField.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.openConfirmDeleteModal = this.openConfirmDeleteModal.bind(this);
    this.closeConfirmDeleteModal = this.closeConfirmDeleteModal.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getUsers(1));
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'ADMIN_CLEAR_PAGINATION'
    });
  }
  handleDeleteField() {
    this.closeConfirmDeleteModal();
    this.props.dispatch(deleteUserFields(this.props.selected));
  }
  handleRowSelection(rowIdxs) {
    this.props.dispatch({
      type: 'ADMIN_USERS_FIELD_SELECTED',
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
      <div className="admin-users">
        <ConfirmDeleteModal
          title="Do you want to delete this user?"
          onDeleteField={this.handleDeleteField}
        />
        <div className="admin-users__title-box">
          <div className="admin-users__title">All users</div>
          <div className="admin-users__buttons-row">
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
              <TableHeaderColumn tooltip="User's name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="User's login">Login</TableHeaderColumn>
              <TableHeaderColumn tooltip="Personal info of the user">Info</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            deselectOnClickaway={false}
          >
            {this.props.items.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.login}</TableRowColumn>
                <TableRowColumn>{item.info}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

AdminUsers.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    items: state.admin.users,
    selected: state.admin.selectedUsersFields
  }
};

AdminUsers = connect(
  mapStateToProps
)(AdminUsers);

export default AdminUsers;