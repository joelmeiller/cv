import React from 'react'
import { Icon } from 'antd'
import styled, { keyframes } from "styled-components"

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`


const blink = keyframes`
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`


const LoadingDots = styled.span`
  & span {
    animation-name: ${blink};
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  & span:nth-child(2) {
    animation-delay: 0.2s;
  }

  & span:nth-child(3) {
    animation-delay: 0.4s;
  }
`
const Text = styled.span`
  margin-left: 10px;
  margin-right: 5px;
`

export const PageLoading = () => (
  <Loading>
    <p className="font-20-bold">
      <Icon type="deployment-unit" spin /><Text>Loading CV</Text>
      <LoadingDots>
        <span>. </span>
        <span>. </span>
        <span>.</span>
      </LoadingDots>
    </p>
  </Loading>
)