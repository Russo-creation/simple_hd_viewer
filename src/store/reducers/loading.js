import * as actionTypes from "../actions";

const intialState = {
  loadingFnished: false,
  loadingTotalSize: 0,
  loadingLoadedSize: 0,
  loadingProgress: 0,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LoadingSceneFinished:
      return { ...state, loadingFnished: true };

    case actionTypes.LoadingSceneProgress:
      let progress = (action.loadedSize / action.totalSize) * 100;

      return {
        ...state,
        loadingTotalSize: action.totalSize,
        loadingLoadedSize: action.loadedSize,
        loadingProgress: progress.toFixed(1) * 1,
      };

    default:
      return { ...state };
  }
};

export default reducer;
