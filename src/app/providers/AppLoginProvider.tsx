import { FC, useEffect, useState } from "react";

import Login from "../../pages/login";

type Props = {
    children?: React.ReactNode;
};

const AppLoginProvider : FC<Props> = ({ children }) => {

    const [loginData, setLoginData] = useState(null);

    useEffect(() => {
        const loginData = localStorage.getItem("loginData");
        if(loginData){
            setLoginData(          
                JSON.parse(localStorage.getItem("loginData")!)
            )
        }
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
                    </>
                )
            }
        </>
    );
}

export default AppLoginProvider;