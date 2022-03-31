import { FC, useEffect, useState } from "react";

import Login from "../../components/Auth/Login";

type Props = {
    children?: React.ReactNode;
};

const AppLoginProvider : FC<Props> = ({ children }) => {

    const [loginData, setLoginData] = useState(null);

    useEffect(() => {
        setLoginData(
            localStorage.getItem("loginData")
                ? JSON.parse(localStorage.getItem("loginData")!)
            : null
        )
    }, []);

        
    const handleLogout = () => {
        localStorage.removeItem("loginData");
        setLoginData(null);
    };
    
    return (
        <>
            {
                loginData ? (
                    <>
                        {children}
                    </>
                ) : (
                    <>
                        <Login setLoginData={setLoginData}/>
                    </>
                )
            }
        </>
    );
}

export default AppLoginProvider;