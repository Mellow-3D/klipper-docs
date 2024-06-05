## 操作教程

[7寸WiFi电容屏幕控制多台机器](https://www.bilibili.com/video/BV1mr421b7Bf/?spm_id_from=333.788&vd_source=36affb37d7228751cd1fcbbda487dfdf)

## Klipper配置

### LED配置

```
[led LED]
white_pin:PA15
```

### ptc配置

```
[heater_generic warehouse]
heater_pin:E_CS
sensor_type:ATC Semitec 104GT-2
sensor_pin:PA1
min_temp:-270
max_temp:600
control = pid
pid_kp = 16.804
pid_ki = 0.794
pid_kd = 88.854
```

### FAN配置

```
[fan_generic fan1]
pin: FAN1
```



```
[fan_generic fan1]
pin: FAN1
```

 

### 自定义Gcode

屏幕下拉后出现自定义Gcode，

一个按钮发送多个gcode格式：

例子：

```
G91 
G1 X10 F6000
G90
```

 

屏幕上输入格式:(从第二行开始，每个命令前面加入\n)

```
G91\nG1 X10 F6000\nG90
```

 

 