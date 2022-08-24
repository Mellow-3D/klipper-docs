# FLY-SB2040 v1配置参考

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


```cfg
## SB2040设置
[mcu sb2040]
canbus_uuid:  *3251a329e6e3*

## SB2040温度
[temperature_sensor FLY-SB2040]
sensor_type: temperature_mcu
sensor_mcu: sb2040

## SB2040板载NTC100K温度
[temperature_sensor Warehouse]
sensor_type = ATC Semitec 104GT-2
sensor_pin = sb2040:gpio26
min_temp: -50
max_temp: 350

## FAN0
[fan]
pin: sb2040:gpio13

## FAN1
[fan_generic fan]
pin: sb2040:gpio14

## FAN2
# [fan_generic fan]
# pin: sb2040:gpio15

## X限位设置
[stepper_x]
endstop_pin: !sb2040:gpio29
## SB2040板有gpio25, gpio28, gpio29三个限位引脚可用，gpio25支持高压输入。按照实际接线修改配置

## 挤出机
[extruder]
step_pin: sb2040:gpio9
dir_pin: sb2040:gpio10
enable_pin: !sb2040:gpio7

heater_pin: sb2040:gpio6
sensor_pin: sb2040:gpio27

## sensor_type: PT1000
## pullup_resistor: 1000
## SB2040默认热敏上拉电阻为4700。可通过跳线帽配置为1000，1000更适合PT1000类型的温度传感器


## 挤出机驱动设置
[tmc2209 extruder]
uart_pin: sb2040:gpio8
run_current: 0.600
stealthchop_threshold: 999999


## RGB
[neopixel my_neopixel]
pin: sb2040:gpio12
chain_count: 12
color_order: GRBW
initial_RED: 0.0
initial_GREEN: 0.0
initial_BLUE: 0.0

## ADXL345加速度计
[adxl345]
cs_pin: sb2040:gpio1
spi_software_sclk_pin: sb2040:gpio0
spi_software_mosi_pin: sb2040:gpio3
spi_software_miso_pin: sb2040:gpio2
