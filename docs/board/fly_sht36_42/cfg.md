# FLY-SHT36 & SHT42配置参考

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改

?> SHT36与SHT42引脚完全一致

```cfg
## SHT36设置
[mcu sht36]
canbus_uuid:  *d085135ff4c2*

## SHT36温度
[temperature_sensor FLY-SHT36]
sensor_type: temperature_mcu
sensor_mcu: sht36

## FAN0
[fan]
pin: sht36:PB10

## FAN1
[fan_generic fan]
pin: sht36:PB11

## X限位设置
[stepper_x]
endstop_pin: !sht36:PA0
## SHT板有PA0,PA1,PA2三个限位引脚可用，按照实际接线修改配置

## 挤出机
[extruder]
step_pin: sht36:PB4
dir_pin: sht36:PB3
enable_pin: !sht36:PA15
microsteps: 16
rotation_distance: 33.5
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: sht36:PA8
sensor_pin: sht36:PB0
sensor_type: ATC Semitec 104GT-2
pullup_resistor: 2200
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: -50
max_temp: 350

## 挤出机驱动设置
[tmc2209 extruder]
uart_pin: sht36:PB5
run_current: 0.600
stealthchop_threshold: 999999


## RGB
[neopixel my_neopixel]
pin: sht36:PB15
chain_count: 12
color_order: GRB
initial_RED: 0.0
initial_GREEN: 0.0
initial_BLUE: 0.0

## ADXL345加速度计
[adxl345]
cs_pin: sht36:PA4
spi_bus: spi1

## BLTOUCH
[bltouch]
sensor_pin: ^sht36:PC15
control_pin: sht36:PB1
x_offset: -26.1
y_offset: -15.3
z_offset: 2.1

## PT100设置
[temperature_sensor PT100]
sensor_type: MAX31865
sensor_pin: sht36:PA3
spi_bus: spi1
min_temp: -50
max_temp: 350
rtd_reference_r: 430
```
