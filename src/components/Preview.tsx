import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IFormData } from '../types/types';
import './Preview.scss';

interface IPreview {
    referralData: IFormData[];
    fetchReferralData: () => Promise<void>;
    setIsEditing: (value: boolean) => void;
}

const Preview: React.FC<IPreview> = ({
    referralData,
    fetchReferralData,
    setIsEditing
}) => {
    const { setValue, reset, clearErrors } = useFormContext<IFormData>();
    const clickDeleteReferral = async (referralId: number) => {
        const deleteReferralResponse = await axios.delete(`http://localhost:8080/api/referral/${referralId}`);
        const { data } = deleteReferralResponse;
        if (data.success) {
            toast.success(data.message);
            fetchReferralData();
            reset();
        } else {
            toast.error(data.message);
        }
    };

    const clickEditButton = (selectedReferralData: IFormData) => {
        clearErrors();
        Object.entries(selectedReferralData).forEach(([key, value]) => {
            setValue(key as keyof IFormData, value);
        });
        setIsEditing(true);
    }

    return (
        <div className='preview_container'>
            <table>
                <tbody>
                    <tr>
                        <th>Given Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                    {referralData.length > 0 &&
                        referralData.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.givenName}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <div className='icon-buttons_container'>
                                            <FaPen
                                                className='icon-buttons'
                                                onClick={() => clickEditButton(item)}
                                            />
                                            <FaTrash
                                                className='icon-buttons'
                                                onClick={() => clickDeleteReferral(item.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {/* {referralData.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.givenName}</td>
                                <td>{item.surname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <div className='icon-buttons_container'>
                                        <FaPen
                                            className='icon-buttons'
                                            onClick={() => clickEditButton(item)}
                                        />
                                        <FaTrash
                                            className='icon-buttons'
                                            onClick={() => clickDeleteReferral(item.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
            {referralData.length === 0 &&
                <div className='no-data'>No Data</div>
            }
        </div>
    );
}

export default Preview;