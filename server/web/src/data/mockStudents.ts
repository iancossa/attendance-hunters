export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  enrollmentNumber: string;
  email: string;
  course: string;
  section: string;
  year: number;
  present?: boolean;
}

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    rollNumber: '1',
    enrollmentNumber: 'EN2021001',
    email: 'alice.johnson@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '2',
    name: 'Bob Smith',
    rollNumber: '2',
    enrollmentNumber: 'EN2021002',
    email: 'bob.smith@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '3',
    name: 'Carol Davis',
    rollNumber: '3',
    enrollmentNumber: 'EN2021003',
    email: 'carol.davis@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '4',
    name: 'David Wilson',
    rollNumber: '4',
    enrollmentNumber: 'EN2021004',
    email: 'david.wilson@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '5',
    name: 'Emma Brown',
    rollNumber: '5',
    enrollmentNumber: 'EN2021005',
    email: 'emma.brown@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '6',
    name: 'Frank Miller',
    rollNumber: '6',
    enrollmentNumber: 'EN2021006',
    email: 'frank.miller@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '7',
    name: 'Grace Lee',
    rollNumber: '7',
    enrollmentNumber: 'EN2021007',
    email: 'grace.lee@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '8',
    name: 'Henry Taylor',
    rollNumber: '8',
    enrollmentNumber: 'EN2021008',
    email: 'henry.taylor@university.edu',
    course: 'eng101',
    section: 'C',
    year: 1
  },
  {
    id: '9',
    name: 'Ivy Chen',
    rollNumber: '9',
    enrollmentNumber: 'EN2021009',
    email: 'ivy.chen@university.edu',
    course: 'phy101',
    section: 'A',
    year: 1
  },
  {
    id: '10',
    name: 'Jack Anderson',
    rollNumber: '10',
    enrollmentNumber: 'EN2021010',
    email: 'jack.anderson@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '11',
    name: 'Kate Rodriguez',
    rollNumber: '11',
    enrollmentNumber: 'EN2021011',
    email: 'kate.rodriguez@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '12',
    name: 'Liam Garcia',
    rollNumber: '12',
    enrollmentNumber: 'EN2021012',
    email: 'liam.garcia@university.edu',
    course: 'math201',
    section: 'B',
    year: 2
  },
  {
    id: '13',
    name: 'Maya Patel',
    rollNumber: '13',
    enrollmentNumber: 'EN2021013',
    email: 'maya.patel@university.edu',
    course: 'eng101',
    section: 'A',
    year: 1
  },
  {
    id: '14',
    name: 'Noah Kim',
    rollNumber: '14',
    enrollmentNumber: 'EN2021014',
    email: 'noah.kim@university.edu',
    course: 'phy101',
    section: 'B',
    year: 1
  },
  {
    id: '15',
    name: 'Olivia White',
    rollNumber: '15',
    enrollmentNumber: 'EN2021015',
    email: 'olivia.white@university.edu',
    course: 'cs101',
    section: 'C',
    year: 3
  },
  {
    id: '16',
    name: 'Paul Thompson',
    rollNumber: '16',
    enrollmentNumber: 'EN2021016',
    email: 'paul.thompson@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '17',
    name: 'Quinn Martinez',
    rollNumber: '17',
    enrollmentNumber: 'EN2021017',
    email: 'quinn.martinez@university.edu',
    course: 'eng101',
    section: 'B',
    year: 1
  },
  {
    id: '18',
    name: 'Rachel Green',
    rollNumber: '18',
    enrollmentNumber: 'EN2021018',
    email: 'rachel.green@university.edu',
    course: 'phy101',
    section: 'A',
    year: 1
  },
  {
    id: '19',
    name: 'Sam Wilson',
    rollNumber: '19',
    enrollmentNumber: 'EN2021019',
    email: 'sam.wilson@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '20',
    name: 'Tina Lopez',
    rollNumber: '20',
    enrollmentNumber: 'EN2021020',
    email: 'tina.lopez@university.edu',
    course: 'math201',
    section: 'C',
    year: 2
  },
  {
    id: '21',
    name: 'Alex Turner',
    rollNumber: '21',
    enrollmentNumber: 'EN2021021',
    email: 'alex.turner@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '22',
    name: 'Bella Clark',
    rollNumber: '22',
    enrollmentNumber: 'EN2021022',
    email: 'bella.clark@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '23',
    name: 'Chris Evans',
    rollNumber: '23',
    enrollmentNumber: 'EN2021023',
    email: 'chris.evans@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '24',
    name: 'Diana Prince',
    rollNumber: '24',
    enrollmentNumber: 'EN2021024',
    email: 'diana.prince@university.edu',
    course: 'eng101',
    section: 'A',
    year: 1
  },
  {
    id: '25',
    name: 'Ethan Hunt',
    rollNumber: '25',
    enrollmentNumber: 'EN2021025',
    email: 'ethan.hunt@university.edu',
    course: 'phy101',
    section: 'B',
    year: 1
  },
  {
    id: '26',
    name: 'Fiona Shaw',
    rollNumber: '26',
    enrollmentNumber: 'EN2021026',
    email: 'fiona.shaw@university.edu',
    course: 'cs101',
    section: 'C',
    year: 3
  },
  {
    id: '27',
    name: 'George Lucas',
    rollNumber: '27',
    enrollmentNumber: 'EN2021027',
    email: 'george.lucas@university.edu',
    course: 'math201',
    section: 'B',
    year: 2
  },
  {
    id: '28',
    name: 'Hannah Montana',
    rollNumber: '28',
    enrollmentNumber: 'EN2021028',
    email: 'hannah.montana@university.edu',
    course: 'eng101',
    section: 'B',
    year: 1
  },
  {
    id: '29',
    name: 'Ian Fleming',
    rollNumber: '29',
    enrollmentNumber: 'EN2021029',
    email: 'ian.fleming@university.edu',
    course: 'phy101',
    section: 'A',
    year: 1
  },
  {
    id: '30',
    name: 'Julia Roberts',
    rollNumber: '30',
    enrollmentNumber: 'EN2021030',
    email: 'julia.roberts@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '31',
    name: 'Kevin Hart',
    rollNumber: '31',
    enrollmentNumber: 'EN2021031',
    email: 'kevin.hart@university.edu',
    course: 'math201',
    section: 'C',
    year: 2
  },
  {
    id: '32',
    name: 'Luna Lovegood',
    rollNumber: '32',
    enrollmentNumber: 'EN2021032',
    email: 'luna.lovegood@university.edu',
    course: 'eng101',
    section: 'A',
    year: 1
  },
  {
    id: '33',
    name: 'Mike Ross',
    rollNumber: '33',
    enrollmentNumber: 'EN2021033',
    email: 'mike.ross@university.edu',
    course: 'phy101',
    section: 'B',
    year: 1
  },
  {
    id: '34',
    name: 'Nina Dobrev',
    rollNumber: '34',
    enrollmentNumber: 'EN2021034',
    email: 'nina.dobrev@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '35',
    name: 'Oscar Wilde',
    rollNumber: '35',
    enrollmentNumber: 'EN2021035',
    email: 'oscar.wilde@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '36',
    name: 'Penny Lane',
    rollNumber: '36',
    enrollmentNumber: 'EN2021036',
    email: 'penny.lane@university.edu',
    course: 'eng101',
    section: 'C',
    year: 1
  },
  {
    id: '37',
    name: 'Quentin Tarantino',
    rollNumber: '37',
    enrollmentNumber: 'EN2021037',
    email: 'quentin.tarantino@university.edu',
    course: 'phy101',
    section: 'A',
    year: 1
  },
  {
    id: '38',
    name: 'Rose Tyler',
    rollNumber: '38',
    enrollmentNumber: 'EN2021038',
    email: 'rose.tyler@university.edu',
    course: 'cs101',
    section: 'C',
    year: 3
  },
  {
    id: '39',
    name: 'Steve Jobs',
    rollNumber: '39',
    enrollmentNumber: 'EN2021039',
    email: 'steve.jobs@university.edu',
    course: 'math201',
    section: 'B',
    year: 2
  },
  {
    id: '40',
    name: 'Taylor Swift',
    rollNumber: '40',
    enrollmentNumber: 'EN2021040',
    email: 'taylor.swift@university.edu',
    course: 'eng101',
    section: 'A',
    year: 1
  },
  {
    id: '41',
    name: 'Uma Thurman',
    rollNumber: '41',
    enrollmentNumber: 'EN2021041',
    email: 'uma.thurman@university.edu',
    course: 'phy101',
    section: 'B',
    year: 1
  },
  {
    id: '42',
    name: 'Victor Hugo',
    rollNumber: '42',
    enrollmentNumber: 'EN2021042',
    email: 'victor.hugo@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '43',
    name: 'Wanda Maximoff',
    rollNumber: '43',
    enrollmentNumber: 'EN2021043',
    email: 'wanda.maximoff@university.edu',
    course: 'math201',
    section: 'C',
    year: 2
  },
  {
    id: '44',
    name: 'Xavier Charles',
    rollNumber: '44',
    enrollmentNumber: 'EN2021044',
    email: 'xavier.charles@university.edu',
    course: 'eng101',
    section: 'B',
    year: 1
  },
  {
    id: '45',
    name: 'Yara Shahidi',
    rollNumber: '45',
    enrollmentNumber: 'EN2021045',
    email: 'yara.shahidi@university.edu',
    course: 'phy101',
    section: 'A',
    year: 1
  },
  {
    id: '46',
    name: 'Zoe Saldana',
    rollNumber: '46',
    enrollmentNumber: 'EN2021046',
    email: 'zoe.saldana@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '47',
    name: 'Adam Driver',
    rollNumber: '47',
    enrollmentNumber: 'EN2021047',
    email: 'adam.driver@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '48',
    name: 'Blake Lively',
    rollNumber: '48',
    enrollmentNumber: 'EN2021048',
    email: 'blake.lively@university.edu',
    course: 'eng101',
    section: 'C',
    year: 1
  },
  {
    id: '49',
    name: 'Colin Farrell',
    rollNumber: '49',
    enrollmentNumber: 'EN2021049',
    email: 'colin.farrell@university.edu',
    course: 'phy101',
    section: 'B',
    year: 1
  },
  {
    id: '50',
    name: 'Daisy Ridley',
    rollNumber: '50',
    enrollmentNumber: 'EN2021050',
    email: 'daisy.ridley@university.edu',
    course: 'cs101',
    section: 'C',
    year: 3
  },
  {
    id: '51',
    name: 'Eddie Redmayne',
    rollNumber: '51',
    enrollmentNumber: 'EN2021051',
    email: 'eddie.redmayne@university.edu',
    course: 'math201',
    section: 'B',
    year: 2
  },
  {
    id: '52',
    name: 'Felicity Jones',
    rollNumber: '52',
    enrollmentNumber: 'EN2021052',
    email: 'felicity.jones@university.edu',
    course: 'eng101',
    section: 'A',
    year: 1
  },
  {
    id: '53',
    name: 'Gal Gadot',
    rollNumber: '53',
    enrollmentNumber: 'EN2021053',
    email: 'gal.gadot@university.edu',
    course: 'phy101',
    section: 'A',
    year: 1
  },
  {
    id: '54',
    name: 'Hugh Jackman',
    rollNumber: '54',
    enrollmentNumber: 'EN2021054',
    email: 'hugh.jackman@university.edu',
    course: 'cs101',
    section: 'A',
    year: 3
  },
  {
    id: '55',
    name: 'Isla Fisher',
    rollNumber: '55',
    enrollmentNumber: 'EN2021055',
    email: 'isla.fisher@university.edu',
    course: 'math201',
    section: 'C',
    year: 2
  },
  {
    id: '56',
    name: 'James McAvoy',
    rollNumber: '56',
    enrollmentNumber: 'EN2021056',
    email: 'james.mcavoy@university.edu',
    course: 'eng101',
    section: 'B',
    year: 1
  },
  {
    id: '57',
    name: 'Keira Knightley',
    rollNumber: '57',
    enrollmentNumber: 'EN2021057',
    email: 'keira.knightley@university.edu',
    course: 'phy101',
    section: 'B',
    year: 1
  },
  {
    id: '58',
    name: 'Leonardo DiCaprio',
    rollNumber: '58',
    enrollmentNumber: 'EN2021058',
    email: 'leonardo.dicaprio@university.edu',
    course: 'cs101',
    section: 'B',
    year: 3
  },
  {
    id: '59',
    name: 'Margot Robbie',
    rollNumber: '59',
    enrollmentNumber: 'EN2021059',
    email: 'margot.robbie@university.edu',
    course: 'math201',
    section: 'A',
    year: 2
  },
  {
    id: '60',
    name: 'Natalie Portman',
    rollNumber: '60',
    enrollmentNumber: 'EN2021060',
    email: 'natalie.portman@university.edu',
    course: 'eng101',
    section: 'C',
    year: 1
  }
];