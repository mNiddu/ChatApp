const LoginToken = (tokenId)=>({
    type:'Token',
    payload:tokenId
})

export  {LoginToken};