export const vaildateAuth = (email , pass , cpass , isLogin)=>{
    
    if(!email || email==="") return "Please Enter Email"
    if(!pass || pass==="") return "Please Enter Password"
    if(!isLogin && !cpass || cpass==="" ) return "Please Enter Confirm Password"
    if(isLogin===true) return "";

    if(pass!==cpass) return "Password Not Match"

    
    

    return ""
}