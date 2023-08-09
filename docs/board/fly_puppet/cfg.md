# FLY-PUPPET配置参考


```cfg
## PUPPET设置
[mcu]
serial: /dev/ttyAMA0 #RPI
# serial: /dev/ttyS1 #FLY-PI V2
# serial: /dev/ttyS2 #FLY-PI V1
restart_method: command

[mcu host]
serial: /tmp/klipper_host_mcu

## PUPPET温度
[temperature_sensor FLY-PUPPET]
sensor_type: temperature_mcu

## FAN1   VCC/5V可选电压风扇
[fan]
pin: gpio25

## FAN2   VCC/5V可选电压风扇
[fan_generic fan2]
pin: host:gpio21               #RPI
# pin: host:gpiochip1/gpio105  #FLY-PI V2
# pin: host:gpiochip1/gpio2    #FLY-PI

## FAN3   5V电压风扇
[fan_generic fan3]
pin: host:gpio20               #RPI
# pin: host:gpiochip1/gpio101  #FLY-PI V2
# pin: host:gpiochip1/gpio201  #FLY-PI


[stepper_x]
step_pin: gpio20
dir_pin: gpio19
enable_pin: !gpio18
microsteps: 16
rotation_distance: 40
endstop_pin: !gpio22
position_endstop: 0
position_max: 220
homing_speed: 40

[stepper_y]
step_pin: gpio16
dir_pin: !gpio15
enable_pin: !gpio14
microsteps: 16
rotation_distance: 40
endstop_pin: !gpio23
position_endstop: 220
position_max: 220
homing_speed: 40

[stepper_z]
step_pin: gpio12
dir_pin: gpio11
enable_pin: !gpio10
microsteps: 16
rotation_distance: 8
endstop_pin: !gpio24
position_endstop: 0.6
position_max: 230

[extruder]
step_pin: gpio8
dir_pin: gpio7
enable_pin: !gpio6
microsteps: 16
rotation_distance: 33.5
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: gpio27
sensor_pin: gpio28
sensor_type: ATC Semitec 104GT-2
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: -50
max_temp: 350

#[extruder1]
#step_pin: gpio4
#dir_pin: gpio3
#enable_pin: !gpio2
#microsteps: 16

[heater_bed]
heater_pin: gpio26
sensor_pin: gpio29
sensor_type: ATC Semitec 104GT-2
control: watermark
min_temp: -50
max_temp: 200


[tmc2209 stepper_x]
uart_pin: gpio21
run_current: 1.20
stealthchop_threshold: 999999


[tmc2209 stepper_y]
uart_pin: gpio17
run_current: 1.20
stealthchop_threshold: 999999


[tmc2209 stepper_z]
uart_pin: gpio13
run_current: 0.800
stealthchop_threshold: 999999


[tmc2209 extruder]
uart_pin: gpio9
run_current: 0.600
stealthchop_threshold: 999999

#[tmc2209 extruder1]
#uart_pin: gpio5
#run_current: 0.600
#stealthchop_threshold: 999999


## RGB
#[neopixel my_neopixel]
#pin: host:gpio19               #RPI
## pin: host:gpiochip1/gpio104  #FLY-PI V2
## pin: host:gpiochip1/gpio205  #FLY-PI
#chain_count: 12
#color_order: GRB
#initial_RED: 0.0
#initial_GREEN: 0.0
#initial_BLUE: 0.0

#[bltouch]
#sensor_pin: ^gpio24
#control_pin: host:gpio16               #RPI
## control_pin: host:gpiochip1/gpio108  #FLY-PI V2
## control_pin: host:gpiochip1/gpio143  #FLY-PI
#pin_move_time: 0.680
#x_offset: 0.0
#y_offset: 2.3
#z_offset: 2.2
#speed: 70

```
