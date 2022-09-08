# FLY-SHT36 v2配置参考

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


```cfg
## SHT36v2设置
[mcu sht36v2]
canbus_uuid:  *3251a329e6e3*

## SHT36v2温度
[temperature_sensor FLY-SHT36v2]
sensor_type: temperature_mcu
sensor_mcu: sht36v2

## SHT36v2板载NTC100K温度
[temperature_sensor Warehouse]
sensor_type = ATC Semitec 104GT-2
sensor_pin = sht36v2:PA4
min_temp: -50
max_temp: 350

## FAN0
[fan]
pin: sht36v2:PB10

## FAN1
[fan_generic fan]
pin: sht36v2:PB11

## X限位设置
[stepper_x]
endstop_pin: !sht36v2:PA2
## SHT V2板有PA1,PA2两个限位引脚可用，按照实际接线修改配置
## PA1引脚默认支持高压输入，可用于12v的接近传感器等。可通过跳线帽配置PA1为普通限位引脚

## 挤出机
[extruder]
step_pin: sht36v2:PB4
dir_pin: sht36v2:PB3
enable_pin: !sht36v2:PA15

heater_pin: sht36v2:PA8
sensor_pin: sht36v2:PA3

## sensor_type: PT1000
## pullup_resistor: 1100
## SHT V2默认热敏上拉电阻为4700。可通过跳线帽配置为1100，1100更适合PT1000类型的温度传感器


## 挤出机驱动设置
[tmc2209 extruder]
uart_pin: sht36v2:PB5
run_current: 0.600
stealthchop_threshold: 999999


## RGB
[neopixel my_neopixel]
pin: sht36v2:PB0
chain_count: 12
color_order: GRBW
initial_RED: 0.0
initial_GREEN: 0.0
initial_BLUE: 0.0

## ADXL345加速度计
[adxl345]
cs_pin: sht36v2:PA9
spi_bus = spi2
# spi_software_sclk_pin: sht36v2:PB13
# spi_software_mosi_pin: sht36v2:PB15
# spi_software_miso_pin: sht36v2:PB14

## BLTOUCH
[bltouch]
sensor_pin: ^sht36v2:PC15
control_pin: sht36v2:PB1
x_offset: -26.1
y_offset: -15.3
z_offset: 2.1

## PT100设置
[temperature_sensor PT100]
sensor_type: MAX31865
sensor_pin: sht36v2:PB12
spi_bus = spi2
# spi_software_sclk_pin: sht36v2:PB13
# spi_software_mosi_pin: sht36v2:PB15
# spi_software_miso_pin: sht36v2:PB14
min_temp: -50
max_temp: 350
rtd_reference_r: 430

## 磁角度传感器
## 相关说明请参考https://www.klipper3d.org/API_Server.html#angledump_angle 
## https://www.klipper3d.org/Debugging.html#motion-analysis-and-data-logging
[angle my_angle_sensor]
sensor_type: as5047d
#sample_period: 0.000400
stepper: stepper_x
cs_pin: sht36v2:PC14
spi_bus: spi1
# spi_software_sclk_pin: sht36v2:PA5
# spi_software_mosi_pin: sht36v2:PA7
# spi_software_miso_pin: sht36v2:PA6
```
