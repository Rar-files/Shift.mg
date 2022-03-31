import {FC, Dispatch, SetStateAction} from 'react';
import GoogleLogin from 'react-google-login';

type Props = {
    setLoginData: Dispatch<SetStateAction<any>>
  }

const Login: FC<Props> = ({setLoginData}) => {

    const handleFailure = (result : any) => {
        alert(result);
    };
    
    const handleLogin = async (googleData : any) => {
        const response = await fetch("https://kiwano-backend.herokuapp.com/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        const data = await response.json();
        localStorage.setItem("loginData", JSON.stringify(data));
        setLoginData(data);
    };

    return (
        <div>
            <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID as string}
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Login;