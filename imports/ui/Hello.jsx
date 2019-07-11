import React, { Component } from 'react'
import { Row, Col, Typography, Divider, Button } from 'antd'

const { Title, Paragraph, Text } = Typography

export default class Hello extends Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  render() {
    return (
      <div>
        <Row gutter={{ sm: 16, md: 24, lg: 32 }}>
          <Col md={24} lg={12}>
            <Title>Test Ant Design</Title>
            <Paragraph>
              <Text>Press the button</Text>
              <Button onClick={() => this.increment()}>Click Me</Button>
            </Paragraph>
          </Col>
          <Col md={24} lg={12} >
            <Paragraph>
              <Text>You've pressed the button {this.state.counter} times.</Text>
            </Paragraph>
          </Col>
        </Row>
      </div>
    )
  }
}
