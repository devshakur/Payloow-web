export const InvestmentHandler =  {
    DEBTOR: (state, action)=>{
      const {user} = action.payload
      return {...state, user}
    },

  }