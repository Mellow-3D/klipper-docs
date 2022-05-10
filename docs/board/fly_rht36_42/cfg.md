# FLY-RHT36 & RHT42配置参考

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改

?> RHT36与RHT42引脚完全一致

```cfg
## RHT36设置
[mcu rht36]
serial:  */dev/serial/by-id/usb-Klipper_rp2040_12345-if00*

## RHT36温度
[temperature_sensor FLY-RHT36]
sensor_type: temperature_mcu
sensor_mcu: rht36

## FAN0
[fan]
pin: rht36:gpio25

## FAN1
[fan_generic fan]
pin: rht36:gpio24

## X限位设置
[stepper_x]
endstop_pin: !rht36:gpio19
## RHT板有gpio18,gpio19两个限位引脚可用，按照实际接线修改配置
## gpio18引脚默认支持高压输入，可用于12/24v的接近传感器等。可通过跳线帽配置gpio18为普通限位引脚

## 挤出机
[extruder]
step_pin: rht36:gpio10
dir_pin: rht36:gpio9
enable_pin: !rht36:gpio7
microsteps: 16
rotation_distance: 33.5
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: rht36:gpio23
sensor_pin: rht36:gpio26
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
uart_pin: rht36:gpio8
run_current: 0.600
stealthchop_threshold: 999999


## RGB
[neopixel my_neopixel]
pin: rht36:gpio15
chain_count: 12
color_order: GRB
initial_RED: 0.0
initial_GREEN: 0.0
initial_BLUE: 0.0

## ADXL345加速度计
[adxl345]
cs_pin: rht36:gpio6
spi_software_sclk_pin: rht36:gpio2
spi_software_mosi_pin: rht36:gpio3
spi_software_miso_pin: rht36:gpio4

## BLTOUCH
[bltouch]
sensor_pin: ^rht36:gpio27
control_pin: rht36:gpio21
x_offset: -26.1
y_offset: -15.3
z_offset: 2.1

## PT100设置
[temperature_sensor PT100]
sensor_type: MAX31865
sensor_pin: rht36:gpio5
spi_software_sclk_pin: rht36:gpio2
spi_software_mosi_pin: rht36:gpio3
spi_software_miso_pin: rht36:gpio4
min_temp: -50
max_temp: 350
rtd_reference_r: 430
```
