import { SIGNIN_COMPLETE } from "../actions/userAction";
const initialState = {
  auth_id: null,
  username: null,
  avatarURL: null,
  firstName: null,
  lastName: null,
  birthday: null,
  gender: null,
  bookmarks: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_COMPLETE:
      return {
        auth_id: action.auth_id,
        username: action.username,
        avatarURL: action.avatarURL,
        firstName: action.firstName,
        lastName: action.lastName,
        birthday: action.birthday,
        gender: action.gender,
        bookmarks: action.bookmarks,
      };
    default:
      return state;
  }
};
export default userReducer;
