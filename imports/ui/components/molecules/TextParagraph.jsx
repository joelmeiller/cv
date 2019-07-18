import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../atoms/icons/index'

import { Column } from '../atoms/layout/Column'
import { Row } from '../atoms/layout/Row'

import { IconText } from '../atoms/text/IconText'
import { LinkText } from '../atoms/text/LinkText'

// styling
import styled from 'styled-components'

const ParagraphContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: var(--size-64);
  padding-right: var(--size-64);
`

const Paragraph = styled.div`
  padding-top: var(--size-32);
  padding-bottom: var(--size-32);
`

const Title = styled.h2`
  margin: 0.5rem 0;
`

const Subtitle = styled.h3`
  color: var(--color-text-mark);
  margin: 0.5rem 0;
`

const IconTextContainer = styled.div`
  display: flex;
`

const FileLinkText = styled.p`
  color: var(--color-text-primary);
  text-align: center;
  text-decoration-line: underline;
  text-transform: uppercase;
  width: fit-content;
`

const TaskList = styled.ul`
  padding: 0 var(--size-32);
  width: 90%;

  & > li {
    margin: 0.5rem;
  }
`

export const TextParagraph = ({
  icon,
  title,
  titleLink,
  subtitle,
  time,
  location,
  text,
  list,
  attachment,
}) => (
  <ParagraphContainer>
    <Row>
      {!!icon && (
        <Column third>
          <IconContainer>{Icon[icon]({})}</IconContainer>
        </Column>
      )}

      <Column twoThird={!!icon} fullwidth={!icon}>
        <Title className="font-20-bold">
          {title}
          <br />
          {titleLink && (
            <span className="font-16-regular">
              (<LinkText {...titleLink} accent />)
            </span>
          )}
        </Title>

        {!!subtitle && <Subtitle className="font-16-bold">{subtitle}</Subtitle>}

        {(!!time || !!location) && (
          <IconTextContainer>
            {!!time && <IconText icon="calendar" text={time} />}
            {!!location && <IconText icon="environment" text={location} />}
          </IconTextContainer>
        )}

        {!!text && <p className="font-14-regular">{text}</p>}

        {!!list && list.length && (
          <TaskList>
            {list.map((task, index) => (
              <li key={`task-${index}`} className="font-14-regular">
                {task}
              </li>
            ))}
          </TaskList>
        )}

        {!!attachment && (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            download={attachment.fileName}
          >
            <FileLinkText className="font-20-bold">{attachment.text}</FileLinkText>
          </a>
        )}
      </Column>
    </Row>
  </ParagraphContainer>
)

TextParagraph.propTypes = {
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
