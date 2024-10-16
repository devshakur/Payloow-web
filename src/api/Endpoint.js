//Base-URL
export const BaseUrl = 'https://revo-p3jw.onrender.com/api/v1'



export const AuthEndPoints = {
    login: `${BaseUrl}/login`,
    register: `${BaseUrl}/register`,
    tutor: `${BaseUrl}/register-as-tutor`,
    forget: `${BaseUrl}/forget-password`,
    reset: `${BaseUrl}/reset-password`
}

export const BillsEndpoints = {
    airtime: `${BaseUrl}/buy-airtime-vtu`,
    data:      `${BaseUrl}/buy-data-vtu`,
    electricity: `${BaseUrl}/buy-electricity-vtu`,
    subscription: `${BaseUrl}/buy-cable-subscription-vtu`,
    balance: `${BaseUrl}/get-vtu-providers-wallet-balance`,
    confirm: `${BaseUrl}/confirm-pin`
}
