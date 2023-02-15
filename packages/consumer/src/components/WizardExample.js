// https://patternfly-react-pr-8667.surge.sh/components/wizard/react-next/

// next-version
import React, { Fragment } from 'react';
import {Wizard, WizardStep} from '@patternfly/react-core/next';


// the core component is not composable and not customizable, this should be an example or maybe a part of the groups repository
export const WizardBasic = () => (
  <Wizard height={400} title="Basic wizard">
    <WizardStep name="Step 1" id="basic-first-step">
      Step 1 content
    </WizardStep>
    <WizardStep name="Step 2" id="basic-second-step">
      Step 2 content
    </WizardStep>
    <WizardStep name="Review" id="basic-review-step" footer={{nextButtonText: 'Finish'}}>
      Review step content
    </WizardStep>
  </Wizard>
);

// ComposableExample
export const WizardComposable = () => {
  const [activeStepId, setActiveStepId] = useState("basic-first-step")
  const handleStepEvent = (stepId) => {
    setActiveStepId(stepId)
  }

  // Iterating over children is not safe, it enforces JSX structure and if its not upheld component will break
  // Let developer define the children
  const steps = {
    "basic-first-step": (
        <WizardStep>
          Step 1 content
        </WizardStep>
    ),
    "basic-second-step": (
        <WizardStep>
          Step 2 content
        </WizardStep>
    ),
    "basic-review-step": (
      <WizardStep>
        Review step content
      </WizardStep>
    )
  }

  const activeStep = steps[activeStepId]
  return (
  <Wizard
    className='class-height-400'
    //height={400}
    // do not enforce child type or element, expose "correct element" and let developer use it
    // this way the title is fully customizable with no limitations
    title={<WizardTitle>"Basic wizard"</WizardTitle>}
  >
    {/* Missing a stepper component. We should not iterate over children to generate other components.
    * Will cause issues when the child components are not the expected element type or have expected props
    * Layout should be preserved by CSS, other option might be a steps prop on the wizard component
    * @example
    * steps={<WizardSteps>....</WizardSteps>}
    */}
    <Steeper>
      <Step onClick={() => handleStepEvent('basic-first-step')}>Step 1</Step>
      <Step onClick={() => handleStepEvent('basic-second-step')}>Step 2</Step>
      <Step onClick={() => handleStepEvent('basic-review-step')}>Review</Step>
    </Steeper>
    {/* choose steps programatically */}
    {activeStep}
  </Wizard>
)};


// =======================================================================================

// Example of enforced elements an unecesary new elements
// https://github.com/patternfly/patternfly-react/blob/v5/packages/react-core/src/components/Masthead/MastheadBrand.tsx#L15

export const MastheadBrand = ({
  children,
  className,
  component,
  ...props
}) => {
  // This component enforces specific element type based on a "href" prop, dveloper cal use the "a" tag on their own in the children props
  // The MastheadBrand should be a simple div element applying the className={css(styles.mastheadBrand, className)}
  // Best case scenario would be that no extra styling should be required and className={css(styles.mastheadBrand, className)} would be obsolete
  // We should be able to use existin layout components to create matching layout
  // If there is a string requirement to enforce MastheadBrand styling or position, use a brand prop on the Masthead component itself
  let Component = component;
  if (!component) {
    if (props?.href !== undefined) {
      Component = 'a';
    } else {
      Component = 'span';
    }
  }
  return (
    <Component className={css(styles.mastheadBrand, className)} {...(Component === 'a' && { tabIndex: 0 })} {...props}>
      {children}
    </Component>
  );
};

// children can be any type
export const MastheadBrandSimple = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={css(styles.mastheadBrand, className)} {...props}>
      {children}
    </div>
  );
};

// Ideal masthead component
import { CardContext, Masthead, Split, SplitItem } from '@patternfly/react-core'
export const MastheadBrandIdeal = () => {
  return (
    // masthead should only provide the bar styling
    // There is no need for other logic
    <Masthead>
      <Split>
        <SplitItem>
          <a href="/foo/bar">
            <img src="/brand/logo.png" />
          </a>
        </SplitItem>
        <SplitItem isFilled>
          {/* some content */}
        </SplitItem>
        <SplitItem>
          {/* some other content */}
        </SplitItem>
      </Split>
    </Masthead>
  );
};

// =======================================================================================

// https://patternfly-react-pr-8667.surge.sh/components/about-modal
// This component should not exist, the Modal component should be flexible enough to allow developers to create it

// =======================================================================================
// Rarely used features are hard coded into components
// https://patternfly-react-pr-8667.surge.sh/components/card#expandable-cards
// Expandable card
// This CardHeader type should be again just a demo or a part of some "advanced components set"
import React from 'react';
import {Card, CardHeader, CardActions, CardTitle, CardBody, CardFooter, CardExpandableContent, Checkbox, Dropdown, DropdownItem, DropdownSeparator, KebabToggle} from '@patternfly/react-core';
export const CardExpandable = () => {
  return (
    <React.Fragment>
      <div style={{ marginBottom: '12px'}}>
        <Checkbox id={'isToggleRightAligned-1'} key={'isToggleRightAligned'} label={'isToggleRightAligned'} isChecked={isToggleRightAligned} onChange={onRightAlign} />
      </div>
      <Card id="expandable-card" isExpanded={isExpanded}>
        {/* This card header is the issue, it contains a lot of code that is rarely used */}
        <CardHeader
            onExpand={onExpand}
            isToggleRightAligned={isToggleRightAligned}
            toggleButtonProps={{
              id: 'toggle-button1',
              'aria-label': 'Details',
              'aria-labelledby': 'expandable-card-title toggle-button1',
              'aria-expanded': isExpanded
            }}
          >
          <CardActions>
            <Dropdown onSelect={onSelect} toggle={<KebabToggle onToggle={(_event, isOpen) => setIsOpen(isOpen)} />} isOpen={isOpen} isPlain dropdownItems={dropdownItems} position={'right'} />
            <Checkbox isChecked={isChecked} onChange={onClick} aria-label="card checkbox example" id="check-4" name="check4" />
          </CardActions>
          <CardTitle id="expandable-card-title">Header</CardTitle>
        </CardHeader>
        <CardExpandableContent>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </CardExpandableContent>
      </Card>
    </React.Fragment>
    );
};

// ideally PF components would be flexible enough to allow developers to construct a component like this

// or this https://github.com/patternfly/patternfly-react/blob/v5/packages/react-core/src/components/Card/CardHeader.tsx#L34 can be its own component and does not have to be included within the card component
const SomeToggleButton = ({onClick}) => <Button onClick={onClick}><SomeIcon /></Button>

// The whole card context can become obsolete
// https://github.com/patternfly/patternfly-react/blob/v5/packages/react-core/src/components/Card/Card.tsx#L60
// developer can handle the state on their own
// I would always give preference to stateless component instead of state full
// state less components should be the priority and maximum of any state management should be offloaded onto a developer
// again then there can be a "complex component" that does this automatically, but the building blocks should be as simple as possible to allow full composition when required

export const ExpandableCardComposable = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Card>
      <CardHeader>
        {/* Developer should be able to create such button from existing PF components */}
        <SomeToggleButton onClick={() => setIsExpanded(prev => !prev)} />
      </CardHeader>
      {isExpanded && (
        <Fragment>
          <CardBody>
            Body
          </CardBody>
          <CardFooter>
            Footer
          </CardFooter>
        </Fragment>
      )}
    </Card>
  )
}