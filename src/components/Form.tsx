import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { IFormData } from "../types/types";
import PersonalDetailsComponent from "./PersonalDetails/PersonalDetailsComponent";
import AddressComponent from "./Address/AddressComponent";
import './Form.scss';

interface IForm {
    fetchReferralData: () => Promise<void>;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
}

const Form: React.FC<IForm> = ({
    fetchReferralData,
    isEditing,
    setIsEditing,
}) => {
    const { getValues, handleSubmit, reset } = useFormContext<IFormData>();
    const onSubmit: SubmitHandler<IFormData> = async (dataObject) => {
        const createReferralResponse = await axios.post('http://localhost:8080/api/referral', dataObject);
        const { data } = createReferralResponse;
        if (data.success) {
            toast.success(data.message);
            fetchReferralData();
            reset();
        } else {
            toast.error(data.message);
        }
    }

    const handleClickEditReferral = async () => {
        const id = getValues('id');
        const givenName = getValues('givenName');
        const surname = getValues('surname');
        const email = getValues('email');
        const phone = getValues('phone');
        const home = getValues('home');
        const street = getValues('street');
        const suburb = getValues('suburb');
        const state = getValues('state');
        const postcode = getValues('postcode');
        const country = getValues('country');
        const requestBody = {
            id,
            givenName,
            surname,
            email,
            phone,
            home,
            street,
            suburb,
            state,
            postcode,
            country,
        }
        const patchReferralResponse = await axios.patch(`http://localhost:8080/api/referral/${id}`, { ...requestBody });
        const { data } = patchReferralResponse;
        if (data.success) {
            toast.success(data.message);
            fetchReferralData();
            reset();
            setIsEditing(false);
        } else {
            toast.error(data.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="referral-form_container">
                <h1>Referral Builder</h1>
                <PersonalDetailsComponent />
                <AddressComponent />
                <div className="button_group">
                    <button type="button" className="button_secondary">UPLOAD AVATAR</button>
                    {isEditing ?
                        <button
                            type="button"
                            className="button_primary"
                            onClick={() => handleClickEditReferral()}
                        >
                            EDIT REFERRAL
                        </button> :
                        <button type="submit" className="button_primary">CREATE REFERRAL</button>
                    }
                </div>
            </div>
        </form>
    );
}

export default Form;