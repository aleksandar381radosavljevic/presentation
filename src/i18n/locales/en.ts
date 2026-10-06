export default {
  meta: {
    title: 'Aleksandar Radosavljević'
  },
  nav: {
    services: 'Services',
    process: 'How I work',
    projects: 'Projects',
    experience: 'Experience',
    technologies: 'Technologies'
  },
  ui: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System'
  },
  heading: {
    photoAlt: 'Portrait of Aleksandar Radosavljević',
    greeting: "Hi, I'm",
    name: 'Aleksandar Radosavljević',
    role: 'Software Engineer & Frontend Team Lead',
    pitch:
      'I build web applications for demanding domains, from real-time energy grid monitoring to the digitalization of business processes. Every project starts with a careful analysis of what you actually need.',
    facts: [
      { value: '7+ years', label: 'building production software' },
      { value: 'Team lead', label: 'of a frontend team since 2022' },
      { value: 'Certified', label: 'Microsoft and React developer' }
    ],
    discussProject: 'Discuss a project',
    seeProjects: 'See projects'
  },
  services: {
    title: 'What I do',
    items: {
      webApps: {
        title: 'Web applications',
        text: 'Business applications in React, Vue and TypeScript, from standard admin panels and forms to large single-page apps, with .NET and SQL Server on the backend when the project needs it.'
      },
      realtime: {
        title: 'Real-time data and visualization',
        text: 'Interfaces that stay fast under a constant stream of data: canvas scenes with thousands of interactive elements, live charts and monitoring dashboards.'
      },
      modernization: {
        title: 'Legacy modernization',
        text: 'Step-by-step migration of older multi-page applications to a modern architecture, without freezing the development of new features.'
      },
      leadership: {
        title: 'Analysis and technical leadership',
        text: 'Requirements workshops, functional specifications, technical documentation and leading the development team through delivery.'
      }
    }
  },
  how: {
    title: 'How I work',
    intro:
      'Good software starts long before the first line of code. Each step ends with something concrete you can review.',
    deliverableLabel: 'You get:',
    steps: [
      {
        title: 'Understanding your business',
        text: 'Together with a business analyst, I meet your team, learn how the work is done today and propose how it could be digitalized.',
        deliverable: 'meeting minutes with every decision and requirement.'
      },
      {
        title: 'Functional specification',
        text: 'The minutes become a functional specification that describes what the software does, screen by screen and rule by rule.',
        deliverable: 'a specification to approve before development starts.'
      },
      {
        title: 'Design',
        text: 'The team turns the specification into application mockups, followed by technical documentation and the database design.',
        deliverable: 'mockups to review and a documented architecture.'
      },
      {
        title: 'Development',
        text: 'The team builds the application against the approved specification, with every change reviewed before it is merged.',
        deliverable: 'software that does what was agreed.'
      },
      {
        title: 'Delivery and support',
        text: 'The application ships as a Docker image through the CI/CD pipeline, with error logging and single sign-on in place, and I stay involved after launch.',
        deliverable: 'a system that is deployed, monitored and maintained.'
      }
    ]
  },
  projects: {
    title: 'Selected projects',
    intro: 'Client names stay confidential. The problems and my role are described as they were.',
    stackLabel: 'Technologies',
    items: {
      gridVisualization: {
        title: 'Real-time energy grid visualization',
        meta: 'Energy · Frontend',
        text: 'A canvas-based interface for monitoring an energy grid in real time. Thousands of interactive elements are rendered smoothly while live data updates them, with zoom, pan, element selection and separate edit and preview modes. Built as a progressive web app.'
      },
      liveDashboards: {
        title: 'Live dashboards for measurement devices',
        meta: 'IoT · Frontend',
        text: 'A React application that turns large batches of timestamped readings from small measuring devices into live D3.js charts. The challenge was keeping the interface responsive while data arrives continuously and in volume.'
      },
      legacyMigration: {
        title: 'Legacy application migration',
        meta: 'Enterprise · Frontend team lead · 2024 – present',
        text: 'Migration of a large multi-page application built on jQuery and custom UI libraries into a modern single-page application, done in parallel with the development of new features. The codebase is an Nx monorepo, with sign-in through Keycloak.'
      },
      digitalization: {
        title: 'Business process digitalization',
        meta: 'Enterprise client · Development team lead · ongoing',
        text: "Digitalizing a client's existing business processes, from the first workshops onward. Together with a business analyst I ran the requirements meetings, documented the decisions and wrote the functional specification, and the team built the application mockups. Technical documentation and the database design are next."
      },
      notificationEngine: {
        title: 'Notification engine',
        meta: 'Platform service · 2022 – 2023',
        text: 'A plug-and-play service that attaches to an application and accepts its notifications. Every user decides which notifications they want and on which channels: SMS, email or push notifications.'
      },
      scannerService: {
        title: 'Scanner access from the browser',
        meta: 'Document scanning · 2021',
        text: 'An extension of NAPS2, the open-source scanning library, that lets a web application drive document scanners through a Windows service. It works with both WIA and TWAIN scanner drivers.'
      }
    }
  },
  experience: {
    title: 'Experience',
    intro:
      'I started on the backend with .NET and SQL Server, moved to the frontend with React and Vue, and today I lead a frontend team while staying involved in every part of development and deployment.',
    company: 'COMING – Computer Engineering, Niš',
    roles: [
      { title: 'Frontend Team Lead', period: 'May 2022 – present' },
      { title: 'Software Engineer', period: 'July 2019 – present' },
      { title: 'Intern', period: 'April – June 2019' }
    ],
    educationTitle: 'Education',
    education: 'BSc in Computer Science, Faculty of Electronic Engineering, University of Niš',
    certificationsTitle: 'Certifications',
    certifications: ['MCSA: Web Applications (Microsoft, 2021)', 'Certified ReactJS Developer'],
    languagesTitle: 'Languages',
    languages: ['Serbian (native)', 'English (full professional)']
  },
  technologies: {
    title: 'Technologies',
    groupsTitle: 'By area',
    groups: {
      frontend: 'Frontend',
      visualization: 'Visualization',
      backend: 'Backend',
      data: 'Data',
      delivery: 'Platforms and delivery'
    }
  },
  footer: {
    title: 'Have a project that deserves careful analysis and a solid build?',
    text: 'Tell me about it.',
    contact: 'Send an email',
    copyright: '© {year} Aleksandar Radosavljević'
  }
}
