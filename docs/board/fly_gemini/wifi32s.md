### 概述
下面描述了一种将 ESP32 连接到 Fly-407ZG 的替代方法。这种替代修改提供了两个优点。
* 可以使用 SPI 控制的驱动程序 (TMC5160) 
* 可以同时使用 ESP32 和串行显示器的 RRF 更新
这将涉及将一些电缆焊接到板上。

### 物料清单
  * 1 x ESP32 适配器
  * 一些电缆

### 连接适配器
此示例使用 Fly WiFi 适配器，但说明适用于所有 3 种类型。

### 焊接到 Fly-407ZG 的电线
11 根电缆将焊接到板上。其中 6 个在板载 ESP 焊盘上，3 个连接到 eeprom 和 MAX6675 连接，2 个连接到 EXP1。

如下图所示将 6 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method2_1.png ':size=300')

如下图所示将 3 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method2_2.png ':size=300')

如下图所示将 2 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method2_3.png ':size=300')

### 焊接到适配器的电线
焊接到 Fly-407ZG 的 11 根电缆需要连接到适配器。
11 根电缆中的 2 根应如下图所示连接。Fly-407ZG 的 RX 电缆应连接到适配器上的 TX 焊盘，Fly-407ZG 的 TX 电缆应连接到适配器上的 RX 焊盘。

![d](../../images/fly_407zg_method1_3.png ':size=300')

![d](../../images/fly_407zg_alt_esp32.png ':size=300')

### Board.txt 更改
应该对board.txt文件做如下修改
```
//ESP32 Settings
SPI2.pins={ B.3, B.4, B.5 }
8266wifi.espDataReadyPin = B.7
8266wifi.lpcTfrReadyPin = B.6
8266wifi.espResetPin = A.4
8266wifi.csPin = G.15
8266wifi.spiChannel=2
serial.aux.rxTxPins = { A.10, A.9 }
8266wifi.serialRxTxPins = { G.9, G.14 }
```

----