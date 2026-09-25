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
import allData, { type StaticData } from '#lib/staticData';
import adminStructure from '#public/administrative-structure.jpg';
import organizationStructure from '#public/organizational-structure.jpg';

import styles from './page.module.css';

const cecDescription = 'Nepal Red Cross Society (NRCS) is '
    + 'led by a Central Executive Committee (CEC). \n \n '
    + 'Government of Nepal has formed a 9-member '
    + 'Ad hoc Central Executive Committee (CEC) dated 26 Jestha 2083. '
    + 'The name list of the committee with designation is as follows:';

type CecMember = StaticData['cecMembers']['results'][number];

interface Props {
    member: CecMember;
}

function CecMemberCard(props: Props) {
    const { member } = props;
    const {
        name, email, secondaryEmail, address, contactNumber, photo,
    } = member;
    const photoUrl = photo?.url || undefined;
    const emails = [email, secondaryEmail].filter(Boolean);

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
                {emails.map((addr) => (
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
                {!!address && (
                    <Heading font="normal" size="extraSmall" className={styles.memberName}>
                        <IoLocationOutline />
                        {address}
                    </Heading>
                )}
                {!!contactNumber && (
                    <Heading font="normal" size="extraSmall" className={styles.memberName}>
                        <IoCallOutline />
                        {contactNumber}
                    </Heading>
                )}

            </div>
        </div>
    );
}

const cecMembers = allData.cecMembers?.results ?? [];
const officeBearers = cecMembers.filter((member) => member.memberType === 'OFFICE_BEARER');
const members = cecMembers.filter((member) => member.memberType === 'MEMBER');
const staff = cecMembers.filter((member) => member.memberType === 'STAFF');

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
                        {officeBearers.map((leader) => (
                            <div key={leader.id}>
                                <Heading
                                    size="medium"
                                    className={styles.title}
                                    withBackground
                                >
                                    {leader.designation}
                                </Heading>
                                <CecMemberCard member={leader} />
                            </div>
                        ))}
                    </div>
                    {members.length > 0 && (
                        <div className={styles.members}>
                            <Heading
                                size="medium"
                                className={styles.title}
                                withBackground
                            >
                                Members
                            </Heading>
                            <div className={styles.memberList}>
                                {members.map((member) => (
                                    <CecMemberCard
                                        member={member}
                                        key={member.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Section>
            {staff.length > 0 && (
                <Section
                    childrenContainerClassName={styles.adminStructure}
                >
                    <div className={styles.cecList}>
                        {staff.map((leader) => (
                            <div key={leader.id} className={styles.leadership}>
                                <Heading
                                    size="medium"
                                    className={styles.title}
                                    withBackground
                                >
                                    {leader.designation}
                                </Heading>
                                <CecMemberCard member={leader} />
                            </div>
                        ))}
                    </div>
                </Section>
            )}
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
