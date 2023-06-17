# 6 FLY-RRF36参考配置

## 6.1 FLY-RRF36热敏设置

### 1 使用MAX31865-PT100设置

**在系统配置config.g中寻找**

```
M308 S1 P"xxxx" Y"xxxx" T100000 B4092
```

替换成

```
M308 S1 P"124.max31865cs" Y"rtd-max31865" F60 R430
```



### 2 使用NTC 100K等普通热敏

```
M308 S1 P"xxxx" Y"xxxx" T100000 B4092
```

替换成

```
M308 S1 P"124.temp0" Y"thermistor" T100000 B4092
```



### 3 使用PT1000参考配置

```
M308 S1 P"xxxx" Y"xxxx" T100000 B4092
```

替换成

```
M308 S1 P"124.temp0" Y"pt1000" T100000 B4092 R1000
```



## 6.2 挤出机配置

寻找

```
; Drives
M569 P0 S1                                   ; physical drive 0 goes forwards using default driver timings
M569 P124.0 S1
M569 P1 S1                                   ; physical drive 1 goes forwards using default driver timings
M569 P2 S1                                   ; physical drive 2 goes forwards using default driver timings
M569 P3 S1                                   ; physical drive 3 goes forwards using default driver timings
M584 X0 Y1 Z2 E3                             ; set drive mapping
M350 X16 Y16 Z16 E16 I1                      ; configure microstepping with interpolation
M92 X80.00 Y80.00 Z400.00 E420.00            ; set steps per mm
M566 X900.00 Y900.00 Z60.00 E120.00          ; set maximum instantaneous speed changes (mm/min)
M203 X6000.00 Y6000.00 Z180.00 E1200.00      ; set maximum speeds (mm/min)
M201 X500.00 Y500.00 Z20.00 E250.00          ; set accelerations (mm/s^2)
M906 X800 Y800 Z800 E800 I30                 ; set motor currents (mA) and motor idle factor in per cent
M84 S30                                      ; Set idle timeout
```

将里面的**M955 P124.0 **下面添加

```
M569 P124.0 S1
```

把**M584 X0 Y1 Z2 E3 **替换

```
M584 X0 Y1 Z2 E124.0 
```



## 6.3 BLTouch配置

**config.g**

```
; Z-Probe
M558 P0 H5 F120 T6000                        ; disable Z probe but set dive height, probe speed and travel speed
M557 X15:215 Y15:195 S20                     ; define mesh grid
```

替换

```
; Z-Probe
M558 P9 H6 F250:30 T8000 C"^124.io0.in"       ; set Z probe type to bltouch and the dive height + speeds
M950 S0 C"124.io0.out"                        ; Setup io0.out as servo port on Fly-RRF-36
```

**homez.g**

对于homez.g，你需要有类似的东西。请相应地修改床中央所需的坐标。

```
; ################# Home Z Preparation ################

G91 															; Relative mode
G1 H2 Z5 F5000													; Lower the bed
G90																; Back to absolute positioning
G1 X0 Y0 F10000 		 										; Move to the center of the bed. Adjust to the co-ordinates required for the centre of your bed

; ################# Home Z Preparation ################

G30					 											; Probe a single point
```





## 6.3 FAN 配置

FAN0

```
M950 F0 C"fan0" Q500                         ; create fan 0 on pin fan0 and set its frequency
M106 P0 S0 H1 T50                            ; set fan 0 value. Thermostatic control is turned on
```

替换

```
M950 F0 C"124.out1" Q500                     ; create fan 0 on pin fan0 and set its frequency
M106 P0 S0 H1 T50                            ; set fan 0 value. Thermostatic control is turned off
```

FAN1

```
M950 F1 C"fan1" Q500                         ; create fan 1 on pin fan1 and set its frequency
M106 P1 S0 H-1 
```

替换

```
M950 F1 C"124.out2" Q500                     ; create fan 1 on pin fan1 and set its frequency
M106 P0 S0 H-1                               ; set fan 0 value. Thermostatic control is turned off
```



## 6.4 xy限位配置

```
M574 X1 S1 P"!124.io1.in"                     ; configure switch-type (e.g. microswitch) endstop for low end on X via pin io0
M574 Y1 S1 P"124.io2.in"                      ; configure switch-type (e.g. microswitch) endstop for low end on Y via pin io1
```



## 6.5 加速度传感器配置

配置里面添加

```
M955 P124.0 
```



## 6.6 加热棒配置

```
M950 H1 C"heat0" T1  
```

替换

```
M950 H1 C"124.out0" T1  
```


