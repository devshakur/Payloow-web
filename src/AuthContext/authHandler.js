export const AuthHandler =  {
    LOGIN: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    },
    REGISTER: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    },
    FORGET_PSWD: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    },
    RESET_PSWD: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    }
  }