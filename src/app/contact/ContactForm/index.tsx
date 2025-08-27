'use client';

import { useState } from 'react';

import Button from '#components/Button';
import TextArea from '#components/TextArea';
import TextInput from '#components/TextInput';

import styles from './styles.module.css';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log('Submitted data:', formValues);
    };
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
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
            <Button
                name="submit"
                onClick={handleSubmit}
                variant="primary"
            >
                Submit
            </Button>
        </form>
    );
}
