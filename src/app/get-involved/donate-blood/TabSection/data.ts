interface WhereToDonate {
    id: string;
    title: string;
    description: string;
}

const whereToDonate: WhereToDonate[] = [
    {
        id: '1',
        title: 'Sunday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)

#### 2. Charumati Bihar, Chabahil, Kathmandu
- Every Sunday, 11:30 AM to 3:30 PM
- Organizer: NRCS Chabahil Pashupati Sub-Chapter
- [Location](https://goo.gl/maps/qfjQjrVzmqWw3Nx7A)

#### 3. Bhugol Park, New Road, Kathmandu
- Every Sunday, 11 AM to 03 PM
- Organizer: Dev Corner Sewa Samiti
- [Location](https://goo.gl/maps/AHYpprpgeLp7RMMF9)
`,
    },
    {
        id: '2',
        title: 'Monday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)
`,
    },
    {
        id: '3',
        title: 'Tuesday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)

#### 2. Lampokhari, Chabahil, Kathmandu
- Every Tuesday, 10 AM to 2 PM
- Organizer: Lions Club of Kathmandu Chabahil
- [Location](https://goo.gl/maps/6HYkVZuhpGjBmvZXA)
`,
    },
    {
        id: '4',
        title: 'Wednesday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)

#### 2. Dirghayu Hospital, Chabahil, Kathmandu
- Every Wednesday, 11 AM to 3 PM
- Organizer: Lions Club Of Kathmandu City
- [Location](https://goo.gl/maps/gVMzVjrbMimwQ4Zv7)
`,
    },
    {
        id: '5',
        title: 'Thursday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)

#### 2. Bhugol Park, New Road, Kathmandu
- Every Thursday and Friday, 11 AM to 03 PM
- Organizer: Pashupati Marwadi Sewa Sangh
- [Location](https://goo.gl/maps/AHYpprpgeLp7RMMF9)

#### 3. Ason, near Ratna Park, Kathmandu
- Every Sunday to Friday, 11 AM to 3 PM
- Organizer: Sewa Samiti and Lions Club of Laliguras
- [Location](https://goo.gl/maps/RH6ox4aaH98P7iDh7)
`,
    },
    {
        id: '6',
        title: 'Friday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)

#### 2. Chhakku Bakku Park New Baneshwor, Kathmandu
- Every Thursday and Friday, 11:30 AM to 3:30 PM
- Organizer: Arthamani Multipurpose Co-operative Ltd.

#### 3. Dillibazar, Pipalbot, Kathmandu
- Every Friday, 12 AM to 4 PM
- Organizer: Shanti Gyan Satsang Bhajan Mandal
`,
    },
    {
        id: '7',
        title: 'Saturday',
        description: `#### 1. NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu
- Every day(Sunday-Saturday), 7 AM to 7 PM
- Organizer: Nepal Red Cross Society
- [Location](https://goo.gl/maps/97d2GukQwyjsfJxU8)

#### 2. Pashupati Temple Premises
- Every Monday and Saturday, 08 AM to 12 AM
- Organizer: Ganeshman Singh Adhyayan Pratisthan
- [Location](https://goo.gl/maps/vyKU2g7xix43zQeN9)

#### 3. Bouddha Stupa
- Every Saturday 11:00 AM to 3:00 PM 
- Organizer: Sweta Blood Donation Campaign

#### 4. Tebahal, New Road, Kathmandu
- Every Saturday 7AM to 12 PM
- Organizer: Sankata Club (SBSC)
`,
    },
];

export interface OutsideValleyTable {
    id: number;
    bloodCenter: string;
    focalPerson: string;
    contactNo: string;
    district: string;
}

export const outsideValleyTable: OutsideValleyTable[] = [
    {
        id: 1,
        bloodCenter: 'Baglung',
        focalPerson: 'Gurudatta Sharma',
        contactNo: '068-520273',
        district: 'Baglung',
    },
    {
        id: 2,
        bloodCenter: 'Banepa',
        focalPerson: 'Radha Thapa',
        contactNo: '011-661431',
        district: 'Kavre',
    },
    {
        id: 3,
        bloodCenter: 'Bhadrapur',
        focalPerson: 'Torna Bikram Karki',
        contactNo: '023-520814',
        district: 'Jhapa',
    },
    {
        id: 4,
        bloodCenter: 'Bhaktapur',
        focalPerson: 'Uttam Kusma',
        contactNo: '01-6612266',
        district: 'Bhaktapur',
    },
    {
        id: 5,
        bloodCenter: 'Bharatpur',
        focalPerson: 'Ramesh Kanta Poudel',
        contactNo: '065-520880',
        district: 'Chitwan',
    },
    {
        id: 6,
        bloodCenter: 'Birgunj',
        focalPerson: 'Saurab',
        contactNo: '051-522504',
        district: 'Parsa',
    },
    {
        id: 7,
        bloodCenter: 'Butawal',
        focalPerson: 'Jogbahadur Gurung',
        contactNo: '071-541004',
        district: 'Butawal',
    },
    {
        id: 8,
        bloodCenter: 'Damak',
        focalPerson: 'Sidhartha Dahal',
        contactNo: '023-582101',
        district: 'Jhapa',
    },
    {
        id: 9,
        bloodCenter: 'Dhangadi',
        focalPerson: 'Dharani Prasad Pant',
        contactNo: '091-521600',
        district: 'Kailali',
    },
    {
        id: 10,
        bloodCenter: 'Dhankuta',
        focalPerson: 'Niranjan Aale',
        contactNo: '026-520135',
        district: 'Dhankuta',
    },
    {
        id: 11,
        bloodCenter: 'Dharan',
        focalPerson: 'Subash Chandra Singh',
        contactNo: '025-520968',
        district: 'Dharan',
    },
    {
        id: 12,
        bloodCenter: 'Ghorahi',
        focalPerson: 'Dilip Kumar Neupane',
        contactNo: '082-61460',
        district: 'Dang',
    },
    {
        id: 13,
        bloodCenter: 'Hetauda',
        focalPerson: 'Tanka Prasad Dahal',
        contactNo: '057-522977',
        district: 'Makawanpur',
    },
    {
        id: 14,
        bloodCenter: 'Janakpur',
        focalPerson: 'Narayan Neupane',
        contactNo: '41520870',
        district: 'Dhanusha',
    },
    {
        id: 15,
        bloodCenter: 'Mahendranagar',
        focalPerson: 'Labdev Joshi',
        contactNo: '091-523983',
        district: 'Kanchanpur',
    },
    {
        id: 16,
        bloodCenter: 'Myanglung',
        focalPerson: 'Pradip Hanglimbu',
        contactNo: '026-460101',
        district: 'Terhathum',
    },
    {
        id: 17,
        bloodCenter: 'Nepalgunj',
        focalPerson: 'Upendra Regmi',
        contactNo: '071-520174',
        district: 'Banke',
    },
    {
        id: 18,
        bloodCenter: 'Pokhara',
        focalPerson: 'DhurbaMani Lamichhane',
        contactNo: '061-521091',
        district: 'Kaski',
    },
    {
        id: 19,
        bloodCenter: 'Rajbiraj',
        focalPerson: 'Nabin Kumar Jha',
        contactNo: '031-521121',
        district: 'Saptari',
    },
    {
        id: 20,
        bloodCenter: 'Siraha',
        focalPerson: 'Pradip Kumar Yadav',
        contactNo: '033-560975',
        district: 'Lahan',
    },
    {
        id: 21,
        bloodCenter: 'Surkhet',
        focalPerson: 'Prakash Shrestha',
        contactNo: '083-520310',
        district: 'Surkhet',
    },
    {
        id: 22,
        bloodCenter: 'NRCS Kawasoti SubChapter, Nawalparasi',
        focalPerson: 'Saraswoti Bhusal',
        contactNo: '078-540418',
        district: 'Nawalpur, Bardaghat Susta east',
    },
];

export const canIDonate = `Blood donation is open for almost everyone with only a few limitations based on the medical conditions of the blood donor.

You can donate blood once in every three months.

## Donating person has to apply:
- Be 18 to 60 years old
- Weight above 45 kg
- Have hemoglobin above 12 gm/dl
- Have blood pressure 110-160 / 70-96 mmHg
- Not to be pregnant, breastfeeding, and have at least 8 days since the start of the recent menstruation
- Not having recent use of drugs or strong medicines (people who take strong medicine for a short period will not able to donate blood from one week up to 2 years)
- Not to had a medical surgery for 2 years
- If you have had one of these conditions, you are unfortunately restricted to donating blood but recommended to encourage your family members, friends and loved ones to donate:

**Cancer, Heart diseases, HIV/AIDS, Hepatitis B or C, Hemophilia and Thalassemia, Diabetes, Liver diseases, Polycythemia Vera, Asthma, An Endocrine Disorder or A Hormonal disorder**
`;

export const donateBloodOrganization = `## Donation event for an organization or company
We are visiting companies and organizations daily to collect blood. It is a great activity for team building and recreational days, and social responsibility events.

Arrange a regular or one-time blood donation at your company or organization by contacting Mr. Sandesh Thapa via email, <sandesh.thapa@nrcs.org>

The earlier we set the date, the easier we can plan the efficient blood supply management. But if needed, we can deploy our blood collection team with even short notice! Never think it is too late or too early – today is just the perfect time to start planning the blood donation event in your community or company!
`;

export default whereToDonate;
