/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React from 'react'

export default ({ data }) => {
  const { image } = data
  console.log(image)

  return (
    <div>
      <div></div>
    </div>
  )
}
