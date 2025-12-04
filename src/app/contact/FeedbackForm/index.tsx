'use client';

import { useState } from 'react';

import DateInput from '#components/DateInput';
import Link from '#components/Link';
import RadioInput from '#components/RadioInput';
import SelectInput from '#components/SelectInput';
import TextArea from '#components/TextArea';

import provincesData from '@/app/get-involved/volunteer/VolunteerForm/provinces.json';
import styles from './styles.module.css';

interface FormValues {
    date: string;
    province: string;
    district: string;
    gender: string;
    ageGroup?: string;
    feedback?: string;
}

const genders = ['Male', 'Female', 'Other'];

const ageGroups = [
    { id: 'below-13', name: 'Below 13 years' },
    { id: '13-17', name: '13 - 17' },
    { id: '18-29', name: '18 - 29' },
    { id: '30-39', name: '30 - 39' },
    { id: '40-49', name: '40 - 49' },
    { id: '50-59', name: '50 - 59' },
    { id: '60-69', name: '60 - 69' },
    { id: '70-79', name: '70 - 79' },
    { id: '80+', name: '80+' },
    { id: 'prefer-not', name: "I don't want to mention" },
];

interface District {
    id: number;
    name: string;
}

interface Province {
    id: number;
    name: string;
    district: District[];
}

const emailToSubmitFeedbackForm = 'test-nrcs@mailinator.com';

export default function ContactForm() {
    const [formValues, setFormValues] = useState<FormValues>({
        date: '',
        province: '',
        district: '',
        gender: '',
        ageGroup: '',
        feedback: '',
    });

    const provinces: Province[] = provincesData;
    const districts = provinces ? provinces.find(
        (province) => province.id === Number(formValues.province),
    )?.district || [] : [];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const subject = encodeURIComponent(`Feedback message from ${formValues.district} ${formValues.province} (${formValues.gender})`);
    const body = encodeURIComponent(`
        Date: ${formValues.date}
        Province: ${formValues.province}
        District: ${formValues.district}
        Gender: ${formValues.gender}
        Age group: ${formValues.ageGroup}
        Feedback:
            ${formValues.feedback}
    `);

    const hrefForSubmit = `mailto:${emailToSubmitFeedbackForm}?subject=${subject}&body=${body}`;

    return (
        <form
            className={styles.form}
        >
            <DateInput
                label="Date"
                name="date"
                value={formValues.date}
                onChange={handleChange}
            />
            <div className={styles.content}>
                <SelectInput
                    name="province"
                    label="Province"
                    placeholder="Select Province"
                    value={formValues.province}
                    options={provinces}
                    onChange={handleChange}
                />
                <SelectInput
                    name="district"
                    label="District"
                    placeholder="Select District"
                    value={formValues.district}
                    options={districts}
                    onChange={handleChange}
                    disabled={formValues.province === ''}
                />
            </div>
            <RadioInput
                name="gender"
                label="Gender"
                options={genders}
                value={formValues.gender}
                onChange={handleChange}
            />
            <SelectInput
                name="age-group"
                label="Age group"
                placeholder="Select Age group"
                value={formValues.ageGroup ?? ageGroups[-1]?.id}
                options={ageGroups}
                onChange={handleChange}
            />
            <TextArea
                name="feedback"
                label="Message"
                value={formValues.feedback ?? ''}
                placeholder="Type message here"
                onChange={handleChange}
            />
            <Link
                href={hrefForSubmit}
                variant="button"
                className={styles.submitButton}
            >
                Submit
            </Link>
        </form>
    );
}
