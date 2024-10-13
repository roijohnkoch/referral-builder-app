import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, Preview } from './components';
import { IFormData } from './types/types';
import './App.scss';

function App() {
  const methods = useForm<IFormData>({
    defaultValues: {
        givenName: '',
        surname: '',
        email: '',
        phone: '',
        home: '',
        street: '',
        suburb: '',
        state: '',
        postcode: '',
        country: '',
      }
  });
  const [referralData, setReferralData] = useState<IFormData[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
      const response = await axios.get('http://localhost:8080/api/referral');
      const { data } = response.data;
      setReferralData(data);
  }
  
  return (
      <div className="container">
        <FormProvider {...methods}>
          <Toaster />
          <Form
            fetchReferralData={fetchReferralData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <Preview
            referralData={referralData}
            fetchReferralData={fetchReferralData}
            setIsEditing={setIsEditing}
          />
        </FormProvider>
      </div>
  )
}

export default App
