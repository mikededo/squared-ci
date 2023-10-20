import type { PropsWithChildren } from 'react';
import React from 'react';

const SectionWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-6">{children}</div>
);

export const Content: React.FC = () => (
  <section className="flex flex-col gap-8 sm:gap-10 md:gap-12 pb-8">
    <SectionWrapper>
      <h1 className="text-4xl font-bold">Roadmap</h1>
      <p>
        Ever felt lost in GitHub Actions&apos; complexity? I get it—I&apos;ve
        been there too. As the sole developer behind this project, I&apos;ve
        created this roadmap as your companion in this CI/CD journey. GitHub
        Actions Builder is all about making the intimidating task of creating
        action.yaml files a breeze.
        <br />
        This roadmap is my commitment to simplifying this process for you. No
        jargon, no confusion—just a clear path to creating GitHub Actions. Join
        me in this adventure, and let&apos;s demystify the world of GitHub
        Actions together. Stay tuned for updates; your GitHub Actions experience
        is about to get a whole lot smoother! Happy coding (or not)! 🚀
      </p>
    </SectionWrapper>
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
            Sometimes we want to modify an existing action file and the best
            thing we can do is copy it and adapt it. With this future feature,
            you will be able to past pure YAML code and get it working with the
            application.
          </span>
        </li>
        <li>
          Sharing is caring:{' '}
          <span className="font-normal">
            The same way we share CodeSandboxes, the idea is that we can also
            share the current workflow we are working on. This project has
            initially been thought to work without authentication, therefore
            this feature will most likely not be implemented until
            authentication is.
          </span>
        </li>
      </ul>
      <p>
        Stay tuned for these enhancements and more. I&apos;m committed to
        refining GitHub Actions Builder to best serve your needs. Your feedback
        is invaluable, so if you have any specific features in mind, don&apos;t
        hesitate to reach out. Together, let&apos;s make GitHub Actions a tool
        that empowers developers worldwide.
      </p>
    </SectionWrapper>
    <SectionWrapper>
      <h2 className="text-3xl font-bold">Feature&apos;s state of art</h2>
      <h3 className="text-2xl font-bold">Visual editor</h3>
      <h3 className="text-2xl font-bold">Action templates</h3>
      <h3 className="text-2xl font-bold">YAML translator</h3>
      <h3 className="text-2xl font-bold">Sharing workflows</h3>
    </SectionWrapper>
  </section>
);
