export default {
  meta: {
    title: 'Aleksandar Radosavljević'
  },
  nav: {
    about: 'About',
    services: 'Services',
    process: 'How I work',
    projects: 'Projects',
    engagement: 'Work together',
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
      'I build web applications from the first requirements workshop to delivery, and I lead a frontend team.',
    factsLabel: 'Key figures',
    card: {
      locationLabel: 'Based in',
      location: 'Niš, Serbia',
      languagesLabel: 'Languages',
      languages: 'Serbian, English'
    },
    facts: [
      { value: '7+ years', label: 'building production software' },
      { value: 'Since 2022', label: 'leading a frontend team' },
      { value: 'BSc', label: 'Computer Science, University of Niš' },
      { value: 'MCSA', label: 'Microsoft certified: Web Applications' }
    ],
    discussProject: 'Discuss a project',
    seeProjects: 'See projects'
  },
  about: {
    title: 'About me',
    paragraphs: [
      'I specialize in real-time interfaces for industrial systems. Most of my work is on interfaces where the data never stops: monitoring an energy grid in real time and live readings from measuring devices. I also take part in the work before the code: I meet the people who will use the software, ask questions and write down exactly what it needs to do.'
    ]
  },
  services: {
    title: 'What I do',
    intro: 'Where I can help, from the first workshop to the screen in production.',
    items: {
      webApps: {
        title: 'Web applications',
        text: 'Business applications in React, Vue and TypeScript, from standard admin panels and forms to large single-page apps, with .NET and SQL Server on the backend when the project needs it.'
      },
      hmi: {
        title: 'Web-based HMI',
        text: 'Human-machine interfaces that run in the browser: overview and detail screens, alarms and states an operator reads at a glance, a design system that keeps every screen consistent, and rendering that holds up under live data.'
      },
      realtime: {
        title: 'Real-time data visualization',
        text: 'Live charts and monitoring dashboards that stay fast under a constant stream of device data, with data intake kept separate from rendering.'
      },
      modernization: {
        title: 'Legacy modernization',
        text: 'Step-by-step migration of older multi-page applications to a modern architecture, without freezing the development of new features, plus a component library in Storybook that your team keeps using.'
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
    principlesTitle: 'Principles for operator screens',
    principles: [
      'Show what is abnormal; keep the normal calm.',
      'Alarms that matter never drown in noise.',
      'Connection status and data age are always visible.',
      'The screen stays responsive, no matter how fast the data arrives.'
    ],
    steps: [
      {
        title: 'Understanding your business',
        text: 'I meet your team, learn how the work is done today and propose how it could be digitalized.',
        deliverable: 'meeting minutes with every decision and requirement.'
      },
      {
        title: 'Functional specification',
        text: 'I turn the minutes into a functional specification that describes what the software does, screen by screen and rule by rule.',
        deliverable: 'a specification to approve before development starts.'
      },
      {
        title: 'Design',
        text: 'The specification becomes application mockups, followed by technical documentation and the database design.',
        deliverable: 'mockups to review and a documented architecture.'
      },
      {
        title: 'Development',
        text: 'Development follows the approved specification. Every change is reviewed before it is merged and tested against the requirements.',
        deliverable: 'tested software that does what was agreed.'
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
    intro:
      'These projects were built with my team at COMING – Computer Engineering. Client names stay confidential; for each one I describe the problem and my role.',
    stackLabel: 'Technologies',
    personalTitle: 'Personal projects',
    items: {
      gridVisualization: {
        title: 'Real-time energy grid visualization',
        meta: 'Energy · Web HMI · Frontend architecture',
        text: 'I designed the frontend architecture and was one of the developers who built it: how rendering, live updates and application state fit together, and which components and libraries to use. The canvas-based web HMI monitors an energy grid in real time. More than 10,000 interactive elements stay smooth while the server pushes live updates over SignalR, with zoom, pan, element selection and separate edit and preview modes. Built as a progressive web app.'
      },
      liveDashboards: {
        title: 'Live dashboards for measurement devices',
        meta: 'IoT · Frontend architecture',
        text: 'I designed the frontend architecture and was one of the developers. The React application turns timestamped readings from small measuring devices into live D3.js charts. New measurements arrive every 50 ms, so the architecture keeps receiving data separate from re-rendering the screen and the interface stays responsive.'
      },
      legacyMigration: {
        title: 'Legacy application migration',
        meta: 'Enterprise · Frontend team lead · 2024 – present',
        text: 'I lead the frontend team that is migrating a large application of around 50 pages, built on jQuery and custom UI libraries, into a modern single-page application, in parallel with the development of new features. The work includes a component catalog in Storybook and shared libraries published as packages from an Nx monorepo, with sign-in through Keycloak.'
      },
      digitalization: {
        title: 'Business process digitalization',
        meta: 'Enterprise client · Development team lead · ongoing',
        text: "I lead the development team of three (backend, frontend and QA) that is digitalizing a client's existing business processes, from the first workshops onward. Together with a business analyst I ran the requirements meetings, documented the decisions and wrote the functional specification, and the team built the application mockups. Technical documentation and the database design are next."
      },
      notificationEngine: {
        title: 'Notification engine',
        meta: 'Platform service · Frontend team lead · 2022 – 2023',
        text: 'I led the frontend team on a plug-and-play service that attaches to an application and accepts its notifications. Every user decides which notifications they want and on which channels: SMS, email or push notifications.'
      },
      pushInstructions: {
        title: 'Work instructions over web push',
        meta: 'Personal project · PWA',
        text: "I built this project on my own to show a progressive web app with web push in practice. A .NET backend sends work instructions, and they reach an employee's phone as push notifications through the React app."
      },
      scannerService: {
        title: 'Scanner access from the browser',
        meta: 'Document scanning · Developer, then maintainer · 2021',
        text: 'Together with the senior colleague who designed it, I built an extension of NAPS2, the open-source scanning library, that lets a web application drive document scanners through a Windows service. It works with both WIA and TWAIN scanner drivers, and I later took over its maintenance.'
      }
    }
  },
  engagement: {
    title: 'Ways to work together',
    intro: 'Each engagement has a clear scope and ends with a concrete result.',
    items: {
      audit: {
        title: 'Performance audit',
        text: 'Your real-time screen stutters or freezes under load. I measure where the time goes and deliver a report with a prioritized fix plan.'
      },
      discovery: {
        title: 'Discovery and specification',
        text: 'A paid workshop that turns your idea into a functional specification, so development starts with a clear scope and estimate.'
      },
      migrationPlan: {
        title: 'Migration plan',
        text: 'I assess your aging operator or back-office interface and deliver a step-by-step migration plan, plus the foundation of a component library your team builds on.'
      },
      architectureReview: {
        title: 'Architecture review',
        text: 'For software companies and system integrators: I review the frontend architecture of your real-time application, or help your team design one, so it holds up under live data.'
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
