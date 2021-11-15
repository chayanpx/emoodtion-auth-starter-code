export const SIGNIN_COMPLETE = "SIGNIN_COMPLETE";
export const whoSignin = (
  auth_id,
  username,
  avatarURL,
  firstName,
  lastName,
  birthday,
  gender,
  bookmarks
) => {
  return {
    type: SIGNIN_COMPLETE,
    auth_id: auth_id,
    username: username,
    avatarURL: avatarURL,
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    gender: gender,
    bookmarks: bookmarks,
  };
};
