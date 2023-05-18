# FLY-E3 pro配置参考

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


```cfg
# TMC2209 on board
# Integrated Linux host
# "FLY flyboard FLY-E3 Pro" board
# use this config, the firmware should be compiled for the STM32F407
# with a "32KiB bootloader".

# after running "make", copy the generated "out/klipper.bin" file to a
# file named "firmware.bin" on an SD card and then restart the FLYBOARD
# with that SD card.

# See docs/Config_Reference.md for a description of parameters.

[stepper_x]
step_pin: PE3
dir_pin: !PE2
enable_pin: !PE5
microsteps: 16
rotation_distance: 40
endstop_pin: !PA2
position_endstop: 0
position_max: 210
homing_speed: 80

[stepper_y]
step_pin: PB9
dir_pin: PB8
enable_pin: !PE1
microsteps: 16
rotation_distance: 40
endstop_pin: !PB10
position_endstop: 210
position_max: 210
homing_speed: 50

[stepper_z]
step_pin: PA15
dir_pin: !PD7
enable_pin: !PC2
microsteps: 16
step_pulse_duration: 0.0000004
rotation_distance: 8
endstop_pin: PC4
position_endstop: 0.5
position_max: 210

[extruder]
step_pin: PD4
dir_pin: PD3
enable_pin: !PD6
microsteps: 16
rotation_distance: 33.500
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: PA5
sensor_pin: PA4
sensor_type: EPCOS 100K B57560G104F
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: 0
max_temp: 350

#[extruder1]
#step_pin: PC13
#dir_pin: PC0
#enable_pin: !PC15
#microsteps: 16
#rotation_distance: 33.500
#nozzle_diameter: 0.400
#filament_diameter: 1.750
#heater_pin: PC6
#sensor_pin: PA1
#sensor_type: EPCOS 100K B57560G104F
#control: pid
#pid_Kp: 22.2
#pid_Ki: 1.08
#pid_Kd: 114
#min_temp: 0
#max_temp: 350

[heater_bed]
heater_pin: PA0
sensor_pin: PA3
sensor_type: ATC Semitec 104GT-2
control: watermark
min_temp: 0
max_temp: 200

[fan]  #Fan1
pin: PA6
#cycle_time: 0.50

[fan]  #Fan4
pin: PB6
#cycle_time: 0.50

[heater_fan E0]  #Fan0
pin: PA7
#cycle_time:
heater: extruder
heater_temp: 50.0
fan_speed: 1.0

#[heater_fan E1]  #Fan3
#pin: PB7
##cycle_time:
#heater: extruder1
#heater_temp: 50.0
#fan_speed: 1.0



[mcu]
serial: /dev/ttyACM0

[mcu host]
serial: /tmp/klipper_host_mcu

[printer]
kinematics: corexy
max_velocity: 300
max_accel: 3000
max_z_velocity: 5
max_z_accel: 100

[temperature_sensor E3-PRO-MCU]
sensor_type: temperature_mcu


[tmc2209 stepper_x]
uart_pin: PE4
run_current: 0.800
interpolate: False

[tmc2209 stepper_y]
uart_pin: PE0
run_current: 0.800
interpolate: False

[tmc2209 stepper_z]
uart_pin: PA8
run_current: 0.800
interpolate: False

[tmc2209 extruder]
uart_pin: PC14
run_current: 0.800
interpolate: False



########################################
# BLTouch
########################################

#[bltouch]
#sensor_pin: ^PC5
#control_pin: PB0
#pin_move_time: 0.680
#x_offset: 0.0
#y_offset: 2.3
#z_offset: 2.2
#speed: 70

#[safe_z_home]
#home_xy_position: 105,105


########################################
# EXP1 / EXP2 (display) pins
########################################

[board_pins]
aliases:
    # EXP1 header
    EXP1_1=PE11, EXP1_3=PA14,  EXP1_5=PE9,   EXP1_7=PE7,  EXP1_9=<GND>,
    EXP1_2=PE12,  EXP1_4=PE6,  EXP1_6=PE10,   EXP1_8=PE8,  EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=PB4, EXP2_3=PA10,  EXP2_5=PA9,  EXP2_7=PA13,   EXP2_9=<GND>,
    EXP2_2=PB3, EXP2_4=PB2,  EXP2_6=PB5,  EXP2_8=<RST>, EXP2_10=<NC>
    # Pins EXP2_1, EXP2_6, EXP2_2 are also MISO, MOSI, SCK of bus "spi2"

# See the sample-lcd.cfg file for definitions of common LCD displays.

```
