import * as types from './mutation-types';

// loading
export const setLoadStatus = ({commit, state}, loadInfo) => {
    commit(types.SET_LOAD_STATUS, loadInfo);
};
