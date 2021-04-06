import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
        getCameraPermissions = async id => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
        
            this.setState({
              /*status === "granted" is true when user has granted permission
                  status === "granted" is false when user has not granted the permission
                */
              hasCameraPermissions: status === "granted",
              
            });
          };
          handleBarCodeScanned = async ({ type,  data }) => {
              this.setState({
                scanned:true,
                scannedData:data,
                buttonState:"normal"
              })
          }
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState !== "normal" && hasCameraPermissions) {
        return (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }else if (buttonState === "normal") {
        return(
            <View style={styles.container}>
              <Text style={styles.displaytext}>{
                  hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
              }</Text>
<Image
              source={require("../assets/220px-Barcode-scanner.jpg")}
              style={{ width: 200, height: 200 }}
            />
              <TouchableOpacity
              onPress={this.getCameraPermissions}
              style={styles.scanbutton}
              title = "Bar Code Scanner"> 
              <Text style={styles.buttontext}>Scan QR Code</Text>
              </TouchableOpacity>
            </View>
        )
    }
    }}
    const styles=StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          },
          displayText: {
            fontSize: 40,
           
          },
          scanButton: {
            backgroundColor: "#2196F3",
            padding: 10,
            margin: 10
          },
          buttonText: {
            fontSize: 15,
            textAlign: "center",
            marginTop: 10
          },
    })