import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	userList: {},
	recipesList: [],
	leftData: [], //左边的数据
	rightData: [], //右边的数据
	dynamicList: [],
	leftDynamic: [],
	rightDynamic: [],
	likeDynamicList: [],
	likeLeftDynamic: [],
	likeRightDynamic: [],
	collectRecipesList: []
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case actionTypes.SAVE_USER_LIST:
			return state.set('userList', action.information);
		case actionTypes.SAVE_RECIPES_LIST:
			return state.set('recipesList', action.information);
		case actionTypes.SAVE_LEFT_DATA:
			return state.set('leftData', action.information);
		case actionTypes.SAVE_RIGHT_DATA:
			return state.set('rightData', action.information);
		case actionTypes.SAVE_DYNAMIC_LIST:
			return state.set('dynamicList', action.information);
		case actionTypes.SAVE_LEFT_DYNAMIC:
			return state.set('leftDynamic', action.information);
		case actionTypes.SAVE_RIGHT_DYNAMIC:
			return state.set('rightDynamic', action.information);
		case actionTypes.SAVE_LIKE_DYNAMIC_LIST:
			return state.set('likeDynamicList', action.information);
		case actionTypes.SAVE_LIKE_LEFT_DYNAMIC:
			return state.set('likeLeftDynamic', action.information);
		case actionTypes.SAVE_LIKE_RIGHT_DYNAMIC:
			return state.set('likeRightDynamic', action.information);
		case actionTypes.SAVE_COLLECT_RECIPES_LIST:
			return state.set('collectRecipesList', action.information);
		case actionTypes.LOGOUT:
			return defaultState;
		default:
			return state;
	}
};
