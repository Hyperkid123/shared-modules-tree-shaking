import React from 'react';
// test will fail in this import because esm does not work in CJS env (tests or SSR)
import { Button } from '@patternfly/react-core/dist/esm/components/Button'

// this will work but we don't want CJS in ESM browser env
// import { Button } from '@patternfly/react-core/dist/js/components/Button'


const Foobar = () => {
  return (
    <Button>
      Foo bar
    </Button>
  )
}

export default Foobar;

