import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT} from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setCompanies } from '../redux/companySlice';

function useGetAllCompany() {

    const dispatch = useDispatch();

  useEffect(() => {
    const fetchcompanies = async () =>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials: true});

                if(res.data.success) {
                    dispatch(setCompanies(res.data.companies));  
                    console.log(first(res.data.companies));
                }   
            } catch (error) {
                console.log(error);
            }
        }
    fetchcompanies();
    },[dispatch]);
}

export default useGetAllCompany