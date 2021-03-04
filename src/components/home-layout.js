import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import PreloadIcon from './icons/preload'

const Layout = ({ preload, preloadSrc, children }) => {
  const data = useStaticQuery(graphql`
      query SiteTitleHomeQuery {
        site {
          siteMetadata {
            title
          }
        }
        poster: file(relativePath: { eq: "poster.png" }) {
          childImageSharp {
            fixed(width: 1, height: 1) {
              ...GatsbyImageSharpFixed
            }
            fluid(maxWidth: 1, maxHeight: 1) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `),
    posterSrc = data.poster.childImageSharp.fixed.src,
    [isPlaying, setPlaying] = useState(false),
    [isPlayed, setPlayed] = useState(false)
  useEffect(() => {
    const preloadMedia = document.getElementById('preload-media')
    preloadMedia.addEventListener('playing', e => {
      setPlayed(false)
      setPlaying(true)
    })
    preloadMedia.addEventListener('ended', e => {
      setPlaying(false)
      setPlayed(true)
    })
  }, [])
  console.log(isPlaying, isPlayed)
  return (
    <>
      {preload && !isPlayed && (
        <div
          className={`preload-wrap ${
            isPlaying ? 'playing' : isPlayed ? 'played' : ``
          }`}
        >
          <div className="preload-container">
            <div
              className={`preload-icon ${
                isPlaying ? 'play' : isPlayed ? 'played' : ``
              }`}
            >
              <PreloadIcon />
            </div>
            <video
              className="preload-video"
              id="preload-media"
              poster={posterSrc}
              autoPlay={true}
              controls={false}
              muted={true}
            >
              <source src={preloadSrc} type="video/mp4" />
            </video>
            <div className="preload-progress"></div>
          </div>
        </div>
      )}
      <Header
        loading={isPlaying}
        loaded={isPlayed}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <main className={isPlaying ? 'loading' : isPlayed ? 'loaded' : ``}>
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
