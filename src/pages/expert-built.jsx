import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import F150 from '../components/constants/f-150'

import Hero from '../components/sections/expert-built/hero'

export default () => {
  const pageData = F150(),
    { seo, sections } = pageData
  return (
    <Layout>
      <SEO title={seo.title} description={seo.description} />
      <Hero data={sections.hero} />
    </Layout>
  )
}
