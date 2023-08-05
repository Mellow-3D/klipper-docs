# FLY-RPFMEX配置参考

> [!TIP]
> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


```cfg
## RPFMEX设置
[mcu rpfmex]
serial:  */dev/serial/by-id/usb-Klipper_rp2040_12345-if00*

## RPFMEX温度
[temperature_sensor FLY-RPFMEX]
sensor_type: temperature_mcu
sensor_mcu: rpfmex

## FAN0
[fan]
pin: rpfmex:gpio11

## FAN1
[fan_generic fan]
pin: rpfmex:gpio12

## M0
[stepper_x]
step_pin: gpio6
dir_pin: gpio5
enable_pin: !gpio9
microsteps: 16
rotation_distance: 40
endstop_pin: !rpfmex:gpio27
## RPFMEX板有gpio27,gpio27,gpio29三个限位引脚可用，按照实际接线修改配置

## M1
[stepper_y]
step_pin: gpio1
dir_pin: gpio0
enable_pin: !gpio4
microsteps: 16
rotation_distance: 40
endstop_pin: !rpfmex:gpio28
## RPFMEX板有gpio27,gpio27,gpio29三个限位引脚可用，按照实际接线修改配置

## M2
[stepper_z]
step_pin: gpio22
dir_pin: gpio21
enable_pin: !gpio25
microsteps: 16
rotation_distance: 40
endstop_pin: !rpfmex:gpio29
## RPFMEX板有gpio27,gpio27,gpio29三个限位引脚可用，按照实际接线修改配置

## M3
[extruder]
step_pin: rpfmex:gpio17
dir_pin: rpfmex:gpio16
enable_pin: !rpfmex:gpio20
microsteps: 16
rotation_distance: 33.5


[tmc2209 stepper_x]
uart_pin: rpfmex:gpio7
run_current: 0.800
stealthchop_threshold: 999999
#diag_pin: rpfmex:gpio8

[tmc2209 stepper_y]
uart_pin: rpfmex:gpio2
run_current: 0.800
stealthchop_threshold: 999999
#diag_pin: rpfmex:gpio3

[tmc2209 stepper_z]
uart_pin: rpfmex:gpio23
run_current: 0.800
stealthchop_threshold: 999999
#diag_pin: rpfmex:gpio24

[tmc2209 extruder]
uart_pin: rpfmex:gpio18
run_current: 0.800
stealthchop_threshold: 999999
#diag_pin: rpfmex:gpio19


## RGB
[neopixel my_neopixel]
pin: rpfmex:gpio10
chain_count: 12
color_order: GRB
initial_RED: 0.0
initial_GREEN: 0.0
initial_BLUE: 0.0


## 热敏设置
[temperature_sensor PT100]
sensor_pin: rpfmex:gpio27
## RPFMEX板有gpio27,gpio27,gpio29三个热敏引脚可用，按照实际接线修改配置
## 热敏接限位接口的GND和GPIO
sensor_type: ATC Semitec 104GT-2
pullup_resistor: 2200
```
