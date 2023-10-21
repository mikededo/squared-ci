import type { PropsWithChildren } from 'react';
import React from 'react';

import { Features } from './features';
import { Intro } from './intro';
import { SectionWrapper } from './section-wrapper';

type Props = {
  completed?: boolean;
};

const Li: React.FC<PropsWithChildren<Props>> = ({ completed, children }) => (
  <li>
    <span className="mr-2 text-sm">{completed ? '✅' : '❌'}</span>
    {children}
  </li>
);

const Subtitle: React.FC<PropsWithChildren> = ({ children }) => (
  <p className="text-sm -mt-2 italic text-foreground/60">{children}</p>
);

export const Content: React.FC = () => (
  <section className="flex flex-col gap-8 sm:gap-10 md:gap-12 pb-8">
    <Intro />
    <Features />
    <SectionWrapper>
      <h2 className="text-3xl font-bold">Feature&apos;s state of art</h2>
      <p>
        The following sections contain a more descriptive feature specification,
        so that it is easier to understand what has already been developed and
        what it is on its way.
      </p>
      <h3 className="text-2xl font-bold">Visual editor</h3>
      <p>
        The visual editor is the main thing about the application. The idea is
        that it contains everything necessary for you to be able to generate the
        YAML file with ease. It will also contain a live preview of the YAML
        file so that you can see how are your changes modifyign the output.
        <br />
        It is a very complex part and the idea is to make it as intuitive as
        possible for the end user.
      </p>
      <h4 className="text-xl font-bold">Workflow syntax</h4>
      <Subtitle>
        All the different porperties that the GitHub Actions specification
        provides.
      </Subtitle>
      <ul className="pl-2 list-disc list-inside -mt-1.5">
        <Li completed>
          Workflow <kbd>run</kbd> and <kbd>run-name</kbd>.
        </Li>
        <Li completed>
          Workflow triggers <kbd>on</kbd>.
        </Li>
        <ul className="pl-10 list-disc list-outside">
          <Li completed>
            Select one or multiple triggers that will trigger the workflow.
          </Li>
          <Li completed>
            Customize <kbd>branches</kbd>, <kbd>branches-ignore</kbd> for{' '}
            <kbd>pull_request</kbd> and <kbd>pull_request_target</kbd> events.
          </Li>
          <Li completed>
            Customize <kbd>branches</kbd>, <kbd>branches-ignore</kbd>,{' '}
            <kbd>tags</kbd> and <kbd>tags-ignore</kbd> for <kbd>push</kbd>{' '}
            events.
          </Li>
          <Li completed>
            Customize <kbd>paths</kbd>, <kbd>paths-ignore</kbd> for{' '}
            <kbd>push</kbd>, <kbd>pull_request</kbd> and{' '}
            <kbd>pull_request_target</kbd> events.
          </Li>
          <Li>
            Configuration of a cron value for <kbd>schedule</kbd> trigger.
          </Li>
          <Li>
            <kbd>workflow_call</kbd>, <kbd>workflow_run</kbd> and{' '}
            <kbd>workflow_dispatch</kbd> customizations.
          </Li>
        </ul>
        <Li completed>Workflow permissions (root level).</Li>
        <Li completed>Workflow environment variables (root level).</Li>
        <Li completed>Workflow defaults (root level).</Li>
        <Li completed>Workflow concurrency (root level).</Li>
        <Li>Workflow jobs</Li>
        <ul className="pl-10 list-disc list-outside">
          <Li>
            Job <kbd>name</kbd>.
          </Li>
          <Li>
            Job <kbd>permissions</kbd>.
          </Li>
          <Li>
            Job <kbd>needs</kbd>.
          </Li>
          <Li>
            Job <kbd>needs</kbd> autocompletion. The UI will provide a list of
            the other jobs that have been created by the you, so that you can
            easily remember the name of the other jobs.
          </Li>
          <Li>
            Job <kbd>if</kbd> (conditional execution).
          </Li>
          <Li>
            Job conditional running common templates. Provide commonly used
            conditions to avoid having to search for them on the internet.
          </Li>
          <Li>
            Job <kbd>runs-on</kbd>.
          </Li>
          <Li>
            Job <kbd>runs-on</kbd> runners autocompletion. Provide the list of
            the official runners from GitHub in order to avoid making you have
            to search for them.
          </Li>
          <Li>
            Job <kbd>environment</kbd>.
          </Li>
          <Li>
            Job <kbd>concurrency</kbd>.
          </Li>
          <Li>
            Job <kbd>outputs</kbd>.
          </Li>
          <Li>
            Job <kbd>env</kbd>.
          </Li>
          <Li>
            Job <kbd>defaults</kbd>.
          </Li>
          <Li>
            Job <kbd>steps</kbd>. The steps are one of the most complex parts of
            the workflow. Once I have had more time to plan how will I structure
            this section, the roadmap will be updated accordingly.
          </Li>
          <Li>
            Job <kbd>timeout-minutes</kbd>.
          </Li>
          <Li>
            Job <kbd>strategy</kbd>.
          </Li>
          <Li>
            Job <kbd>continue</kbd>.
          </Li>
          <Li>
            Job <kbd>container</kbd>. Similar to the <kbd>steps</kbd> section,
            this configuration of the job will be updated once I have had time
            to plan the development.
          </Li>
          <Li>
            Job <kbd>uses</kbd>.
          </Li>
          <Li>
            Job <kbd>with</kbd>.
          </Li>
          <Li>
            Job <kbd>secrets</kbd>.
          </Li>
        </ul>
        <Li completed>Output file name.</Li>
        <Li completed>Output file preview (life updated).</Li>
        <Li completed>Copy/Export resulting code.</Li>
        <Li completed>Dark theme and primary theme customizations.</Li>
        <Li completed>
          News dialog. On starting up the application, a dialog appears
          displaying the new features that have been added to the editor.
        </Li>
      </ul>
      <h3 className="text-2xl font-bold">Action templates</h3>
      <Subtitle>
        This sections&apos;s roadmap will be updated in the near future.
      </Subtitle>
      <h3 className="text-2xl font-bold">YAML translator</h3>
      <Subtitle>
        This sections&apos;s roadmap will be updated in the near future.
      </Subtitle>
      <h3 className="text-2xl font-bold">Sharing workflows</h3>
      <Subtitle>
        This sections&apos;s roadmap will be updated in the near future.
      </Subtitle>
    </SectionWrapper>
  </section>
);
