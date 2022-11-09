import React from 'react';
import { createRoot } from 'react-dom/client';

// relative import path
import { moduleAfn as moduleAfnNormal} from '@repo/normal-module-lib'

// does not resolve CJS/ESM will always import one or another, issue in testing or SSR 
// import { moduleAfn as moduleAfnNormal} from '@repo/normal-module-lib/moduleA'

// absolute import but with mini modules will always resolve to correct CJS/ESM version
// has its own package.json with references to correct module
import { moduleAfn as moduleAfnMini } from '@repo/mini-module-lib/moduleA'

// relative import will break treeshaking when sharing components
import { Button } from '@patternfly/react-core'

// will be OK but will not be resolved correctly 
// import { Button } from '@patternfly/react-core/dist/esm/components/Button'

moduleAfnNormal()
moduleAfnMini()

const App = () => {
  return (
    <div>
      <Button>
        Foo bar
      </Button>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)

const root = createRoot(container)
root.render(<App />)
