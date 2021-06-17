import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchCaptured = async() => {
    try {
        const response = await axiosClient.get('/captured');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createCaptured = async({captured}) => {
    try {
        const response = await axiosClient.post('/captured',{captured});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editCaptured = async({captured,_id}) => {
    try {
        
        const response = await axiosClient.put(`/captured/${_id}`,{captured});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateCaptured = async({_id}) => {
    try {
        const response = await axiosClient.delete(`/captured/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetCaptured =()=>{
    return useQuery('CAPTURED',fetchCaptured)
}

export const usePostCaptured = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createCaptured,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('CAPTURED');
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

export const usePutBrand = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editCaptured,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('CAPTURED');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateBrand = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateCaptured,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('CAPTURED');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}