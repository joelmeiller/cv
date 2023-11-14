import React from 'react'
import PropTypes from 'prop-types'

import { LinkText } from '../atoms/text/LinkText'

import { MediaSmall } from '../../styles/variables'

// styling
import styled from 'styled-components'

const ParagraphContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background: ${({ dark }) => (dark ? 'var(--color-black)' : '#FFFFFF')};

  @media ${MediaSmall} {
    height: 280px;
  }

  @media print {
    height: 250px;
    background: #ffffff;
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-size: ${({ size }) => size || 'cover'};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${({ picture }) => picture});
  margin: ${({ size }) =>
    size === 'contain' ? 'var(--size-16) var(--size-16) var(--size-64)' : 0};
  z-index: 1;

  &::after {
    display: block;
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ dark }) => (dark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)')};
  }
`

const BackgroundTop = styled(Background)`
  bottom: 100px;
  left: 10px;
  right: 10px;

  background-position: 50% 50%;
  background-size: contain;

  @media print {
    background-position: 0 50%;
  }
`

const Logo = styled.div`
  position: relative;
  padding: var(--size-16);
`
const LogoImg = styled.img`
  height: 22px;

  @media print {
    height: 18px;
  }
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
  color: ${({ dark }) => (dark ? 'var(--color-text-inverse)' : 'var(--color-primary)')};
  padding: var(--size-16);
`

const IconContainer = styled.div`
  height: 50px;
  margin-left: auto;
  margin-right: auto;
`

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 155px;
  padding: var(--size-16);
  background-color: ${({ dark }) =>
    dark ? 'var(--color-black-shadow)' : 'var(--color-white-shadow)'};

  & p,
  h3 {
    color: ${({ dark }) => (dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)')};
  }

  @media ${MediaSmall} {
    min-height: 90px;
  }

  @media print {
    min-height: 120px;
    padding: var(--size-32);
  }
`

const Category = styled.h3`
  margin-bottom: 0.3rem;
`
const Text = styled.p`
  color: ${({ dark }) => (dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)')};
  margin-bottom: 0.3rem;
`

export const ReferenceParagraph = ({ images, title, category, Icon, text, links, type, dark }) => (
  <ParagraphContainer dark={dark} className="card">
    {images.background &&
      ((images.backgroundStyle === 'top' && (
        <BackgroundTop picture={images.background} dark={dark} size={images.backgroundStyle} />
      )) || <Background picture={images.background} dark={dark} size={images.backgroundStyle} />)}

    <Paragraph>
      {images.logo ? (
        <Logo>
          <a href={links[0].url} target="_blank">
            <LogoImg src={images.logo} />
          </a>
        </Logo>
      ) : (
        <Title dark={dark} className="font-24-bold">
          {title}
        </Title>
      )}

      {Icon && !images.background && (
        <IconContainer>
          <Icon />
        </IconContainer>
      )}

      <TextContainer dark={dark}>
        {!!category && <Category className="font-16-bold">{category}</Category>}

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
  Icon: PropTypes.node,
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
