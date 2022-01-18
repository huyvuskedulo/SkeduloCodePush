import React, { useState } from 'react'
import { Switch, View } from 'react-native'
import Advanced from './examples/Advanced'
import Simple from './examples/Simple'
import styled from 'styled-components'

const Container = styled.View`
  min-height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #F08F90;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: -100;
`

const InstructionText = styled.Text`
  margin-right: 10px;
`

export default function TinderApp () {
  const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <Container>
     <Simple />
    </Container>
  )
}
