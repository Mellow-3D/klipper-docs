# FLY-CDY-V1 参考配置

?> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


## printer.cfg

```cfg
[stepper_x]
step_pin: P2.0
dir_pin: P1.1
enable_pin: !P1.0
microsteps: 16
rotation_distance: 40
endstop_pin: ^P1.29        # X-MAX P1.28
position_endstop: 0
position_max: 200
homing_speed: 50

[stepper_y]
step_pin: P2.1
dir_pin: !P1.9
enable_pin: !P1.8
microsteps: 16
rotation_distance: 40
endstop_pin: ^P1.27       # Y-MAX P1.25
position_endstop: 0
position_max: 200
homing_speed: 50

[stepper_z]
step_pin: P2.2
dir_pin: P1.15
enable_pin: !1.14
microsteps: 16
rotation_distance: 40
endstop_pin: ^P1.22       # Z-MAX P0.27
position_endstop: 0.5
position_max: 200

[extruder]
step_pin: P2.3
dir_pin: P4.29
enable_pin: !1.17
microsteps: 16
rotation_distance: 33.500
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: P3.25
sensor_pin: P0.26
sensor_type: EPCOS 100K B57560G104F
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: 0
max_temp: 250

#[extruder1]
#step_pin: P2.4
#dir_pin: !2.11
#enable_pin: !0.4
#heater_pin: P1.2
#sensor_pin: P0.25

#[extruder2]
#step_pin: P2.5
#dir_pin: !P0.11
#enable_pin: !P2.13
#heater_pin: P1.23
#sensor_pin: P0.24

[heater_bed]
heater_pin: P3.26
sensor_type: Generic 3950
sensor_pin: P0.23
control: watermark
min_temp: 0
max_temp: 130

#FAN0
[fan]
pin: P1.18

#FAN1
#[heater_fan fan1]
#pin: P1.21

#FAN2
#[heater_fan fan2]
#pin: P1.24


[mcu]
serial: /dev/serial/by-id/usb-Klipper_Klipper_firmware_12345-if00

[printer]
kinematics: cartesian
max_velocity: 300
max_accel: 3000
max_z_velocity: 5
max_z_accel: 100


########################################
# TMC2209 configuration
########################################

#[tmc2209 stepper_x]
#uart_pin: P1.4
#run_current: 0.800
#stealthchop_threshold: 999999

#[tmc2209 stepper_y]
#uart_pin: P1.1
#run_current: 0.800
#stealthchop_threshold: 999999

#[tmc2209 stepper_z]
#uart_pin: P1.16
#run_current: 0.800
#stealthchop_threshold: 999999

#[tmc2209 extruder]
#uart_pin: P4.28
#run_current: 0.600
#stealthchop_threshold: 999999

#[tmc2209 extruder1]
#uart_pin: P2.12
#run_current: 0.600
#stealthchop_threshold: 999999

#[tmc2209 extruder2]
#uart_pin: P0.10
#run_current: 0.600
#stealthchop_threshold: 999999

########################################
# EXP1 / EXP2 (display) pins
########################################

[board_pins]
aliases:
    # EXP1 header
    EXP1_1=P2.7,   EXP1_3=P0.22,  EXP1_5=P1.19,  EXP1_7=P1.3,   EXP1_9=<GND>,
    EXP1_2=P0.28,  EXP1_4=P2.10,  EXP1_6=P2.8,   EXP1_8=P1.31,  EXP1_10=<5V>,
    # EXP2 header
    EXP2_1=P0.17,  EXP2_3=P0.1,   EXP2_5=P0.0,   EXP2_7=P2.6,   EXP2_9=<GND>,
    EXP2_2=P0.15,  EXP2_4=P0.16,  EXP2_6=P0.18,  EXP2_8=<RST>,  EXP2_10=<NC>,


########################################
 #Mini 12864 LCD
########################################
#[display]
#lcd_type: uc1701
#cs_pin: EXP1_3
#a0_pin: EXP1_4
#rst_pin: EXP1_5
#contrast: 63
#encoder_pins: ^EXP2_5, ^!EXP2_3
#click_pin: ^!EXP1_2
#spi_bus: spi1

#####适用于FLY Mini12864
#[neopixel fly_mini12864]
#pin: EXP1_6
#chain_count: 3
#initial_RED: 0.1
#initial_GREEN: 0.5
#initial_BLUE: 0.0
#color_order: RGB
```