export const BillsHandler =  {
    AIRTIME: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    },
    DATA: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    },
  }