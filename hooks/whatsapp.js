import { useQuery, useMutation, useQueryClient} from 'react-query';
import axiosClient from '../config/axios';

const initialConnection = async() => {
    try {
        const response = await axiosClient.post('/wa/connect');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}

const sendMessage = async () => {

}

export const useWSConnection =()=>{
    return useQuery('QR',initialConnection)
}

export const usePostPurchase = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(sendMessage,{
        onSettled: function () {
            console.log('final')
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('PURCHASES');
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
