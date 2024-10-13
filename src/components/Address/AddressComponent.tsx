import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IFormData } from '../../types/types';

const AddressComponent: React.FC = () => {
    const { register } = useFormContext<IFormData>();
    return (
        <div>
            <div>
                <span className='span_header'>Address</span>
                <div className='divider' />
            </div>
            <div className="address_content-wrapper">
                <div className="input-container">
                    <label htmlFor="home">Home Name or #</label>
                    <input {...register('home')} />
                </div>
                <div className="input-container">
                    <label htmlFor="street">Street</label>
                    <input {...register('street')} />
                </div>
                <div className="input-container">
                    <label htmlFor="suburb">Suburb</label>
                    <input {...register('suburb')} />
                </div>
                <div className="input-container">
                    <label htmlFor="state">State</label>
                    <input {...register('state')} />
                </div>
                <div className="input-container">
                    <label htmlFor="postcode">Postcode</label>
                    <input {...register('postcode')} />
                </div>
                <div className="input-container">
                    <label htmlFor="country">Country</label>
                    <input {...register('country')} />
                </div>
            </div>
        </div>
    );
}

export default AddressComponent;