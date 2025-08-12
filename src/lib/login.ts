import Cookies from 'js-cookie';
import { api } from './utils';

export const handleLogin = async (username:string, password:string) => {
  try {
    const response = await api.post('token/', {
      username,
      password,
    });

    const { access, refresh } = response.data;
    
    // Store tokens securely. HTTP-only cookies are recommended.
    // This example uses a client-side library for demonstration.
    // For a more secure approach, you would set the cookie on the server-side.
    Cookies.set('access_token', access, { expires: 1, secure: true, sameSite: 'strict' });
    console.log("access")
    console.log("access")
    console.log("access")
    console.log("access")
    console.log(access)
    console.log(access)
    console.log(access)
    console.log(access)
    console.log(access)
    console.log("access")
    console.log("access")
    console.log("access")
    console.log("access")
    console.log(access)
    // Cookies.set('refresh_token', refresh, { expires: 7, secure: true, sameSite: 'strict' });

    // Handle successful login (e.g., redirect to dashboard)
    // router.push('/dashboard');
    return {isLogedIn:true}
  } catch (error) {
    return {isLogedIn:false}
    // Handle login error (e.g., display an error message)
    console.error('Login failed:', error);
  }
  
};