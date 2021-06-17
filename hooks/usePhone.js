import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchPhones = async() => {
    try {
        const response = await axiosClient.get('/phone');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createPhone = async({phone}) => {
    try {
        const response = await axiosClient.post('/phone',{phone});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editPhone = async({phone,_id}) => {
    try {
        
        const response = await axiosClient.put(`/phone/${_id}`,{phone});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivatePhone = async({_id}) => {
    try {
        const response = await axiosClient.put(`/phone/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetPhones =()=>{
    return useQuery('PHONES',fetchPhones)
}

export const usePostPhone = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createPhone,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('PHONES');
            console.log('sucess')
        },
        onError: ()=>{
            console.log('error')
        }
    });

    const handlePostRequest = (payload)=> {
        mutate(payload);
    }

    return[
        handlePostRequest
    ];
}

export const usePutPhone = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editPhone,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('PHONES');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivatePhone = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivatePhone,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('PHONES');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}