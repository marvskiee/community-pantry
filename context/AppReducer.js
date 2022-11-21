export const initialState = {
  user: null,
  isLoading: false,
  pantry: null,
  story: null,
  guidelines: null,
  metadata: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        user: action.value,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.value,
      };
    case "SET_PANTRY":
      return {
        ...state,
        pantry: action.value,
      };
    case "SET_STORY":
      return {
        ...state,
        story: action.value,
      };
    case "SET_GUIDELINE":
      return {
        ...state,
        guidelines: action.value,
      };
    case "SET_METADATA":
      return {
        ...state,
        metadata: action.value,
      };
  }
};
