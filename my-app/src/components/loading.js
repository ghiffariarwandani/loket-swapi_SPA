import React from 'react'
import { Loader } from 'semantic-ui-react'

function Loading() {
  return (
    <div className="loading">
      <Loader active inline='centered' />
    </div>
  )
}

export default Loading