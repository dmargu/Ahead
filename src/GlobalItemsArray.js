import { connect } from 'react-redux';

const GlobalItems = () => {
  const globalArray = [];
  return globalArray;
};

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps)(GlobalItems);
