import React from 'react'

import { FinancialService } from './components/atoms/icons/FinancialService'
import { OptuneBrain } from './components/atoms/icons/OptuneBrain'

import { PageHeader } from './components/templates/PageHeader'
import { PageContent } from './components/templates/PageContent'

import { Contents } from '/imports/api'

const App = () => {
  console.log(Contents.find().count())

  return (
    <div>
      <PageHeader
        profilePicture="/profilePicture.jpg"
        profilePictureAccent="/profilePicture2.jpg"
        description={
          <span>
            As passionate CTO, Software Architect, Service Designer and Application Developer I ❤️
            to help creating the digital future.
          </span>
        }
        name="Joël Meiller"
      />
      <PageContent
        sections={[
          {
            type: 'TEXT_COLUMNS',
            title: 'MOST PROUD OF',
            paragraphs: [
              {
                icon: OptuneBrain,
                title: 'Creating the OpTuNE Cloud (https://www.optune.me)',
                text: `Over the last decade web development has become a large and highly complex net of processes, technologies and expectations. Therefore, to make the right decisions, choose the right framework and implement it the right way is a demanding task. As CTO of OpTuNE I managed to create an application system that allows to have daily deployments, is solid and performant while still remaining reactive to business demands. That's why I am proud of what I achieved!`,
              },
              {
                icon: FinancialService,
                title:
                  'Realization of the Cash Transaction Service as Core for the Online Banking Solutions',
                text: `Dealing with tera bytes of data and complex business cases designing an interface and implementing the underlying service in a performant way was a piece of work. I earned my promotion with it and the service is still running more or less untouched in the productive environment of one of the biggest banks in Switzerland serving several hundert requests a minute to different business solutions and applications.`,
              },
            ],
          },
          {
            type: 'TEXT',
            title: 'EXPERIENCE',
            paragraphs: [
              {
                title: 'Co-Founder & CTO',
                subtitle: 'Oscillate AG',
                time: '2016 - Ongoing',
                location: 'Zürich, Switerland',
                text:
                  'Oscillate is devoted to create the show business solution for a digital world.',
              },
              {
                title: 'Software Architect of the e-Banking services',
                subtitle: 'UBS AG',
                time: '2011 - 2016',
                location: 'Zürich, Switerland',
                text:
                  'Designed the API Interface for the e-banking and client advisor online services',
              },
            ],
            timeline: [
              { time: '2005 - 2011', text: 'Backend Application Engineer', company: 'UBS AG' },
              {
                time: '2011 - 2016',
                text: 'Software Architect & Service Designer',
                company: 'UBS AG',
              },
              {
                time: '2016 - 2017',
                text: 'Co-Founder of OpTuNE & Full-Stack Web Developer',
                company: 'Oscillate AG',
              },
              { time: '2017 - today', text: 'CTO of OpTuNE', company: 'Oscillate AG ' },
              { time: '2019', text: 'Bachelor in Computer Science', company: 'FHNW' },
            ],
          },
          {
            type: 'TEXT',
            title: 'EDUCATION',
            paragraphs: [
              {
                title: 'Bachelor in Computer Science',
                subtitle: 'FHNW | University of Applied Science Northwestern Switzerland',
                time: '2013 - 2018',
                location: 'Brugg-Windisch, Switerland',
                text:
                  'Final graduation with A-Rating being among the best 10% of all students.',
              },
              {
                title: 'IBM DB2 Performance Tuning',
                subtitle: 'IBM Training Center',
                time: '2014',
                location: 'Zürich-Altstetten, Switzerland'
              },
            ],
            grade: {
              rating: 'A',
              description: 'Among the best 10% of all computer science students'
            }
          },
          {
            type: 'TAGS',
            title: 'TECHNICAL SKILLS',
            paragraphs: [
              {
                title: 'Specialized in',
                tags: ['React', 'Redux', 'Meteor', 'MongoDB', 'SQL', 'GraphQL', 'JavaScript'],
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
                ],
              },
            ],
          },
          {
            type: 'RATED_LIST',
            title: 'INDUSTRY EXPERTISE',
            paragraphs: [
              {
                title: 'As CTO at Oscillate AG',
                list: [
                  { category: 'Software Architecture for Web Applications', rating: 5 },
                  { category: 'Lean UX Development', rating: 5 },
                  { category: 'User Centered Design', rating: 5 },
                  { category: 'Agile Development (SCRUM)', rating: 4 },
                  { category: 'UI Testing', rating: 5 },
                ],
              },
              {
                title: 'As Backend Application Engineer at UBS AG',
                list: [
                  { category: 'Data Modeling', rating: 5 },
                  { category: 'API & Service Design', rating: 5 },
                  { category: 'Test Automation', rating: 4 },
                  { category: 'Performance Optimizations', rating: 4 },
                ],
              },
            ],
          },
          {
            type: 'REFERENCES',
            title: 'REFERENCES',
            paragraphs: [
              {
                title: 'OpTuNE Web-App',
                image: '',
                description: '',
                link: {
                  type: 'homepage',
                  url: 'https://www.optune.me',
                }
              },
              {
                title: 'ONESCREENER Web-App',
                image: '',
                description: '',
                link: {
                  type: 'app',
                  url: 'https://app.onescreener.com',
                }
              },{
                title: 'SPHEROPANTHER Android App',
                image: '',
                description: '',
                link: {
                  type: 'github',
                  url: 'https://github.com/joelmeiller/spheropanther',
                }
              },
            ],
          },
        ]}
      />
    </div>
  )
}

export default App
