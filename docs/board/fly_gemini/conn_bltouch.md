### 概述
连接BLtouch/3Dtouch

### 接线

<div class="datatable-begin"></div>

|BLtouch线材颜色|CDYV2引脚|CDYV2引脚名称|
| :------------- |:-------------| :-------------|
|黑色|GND|GND|
|棕色|GND|GND|
|红色|5V|5V|
|白色|PC14|Z3|
|黄色|PE11|Servo0|

<div class="datatable-end"></div>

### 配置更改
您的 config.g 应修改如下
```
M558 P9 H6 F120 T8000 C"^probe"       ; set Z probe type to bltouch and the dive height + speeds
M950 S0 C"servo0"                              ; Setup servo 0 as servo port on Fly-407ZG
```

### 要创建的文件

?> 如果您使用配置网站勾选bltouch且生成了config.g则应该有这些文件，不过我们建议您在检查一遍

在您的SD卡/sys目录下创建```deployprobe.g```文件，写入以下内容
```
M280 P0 S10
```

接着在同目录里创建```retractprobe.g```文件，写入以下内容
```
M280 P0 S90
```

### 要修改的文件
如果您想将探针用作Z限位，则需要修改 homeall.g/homedelta.g 和 homez.g

homez.g文件修改如下
```
; ################# Home Z Preparation ################

G91 															; Relative mode
G1 H2 Z5 F5000													; Lower the bed
G90																; Back to absolute positioning
G1 X0 Y0 F10000 		 										; Move to the center of the bed. Adjust to the co-ordinates required for the centre of your bed

; ################# Home Z Preparation ################

M558 F250 				 										; Set the probing speed
G30					 											; Probe a single point
M558 F30 				 										; Set a slower probing speed
G30					 											; Probe a single point
```

homeall.g文件要有上面的内容或者用下面的命令引入homez.g
```
M98 P"homez.g"
```

### 测试宏
建议您创建一些宏来测试您的 BLTouch。这些都应该在宏文件夹中创建。

创建宏：报警解除

**alarm release + pin**

```
M280 P0 S160 ; Alarm Release and Push-Pin UP
```

****

创建宏：抬起

**pin up**

```
M280 P0 S90 ; Send PWM channel 0 the s90 (angle) command
```

****

创建宏：放下

**pin down**

```
M280 P0 S10 ; Send PWM channel 0 the S10 (angle) command
```

****

创建宏：测试

**self-test**

```
M280 P0 S120 ; Send PWM channel 7 the S10 (angle) command
```

****
