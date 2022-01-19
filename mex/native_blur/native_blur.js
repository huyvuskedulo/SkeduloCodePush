/**
 * Basic [iOS] Example for react-native-blur
 * https://github.com/react-native-community/react-native-blur
 */
 import React, {Component} from 'react';
 import {
   Image,
   StyleSheet,
   Platform,
   Switch,
   Text,
   View,
 } from 'react-native';

 import SegmentedControl from '@react-native-community/segmented-control'
 
 import {BlurView, VibrancyView} from '@react-native-community/blur';
 
 export default class Basic extends Component {
   constructor(props) {
     super(props);
 
     this.state = {
       showBlurs: true,
       blurBlurType: 'light',
       blurActiveSegment: 1,
       vibrancyBlurType: 'dark',
       vibrancyActiveSegment: 2,
     };
   }
 
   _onBlurChange(event) {
     this.setState({blurActiveSegment: event.nativeEvent.selectedSegmentIndex});
   }
 
   _onBlurValueChange(value) {
     this.setState({blurBlurType: value});
   }
 
   _onVibrancyChange(event) {
     this.setState({
       vibrancyActiveSegment: event.nativeEvent.selectedSegmentIndex,
     });
   }
 
   _onVibrancyValueChange(value) {
     this.setState({vibrancyBlurType: value});
   }
 
   renderBlurs() {
     const tintColor = this.state.blurBlurType === 'xlight' ? 'black' : 'white';
     const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';
 
     return (
       <View style={styles.container}> 
         {
           /*
             VibrancyView is only supported on iOS, and must contain child views,
             otherwise the vibrancy effect doesn't work.
           */
           Platform.OS === 'ios' && (
             <VibrancyView
               blurType={this.state.vibrancyBlurType}
               blurAmount={10}
               reducedTransparencyFallbackColor={'pink'}
               style={[styles.container, styles.blurContainer]}>
               <Text style={styles.text}>Vibrancy component</Text>
 
               <SegmentedControl
                 values={['xlight', 'light', 'dark', 'regular', 'prominent']}
                 selectedIndex={this.state.vibrancyActiveSegment}
                 onChange={(event) => {
                   this._onVibrancyChange(event);
                 }}
                 onValueChange={(value) => {
                   this._onVibrancyValueChange(value);
                 }}
                 tintColor="white"
               />
             </VibrancyView>
           )
         }
       </View>
     );
   }
 
   render() {

     return (
       <View style={styles.container}>
         <Image
           source={{uri: "https://png.pngtree.com/background/20210712/original/pngtree-modern-double-colors-neon-lights-on-brick-background-picture-image_1170045.jpg"}}
           resizeMode="cover"
           style={styles.img}
         />
 
         {this.state.showBlurs ? this.renderBlurs() : null}
 
         <View style={styles.blurToggle}>
           <Switch
             onValueChange={(value) => this.setState({showBlurs: value})}
             value={this.state.showBlurs}
           />
         </View>
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'transparent',
   },
   blurContainer: {
     flex: 1,
     backgroundColor: 'transparent',
     justifyContent: 'center',
     alignItems: 'stretch',
     paddingHorizontal: 20,
   },
   blurView: {
     position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
   },
   img: {
     position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
     height: null,
     width: null,
   },
   text: {
     fontSize: 20,
     fontWeight: 'bold',
     textAlign: 'center',
     margin: 10,
     color: 'white',
   },
   blurToggle: {
     position: 'absolute',
     top: 30,
     right: 10,
     alignItems: 'flex-end',
   },
 });