import React, {useState} from 'react'
import {
  Text,
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import Validation from "../validation_func"

function DataDrivenScreen({route}) {

    const [errorMessage, setErrorMessage] = useState(true);

    var customData = require('./ui_sample.json')

    var formData = customData[route.params.formName];

    const verify = function() {
        var message = Validation[route.params.formName]();

        setErrorMessage(message)
      }

    renderItem = function(data) {
        return (<View>
            {
                data.map((item, i) => (
                    <View style={{marginTop: 10}}>
                        <Text>{item.title}</Text>

                        <TextInput
                            style={{backgroundColor: "grey", borderRadius: 5, height: 40, padding: 5}}
                            placeholder={item.placeholder}
                            placeholderTextColor="white" />
                    </View>
                ))}

            <TouchableOpacity onPress={verify} style={{backgroundColor: "black", marginTop: 10}}>
                <View>
                    <Text style={{
                          margin: 10,
                          fontSize: 18,
                          color: 'white'
                    }}>Save</Text>
                </View>
            </TouchableOpacity>

        </View>)
    }
  
  return (
    <View style={{padding: 10, backgroundColor: "white"}}>
        
        { errorMessage != null ? <Text style={{color: "red"}}>{errorMessage}</Text> : null }

        { formData ? renderItem(formData.components) : <Text>Form not found???</Text> }
    </View>
  )
  }

  export default DataDrivenScreen