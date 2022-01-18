import React, { useState } from 'react'
import styled from 'styled-components'
import TinderCard from 'react-tinder-card'

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin-bottom: 30px;
`

const CardContainer = styled.View`
    width: 90%;
    max-width: 260px;
    height: 300px;
`

const Card = styled.View`
    position: absolute;
    background-color: #000;
    width: 100%;
    max-width: 260px;
    height: 300px;
    shadow-color: white;
    shadow-opacity: 0.2;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`

const InfoText = styled.Text`
    height: 28px;
    justify-content: center;
    display: flex;
    z-index: -100;
    color: #fff;
`

const db = [
  {
    name: 'Richard Hendricks',
    img: 'https://media.istockphoto.com/photos/portrait-of-a-frightened-cat-closeup-breed-scottish-fold-picture-id614606664?k=20&m=614606664&s=612x612&w=0&h=KAn_QmEHFHxk8IvqySBkr6FfTYxVFVwq4kkwSnRJTTU='
  },
  {
    name: 'Erlich Bachman',
    img: 'https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?b=1&k=20&m=1067347086&s=170667a&w=0&h=kLUll2ujZmQo8JjMQYuxyVCtCtdd6W6ylzu6fJqu8PI='
  },
  {
    name: 'Monica Hall',
    img: 'https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg'
  },
  {
    name: 'Jared Dunn',
    img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    img: 'https://media.wired.com/photos/5cdefb92b86e041493d389df/2:1/w_1500,h_750,c_limit/Culture-Grumpy-Cat-487386121.jpg'
  }
]

function Simple () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <Container>
      <Header>React Native Tinder Card</Header>
      <CardContainer>
        {characters.map((character) =>
          <TinderCard key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <Card>
              <CardImage source={{uri: character.img}}>
                <CardTitle>{character.name}</CardTitle>
              </CardImage>
            </Card>
          </TinderCard>
        )}
      </CardContainer>
      {lastDirection ? <InfoText>You swiped {lastDirection}</InfoText> : <InfoText />}
    </Container>
  )
}

export default Simple
