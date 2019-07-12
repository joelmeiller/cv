import React from 'react'
import PropTypes from 'prop-types'

import { LinkText } from '../atoms/text/LinkText'

// styling
import styled from 'styled-components'

const ParagraphContainer = styled.div`
  position: relative;
  width: 100%;
  height: 330px;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-size: cover;
  background-position: 75% 50%;
  background-image: url(${({ picture }) => picture});

  z-index: 1;

  &::after {
    display: block;
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const Logo = styled.div`
  position: relative;
  padding: var(--size-16);
`
const LogoImg = styled.img`
  height: 22px;
`

const Paragraph = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
  z-index: 2;
`

const Title = styled.h1`
  color: var(--color-text-inverse);
  padding: var(--size-16);
`

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 110px;
  padding: var(--size-16);
  background-color: var(--color-black-shadow);
`

const Category = styled.h2`
  color: var(--color-text-inverse);
  margin-bottom: 0.3rem;
`
const Text = styled.p`
  color: var(--color-text-inverse);
  margin-bottom: 0.3rem;
`

export const ReferenceParagraph = ({ images, title, category, text, links, type }) => (
  <ParagraphContainer>
    <Background picture={images.background} />

    <Paragraph>
      {images.logo ? (
        <Logo>
          <a href={links[0].url} target="_blank">
            <LogoImg src={images.logo} />
          </a>
        </Logo>
      ) : (
        <Title className="font-24-bold">{title}</Title>
      )}

      <TextContainer>
        {!!category && <Category className="font-20-bold">{category}</Category>}

        <Text className="font-14-regular">{text}</Text>

        {links.map(({ url, text }) => (
          <Text className="font-14-regular" key={url}>
            <LinkText url={url} text={text} accent={type === 'oscillate'} />
          </Text>
        ))}
      </TextContainer>

      {/*!!attachment && (
      <a
        href={attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        download={attachment.fileName}
      >
        <FileLinkText className="font-20-bold">{attachment.text}</FileLinkText>
      </a>
    )*/}
    </Paragraph>
  </ParagraphContainer>
)

ReferenceParagraph.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  attachment: PropTypes.shape({
    url: PropTypes.string,
    fileName: PropTypes.string,
    text: PropTypes.string,
  }),
}
