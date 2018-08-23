import * as CONSTANTS from "../Constants";

const INITIAL_STATE = {
  error: "",
  loading: false,
  // winner: 1,
  // win_type: 'dec',
  imagesLimit: 5,
  images: [
    // {
    //   "cancelled": false,
    //   "height": 2848,
    //   "type": "image",
    //   "uri": "file:///Users/samar/Library/Developer/CoreSimulator/Devices/6461521C-B09B-43B0-9CFE-6EBCF959B21D/data/Containers/Data/Application/1417B7C8-6146-49D8-B69A-A7E23CE36192/Library/Caches/ExponentExperienceData/%2540anonymous%252Fnuca-mma-5fa4a631-33c2-477a-ab28-166c008f05bc/ImagePicker/DD0A2138-8D9E-49FC-AD07-3F62B7AD21F5.jpg",
    //   "width": 4288,
    //   },
    //   {
    //   "cancelled": false,
    //   "height": 2500,
    //   "type": "image",
    //   "uri": "file:///Users/samar/Library/Developer/CoreSimulator/Devices/6461521C-B09B-43B0-9CFE-6EBCF959B21D/data/Containers/Data/Application/1417B7C8-6146-49D8-B69A-A7E23CE36192/Library/Caches/ExponentExperienceData/%2540anonymous%252Fnuca-mma-5fa4a631-33c2-477a-ab28-166c008f05bc/ImagePicker/F5690E63-0966-4711-AE50-2C1E0292FB2E.jpg",
    //   "width": 1668,
    //   },
  ],
  modalSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.WINNER_CHANGED:
      return {...state, winner: action.payload};
    case CONSTANTS.WIN_TYPE_CHANGED:
      return {...state, win_type: action.payload};
    case CONSTANTS.WINNER_IMAGES_ADD:
      return {...state, images: [ ...state.images, action.payload ]};
    case CONSTANTS.WINNER_IMAGES_REMOVE:
      const images = state.images;
      images.splice(action.payload, 1);
      // let images = state.images.filter(item => item !== action.payload)
      return {...state, images };
    case CONSTANTS.MATCH_SAVE:
      return {...state, loading: true, modalSuccess: false};
    case CONSTANTS.MATCH_SAVE_SUCCESS:
      return {...state, loading: false, modalSuccess: true};
    case CONSTANTS.MATCH_SAVE_FAIL:
      return {...state, loading: false, modalSuccess: false};
    case CONSTANTS.MODAL_SUCCESS_RESULT_SUBMIT:
      return {...state, modalSuccess: action.payload}
    default:
      return state;
  }
};