'use client';

import { useState } from 'react';

import Button from '#components/Button';
import Heading from '#components/Heading';
import Link from '#components/Link';
import SelectInput from '#components/SelectInput';
import TextArea from '#components/TextArea';
import TextInput from '#components/TextInput';

import provincesData from './provinces.json';
import styles from './styles.module.css';

const genders = ['Male', 'Female', 'Other'];

interface Nplp {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
    nplp: Nplp[];
}

interface Province {
    id: number;
    name: string;
    district: District[];
}

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
    permanentProvince: string;
    permanentDistrict: string;
    permanentMunicipality: string;
    permanentWard: string;
    temporaryProvince: string;
    temporaryDistrict: string;
    temporaryMunicipality: string;
    temporaryWard: string;
    expertise: string;
    trainings: string;
    sectors: string[];
    otherSector: string;
    termsAccepted: boolean;
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
        temporaryProvince: '',
        temporaryDistrict: '',
        temporaryMunicipality: '',
        temporaryWard: '',
        permanentProvince: '',
        permanentDistrict: '',
        permanentMunicipality: '',
        permanentWard: '',
        expertise: '',
        trainings: '',
        sectors: [],
        otherSector: '',
        termsAccepted: false,
    });

    const provinces: Province[] = provincesData;
    const permanentDistricts = provinces ? provinces.find(
        (province) => province.id === Number(formValues.permanentProvince),
    )?.district || [] : [];

    const permanentMunicipalities = permanentDistricts ? permanentDistricts.find(
        (district) => district.id === Number(formValues.permanentDistrict),
    )?.nplp || [] : [];

    const tempDistricts = provinces ? provinces.find(
        (province) => province.id === Number(formValues.temporaryProvince),
    )?.district || [] : [];

    const tempMunicipalities = tempDistricts ? tempDistricts.find(
        (district) => district.id === Number(formValues.temporaryDistrict),
    )?.nplp || [] : [];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const input = e.target as HTMLInputElement;
            const { checked } = input;

            setFormValues((prev) => {
                if (name === 'sectors') {
                    const current = prev.sectors;
                    return checked
                        ? { ...prev, sectors: [...current, value] }
                        : { ...prev, sectors: current.filter((v) => v !== value) };
                }
                return { ...prev, [name]: checked };
            });
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        // eslint-disable-next-line no-console
        console.log('Submitted data:', formValues);
    };

    return (
        <form
            className={styles.form}
            onSubmit={undefined}
        >
            <div className={styles.formHeader}>
                <Heading
                    size="small"
                >
                    Volunteer with us
                </Heading>
                <p className={styles.subHeading}>
                    Want to make a difference?
                    Sign up to volunteer and support our humanitarian work.
                </p>
            </div>
            <div className={styles.content}>
                <TextInput
                    name="firstName"
                    label="First Name"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="email"
                    label="Email Address"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                />
                <TextInput
                    name="phoneNumber"
                    label="Phone Number"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="nationality"
                    label="Nationality"
                    value={formValues.nationality}
                    onChange={handleChange}
                    placeholder="Nationality"
                />
                <div className={styles.inputContent}>
                    <Heading
                        size="extraSmall"
                        font="normal"
                    >
                        Date of Birth
                    </Heading>
                    <input
                        className={styles.input}
                        name="dateOfBirth"
                        type="date"
                        value={formValues.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Heading
                size="extraSmall"
                font="normal"
            >
                Gender
            </Heading>
            <div className={styles.content}>
                {genders?.map((gender) => (
                    <label
                        htmlFor={gender}
                        key={gender}
                        className={styles.radioButton}
                    >
                        <input
                            id={gender}
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formValues.gender === gender}
                            onChange={handleChange}
                        />
                        {gender}
                    </label>
                ))}
            </div>
            <div className={styles.separator} />
            <p className={styles.subSection}>
                Permanent Address
            </p>
            <div className={styles.content}>
                <SelectInput
                    name="permanentProvince"
                    label="Province"
                    placeholder="Select Province"
                    value={formValues.permanentProvince}
                    options={provinces}
                    onChange={handleChange}
                />
                <SelectInput
                    name="permanentDistrict"
                    label="District"
                    placeholder="Select District"
                    value={formValues.permanentDistrict}
                    options={permanentDistricts}
                    onChange={handleChange}
                    disabled={formValues.permanentProvince === ''}
                />
            </div>
            <div className={styles.content}>
                <SelectInput
                    name="permanentMunicipality"
                    label="Municipality"
                    placeholder="Select Municipality"
                    value={formValues.permanentMunicipality}
                    options={permanentMunicipalities}
                    onChange={handleChange}
                    disabled={formValues.permanentDistrict === ''}
                />
                <TextInput
                    name="permanentWard"
                    label="Ward Number"
                    value={formValues.permanentWard}
                    onChange={handleChange}
                    placeholder="Ward Number"
                />
            </div>
            <p className={styles.subSection}>
                Temporary Address
            </p>
            <div className={styles.content}>
                <SelectInput
                    name="temporaryProvince"
                    label="Province"
                    placeholder="Select Province"
                    value={formValues.temporaryProvince}
                    options={provinces}
                    onChange={handleChange}
                />
                <SelectInput
                    name="temporaryDistrict"
                    label="District"
                    placeholder="Select District"
                    value={formValues.temporaryDistrict}
                    options={tempDistricts}
                    onChange={handleChange}
                    disabled={formValues.temporaryProvince === ''}
                />
            </div>
            <div className={styles.content}>
                <SelectInput
                    name="temporaryMunicipality"
                    label="Municipality"
                    placeholder="Select Municipality"
                    value={formValues.temporaryMunicipality}
                    options={tempMunicipalities}
                    onChange={handleChange}
                    disabled={formValues.temporaryDistrict === ''}
                />
                <TextInput
                    name="temporaryWard"
                    label="Ward Number"
                    value={formValues.temporaryWard}
                    onChange={handleChange}
                    placeholder="Ward Number"
                />
            </div>
            <div className={styles.separator} />
            <div className={styles.textArea}>
                <TextArea
                    label="Area of expertise, special skills"
                    name="expertise"
                    value={formValues?.expertise}
                    onChange={handleChange}
                />
                <TextArea
                    label="Skills and/or trainings I would like to get"
                    name="trainings"
                    value={formValues?.trainings}
                    onChange={handleChange}
                />
            </div>
            <Heading
                size="extraSmall"
                font="normal"
            >
                In which sector do you want to volunteer?
            </Heading>
            <div className={styles.checkbox}>
                {SECTOR_OPTIONS.map((sector) => {
                    const id = `sector-${sector}`;
                    return (
                        <div key={sector} className={styles.options}>
                            <input
                                id={id}
                                name="sectors"
                                type="checkbox"
                                value={sector}
                                checked={formValues.sectors.includes(sector)}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor={id}
                            >
                                {sector}
                            </label>
                        </div>
                    );
                })}
            </div>
            {formValues.sectors.includes('Other (please specify)') && (
                <TextInput
                    name="otherSector"
                    label="Please specify others"
                    value={formValues.otherSector}
                    onChange={handleChange}
                    placeholder="Please specify other"
                />
            )}
            <div className={styles.separator} />
            <p className={styles.term}>
                Submitting this volunteer application, I certify I understand
                <Link
                    href="/life-member-application-nepali.pdf"
                >
                    <span className={styles.link}>
                        &nbsp;
                        the code of conduct of nepal red cross society
                        &nbsp;
                    </span>
                </Link>
                and agree  to follow it always when serving as a red cross volunteer.
            </p>
            <p className={styles.term}>
                Agree to the terms
            </p>
            <label
                htmlFor="terms"
                className={styles.termAccepted}
            >
                <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formValues.termsAccepted}
                    onChange={handleChange}
                />
                &nbsp; I certify I have read the NRCS Code of Conduct.
            </label>
            <Button
                name="submit"
                className={styles.submitButton}
                onClick={handleSubmit}
                variant="border"
            >
                Continue
            </Button>
        </form>
    );
}
