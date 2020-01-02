export default (user, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      console.log('save user');
      return {
        ...user,
        isLoggedIn: true,
        data: action.payload,
      };
    case 'LOGOUT':
      return {
        ...user,
        isLoggedIn: false,
        data: {},
      };
    default:
      return user;
  }
};
