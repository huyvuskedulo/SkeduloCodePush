import React from 'react'
import {
  Text,
  FlatList,
  View,
  Image
} from 'react-native';

function MyBigList() {


  const data = []
for(i = 0; i < 1000000; i++){
  data.push({name: 'Item Name: ' + i, description: "Description " + i})
}

  const renderItem = ({ item, index }) => (
    <View style={{ padding:10}}>
      <Text style={{color: "white", fontSize: 30}}>{item.name}</Text>
      <Image
        source={{
          uri: 'https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/fb98e6a1e1225d7db1e08f0cbe19f70e.png',
        }}
        style={{ width: '100%', height: 400 }}
      />
    </View>
  );
  
  return (
    <View>
    <FlatList
      data={data}
      renderItem={renderItem}
    />
    </View>
  );
  };

  export default MyBigList