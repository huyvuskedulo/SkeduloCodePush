import React from 'react'
import { SafeAreaView } from 'react-native'
import Container from './components/container'

function ReactNative2048() {
    console.log(this.initialProps)
    return (
        <SafeAreaView>
            <Container startTiles={2} size={4} />
        </SafeAreaView>
    )
}

export default ReactNative2048;