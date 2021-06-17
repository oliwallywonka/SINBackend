import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const fetchMessages = async() => {
    try {
        const response = await axiosClient.get('/message');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
const createMessage = async({message}) => {
    try {
        const response = await axiosClient.post('/message',{message});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const editMessage = async({message,_id}) => {
    try {
        
        const response = await axiosClient.put(`/message/${_id}`,{message});
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

const desactivateMessage = async({_id}) => {
    try {
        const response = await axiosClient.put(`/message/desactivate/${_id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return error
    }
}

export const useGetMessages =()=>{
    return useQuery('MESSAGE',fetchMessages)
}

export const usePostMessage = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(createMessage,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('MESSAGE');
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

export const usePutMessage = ()=>{
    const queryClient = useQueryClient();
    const {mutate} = useMutation(editMessage,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('MESSAGE');
        }
    });
    const handlePutRequest = (payload)=>{
        mutate(payload);
    };
    return [
        handlePutRequest
    ];
}

export const useDesactivateMessage = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(desactivateMessage,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('MESSAGE');
        }
    });
    const handleDesactivateRequest = (payload) =>{
        mutate(payload);
    }
    return [
        handleDesactivateRequest
    ]
}