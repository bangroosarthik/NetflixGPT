export const checkvalidData=(email,password)=>{
    //test inbuilt method to test for the password and email
    
    const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
   

    if(!isEmailValid){
        return "❌ Please enter a valid email address."
    }

    if(!isPasswordValid){
        return "❌ Your password must contain between 4 and 60 characters including capital letter, special Symbol, Number."
    }

    return null;
};