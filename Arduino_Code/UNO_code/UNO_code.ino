#include <SPI.h> 
#include <MFRC522.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(4, 5); // sets up the software serial (PIN 4=RX, PIN 5=TX)

#define SS_PIN 10 
#define RST_PIN 9 

#define LED_DENIED_PIN 7  
#define LED_ACCESS_PIN 6

LiquidCrystal_I2C lcd(0x20,16,2);  //sets up the LCD libiary to the compoment 
MFRC522 mfrc522(SS_PIN, RST_PIN); // Instance of the class

int code[] = {0x61, 0xD6, 0x8F, 0xAB}; //This is the stored UID (Unlock Card)
int codeRead = 0;  //sets defualt to zero
String uidString;  //defines the incoming ID code from RFID card/hob

int solenoidPin = 3;                    //This is the output pin on the Arduino

void setup() {
   Serial.begin(9600);

   mySerial.begin(9600); //Software Serial

   while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  } 

   
   SPI.begin();       // Init SPI bus
   mfrc522.PCD_Init(); // Init MFRC522 
   Serial.println("Arduino RFID reading UID");

   pinMode(solenoidPin, OUTPUT);          //Sets that pin as an output for push/pull

   pinMode( LED_DENIED_PIN , OUTPUT);  //Access denied for LED
   pinMode( LED_ACCESS_PIN , OUTPUT);  //Access granted for LED

   lcd.begin();  //starts the LCD screen 
  // Print a message to the LCD.
  lcd.backlight();
  lcd.setCursor(0,0); //first line on LCD
  lcd.print("Hello Student!");
  lcd.setCursor(0, 1); //second line of LCD
  lcd.print("Scan your card..");
  
}
void loop() {
  
if ( mfrc522.PICC_IsNewCardPresent())  //If a new card/hob is present
    {
        if ( mfrc522.PICC_ReadCardSerial())  //If it reads any data
        {
           lcd.clear();
           Serial.print("Tag UID:");  //prints to serial monitor 
           lcd.setCursor(0,0);
           lcd.print("Tag UID:");  //prints to the LCD
           lcd.setCursor(0,1);
           for (byte i = 0; i < mfrc522.uid.size; i++) {   //Loops through incoming HEX values and prints 
                  Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "); 
                  Serial.print(mfrc522.uid.uidByte[i], HEX);
                  
                  lcd.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
                  lcd.print(mfrc522.uid.uidByte[i], HEX);
                //  lcd.print(" ");
            }
            
            Serial.println();  //New line (monitor) 

            int i = 0;
            boolean match = true;
            while(i<mfrc522.uid.size)
            {
    
               if(!(int(mfrc522.uid.uidByte[i]) == int(code[i]))) //Compairs unlock code with code on card/hob
               {
                  match = false;
               }
              i++;
            }

            delay(3000);
           lcd.clear();
           lcd.setCursor(0,0);
           
           
           if(match)  //If the code does match!
           {

              Serial.println("Authorized Access - Welcome User: 61 D6 8F AB"); //prints feedback to monitor

              mySerial.println("61 D6 8F AB"); //THIS SENDS TO OTHER ARUDINO VIA SOFTWARE SERIAL 
              
            
              digitalWrite( LED_ACCESS_PIN , HIGH);  //Lights LED

              lcd.print("Authorized access");  //Displays ACCESS to LCD
              delay(1000);

              digitalWrite(solenoidPin, HIGH);      //Switch Solenoid ON
              delay(3000);                          //Wait 3 Seconds

              digitalWrite(solenoidPin, LOW);       //Switch Solenoid OFF
    
           }else{
            
              digitalWrite( LED_DENIED_PIN , HIGH);  //lights red LED
              lcd.print(" Access denied  ");   //prints to LCD 
             Serial.println("\nUnknown Card");  //prints to monitor
           }
             
             Serial.println("============================");  //breakline 
            
             mfrc522.PICC_HaltA();

             delay(3000); 
             reset_state();  //resets the RFID to neutral state 
        }
}
}
void reset_state()  //RESETS LCD SCREEN
{
    lcd.clear();   
    lcd.setCursor(0,0); //first line on LCD
    lcd.print("Hello Student!");
    lcd.setCursor(0, 1); //second line of LCD
    lcd.print("Scan your card..");
    
    digitalWrite( LED_ACCESS_PIN , LOW);  //RESETS LEDS TO OFF
    digitalWrite( LED_DENIED_PIN , LOW);
}
