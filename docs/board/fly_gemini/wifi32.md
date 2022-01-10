### 使用我们现有的适配esp32wifi模块
如下图所示将 ESP32 适配器连接到主板上。

![连接图](../../images/fly_407zg_esp32_connection.png ':size=400')

如果不想连接4p的串口线请将下图位置的两个焊点短接

![d](../../images/fly_esp32_power.png ':size=400')

### Board.txt 文件
您还需要 sys 文件夹中的 board.txt 文件。以下是应该使用的内容。
```
//Config for Fly-407ZG
board = fly_f407zg
8266wifi.espDataReadyPin = C.5
8266wifi.TfrReadyPin = C.4
8266wifi.espResetPin = B.2
8266wifi.csPin = F.11
heat.tempSensePins = { F.3, A.0, C.1, C.0, F.10, F.5, F.4 }
```

### 通过 RRF 更新 ESP32
如果您有支持通过 RRF 更新的 ESP32 WiFi 适配器，则需要在 board.txt 文件中添加以下信息。
```
8266wifi.serialRxTxPins = { A.10, A.9 }
serial.aux.rxTxPins = { nopin, nopin }
```

!> 后续步骤与[ESP8266 WIFI 说明](#/board/fly_9轴/wifi8266 ':ignore')一致

-----

### 使用ESP32开发板
使用带有 USB 编程的 ESP32，因为它已经可以承受 5v 电压，并且允许通过 USB 进行更新。它们还需要是 36 针品种，因此它们有 GPIO0 断开。

### 物料清单
  - 1 x 36 针 ESP32
  - 1 x 330R 电阻
  - 跳线或其他方式连接到 Fly-407ZG

### 连接 ESP32
下表显示了 ESP32 上所需的引脚以及它们在 Fly-407ZG 上的连接。请确保您的电缆长度不超过 30 厘米，但理想情况下它们应尽可能短。

<div class="datatable-begin"></div>

| ESP32 Pin       | Fly-407ZG Pin       |  电阻  |
| :-------------: |:-------------:| :---------------:|
| RST           | B.2 on EXP2         | 330R           |
| CS/GPIO15     | F.11 on EXP2         | None           |
| MOSI/GPIO13   | B.15 on EXP2         | None             |
| MISO/GPIO12   | B.14 on EXP2         | None             |
| SCLK/GPIO14  | B.13 on EXP2         | None             |
| ESP_DATA_Ready/GPIO0   | C.5 on EXP2         | None             |
| LPC_DATA_Ready/GPIO4   | C.4 on EXP2         | None            |
| VIN(5v)   | 5v on EXP2          | None             |
| GND   | GND on EXP2          | None             |

<div class="datatable-end"></div>

![d](../../images/esp32_pinmap.png ':size=400')

!> 使用的电缆必须非常短。即使是 10 厘米的也行不通，所以它们必须比那个短

### Board.txt 文件
您还需要 sys 文件夹中的 board.txt 文件。以下是应该使用的内容。
```
//Config for Fly-407ZG
board = fly_f407zg
8266wifi.espDataReadyPin = C.5
8266wifi.TfrReadyPin = C.4
8266wifi.espResetPin = B.2
8266wifi.csPin = F.11
heat.tempSensePins = { F.3, A.0, C.1, C.0, F.10, F.5, F.4 }
```

### 通过 RRF 更新 ESP32
如果您有支持通过 RRF 更新的 ESP32 WiFi 适配器，则需要在 board.txt 文件中添加以下信息。
```
8266wifi.serialRxTxPins = { A.10, A.9 }
serial.aux.rxTxPins = { nopin, nopin }
```

!> 后续步骤与[ESP8266 WIFI 说明](#/board/fly_9轴/wifi8266 ':ignore')一致