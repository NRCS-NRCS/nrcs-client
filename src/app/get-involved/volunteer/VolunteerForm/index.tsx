'use client';

import { useState } from 'react';

import Button from '#components/Button';
import DateInput from '#components/DateInput';
import Heading from '#components/Heading';
import Link from '#components/Link';
import RadioInput from '#components/RadioInput';
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
const emailToSubmitVolunteerForm = 'nrcs@nrcs.org';

export default function VolunteerForm() {
    const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
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

    const handleSameAsPermanentChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { checked } = e.target;
        setIsSameAsPermanent(checked);
        if (checked) {
            setFormValues((prev) => ({
                ...prev,
                temporaryProvince: prev.permanentProvince,
                temporaryDistrict: prev.permanentDistrict,
                temporaryMunicipality: prev.permanentMunicipality,
                temporaryWard: prev.permanentWard,
            }));
        } else {
            setFormValues((prev) => ({
                ...prev,
                temporaryProvince: '',
                temporaryDistrict: '',
                temporaryMunicipality: '',
                temporaryWard: '',
            }));
        }
    };

    const subject = encodeURIComponent(`Volunteer Form from ${formValues.firstName} ${formValues.lastName} (${formValues.email})`);
    const body = encodeURIComponent(`
        First Name: ${formValues.firstName}
        Last Name: ${formValues.lastName}
        Email: ${formValues.email}
        Phone Number: ${formValues.phoneNumber}
        Nationality: ${formValues.nationality}
        Date of Birth: ${formValues.dateOfBirth}
        Gender: ${formValues.gender}
        Permanent Address:
            Province: ${provinces.find((province) => province.id === Number(formValues.permanentProvince))?.name || ''}
            District: ${permanentDistricts.find((district) => district.id === Number(formValues.permanentDistrict))?.name || ''}
            Municipality: ${permanentMunicipalities.find((municipality) => municipality.id === Number(formValues.permanentMunicipality))?.name || ''}
            Ward Number: ${formValues.permanentWard}
        Temporary Address:
            Province: ${provinces.find((province) => province.id === Number(formValues.temporaryProvince))?.name || ''}
            District: ${tempDistricts.find((district) => district.id === Number(formValues.temporaryDistrict))?.name || ''}
            Municipality: ${tempMunicipalities.find((municipality) => municipality.id === Number(formValues.temporaryMunicipality))?.name || ''}
            Ward Number: ${formValues.temporaryWard}
        Area of expertise, special skills: ${formValues.expertise}
        Skills and/or trainings I would like to get: ${formValues.trainings}
        Sectors to volunteer in: ${formValues.sectors.join(', ')}
        Other Sector: ${formValues.otherSector}
        Terms Accepted: ${formValues.termsAccepted ? 'Yes' : 'No'}
    `);
    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        window.location.href = `mailto:${emailToSubmitVolunteerForm}?subject=${subject}&body=${body}`;
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
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
                    required
                />
                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="email"
                    label="Email Address"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                />
                <TextInput
                    name="phoneNumber"
                    label="Phone Number"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
            </div>
            <div className={styles.content}>
                <TextInput
                    name="nationality"
                    label="Nationality"
                    value={formValues.nationality}
                    onChange={handleChange}
                    placeholder="Nationality"
                    required
                />
                <DateInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formValues.dateOfBirth}
                    onChange={handleChange}
                    required
                />
            </div>
            <RadioInput
                name="gender"
                label="Gender"
                options={genders}
                value={formValues.gender}
                onChange={handleChange}
                required
            />
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
                    required
                />
                <SelectInput
                    name="permanentDistrict"
                    label="District"
                    placeholder="Select District"
                    value={formValues.permanentDistrict}
                    options={permanentDistricts}
                    onChange={handleChange}
                    disabled={formValues.permanentProvince === ''}
                    required
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
                    required
                />
                <TextInput
                    name="permanentWard"
                    label="Ward Number"
                    value={formValues.permanentWard}
                    onChange={handleChange}
                    placeholder="Ward Number"
                    required
                />
            </div>
            <div className={styles.subSection}>
                <p>
                    Temporary Address
                </p>
                <label htmlFor="sameAsPermanent" className={styles.sameAsPermanent}>
                    <input
                        id="sameAsPermanent"
                        name="sameAsPermanent"
                        type="checkbox"
                        value={isSameAsPermanent ? 'yes' : 'no'}
                        checked={isSameAsPermanent}
                        onChange={handleSameAsPermanentChange}
                    />
                    Same as Permanent Address
                </label>
            </div>
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
                    required
                />
                <TextInput
                    name="temporaryWard"
                    label="Ward Number"
                    value={formValues.temporaryWard}
                    onChange={handleChange}
                    placeholder="Ward Number"
                    required
                />
            </div>
            <div className={styles.separator} />
            <div className={styles.textArea}>
                <TextArea
                    label="Area of expertise, special skills"
                    name="expertise"
                    value={formValues?.expertise}
                    onChange={handleChange}
                    required
                />
                <TextArea
                    label="Skills and/or trainings I would like to get"
                    name="trainings"
                    value={formValues?.trainings}
                    onChange={handleChange}
                    required
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
                    required
                />
                &nbsp; I certify I have read the NRCS Code of Conduct.
            </label>
            <Button
                name="submit"
                type="submit"
                className={styles.submitButton}
                variant="primary"
                disabled={!formValues.termsAccepted}
            >
                Continue
            </Button>
        </form>
    );
}
