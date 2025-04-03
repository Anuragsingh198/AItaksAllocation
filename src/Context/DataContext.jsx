import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';

const LOCAL_STORAGE_KEY = 'taskai_admin_state';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Failed to load state from localStorage', err);
    return undefined;
  }
};

const initialState = loadState() || {
  admin: null,
  users: [],
  isLogin: false,
  newTask: null,
  isShowAiButton:true
};

const Context = createContext();

export const useValue = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() =>{
    const  admin = JSON.parse(localStorage.getItem('admin')); 
    if(admin){
      dispatch({type:'LOGIN' , payload:admin })
    }
  }, [])

  const enhancedDispatch = (action) => {
    if (action.type === 'LOGOUT') {
      localStorage.removeItem('admin');
      dispatch({type:'LOGOUT'})
    }
    dispatch(action);
  };

  return (
    <Context.Provider value={{ state, dispatch: enhancedDispatch }}>
      {children}
    </Context.Provider>
  );
};