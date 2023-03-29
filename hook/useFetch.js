import { useState, useEffect } from 'react';
import axios from 'axios';

const rapidApiKey = '7e19c7fdc8msh366517e72799e8cp1cb2f2jsn659a7199f52c';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //'query: 'Python developer in Texas, USA', page: '1', num_pages: '1''
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {...query},
  };

  const fetchData = async () => {
    setIsLoading(true);

    try{
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    }catch(err){
      setError(err);
      alert('There is an error');
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const refetch = () => {
    setIsLoading(true);
    fetchData()
  }

  return { data, isLoading, error, refetch };
}

export default useFetch;

