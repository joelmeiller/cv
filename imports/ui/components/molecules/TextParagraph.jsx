import React from 'react'
import PropTypes from 'prop-types'

import { FinancialService } from '../atoms/icons/FinancialService'
import { OptuneBrain } from '../atoms/icons/OptuneBrain'

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
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
`

const Paragraph = styled.div`
  padding-top: var(--size-16);
  padding-bottom: var(--size-16);
`

const Subtitle = styled.h2`
  color: var(--color-text-mark);
`

const IconTextContainer = styled.div`
  display: flex;
`

const Icon = {
  FinancialService: FinancialService,
  OptuneBrain: OptuneBrain,
}

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
    {!!icon && <IconContainer>{Icon[icon]({})}</IconContainer>}

    <Paragraph>
      <h1 className="font-20-bold">{title}<br />
      {titleLink && <span className="font-16-regular">(<LinkText {...titleLink} accent />)</span>}
      </h1>

      {!!subtitle && <Subtitle className="font-16-bold">{subtitle}</Subtitle>}

      {(!!time || !!location) && (
        <IconTextContainer>
          {!!time && <IconText icon="calendar" text={time} />}
          {!!location && <IconText icon="environment" text={location} />}
        </IconTextContainer>
      )}

      <p className="font-14-regular">{text}</p>

      {!!list && list.length && (
        <TaskList>
          {list.map((task, index) => (
            <li key={`task-${index}`} className="font-14-regular">{task}</li>
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
    </Paragraph>
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
