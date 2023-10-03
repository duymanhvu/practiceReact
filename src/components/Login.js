import {useState, useContext} from 'react'
import { loginApi } from '../Services/UserService';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const {loginContext} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loadingAPI, setLoadingAPI] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email or password is required');
            return;
        }
        setLoadingAPI(true);

        let res = await loginApi(email, password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/')
        } else {
            //error
            if (res && res.status === 400) {
                toast.error('res.data.error');
            }
        }
        setLoadingAPI(false);

    }

    const handleGoBack = () => {
        navigate('/');
    }

    return (
        <>
         <div className="login-container col-12 col-sm-8 col-md-6 col-lg-4" > 
            <div className="title">
                Login
            </div>
            <div className="text">
                Email or username (eve.holt@reqres.in)
            </div>
            <input type="text" placeholder="Email or username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
            />

            <div className='input-2'>
                <input type={showPassword === true ? "text" : "password"} placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <i className={showPassword === true ? "fa-regular fa-eye" :"fa-regular fa-eye-slash" }
                    onClick={() => setShowPassword(!showPassword)}
                ></i>
            </div>

            <button 
                className={email && password ? "active" : ""}
                disabled={(email && password) ? false : true} 
                onClick={() => handleLogin()}
            >
                {loadingAPI &&  <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                &nbsp;Login</button>
            <div className="back">
                
                <span onClick={() => handleGoBack()}><i className="fa-solid fa-angle-left"></i> Go Back</span>
            </div>
         </div>
        </>
    )
}

export default Login;