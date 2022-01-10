### 概述
如何连接加速度计

### 接线

<div class="datatable-begin"></div>

|加速度计线颜色|加速度计引脚名|加速度计引脚类型|CDYV2引脚|
|:---|:---|:---|:---|
|黑色|GND|GND|GND|
|蓝色|SDO|SPI MISO|E.10|
|绿色|SDA|SPI MOSI|E.7|
|紫色|Int|中断|E.14|
|红色|VIN|5V|5V|
|白色|CS|片选|E.9|
|黄色|SCL|SPI SCK|E.8|

<div class="datatable-end"></div>

![LIS3DH 引脚排列](../../images/lis3dh.png)

### 安装LIS3DH

加速度计应牢固地安装在挤出头上。对于i3（例如 ender 3），还可以将其安装到热床上以读取 Y 轴的读数。

### Boart.txt更改

将以下内容添加到 board.txt
```
SPI5.pins = {E.8,E.10,E.7}
accelerometer.spiChannel = 5
```

### 配置更改

您的config.g应该修改的如下
```
M955 P0 C"E.9+E.14" I20
```

### DWC插件
有一个插件可以帮助收集和分析数据。它被称为 input shaper 插件
