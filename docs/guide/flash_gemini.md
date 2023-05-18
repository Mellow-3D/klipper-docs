# Flashing the a Gemini

## Compatible Boards

This guide is applicable to
  * Gemini v1
  * Gemini v1.1
  * Gemini v2

## Hardware Prequisites 

### Required Hardware

Two decent SD cards. One must be less than 32Gb and formatted as fat32.  

### Jumper Configuration

Set the 8 way DIP switch as per the table below

|1|2|3|4|5|6|7|8|
| :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: |
|Off|Off|On|On|Off|Off|Off|Off|

![Gemini 8-way DIPs](../../images/guides/flash_gemini/gemini_8_way.jpg ":no-zooom")

#### Gemini v1 Only

Set the 4 way DIP switch as per the table below

|1|2|3|4|
| :----: | :----: | :----: | :----: |
|Off|Off|Off|Off|

![Gemini 4-way DIPs](../../images/guides/flash_gemini/gemini_4_way.jpg ":no-zooom")

#### Gemini v1.1/v2 Only

Set the 5 way DIP switch as per the table below

|1|2|3|4|5|
| :----: | :----: | :----: | :----: | :----: |
|Off|Off|Off|Off|Off|

![Gemini 4-way DIPs](../../images/guides/flash_gemini/gemini_5_way.jpg ":no-zooom")

### USB Port Usage

If using a USB WiFi dongle, do not use the USB port highlighted

## Software Prequisites

The following software should be downloaded and installed

  * [Balena Etcher](https://www.balena.io/etcher/)
  * [Mobaxterm](https://mobaxterm.mobatek.net/)

You also need to download the latest Fly Klipper image from [here]

## Flashing the SD Card

Install and then open Balena Etcher.  

Click on the flash from file button and locate the Fly Klipper image you downloaded earlier.  

![Balena Etcher](../../images/guides/flash_gemini/balena_1.png ":no-zooom")

Then click on the Select Target button and select the SD card.  

![Balena Etcher](../../images/guides/flash_gemini/balena_2.png ":no-zooom")

Finally click flash.

![Balena Etcher](../../images/guides/flash_gemini/balena_3.png ":no-zooom")

When completed, plug the SD card into the Gemini board in the SD slot near the USB ports. Then supply 12/24v power to the board.

![Gemini SBC SD Card Slot](../../images/guides/flash_gemini/sbc_sdcard.png ":no-zooom")

## Connecting via WiFi (Skip if using Ethernet)

Install Mobaxterm.  

Plug the Gemini board into your computer using a USB-C cable. Use the USB-C port which is closest to the Ethernet port on the Gemini.  

Open Mobaxterm.  

Click on session, then serial, then OK. Select the serial port which includes the name CH340.

Once at the command prompt run 
```
nmtui
```

Click activate connection and then browse to your WiFi connect name and enter the WiFi password.  

Then click ok and then quit.  

Enter ip -a, and you're looking for the inet of wlan0 adapter, that is your IP address

## Connect to the board via SSH

In Mobaxterm, click on session, then SSH. For the remote host, add the IP address you obtained earlier, click on specify username and enter the username `Fly`.  

The password is mellow.  

### Change the default password

The first thing to do is change the default password. This can be done using the command `passwd`. 

### Generate a klipper image for the Gemini

Enter the following code
```
cd klipper
make clean
make menuconfig
```

Adjust the settings to match the image below and then press `Q` and then `Y`.  

Enter the following code
```
make
```
Once the process has completed, on the left hand side of Mobaxterm, double click on the klipper folder and then the out folder.  

Right click on klipper.bin and download it to your computer.  

Copy the downloaded `klipper.bin` file to the root of the 32Gb or less SD card.

Rename it `firmware.bin`

Insert the SD card into the other SD card slot on the Gemini (near the USB-C sockets) and press the reset button. This will flash klipper to the STM32 side of the Gemini.  

Wait 30 seconds and then press the reset button shown above.

Using your web browser, navigate to the IP address followed by :9999, e.g. `http://192.168.1.2:9999`

This will display the UUID of the STM32 side of the Gemini Board.

Copy the UUID to the printer.cfg file in fluidd as shown below

```
[mcu]
 serial: /dev/serial/by-id/usb-Klipper_stm32f405xx_320029000450314335393220-if00
```
Now all that is required is to configure printer.cfg to match you printer.