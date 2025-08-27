'use client';

import { useState } from 'react';

import Button from '#components/Button';
import Heading from '#components/Heading';
import TextInput from '#components/TextInput';

import styles from './styles.module.css';

const gender = ['Male', 'Female', 'other'];

const SECTOR_OPTIONS = [
    'Blood service',
    'Disaster Response',
    'Community Health and First-Aid',
    'Emergency Health and WASH',
    'Mental Health and Psycho-social support',
    'IT Digitalization and Innovation',
    'Information Management and Reporting',
    'Migration and population Movement',
    'Emergency Shelter',
    'Logistics',
    'Events and Promotional Campaigns',
    'Finance and Fundraising',
    '1130 Hotline',
    'Communications and Translations',
    'Other (please specify)',
];

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nationality: string;
    dateOfBirth: string;
    gender: string;
    province: string;
    district: string;
    municipality: string;
    ward: string;
    permanentAddress: string;
    expertise: string;
    trainings: string;
    sectors: string[];
    otherSector: string;
}

export default function VolunteerForm() {
    const [formValues, setFormValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        nationality: '',
        dateOfBirth: '',
        gender: '',
        province: '',
        district: '',
        municipality: '',
        ward: '',
        permanentAddress: '',
        expertise: '',
        trainings: '',
        sectors: [],
        otherSector: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted data:', formValues);
    };

    return (
        <form
            className={styles.form}
            // FIX ME: Add email link here??
            onSubmit={undefined}
        >
            <div className={styles.formHeader}>
                <Heading
                    size="small"
                >
                    Volunteer with us
                </Heading>
                Want to make a difference? Sign up to volunteer and support our humanitarian work.
            </div>
            <div className={styles.content}>
                <TextInput
                    name="firstName"
                    label="First Name"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="Eg. name"
                />
                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Eg. name"
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="emailAddress"
                    label="Email Address"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="email"
                />
                <TextInput
                    name="phoneNumber"
                    label="Phone Number"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="nationality"
                    label="Nationality"
                    value={formValues.nationality}
                    onChange={handleChange}
                    placeholder="Enter your nationality"
                />
                {/* // TODO: Fix this add date */}
                <TextInput
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={formValues.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Enter your date of birth"
                />
            </div>
            <div>
                <Heading
                    size="extraSmall"
                    font="normal"
                >
                    Gender
                </Heading>
                <div className={styles.content}>
                    {gender.map((g) => (
                        <label htmlFor={g}>
                            <input
                                type="radio"
                                name="gender"
                                value={formValues.gender}
                                checked={formValues.gender === g}
                                onChange={handleChange}
                            />
                            {g}
                        </label>
                    ))}
                </div>
            </div>
            Permanent Address
            <div className={styles.content}>
                <TextInput
                    name="province"
                    label="Province"
                    value={formValues.province}
                    onChange={handleChange}
                    placeholder="Enter your province"
                />
                <TextInput
                    name="district"
                    label="District"
                    value={formValues.district}
                    onChange={handleChange}
                    placeholder="Enter your district"
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="municipality"
                    label="Municipality"
                    value={formValues.municipality}
                    onChange={handleChange}
                    placeholder="Enter your municipality"
                />
                <TextInput
                    name="ward"
                    label="Ward No."
                    value={formValues.ward}
                    onChange={handleChange}
                    placeholder="Enter your ward number"
                />
            </div>
            <Heading
                size="extraSmall"
                font="normal"
            >
                Area of expertise, special skills
            </Heading>
            <textarea
                className={styles.input}
            />
            <Heading
                size="extraSmall"
                font="normal"
            >
                Skills and/or trainings I would like to get
            </Heading>
            <textarea
                className={styles.input}
            />
            {/*
            <Heading
                size="extraSmall"
                font="normal"
            >
                In which sector do you want to volunteer?
            </Heading>
            <input
                type="checkbox"
                className={styles.input}
            />
            */}
            <Button
                className={styles.submitButton}
                onClick={handleSubmit}
            >
                Continue
            </Button>
        </form>
    );
}
