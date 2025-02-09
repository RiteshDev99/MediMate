export interface DoctorDetailsProps {
  id: number;
  name: string;
  email: string;
  image: string;
  Contect: string;
  location: string;
  language: string;
  Qualification: string;
  Experience: string;
}

export const DoctorDetailList: DoctorDetailsProps[] = [
  {
    id: 1,
    name: 'Dr. Satendar Chaudhary',
    email: 'satendar@gmail.com',
    image:
      'https://i.imgur.com/CyiN1LS_d.jpeg?maxwidth=520&shape=thumb&fidelity=high',
    Contect: '+91 7840017008',
    location: 'Up, India',
    language: 'English / Hindi',
    Qualification: 'BDS',
    Experience: '8 Years',
  },
  {
    id: 2,
    name: 'Dr. Guthula Naresh',
    email: 'guthu@gmail.com',
    image:
      'https://images.medindia.net/uploads/doctor/profile/naresh-guthula.jpg',
    Contect: '+91 88873874871',
    location: 'Attili, India',
    language: 'Telugu / English / Hindi',
    Qualification: 'MBBS, MS, FBSO',
    Experience: '12 Years',
  },
];
