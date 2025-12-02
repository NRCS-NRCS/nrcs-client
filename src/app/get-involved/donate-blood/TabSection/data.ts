type AddressDescription = {
    id:string ;
    title: string;
    time: string;
    organizer: string;
    location?: string;
};
interface WhereToDonate {
    id: string;
    title: string;
    description?: AddressDescription[];

}

const whereToDonate: WhereToDonate[] = [
    {
        id: '1',
        title: 'Sunday',
        description: [
            {
                id: '1',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
            {
                id: '2',
                title: 'Charumati Bihar, Chabahil, Kathmandu',
                time: 'Every Sunday, 11:30 AM to 3:30 PM',
                organizer: 'NRCS Chabahil Pashupati Sub-Chapter',
                location: 'https://www.google.com/maps/place/Chabahil+Chowk/@27.7058945,85.3271585,14z/data=!4m5!3m4!1s0x39eb197ada3e4963:0xbc420a370950f168!8m2!3d27.7170965!4d85.3465538?shorturl=1',
            },
            {
                id: '3',
                title: 'Bhugol Park, New Road, Kathmandu',
                time: 'Every Sunday, 11 AM to 03 PM',
                organizer: 'Dev Corner Sewa Samiti',
                location: 'https://www.google.com/maps/place/Bhugol+Park,+New+Rd,+Kathmandu+44600/@27.7034402,85.3073774,17z/data=!3m1!4b1!4m5!3m4!1s0x39eb1855c0f5d339:0x50bd123a4509ed3f!8m2!3d27.7034558!4d85.3095423?shorturl=1',
            },
        ],
    },
    {
        id: '2',
        title: 'Monday',
        description: [
            {
                id: '1',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
            {
                id: '2',
                title: 'Bir Hospital, New Road, Kathmandu',
                time: 'Every Friday, 10 AM to 2 PM',
                organizer: 'Lions Club Of Kathmandu City',
                location: 'New Road, Kathmandu',
            },
        ],
    },
    {
        id: '3',
        title: 'Tuesday',
        description: [
            {
                id: '1',
                title: 'Lampokhari, Chabahil, Kathmandu',
                time: 'Every Tuesday, 10 AM to 2 PM',
                organizer: 'Lions Club of Kathmandu Chabahil',
                location: 'https://www.google.com/maps/place/Lal+Pokhari+Marg,+Kathmandu+44600/@27.7155011,85.3408348,17z/data=!4m6!3m5!1s0x39eb1971af7fa9e7:0x558b4cf325415c3f!8m2!3d27.7154236!4d85.3410362!16s%2Fg%2F1ydn_f3g2?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
            {
                id: '2',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
        ],
    },
    {
        id: '4',
        title: 'Wednesday',
        description: [
            {
                id: '1',
                title: 'Dirghayu Hospital, Chabahil, Kathmandu',
                time: 'Every Wednesday, 11 AM to 3 PM',
                organizer: 'Lions Club Of Kathmandu City',
                location: 'https://www.google.com/maps/place/Dirghayu+Guru+Hospital+and+Research+Center/@27.7145232,85.3429676,17z/data=!3m1!4b1!4m5!3m4!1s0x39eb197a7b054a87:0x5e9c9d3f9f72f10a!8m2!3d27.7145232!4d85.3451563?shorturl=1',
            },
            {
                id: '2',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
        ],
    },
    {
        id: '5',
        title: 'Thursday',
        description: [
            {
                id: '1',
                title: 'Ason, near Ratna Park, Kathmandu',
                time: 'Every Sunday to Friday, 11 AM to 3 PM',
                organizer: 'Sewa Samiti and Lions Club of Laliguras',
                location: 'https://www.google.com/maps/place/Ason,+Kathmandu+44600/@27.7075907,85.3123918,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb18ffc9c69a2d:0x8061872efee793b0!8m2!3d27.7076992!4d85.3120061!16s%2Fg%2F12hyz9f49?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
            {
                id: '2',
                title: 'Bhugol Park, New Road, Kathmandu',
                time: 'Every Sunday, 11 AM to 03 PM',
                organizer: 'Dev Corner Sewa Samiti',
                location: 'https://www.google.com/maps/place/Bhugol+Park,+New+Rd,+Kathmandu+44600/@27.7034402,85.3073774,17z/data=!3m1!4b1!4m5!3m4!1s0x39eb1855c0f5d339:0x50bd123a4509ed3f!8m2!3d27.7034558!4d85.3095423?shorturl=1',
            },
            {
                id: '3',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
        ],
    },
    {
        id: '6',
        title: 'Friday',
        description: [
            {
                id: '1',
                title: 'Chhakku Bakku Park New Baneshwor, Kathmandu',
                time: 'Every Thursday and Friday, 11:30 AM to 3:30 PM',
                organizer: 'Arthamani Multipurpose Co-operative Ltd',
            },
            {
                id: '2',
                title: 'Dillibazar, Pipalbot, Kathmandu',
                time: 'Every Friday, 12 AM to 4 PM',
                organizer: 'Shanti Gyan Satsang Bhajan Mandal',
            },
            {
                id: '3',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
        ],
    },
    {
        id: '7',
        title: 'Saturday',
        description: [
            {
                id: '1',
                title: 'Pashupati Temple Premises',
                time: 'Every Monday and Saturday, 08 AM to 12 AM',
                organizer: 'Ganeshman Singh Adhyayan Pratisthan',
                location: 'https://www.google.com/maps/place/Pashupatinath+Temple/@27.7103689,85.3479259,18z/data=!4m6!3m5!1s0x39eb191aaaaaaaab:0x424c7d0a60df9091!8m2!3d27.710512!4d85.3488125!16zL20vMGNzX2hz?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
            {
                id: '2',
                title: 'NRCS Central Blood Bank, Bhrikuti Mandap, Kathmandu',
                time: 'Every day (Sunday-Saturday), 7 AM to 7 PM',
                organizer: 'Nepal Red Cross Society',
                location: 'https://www.google.com/maps/place/Nepal+Red+Cross+Society,+Central+Blood+Transfusion+Service/@27.7019209,85.2877858,14z/data=!4m6!3m5!1s0x39eb19e8364738c1:0x23d588bcf9ea038e!8m2!3d27.7020577!4d85.320027!16s%2Fg%2F11c1p31dys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D',
            },
            {
                id: '3',
                title: 'Bouddha Stupa',
                time: 'Every Saturday 11:00 AM to 3:00 PM',
                organizer: 'Sweta Blood Donation Campaign',
            },
            {
                id: '4',
                title: 'Tebahal, New Road, Kathmandu',
                time: 'Every Saturday 7AM to 12 PM',
                organizer: 'Sankata Club (SBSC)',
            },
        ],
    },
];

export default whereToDonate;
