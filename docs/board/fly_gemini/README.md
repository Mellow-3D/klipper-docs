# FLY-9轴
!> 9轴主板基础文档

## 一般信息

### 9轴引脚图
![9轴引脚图](../../images/fly_407zg_pins.svg)

### 散热片
9轴板配有两个散热片，请按下图安装

![FLY9轴散热片](../../images/fly_407zg_heatsinks.jpg ':size=400')

### 跳线帽
驱动跳线如下安装，9轴的SPI模式因为与驱动的SPI引脚不匹配所以无法使用，请使用UART模式

![FLY跳线帽引脚](../../images/fly_407zg_jumpers.png)

### 输入电压
9轴支持最大32v输入

### 安装
您收到的主板没有安装任何固件，因此当插入电脑时，主板将显示为未识别的设备。按照 [ESP8266 WIFI 说明](#/board/fly_9轴/wifi8266 ':ignore') ， [ESP32 WIFI 说明](#/board/fly_9轴/wifi32 ':ignore') 或 [SBC连接说明](#/board/fly_9轴/sbc ':ignore')说明进行操作。


## 通过ESP8266 模块连接9轴

[9轴](wifi8266.md ':include')

## 通过ESP32 模块连接9轴

[9轴](wifi32.md ':include')

## 通过ESP8266 模块连接9轴(替代方法)

[9轴](wifi8266s.md ':include')

## 通过ESP32 模块连接9轴(替代方法)

[9轴](wifi32s.md ':include')


## 连接串口屏

[9轴](uart_tft.md ':include')

## 连接12864屏幕

[9轴](12864.md ':include')

## 连接BLTouch

[9轴](conn_bltouch.md ':include')

## 连接加速度计

[9轴](accelerometer.md ':include')

