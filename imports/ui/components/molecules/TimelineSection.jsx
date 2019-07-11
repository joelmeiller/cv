import React from 'react'
import PropTypes from 'prop-types'

import { Timeline, Icon } from 'antd'

// styling
import styled from 'styled-components'

import { ColorAccent } from '../../styles/variables'

const Section = styled.div`
  padding-top: var(--size-64);
  padding-bottom: var(--size-64);
`

const TimelineText = styled.div`
  display: flex;
`

const Text = styled.p`
`

const Info = styled.p`
  min-width: 100px;
  color: var(--color-text-secondary);
  margin-left: 20px;
  margin-right: 10px;
`

export const TimelineSection = ({ timeline }) => (
  <Timeline>
    {timeline.map(({ time, text, company }) => (
      <Timeline.Item
        key={`timeline-item-${time}`}
        dot={<Icon type="check-circle" style={{ fontSize: '16px' }} />}
        color={'green'}
      >
        <TimelineText>
          <Info className="font-14-regular">
            {time}
            <br />
            {company}
          </Info>
          <Text className="font-14-regular">{text}</Text>
        </TimelineText>
      </Timeline.Item>
    ))}
  </Timeline>
)

TimelineSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  attachment: PropTypes.shape({
    url: PropTypes.string,
    fileName: PropTypes.string,
    text: PropTypes.string,
  }),
}
