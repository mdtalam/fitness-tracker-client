import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('stopped',token)
        config.headers.authorization = `Bearar ${token}`;
        return config;
    },function (error){
        return Promise.reject(error);
    }) 

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;