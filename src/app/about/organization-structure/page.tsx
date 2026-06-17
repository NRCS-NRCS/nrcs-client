import {
    IoCallOutline,
    IoLocationOutline,
    IoMailOutline,
} from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

import Heading from '#components/Heading';
import ImageWrapper from '#components/ImageWrapper';
import Link from '#components/Link';
import Page from '#components/Page';
import Section from '#components/Section';
import adminStructure from '#public/administrative-structure.jpg';
import organizationStructure from '#public/organizational-structure.jpg';

import {
    cecDescription,
    cecLeader,
    type CecMember,
    cecMember,
} from './cecData';

import styles from './page.module.css';

interface Props {
    member: CecMember;
}

function CecMemberCard(props: Props) {
    const { member } = props;
    const {
        name, email, address, contact, photoUrl,
    } = member;

    return (
        <div className={styles.memberCard}>
            <ImageWrapper
                src={photoUrl ?? ''}
                alt={name}
                className={styles.image}
                imageClassName={styles.imageInner}
            />
            <div className={styles.memberInfo}>
                <Heading font="heading" size="small">
                    {name}
                </Heading>
                <Link
                    href={`mailto:${email}`}
                    target="_blank"
                    className={_cs(styles.memberName, styles.link)}
                >
                    <IoMailOutline />
                    {' '}
                    {email}
                </Link>
                <Heading font="normal" size="extraSmall" className={styles.memberName}>
                    <IoLocationOutline />
                    {address}
                </Heading>
                <Heading font="normal" size="extraSmall" className={styles.memberName}>
                    <IoCallOutline />
                    {contact}
                </Heading>
            </div>
        </div>
    );
}

export default function AboutUs() {
    return (
        <Page contentClassName={styles.page}>
            <Section
                heading="Central Executive Committee"
                childrenContainerClassName={styles.adminStructure}
                headingWithBackground
            >
                <Heading
                    size="extraSmall"
                    font="normal"
                    className={styles.description}
                >
                    {cecDescription}
                </Heading>
                <div className={styles.cecList}>
                    <div className={styles.leadership}>
                        {cecLeader.map((leader) => (
                            <div key={leader.title}>
                                <Heading
                                    size="medium"
                                    className={styles.title}
                                    withBackground
                                >
                                    {leader.title}
                                </Heading>
                                <CecMemberCard
                                    member={leader}
                                    key={leader.id}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.members}>
                        <Heading
                            size="medium"
                            className={styles.title}
                            withBackground
                        >
                            Members
                        </Heading>
                        <div className={styles.memberList}>
                            {cecMember.map((member) => (
                                <CecMemberCard
                                    member={member}
                                    key={member.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
            <Section
                heading="Administrative Structure"
                childrenContainerClassName={styles.adminStructure}
                headingWithBackground
            >
                <ImageWrapper
                    className={styles.bannerImage}
                    imageClassName={styles.image}
                    src={adminStructure}
                    alt="NRCS Administrative Structure"
                />
            </Section>
            <Section
                heading="Organizational Structure"
                childrenContainerClassName={styles.adminStructure}
                headingWithBackground
            >
                <ImageWrapper
                    className={styles.bannerImage}
                    imageClassName={styles.image}
                    src={organizationStructure}
                    alt="NRCS Organizaitonal Structure"
                />
            </Section>
        </Page>
    );
}
