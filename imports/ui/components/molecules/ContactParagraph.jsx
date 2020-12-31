import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../atoms/icons'

// styling
import styled from 'styled-components'

const Title = styled.h2`
  color: var(--color-text-inverse);
  margin: 0.5rem 0;

  @media print {
    color: var(--color-text-primary);
    font-size: var(--font-size-16);
  }
`

const IconContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const IconWrapper = styled.div`
  padding-right: var(--size-32);

  & .icon {
    width: 18px;
    height: 18px;
  }
`

const Text = styled.p`
  margin: 0.3rem 0;
  color: var(--color-text-inverse);

  @media print {
    color: var(--color-text-primary);
  }
`

const Link = styled.a`
  & p {
    color: var(--color-text-inverse);
    margin: 0.3rem 0;

    @media print {
      color: var(--color-text-primary);
    }
  }

  &:hover {
    & p {
      color: var(--color-accent);
    }

    & .icon.white {
      & path,
      line,
      circle,
      polygon,
      polyline,
      rect,
      ellipse {
        stroke: var(--color-accent);
        transition: fill 0.3s ease-out, stroke 0.3s ease-out;
      }
    }
  }
`

const ContactIcon = ({ type }) => {
  const IconOfType = Icon[type]

  return <IconOfType className="white" />
}

export const ContactParagraph = ({ title, logo, name, company, address, links }) => (
  <div>
    <Title className="font-14-bold">{title}</Title>
    {(!!name || !!company) && (
      <Text className="font-12-bold">
        {name}
        {company && ' / '}
        {company || ''}
      </Text>
    )}

    {!!address && (
      <IconContainer>
        <IconWrapper>
          <ContactIcon type="location" />
        </IconWrapper>

        <Text className="font-12-regular">
          {address.map((line, index) => (
            <span key={`address-line-${index}`}>
              {line}
              <br />
            </span>
          ))}
        </Text>
      </IconContainer>
    )}

    {links.map(({ type, text, url }) => (
      <Link href={url} key={`link-${type}`}>
        <IconContainer>
          <IconWrapper>
            <ContactIcon type={type} />
          </IconWrapper>
          <p className="font-12-regular">{text}</p>
        </IconContainer>
      </Link>
    ))
  }
  </div>
)

ContactParagraph.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  name: PropTypes.string,
  company: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      url: PropTypes.string,
    })
  ),
}
