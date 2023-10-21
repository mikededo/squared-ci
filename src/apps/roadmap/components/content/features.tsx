import React from 'react';

import { SectionWrapper } from './section-wrapper';

export const Features: React.FC = () => (
  <SectionWrapper>
    <h2 className="text-3xl font-bold">Features in the pipeline</h2>
    <p>
      Curious about what&apos;s on the horizon and/or what has already been
      implemented? Here&apos;s a glimpse of the exciting features and
      enhancements that I&apos;m working on for GitHub Actions Builder:
    </p>
    <ul className="list-decimal list-inside font-bold">
      <li className="mb-2">
        Visual workflow editor:{' '}
        <span className="font-normal">
          A user-friendly with a drag-and-drop interface to create GitHub
          Actions visually, simplifying the process even further. This feature
          is partially developed already. Check further sections to see what
          parts of the worfklow can you edit!
        </span>
      </li>
      <li className="mb-2">
        Custom action templates:{' '}
        <span className="font-normal">
          Create and save custom action templates, tailored to your specific
          project needs, for quick and easy reuse.
        </span>
      </li>
      <li className="mb-2">
        Transforming YAML into the editor:{' '}
        <span className="font-normal">
          Sometimes we want to modify an existing action file and the best thing
          we can do is copy it and adapt it. With this future feature, you will
          be able to past pure YAML code and get it working with the
          application.
        </span>
      </li>
      <li>
        Sharing is caring:{' '}
        <span className="font-normal">
          The same way we share CodeSandboxes, the idea is that we can also
          share the current workflow we are working on. This project has
          initially been thought to work without authentication, therefore this
          feature will most likely not be implemented until authentication is.
        </span>
      </li>
    </ul>
    <p>
      Stay tuned for these enhancements and more. I&apos;m committed to refining
      GitHub Actions Builder to best serve your needs. Your feedback is
      invaluable, so if you have any specific features in mind, don&apos;t
      hesitate to reach out. Together, let&apos;s make GitHub Actions a tool
      that empowers developers worldwide.
    </p>
  </SectionWrapper>
);
