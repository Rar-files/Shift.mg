import type {NextPage} from 'next'
import { useRouter } from 'next/router';
import LoginComponent from '../../../components/Auth/LoginComponent';

const Login: NextPage = () => {
    const router = useRouter();
    const inviteId = router.query.id as string;

    return (
        <LoginComponent pathToPush={"invite/" + inviteId}/>
    )
}

export default Login;
