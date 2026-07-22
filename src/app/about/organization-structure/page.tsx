import {
    IoCallOutline,
    IoLocationOutline,
    IoMailOutline,
    IoPersonOutline,
} from 'react-icons/io5';
import {
    _cs,
    isDefined,
    isNotDefined,
} from '@togglecorp/fujs';

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
    staffLeader,
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
            {isDefined(photoUrl) && (
                <ImageWrapper
                    src={photoUrl}
                    alt={name ?? ''}
                    className={styles.image}
                    imageClassName={styles.imageInner}
                />
            )}
            {isNotDefined(photoUrl) && (
                <div className={_cs(styles.image, styles.imageFallback)}>
                    <IoPersonOutline />
                </div>
            )}

            <div className={styles.memberInfo}>
                <Heading font="heading" size="small">
                    {name}
                </Heading>
                {isDefined(email) && (Array.isArray(email) ? email : [email]).map((addr) => (
                    <Link
                        key={addr}
                        href={`mailto:${addr}`}
                        target="_blank"
                        className={_cs(styles.memberName, styles.link)}
                    >
                        <IoMailOutline />
                        {addr}
                    </Link>
                ))}
                {isDefined(address) && (
                    <Heading font="normal" size="extraSmall" className={styles.memberName}>
                        <IoLocationOutline />
                        {address}
                    </Heading>
                )}
                {isDefined(contact) && (
                    <Heading font="normal" size="extraSmall" className={styles.memberName}>
                        <IoCallOutline />
                        {contact}
                    </Heading>
                )}

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
                childrenContainerClassName={styles.adminStructure}
            >
                <div className={styles.cecList}>
                    {staffLeader.map((leader) => (
                        <div key={leader.title} className={styles.leadership}>
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
