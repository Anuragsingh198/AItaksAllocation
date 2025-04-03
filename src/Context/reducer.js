export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem('admin' , JSON.stringify(action.payload))
        return {
          ...state,
          admin: action.payload,
          isLogin: true
        };
      case 'LOGOUT':
        return {
          ...state,
          admin: null,
          isLogin: false,
        };
      case 'OFFBUTTON':
        return {
          ...state,
          isShowAiButton:false,
        };
      case 'OFFBUTTON':
        return {
          ...state,
          isShowAiButton:true,
        };
      default:
        return state;
    }
  };
  