import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

export function mapStateToProps(state) {
    // console.log(state);
    return {
        cameraPosition: state.cameraPosition,
    }
}

export function mapActionToProps(dispatch) {
    return {
        onMoveUp: (pos) => dispatch(Actions.positionUp),
        onMoveDown: (pos) => dispatch(Actions.positionDown),
        onMoveLeft:  (pos) => dispatch(Actions.positionLeft),
        onMoveRight: (pos) => dispatch(Actions.positionRight),
    }
}