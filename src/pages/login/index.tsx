import type {NextPage} from 'next'
import LoginComponent from '../../components/Auth/LoginComponent';
import {useRouter} from "next/router";

const Login: NextPage = () => {
    const router = useRouter();
    const inviteId = router.query.invite as string;

    if ('invite' in router.query) {
        return (
            <LoginComponent inviteId={inviteId}/>
        );
    }

    return (
        <LoginComponent />
    )
}

export default Login;
