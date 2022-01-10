### 概述
下面描述了一种将 ESP8266 连接到 Fly-407ZG 的替代方法。有两种不同的方法。一个只释放 EXP2 头，另一个释放 EXP1 和 EXP2 头。
这种替代修改提供了 3 个优点。
* 可以使用 SPI 控制的驱动程序（TMC5160） 
* EXP2（方法 1）或 EXP1 和 EXP2（方法 2）都被释放用于其他用途 
* ESP8266 的 RRF 更新和串行显示器可以同时使用
这将涉及将一些电缆焊接到板上。

### 物料清单
  * 1 x ESP8266 适配器（3 种类型中的任何一种都适用）
  * 一些电缆

### 连接适配器
此示例使用 Fly WiFi 适配器，但说明适用于所有 3 种类型。

### 方法一

#### 焊接到 Fly-407ZG 的电线
7 根电缆要焊接到板上。其中 5 个在板载 ESP焊盘上，另外 2 个在 EXP1 连接器上。

如下图所示将 5 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method1_1.png ':size=300')

如下图所示将 2 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method1_2.png ':size=300')

#### 焊接到适配器的电线

![d](../../images/fly_407zg_method1_3.png ':size=300')

![d](../../images/fly_407zg_method1_4.png ':size=300')

#### 其他连接
在 Fly-407ZG 上的 EXP1 和适配器之间连接一根电缆。

#### Board.txt 更改
应该对board.txt文件做如下修改
```
//ESP8266 Settings
8266wifi.espDataReadyPin = E.15;
8266wifi.TfrReadyPin = B.10;
8266wifi.espResetPin = E.14;
8266wifi.csPin = E.12;
SPI2.pins = {B.3,B.4,B.5}
8266wifi.spiChannel = 2
8266wifi.serialRxTxPins = { G.9, G.14 } ;
```

----
----

### 方法二

#### 焊接到 Fly-407ZG 的电缆
11 根电缆将焊接到板上。其中 6 个在板载 ESP 焊盘上，3 个连接到 eeprom 和 MAX6675 连接，2 个连接到 EXP1。

如下图所示将 6 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method2_1.png ':size=300')

如下图所示将 3 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method2_2.png ':size=300')

如下图所示将 2 根电缆连接到 Fly-407ZG

![d](../../images/fly_407zg_method2_3.png ':size=300')

#### 焊接到适配器的电线
焊接到 Fly-407ZG 的 11 根电缆需要连接到适配器。
11 根电缆中的 2 根应如下图所示连接。Fly-407ZG 的 RX 电缆应连接到适配器上的 TX 焊盘，Fly-407ZG 的 TX 电缆应连接到适配器上的 RX 焊盘。

![d](../../images/fly_407zg_method1_3.png ':size=300')

![d](../../images/fly_407zg_method2_4.png ':size=300')

#### Board.txt 更改
应该对board.txt文件做如下修改
```
//ESP8266 Settings
//ESP8266 Settings
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
----
