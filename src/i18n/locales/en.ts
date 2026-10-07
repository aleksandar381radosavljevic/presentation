export default {
  meta: {
    title: 'Aleksandar Radosavljević'
  },
  nav: {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    process: 'How I work',
    engagement: 'Work together',
    experience: 'Experience'
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
    name: 'Aleksandar Radosavljević',
    role: 'Frontend engineer for real-time industrial interfaces',
    pitch:
      'I lead a frontend team at COMING – Computer Engineering in Niš and stay involved from the first requirements workshop to delivery.',
    factsLabel: 'Key figures',
    card: {
      locationLabel: 'Based in',
      location: 'Niš, Serbia',
      languagesLabel: 'Languages',
      languages: 'Serbian, English'
    },
    facts: [
      { value: '10,000+', label: 'live elements on one energy grid screen, built with my team' },
      { value: '50 ms', label: 'between live readings on IoT dashboards I architected' },
      { value: '7+ years', label: 'building production software' },
      { value: 'Since 2022', label: 'leading a frontend team' }
    ],
    discussProject: 'Discuss a project',
    seeProjects: 'See projects'
  },
  about: {
    title: 'About me',
    lead: 'I specialize in real-time interfaces for industrial systems.',
    paragraphs: [
      'Most of my work is on interfaces where the data never stops: monitoring an energy grid in real time and live readings from measuring devices. I also take part in the work before the code: I meet the people who will use the software, ask questions and write down exactly what it needs to do.'
    ]
  },
  services: {
    title: 'What I do',
    intro: 'The areas I work in. Concrete ways to start are under Work together.',
    items: {
      hmi: {
        title: 'Web-based HMI',
        text: 'Overview and detail screens, alarms and states an operator reads at a glance, consistent across every screen and fast under live data.'
      },
      realtime: {
        title: 'Real-time data visualization',
        text: 'Live charts and monitoring dashboards that stay responsive under a constant stream of device data.'
      },
      leadership: {
        title: 'Analysis and technical leadership',
        text: 'Requirements workshops, functional specifications, technical documentation and leading a team through delivery.'
      },
      modernization: {
        title: 'Legacy modernization',
        text: 'Step-by-step migration of older multi-page applications without freezing new features, with a shared component library.'
      },
      webApps: {
        title: 'Web applications',
        text: 'Business applications in React, Vue and TypeScript, with .NET and SQL Server on the backend when the project needs it.'
      }
    },
    principlesTitle: 'Principles for operator screens',
    principlesIntro: 'Four rules every HMI screen I work on follows.',
    principles: [
      {
        title: 'Show what is abnormal; keep the normal calm.',
        text: 'Normal states use quiet colors, so a deviation is the first thing the eye finds.'
      },
      {
        title: 'Alarms that matter never drown in noise.',
        text: 'Critical alarms stand out even when many arrive at once.'
      },
      {
        title: 'Connection status and data age are always visible.',
        text: 'An operator always knows whether a value on screen is live or stale.'
      },
      {
        title: 'The screen stays responsive, no matter how fast the data arrives.',
        text: 'Receiving data is kept apart from drawing it, so a burst of updates never freezes the controls.'
      }
    ]
  },
  projects: {
    title: 'Selected projects',
    intro:
      'These projects were built with my team at COMING – Computer Engineering. Client names stay confidential; for each one I describe the problem and my role.',
    stackLabel: 'Technologies',
    labels: {
      problem: 'Problem',
      constraint: 'Constraint',
      role: 'My role',
      result: 'Result'
    },
    illustrationNote: "Illustration with made-up data, not the client's screen.",
    moreTitle: 'More projects',
    personalTitle: 'Personal projects',
    featured: {
      gridVisualization: {
        title: 'Real-time energy grid visualization',
        meta: 'Energy · Web HMI · Frontend architecture',
        figure: { value: '10,000+', label: 'interactive elements on one screen' },
        problem:
          'Operators watch an energy grid with more than 10,000 elements and need to see every change as it happens.',
        constraint:
          'The server pushes live updates over SignalR, and the screen must stay smooth while operators zoom, pan and select elements.',
        role: 'I designed the frontend architecture (how rendering, live updates and application state fit together, and which libraries to use) and was one of the developers who built it.',
        result:
          'A canvas-based web HMI, built as a progressive web app, that stays smooth under live updates and has separate edit and preview modes.',
        diagram: {
          live: 'Live over SignalR',
          alarm: 'Alarm',
          stale: 'Stale data'
        }
      },
      liveDashboards: {
        title: 'Live dashboards for measurement devices',
        meta: 'IoT · Frontend architecture',
        figure: { value: '50 ms', label: 'between new readings' },
        problem:
          'Small measuring devices send timestamped readings, and people need to follow them as live charts.',
        constraint:
          'A new measurement arrives every 50 ms. Redrawing the screen for every message would freeze the interface.',
        role: 'I designed the frontend architecture and was one of the developers.',
        result:
          'Receiving data is kept separate from re-rendering the screen, so the D3.js charts update live and the interface stays responsive.',
        diagram: {
          devices: 'Devices',
          interval: 'every 50 ms',
          receive: 'Receiving',
          draw: 'Drawing',
          charts: 'Live charts',
          separate: 'kept separate'
        }
      }
    },
    items: {
      legacyMigration: {
        title: 'Legacy application migration',
        meta: 'Enterprise · Frontend team lead · 2024 – present',
        text: 'Moving a jQuery application of around 50 pages to a modern single-page app while new features keep shipping, with a Storybook catalog and shared packages from an Nx monorepo.'
      },
      digitalization: {
        title: 'Business process digitalization',
        meta: 'Enterprise client · Lead of a team of three · ongoing',
        text: "Digitalizing a client's business processes. With a business analyst I ran the requirements meetings and wrote the functional specification."
      },
      notificationEngine: {
        title: 'Notification engine',
        meta: 'Platform service · Frontend team lead · 2022 – 2023',
        text: 'A plug-and-play service where every user chooses which notifications they get and on which channel: SMS, email or push.'
      },
      scannerService: {
        title: 'Scanner access from the browser',
        meta: 'Document scanning · Developer, then maintainer · 2021',
        text: 'An extension of the open-source NAPS2 library, built with the senior colleague who designed it, that lets a web app drive WIA and TWAIN scanners through a Windows service.'
      },
      pushInstructions: {
        title: 'Work instructions over web push',
        meta: 'Personal project · PWA',
        text: "A .NET backend sends work instructions that reach an employee's phone as web push notifications through a React progressive web app."
      }
    }
  },
  how: {
    title: 'How I work',
    intro:
      'This is the process I follow on projects at COMING. Each step ends with something concrete to review. The first three steps are also what I offer as separate packages.',
    deliverableLabel: 'You get:',
    packageLabel: 'Package:',
    teamOnly: 'On projects with my team at COMING',
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
        title: 'Architecture',
        text: 'From the specification I write the technical documentation and design the architecture and the database.',
        deliverable: 'a documented architecture and database design to review.'
      },
      {
        title: 'Development',
        text: 'Development follows the approved specification. Every change is reviewed before it is merged and tested against the requirements.',
        deliverable: 'tested software that does what was agreed.'
      },
      {
        title: 'Delivery and support',
        text: 'The application ships as a Docker image through the CI/CD pipeline, with error logging and single sign-on in place, and the team stays involved after launch.',
        deliverable: 'a system that is deployed, monitored and maintained.'
      }
    ]
  },
  engagement: {
    title: 'Ways to work together',
    intro:
      'Each package has a bounded scope that fits alongside my full-time role and ends with a concrete result.',
    forLabel: 'For',
    deliverableLabel: 'You get',
    ask: 'Ask about this package',
    items: {
      audit: {
        title: 'Performance audit',
        for: 'Teams whose real-time screen stutters or freezes under load.',
        text: 'I measure where the time goes in your existing application.',
        deliverable: 'A report with measurements and a prioritized fix plan.'
      },
      discovery: {
        title: 'Discovery and specification',
        for: 'Companies with an idea or a process to digitalize.',
        text: 'A paid workshop with your team, followed by the written specification.',
        deliverable: 'A functional specification that development can estimate and start from.'
      },
      architectureReview: {
        title: 'Architecture review',
        for: 'Software companies and system integrators building real-time applications.',
        text: 'I review the frontend architecture of your application, or help your team design one.',
        deliverable: 'Written findings and recommendations so it holds up under live data.'
      },
      migrationPlan: {
        title: 'Migration plan',
        for: 'Teams with an aging operator or back-office interface.',
        text: 'I assess the current application and how it is built.',
        deliverable: 'A step-by-step migration plan and the foundation of a component library.'
      }
    }
  },
  experience: {
    title: 'Experience',
    intro:
      'I started on the backend with .NET and SQL Server, moved to the frontend with React and Vue, and today I lead a frontend team while staying involved from requirements to delivery.',
    company: 'COMING – Computer Engineering, Niš',
    roles: [
      {
        title: 'Software Engineer and Frontend Team Lead',
        period: 'July 2019 – present',
        note: 'Leading the frontend team since May 2022'
      },
      { title: 'Intern', period: 'April – June 2019', note: '' }
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
    keyNote: 'Highlighted: what I use most.',
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
    text: 'Tell me about it. A few lines are enough:',
    checklist: [
      'what you are building and for whom',
      'where the project is today and what you need from me',
      'your timeline'
    ],
    contact: 'Send an email',
    copy: 'Copy address',
    copied: 'Address copied',
    linkedin: 'LinkedIn',
    copyright: '© {year} Aleksandar Radosavljević'
  }
}
