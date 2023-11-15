import React from 'react'
import PropTypes from 'prop-types'

import { Timeline } from 'antd'

import { Icon } from '../atoms/icons/index'

// styling
import styled from 'styled-components'

const TimelineContainer = styled.div`
  margin-top: 85px;
  margin-left: 20px;

  @media print {
    margin-left: 20px;
  }

  & .ant-timeline-item-head-green {
    color: var(--color-accent);
    background-color: var(--color-background);
  }

  & svg.icon {
    width: 24px;
    height: 24px;
  }
`

const TimelineText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 0 20px;

  @media print {
    gap: 0 10px;
  }
`

const Text = styled.p`
`

const Info = styled.p`
  min-width: 110px;
  width: 110px;
  color: var(--color-text-secondary);

  @media print {
    min-width: 90px;
    width: 90px;
  }
`

export const TimelineSection = ({ timeline }) => (
  <TimelineContainer>
    <Timeline>
      {timeline.map(({ time, text, company }) => (
        <Timeline.Item
          key={`timeline-item-${time}`}
          dot={<Icon.timeline style={{ fontSize: '16px' }} />}
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
  </TimelineContainer>
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
