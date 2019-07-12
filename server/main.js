import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Contents, Comments } from '/imports/api'

import { configureAuthentication } from '../imports/startup/configureAuthentication'

Meteor.startup(() => {
  configureAuthentication()

  Meteor.users.remove({})
  Accounts.createUser({
    username: 'joel.meiller',
    email: 'joel@oscillate.ch',
    password: '1234',
    profile: {
      firstName: 'Joël',
      lastName: 'Meiller',
      email: 'joel@oscillate.ch',
    },
  })

  Contents.remove({})
  Contents.insert({
    profilePicture: '/profilePicture.jpg',
    profilePictureAccent: '/profilePicture2.jpg',
    backgroundPicture: '/profilePicture2.jpg',
    name: 'Joël Meiller',
    description:
      'As passionate CTO, Software Architect, Service Designer and Application Developer I ❤️ to help creating the digital future.',
    sections: [
      {
        type: 'TEXT_COLUMNS',
        sequenceNr: 1,
        title: 'MOST PROUD OF',
        paragraphs: [
          {
            icon: 'OptuneBrain',
            title: 'Creating the OpTuNE Cloud',
            titleLink: {
              text: 'www.optune.me',
              url: 'https://www.optune.me',
            },
            text: `Over the last decade web development has become a large and highly complex net of processes, technologies and expectations. Therefore, to make the right decisions, choose the right framework and implement it the right way is a demanding task. As CTO of OpTuNE I managed to create an application system that allows to have daily deployments, is solid and performant while still remaining reactive to business demands. That's why I am proud of what I achieved!`,
            
          },
          {
            icon: 'FinancialService',
            title:
              'Realization of the Cash Transaction Service as Core for the Online Banking Solutions',
            text: `Dealing with tera bytes of data and complex business cases designing an interface and implementing the underlying service in a performant way was a piece of work. I earned my promotion with it and the service is still running more or less untouched in the productive environment of one of the biggest banks in Switzerland serving several hundert requests a minute to different business solutions and applications.`,
            
          },
        ],
      },
      {
        type: 'TEXT',
        sequenceNr: 3,
        title: 'EXPERIENCE',
        paragraphs: [
          {
            title: 'Co-Founder & CTO',
            subtitle: 'Oscillate AG',
            time: '2016 - Ongoing',
            location: 'Zürich, Switerland',
            text: 'Oscillate is devoted to create the show business solution for a digital world.',
            list: [
              'Creating all the products to bring the OpTuNE dream to reality',
              'Building several professional web applications from scratch including software architecture, environment setup, testing and deployment',
              'Involved in strategic decision making, product development and sales and marketing initiatives',
              'Hiring new developers and managing my own team'
            ]
          },
          {
            title: 'Software Architect of the e-Banking Services',
            subtitle: 'UBS AG',
            time: '2011 - 2016',
            location: 'Zürich, Switerland',
            list: [
              'Designing the API interfaces for the e-banking and client advisor online services',
              'Implementing high-performant services for the core transaction system of the bank',
              'Involved in the software architecture and design of the front-end for the e-banking solutions'
            ],
          },
        ],
        timeline: [
          { time: '2019', text: 'Bachelor in Computer Science', company: 'FHNW' },
          { time: '2017 - today', text: 'CTO of OpTuNE', company: 'Oscillate AG ' },
          {
            time: '2016 - 2017',
            text: 'Co-Founder of OpTuNE & Full-Stack Web Developer',
            company: 'Oscillate AG',
          },
          {
            time: '2011 - 2016',
            text: 'Software Architect & Service Designer',
            company: 'UBS AG',
          },
          { time: '2005 - 2011', text: 'Backend Application Engineer', company: 'UBS AG' },
        ],
      },
      {
        type: 'TEXT',
        sequenceNr: 6,
        title: 'EDUCATION',
        paragraphs: [
          {
            title: 'Bachelor in Computer Science',
            subtitle: 'FHNW | University of Applied Science Northwestern Switzerland',
            time: '2013 - 2018',
            location: 'Brugg-Windisch, Switerland',
          },
          {
            title: 'IBM DB2 Performance Tuning',
            subtitle: 'IBM Training Center',
            time: '2014',
            location: 'Zürich-Altstetten, Switzerland',
          },
        ],
        grade: {
          rating: 'A',
          description: 'Among the best 10% of all computer science students',
        },
      },
      {
        type: 'TAGS',
        sequenceNr: 4,
        title: 'TECHNICAL SKILLS',
        paragraphs: [
          {
            title: 'Specialized in',
            tags: ['React', 'Redux', 'Meteor', 'MongoDB', 'SQL', 'GraphQL', 'JavaScript', 'CSS', 'Styled Components'],
          },

          {
            title: 'Advanced practical skills in',
            tags: [
              'Python',
              'AWS',
              'Webpack',
              'Rollup',
              'Android',
              'GitHub',
              'User Interface Design',
              'Machine Learning',
              'SEO Optimisations',
              'KPI Tracking',
            ],
          },
        ],
      },
      {
        type: 'RATED_LIST',
        sequenceNr: 5,
        title: 'INDUSTRY EXPERTISE',
        paragraphs: [
          {
            title: 'As CTO at Oscillate AG',
            list: [
              { category: 'Software Architecture for Web Applications', rating: 5 },
              { category: 'Lean UX Development', rating: 5 },
              { category: 'User Centered Design', rating: 5 },
              { category: 'Agile Development (SCRUM)', rating: 4 },
              { category: 'Integration & UI Test Automation', rating: 5 },
              { category: 'Continues Integration', rating: 4},
              { category: 'Deployment', rating: 3 },
            ],
          },
          {
            title: 'As Backend Service Architect at UBS AG',
            list: [
              { category: 'Data Modeling', rating: 5 },
              { category: 'API & Service Design', rating: 5 },
              { category: 'Test Automation', rating: 4 },
              { category: 'Performance Optimisations', rating: 4 },
            ],
          },
        ],
      },
      {
        type: 'REFERENCES',
        sequenceNr: 2,
        title: 'REFERENCES',
        paragraphs: [
          {
            title: 'OpTuNE',
            type: 'oscillate',
            category: 'Progressive Web App',
            images: {
              background:
                'https://res.cloudinary.com/optune-me/image/upload/c_scale,fl_progressive,q_auto,w_400/v1557845008/artist-booking-app/dJ-profile-pic.jpg',
              screen: '',
              logo:
                'https://res.cloudinary.com/optune-me/image/upload/v1479213946/optune/app/logo-optune-neongreen-rgb.png',
            },
            text: 'The show business solution for a digital world',
            links: [
              {
                text: 'www.optune.me',
                url: 'https://www.optune.me',
              },
            ],
          },
          {
            title: 'ONESCREENER',
            type: 'oscillate',
            category: 'Progressive Web App',
            images: {
              background:
                'https://res.cloudinary.com/optune-me/image/upload/c_scale,fl_progressive,q_auto,w_400/v1460624157/custom/onescreener.com/vlcsnap-2016-04-14-10h50m49s256.png',
              screen: '',
              logo:
                'https://res.cloudinary.com/optune-me/image/upload/v1558014130/onescreener-v2/app/logo-onescreener.svg',
            },
            text: 'The brand-forward digital artist card creator.',
            links: [
              {
                text: 'www.onescreener.com',
                url: 'https://www.onescreener.com',
              },
            ],
          },
          {
            title: 'ONsTAgE',
            type: 'oscillate',
            category: 'Public Online Service',
            images: {
              background:
                'https://res.cloudinary.com/optune-me/image/upload/c_scale,fl_progressive,q_auto,w_400/v1557737169/artist-booking-app/main-hero.jpg',
              screen: '',
              logo:
                'https://res.cloudinary.com/optune-me/image/upload/v1562921014/artist-booking-app/logo-onstage.svg',
            },
            text: 'The artist booking solution to book the perfect act for an event.',
            links: [
              {
                text: 'www.onstage.show',
                url: 'https://www.onstage.show',
              },
            ],
          },
        ],
      },
      {
        type: 'REFERENCES',
        sequenceNr: 7,
        title: 'SCHOOL PROJECTS',
        paragraphs: [
          {
            type: 'other',
            title: 'SPHEROPANTHER',
            category: 'Android App',
            images: {
              background: '/background_spheropanther.jpg',
              screen: '/screenshot_spheropanther.png',
            },
            text: 'The own implementation of the sphero roboter controller.',
            links: [
              {
                text: 'github.com/joelmeiller/spheropanther',
                url: 'https://github.com/joelmeiller/spheropanther',
              },
              {
                text: 'www.sphero.com',
                url: 'https://www.sphero.com/sphero-sprk-plus',
              },
            ],
          },
        ],
      },
    ],
  })

  Comments.remove({})
  Comments.insert({
    text: 'More space',
    userId: '',
    position: {
      screenWidth: 1000,
      screenHeight: 800,
      x: 366,
      y: 200,
    },
    status: 'open',
  })
})
