export default function (state = {}, action) {
  switch (action.type) {
    case "GET_WORKROOMS":
      return { ...state, workrooms: action.payload };
    case "GET_WORKPLACES":
      return { ...state, workplaces: action.payload };
    case "CLEAN_WORKROOMS":
      return { ...state, workrooms: action.payload };
    case "CLEAN_WORKPLACES":
      return { ...state, workplaces: action.payload };
    default:
      return state;
  }
}
