'use client';

import { useState } from 'react';

import Link from '#components/Link';
import TextArea from '#components/TextArea';
import TextInput from '#components/TextInput';

import styles from './styles.module.css';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

const emailToSubmitContactForm = 'test-nrcs@mailinator.com';

export default function ContactForm() {
    const [formValues, setFormValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const subject = encodeURIComponent(`Contact message from ${formValues.firstName} ${formValues.lastName} (${formValues.email})`);
    const body = encodeURIComponent(`
        First Name: ${formValues.firstName}
        Last Name: ${formValues.lastName}
        Email: ${formValues.email}
        Message:
            ${formValues.message}
    `);

    const hrefForSubmit = `mailto:${emailToSubmitContactForm}?subject=${subject}&body=${body}`;

    return (
        <form
            className={styles.form}
        >
            <div className={styles.inline}>
                <TextInput
                    name="firstName"
                    label="First Name"
                    value={formValues.firstName}
                    placeholder="eg: Kamala"
                    onChange={handleChange}
                />
                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formValues.lastName}
                    placeholder="eg: Subedi"
                    onChange={handleChange}
                />
            </div>
            <TextInput
                name="email"
                label="Email"
                type="email"
                value={formValues.email}
                placeholder="eg: kamala@gmail.com"
                onChange={handleChange}
            />
            <TextArea
                name="message"
                label="Message"
                value={formValues.message}
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
