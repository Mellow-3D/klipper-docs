# Board.txt可配置文件
下面是可以使用 /sys/board.txt 文件配置的项目列表。

board.txt 文件中输入的任何内容都优先于固件中的设置。

对于 STM32 板，引脚可以采用 PC.1、PC_1、C.1、C_1 或引脚名称的形式。

# 配置表

<div class="datatable-begin"></div>

|Item Name|Example|Description|LPC Comments|STM32 Comments|
| :------------- | :---------------|:---|:---|:---|
|8266wifi.csPin|8266wifi.csPin = 0.16|Allow use of non standard CS pin|||
|8266wifi.espDataReadyPin|example 8266wifi.espDataReadyPin = 0.28| used to indicate that data is available from the ESP8266|One pin from port 0 or 2 of the MCU should be used||
|8266wifi.espResetPin|8266wifi.espResetPin = 1.31|This sets the reset pin to use when connecting an ESP8266|||
|8266wifi.lpcTfrReadyPin (8266wifi.TfrReadyPin is also supported from 3.2_4)|8266wifi.lpcTfrReadyPin = 1.30|This sets the transfer ready pin when connecting an ESP8266|||
|8266wifi.serialRxTxPins|8266wifi.serialRxTxPins = {0.3, 0.2}|This sets the pin numbers to use for RX and TX when connecting an ESP8266. See table below for allowable RX and TX pins|||
|8266wifi.spiChannel|8266wifi.spiChannel=1|This allows the SPI channel to be set that is used for WiFi. The default is 1. It can only be set to channel 1 (SPI2) or channel 2 (SPI3). From 3.3rc2_2 only|STM32 Only||
|accelerometer.spiChannel| accelerometer.spiChannel = 4 | This sets the SPI channel to be used for the accelerometer. From 3.3b3_2 onwards |STM32 Only||
|adc.prefilter.enable|adc.prefilter.enable = true|This enables or disables the analogue to digital converter filter. Can be either true or false||LPC Only|
|adc.preFilter.numberSamples|adc.preFilter.numberSamples = 8|This sets the number of samples to be used to get each value. The larger the value, the smoother the value but lag may also be introduced. The default is 8||LPC Only|
|adc.preFilter.sampleRate|adc.preFilter.sampleRate = 10000|This sets the analogue to digital converter sample rate in Hz||LPC Only|
|atx.initialPowerOn|atx.initialPowerOn = 1|This sets the ATX power pin as on as soon as the board powers up rather than having to wait for M80 to be ran. The default is true|||
|atx.powerPin|atx.PowerPin = 2.12|This sets the pin to be used for controlling an ATX power supply|||
|atx.powerPinInverted|atx.powerPinInverted = 0|Some ATX power supplies are active low for off and some are active high. This allows that to be set. Use either 0 or 1|||
|heat.spiTempSensorChannel|heat.spiTempSensorChannel = 255|this selects which SPI channel is used to communicate with the temperature sensor board. Can be set to 255 to indicate no channel to be used|LPC has three SPI interfaces (two channels 0 and 1 are hardware based - SSP0 and SSP1 and channel 2 is software| STM32 has six SPI interfaces (three channels 0, 1, 2 are hardware based although only 0 and 1 are implemented, channels 3, 4 and 5 are software)|
|heat.spiTempSensorCSPins|heat.spiTempSensorCSPins = {1.21, NoPin}|Sets the SPI temperature sensor chip select pin. Can be set to 255 to indicate no channel to be used|LPC accepts a maximum of 2 sensors|STM32 accepts a maximum of 2 sensors|
|heat.tempSensePins|heat.tempSensePins = {0.25,0.23}|Sets the temperature sensor pins starting with the bed|LPC Accepts a maximum of 3 entries|STM32 accepts a maximum of 9 entries|
|lcd.encoderPinA|lcd.encoderPinA = 3.25|Sets the pin for connection A of the encoder|STM32 Only||
|lcd.encoderPinB|lcd.encoderPinB = 3.26|Sets the pin for connection B of the encoder|STM32 Only||
|lcd.encoderPinSw|lcd.encoderPinSw = 1.30|Sets the pin to be used for the encoder click|STM32 Only||
|lcd.lcdBeepPin|lcd.lcdBeepPin = 1.31|Sets the pin to be used to control the display beeper|STM32 Only||
|lcd.lcdCSPin|lcd.lcdCSPin = 0.16|Sets the LCD chip select pin|STM32 Only||
|lcd.lcdDCPin|lcd.lcdDCPin = 2.11|Sets the data control pin (A0)|STM32 Only||
|lcd.panelButtonPin|lcd.panelButtonPin = 2.11|For use when a connected display has an extra button|STM32 Only||
|lcd.spiChannel|lcd.spiChannel = 255|This selects which SPI channel is used to communicate with the LCD. Can be set to 255 to indicate no channel to be used|STM32 Only|STM32 has six SPI interfaces (three channels 0, 1, 2 are hardware based although only 0 and 1 are implemented, channels 3, 4 and 5 are software)|
|led.neopixelPin|led.neopixelPin = 1.24|This sets the output pin for neopixel control|||
|leds.diagnostic|leds.diagnostic = 1.18|This would set the correct pin for controlling a diagnostic LED|||
|lpc.board ("board" is also supported from 3.2_4)|lpc.board = fly_e3|This sets the correct board pin mapping to load. See table below for current list|||
|power.VInDetectPin|powerVInDetectPin = C.3|Sets the pin to use for voltage monitoring|STM32 Only||
|power.voltage|power.voltage = 24|Sets a voltage when no voltage monitoring is present on the board|STM32 Only||
|sbc.csPin|sbc.csPin = 0.16|Allow use of non standard CS pin|||
|sbc.lpcTfrReadyPin ("sbc.TfrReadyPin" is also supported from 3.2_4)|sbc.lpcTfrReadyPin = 0.28 or sbc.TfrReadyPin = 0.28|This sets the transfer ready pin when attaching an SBC|||
|sbc.spiChannel|sbc.spiChannel=1|This allows the SPI channel to be set that is used for SBC. The default is 1. It can only be set to channel 1 (SPI2) or channel 2 (SPI3). From 3.3rc2_2 only|STM32 Only||
|sdCard.external.cardDetectPin|externalSDCard.cardDetectPin|Sets the external SD card detect pin|||
|sdCard.external.csPin|externalSDCard.csPin|Sets the external SD card chip select pin|||
|sdCard.external.spiChannel|sdCard.external.spiChannel = 255|this selects which one is used for the external SD card, can also be set to 255 to indicate no channel is used|||
|sdCard.external.spiFrequencyHz|sdCard.external.spiFrequencyHz = 4000000|Sets the SPI speed for an external SD card in Hz|||
|sdCard.internal.spiFrequencyHz|sdCard.internal.spiFrequencyHz = 4000000|Sets the SPI speed for the internal SD card in Hz|||
|serial.aux.rxTxPins|serial.aux.rxTxPins = {0.3, 0.2}|This sets the pin numbers to use for RX and TX on AUX1. Typically uses UART0. See table below for allowable RX and TX pins|||
|serial.aux2.rxTxPins|serial.aux2.rxTxPins = {0.11, 0.10}|This sets the pin numbers to use for RX and TX on AUX2. Typically uses UART2. See table below for allowable RX and TX pins|||
|softwareSPI.pins|softwareSPI.pins = {0.15,0.17,0.16}|Sets the software SPI pins in the order SCK, MISO, MOSI|||
|SPI0.pins|SPI0.pins = {0.15,0.17,0.16}|Sets the SPI pins in the order SCK, MISO, MOSI for Channel 0 - 3.2_7 Onwards|Hardware|Hardware - Not Configurable|
|SPI1.pins|SPI1.pins = {0.15,0.17,0.16}|Sets the SPI pins in the order SCK, MISO, MOSI for Channel 1 - 3.2_7 Onwards|Hardware|Hardware - Not Configurable|
|SPI2.pins|SPI2.pins = {0.15,0.17,0.16}|Sets the SPI pins in the order SCK, MISO, MOSI for Channel 2 - 3.2_7 Onwards|Software|Hardware - Not Configurable|
|SPI3.pins|SPI3.pins = {0.15,0.17,0.16}|Sets the SPI pins in the order SCK, MISO, MOSI for Channel 3 - 3.2_7 Onwards|STM32 Only|Software|
|SPI4.pins|SPI4.pins = {0.15,0.17,0.16}|Sets the SPI pins in the order SCK, MISO, MOSI for Channel 4 - 3.2_7 Onwards|STM32 Only|Software|
|SPI5.pins|SPI5.pins = {0.15,0.17,0.16}|Sets the SPI pins in the order SCK, MISO, MOSI for Channel 5 - 3.2_7 Onwards|STM32 Only|Software|
|SSP0.pins|SSP0.pins = {0.15,0.17,1.24,0.16}|Sets the pins to be used for SSP0 in the order SCK, MISO, MOSI, CS||LPC Only|
|stepper.digipotFactor|stepper.digipotFactor = 113.33|Sets the output current for a built in driver as a factor of 255 against max current|MKS Sbase and Smoothieboard only||
|stepper.directionPins|stepper.directionPins = { 0.5,0.11,0.20,0.22,2.13}|Sets the driver direction pins in the order 0, 1, 2, 3 and so on|LPC supports a maximum of 7 drivers|STM32 supports a maximum of 11 drivers|
|stepper.enablePins|stepper.enablePins = {0.4,0.10,0.19,0.21,4.29}|Sets the driver enable pins in the order 0, 1, 2, 3 and so on|LPC supports a maximum of 7 drivers|STM32 supports a maximum of 11 drivers|
|stepper.numSmartDrivers|stepper.numSmartDrivers = 3|Sets the number of TMC22XX drivers installed between 1 and 11. Drivers must be installed from drive 0 after 5160 drivers|||
|stepper.num5160Drivers|stepper.num5160Drivers = 3|Sets the number of TMC22XX drivers installed between 1 and 11. Drivers must be installed from drive 0 before 22XX drivers|STM32 Only||
|stepper.spiChannel|stepper.spiChannel = 3|Sets the SPI channel to use for 5160 drivers|STM32 Only||
|stepper.stepPins|stepper.stepPins = {2.0,2.1,2.2,2.3,2.8}|Sets the driver step pins in the order 0, 1, 2, 3 and so on|LPC supports a maximum of 7 drivers|STM32 supports a maximum of 11 drivers|
|stepper.TmcDiagPins|stepper.TmcDiagPins = {1.29, 1.28}|Sets the stall detection diag pins. Typically same pin as the endstop pin|||
|stepper.TmcUartPins|stepper.TmcUartPins = {1.10,1.9,1.8,1.4,1.1}|Sets the pin numbers used for communications with TMC22XX drivers using a UART interface|LPC supports a maximum of 7 drivers|STM32 supports a maximum of 11 drivers|

<div class="datatable-end"></div>

-------

