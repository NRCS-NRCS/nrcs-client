import type { StaticImageData } from 'next/image';

import bisalKumarBhandari from '#public/cec/1-Dr-Bisal-Kumar-Bhandari.png';
import rishiRamanKanal from '#public/cec/2-Rishi-Raman-Khanal.png';
import abishmiNeupane from '#public/cec/5-Abishmi-Neupane.jpg';
import puspaDas from '#public/cec/6-Puspa-Das.jpg';
import premLama from '#public/cec/7-Prem-Lama.jpg';
import manjuSaudBohara from '#public/cec/9-Manju-Saud-Bohara.png';

export interface CecMember {
    id: string;
    name?: string;
    email?: string | string[];
    address?: string;
    contact?: string;
    photoUrl?: string | StaticImageData | null;
}

export interface CecLeader extends CecMember {
    title: string;
}
export const cecLeader : CecLeader[] = [
    {
        id: 'bishal-kumar-bhandari',
        title: 'Chairperson',
        name: 'Dr. Bishal Kumar Bhandari',
        email: 'bishalkumarbhandari@gmail.com',
        address: 'Dolakha',
        contact: '9851237373',
        photoUrl: bisalKumarBhandari,
    },
    {
        id: 'rishi-raman-khanal',
        title: 'Secretary General',
        name: 'Mr. Rishi Raman Khanal',
        email: 'rishi.r.khanal@gmail.com',
        address: 'Gorkha',
        contact: '9851069244',
        photoUrl: rishiRamanKanal,
    },
    {
        id: 'kabindra-karki',
        title: 'Treasurer General',
        name: 'Mr. Kabindra Karki',
        email: 'kabinkarki55555@gmail.com',
        contact: '9851174594',
    },
];

export const staffLeader : CecLeader[] = [
    {
        id: 'sakun-kumar-joshi',
        title: 'Governance Secretariat',
        name: 'Ms. Tara Devi Gurung',
        email: ['tara.gurung@nrcs.org', 'secretariat@nrcs.org'],
        contact: '9809393760',
    },
];

export const cecMember : CecMember[] = [
    {
        id: 'sharada-kumar-neupane',
        name: 'Mr. Sharada kumar Neupane',
        email: 'neupanesaroj476@gmail.com',
        contact: '9851032146',
    },
    {
        id: 'abishmi-neupane',
        name: 'Ms. Abishmi Neupane',
        email: 'neupane98088@gmail.com',
        address: 'Dang',
        contact: '9851327011',
        photoUrl: abishmiNeupane,
    },
    {
        id: 'puspa-das',
        name: 'Ms. Puspa Das',
        email: 'puspadas8692@gmail.com',
        address: 'Saptari',
        contact: '9842448222',
        photoUrl: puspaDas,
    },
    {
        id: 'prem-lama',
        name: 'Mr. Prem Lama',
        email: 'lamap99@gmail.com',
        address: 'Sindhupalchok',
        contact: '9851043592',
        photoUrl: premLama,
    },
    {
        id: 'bicky-kumar-sarraf',
        name: 'Bicky kumar Sarraf',
        email: 'bickysarraf08@gmail.com',
        contact: '9809161010',
    },
    {
        id: 'manju-saud-bohara',
        name: 'Ms. Manju Saud Bohara',
        email: 'saudmanju.140@gmail.com',
        address: 'Kailali',
        contact: '9868411014',
        photoUrl: manjuSaudBohara,
    },
];

export const cecDescription = 'Nepal Red Cross Society (NRCS) is '
    + 'led by a Central Executive Committee (CEC). \n \n '
    + 'Government of Nepal has formed a 9-member '
    + 'Ad hoc Central Executive Committee (CEC) dated 26 Jestha 2083. '
    + 'The name list of the committee with designation is as follows:';
