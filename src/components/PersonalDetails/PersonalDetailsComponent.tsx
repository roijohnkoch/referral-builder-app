import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IFormData } from '../../types/types';
import './PersonalDetailsComponent.scss';

const PersonalDetailsComponent: React.FC = () => {
    const { register, formState } = useFormContext<IFormData>();
    const { errors } = formState;
    return (
        <div className='personal-details_container'>
            <div>
                <span className='span_header'>Personal Details</span>
                <div className='divider' />
            </div>
            <div className="personal-details_content-wrapper">
                <div className="input-container">
                    <label htmlFor="givenName">Given Name</label>
                    <input {...register('givenName', {
                        required: 'This field is required',
                        pattern: {
                            value: /^[^\s]+(?:$|.*[^\s]+$)/,
                            message: 'Invalid input'
                        }
                    })} />
                    {errors.givenName && <span className='error-message'>{errors.givenName.message}</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="surname">Surname</label>
                    <input {...register('surname', {
                        required: 'This field is required',
                        pattern: {
                            value: /^[^\s]+(?:$|.*[^\s]+$)/,
                            message: 'Invalid input'
                        }
                    })} />
                    {errors.surname && <span className='error-message'>{errors.surname.message}</span>}

                </div>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input {...register('email', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: 'Invalid email address',
                        },
                    })} />
                    {errors.email && <span className='error-message'>{errors.email.message}</span>}
                </div>
                <div className="input-container">
                    <label htmlFor="phone">Phone</label>
                    <input {...register('phone', {
                        required: 'This field is required',
                        pattern: {
                            value: /^[^\s]+(?:$|.*[^\s]+$)/,
                            message: 'Invalid input'
                        }
                    })} />
                    {errors.phone && <span className='error-message'>{errors.phone.message}</span>}
                </div>
            </div>
        </div>
    );
}

export default PersonalDetailsComponent;