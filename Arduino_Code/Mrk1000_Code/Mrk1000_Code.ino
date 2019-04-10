#include <WiFi101.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiSSLClient.h>
#include <WiFiUdp.h>

#include <Wire.h>

#include "wiring_private.h"

Uart mySerial (&sercom3, 0, 1, SERCOM_RX_PAD_1, UART_TX_PAD_0); // Create the new UART instance assigning it to pin 0 and 1

String inData = "";   //defines string for incoming ID code 
String outData = "";  //defines ID code for sending out 

#include <SPI.h>
#define PubNub_BASE_CLIENT WiFiClient  //Allows the keyword "client" to be reserverd for PubNub 
#include <PubNub.h>

/*
 * This example is modified from the original file
 * https://github.com/arduino-libraries/WiFi101/blob/master/examples/SimpleWebServerWiFi/SimpleWebServerWiFi.ino
 */

byte mac[] = {0x00, 0x0E, 0xEF, 0x00, 0x00, 0xA3};  //Physical address

const int analogIn = A0;   //this was used for a photosensitive resistor during testing

char pubkey[] = "pub-c-76d1d259-d00d-41ab-8bbe-78ba591eaf21";  //deatils for pubnub account
char subkey[] = "sub-c-8a024ae2-3909-11e9-b682-2a55d2175413";
char channel[] = "ChannelMate";   //the pubnub channel name which it will publish to 

char ssid[] = "AndroidAP";      //   network SSID (name)
char pass[] = "rrda9493";   //  network password
int keyIndex = 0;                 // network key Index number (needed only for WEP)
bool val = true;

int status = WL_IDLE_STATUS;
WiFiServer server(80);

void setup() {
  Serial.begin(9600);      // initialize serial communication  
  mySerial.begin(9600);    // software serial start
   
  //NOTE: this section is different because software serial works differently for Mrk1000
  pinPeripheral(0, PIO_SERCOM); //Assign RX function to pin 0
  pinPeripheral(1, PIO_SERCOM); //Assign TX function to pin 1

  Serial.print("Start Software Serial ");  //prints to monitor
  
  Serial.print("Start Serial ");
  // Check for the presence of the shield
  Serial.print("WiFi101 shield: ");
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("NOT PRESENT");
    return; // don't continue
  }
  Serial.println("DETECTED");
  // attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);                   // print the network name (SSID);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);
    // wait 10 seconds for connection:
    delay(10000);
  }
  server.begin();                           // start the web server on port 80
  printWifiStatus();                        // you're connected now, so print out the status

  PubNub.begin(pubkey, subkey);   //sends the pubkey and subkey for authorization 
  Serial.println("PubNub is set up!");  //prints feedback! 

}


void loop() {

 WiFiClient client = server.available();   // listen for incoming clients

 if (client) {                             // if you get a client,
   Serial.println("new client");           // print a message out the serial port
   String currentLine = "";                // make a String to hold incoming data from the client
   while (client.connected()) {            // loop while the client's connected
     if (client.available()) {             // if there's bytes to read from the client,
       char c = client.read();             // read a byte, then
       Serial.write(c);                    // print it out the serial monitor
       if (c == '\n') {                    // if the byte is a newline character

         // if the current line is blank, you got two newline characters in a row.
         // that's the end of the client HTTP request, so send a response:
         if (currentLine.length() == 0) {
           // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
           // and a content-type so the client knows what's coming, then a blank line:
           client.println("HTTP/1.1 200 OK");
           client.println("Content-type:text/html");
           client.println();

           // The HTTP response ends with another blank line:
           client.println();
           // break out of the while loop:
           break;
         }
         else {      // if you got a newline, then clear currentLine:
           currentLine = "";
         }
       }
       else if (c != '\r') {    // if you got anything else but a carriage return character,
         currentLine += c;      // add it to the end of the currentLine
       }

     }
     
    while (mySerial.available() > 0)  //when software serial is active
        {
            char recieved = mySerial.read();  //read incoming data and store as a char
            inData += recieved; //append inData to the recived data 
    
            // Process message when new line character is recieved
            if (recieved == '\n')
            {
                Serial.print("Arduino Received: ");
                Serial.print(inData);
                outData = inData;   //shows the data received by software serial
      
                char out[64];  //defines a char array for PubNub
                                         
                outData = "\""+outData+"\"";  //      KEEEPS THE " " AFTER CODE IS COMPLIED (pubnub EON format)
                outData.remove(12,2);   //NEEDED TO REMOVE THE LINE PRINT AT THIS POINT 
                                          
                outData.toCharArray(out, 64); //Stores the code in the Char Array
                     
                char msg[64] = "{\"eon\":{\"userID\":";  //defines first half of message 
                     
                sprintf(msg + strlen(msg), "%s", out);  //appends first half with code
                
                strcat(msg, "}}");  //appends ending of message to then first half & code 
                   
                Serial.print("MESSAGE: ");  //prints feedback what message is being sent to pubnub
                Serial.println(msg);  //prints the full message 
            
                PubNub.publish(channel, msg);  //sends full code message to ChannelMate 
    
                inData = ""; // Clear recieved buffer to next data from UNO
                                                       
              }
       
          }
  
     }
       
    delay(1000);
     
    inData = ""; // Clear recieved buffer
     
    Serial.println("client disonnected");
   }  
  
  
  }

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
  // print where to go in a browser:
  Serial.print("To see this page in action, open a browser to http://");
  Serial.println(ip);
}

// Attach the interrupt handler to the SERCOM
void SERCOM3_Handler()  //This section is for the way the Mrk1000 handles Software Serial 
{
  mySerial.IrqHandler();
}
