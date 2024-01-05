```cfg
# This file contains common pin mappings for the Mellow Fly-D7
# To use this config, the firmware should be compiled for the
# STM32F072 with a "No bootloader".

# See docs/Config_Reference.md for a description of parameters.

[stepper_x]
step_pin: PC14
dir_pin: PC13
enable_pin: !PC15
microsteps: 16
rotation_distance: 40
endstop_pin: ^PB3
position_endstop: 0
position_max: 200
homing_speed: 50

[stepper_y]
step_pin: PA1
dir_pin: !PA0
enable_pin: !PA2
microsteps: 16
rotation_distance: 40
endstop_pin: ^PD2
position_endstop: 0
position_max: 200
homing_speed: 50

[stepper_z]
step_pin: PA5
dir_pin: PA4
enable_pin: !PA6
microsteps: 16
rotation_distance: 40
endstop_pin: ^PA9
position_endstop: 0.5
position_max: 200

#[stepper_z1]
#step_pin: PC5
#dir_pin: !PC4
#enable_pin: !PB0
#microsteps: 16
#rotation_distance: 40
#position_max: 200

#[stepper_z2]
#step_pin: PA10
#dir_pin:  !PB2
#enable_pin: !PB11
#microsteps: 16
#rotation_distance: 40
#position_max: 200

#[stepper_z3]
#step_pin: PA12
#dir_pin:  !PB5
#enable_pin: !PC11
#microsteps: 16
#rotation_distance: 40
#position_max: 200

[extruder]
step_pin: PA15
dir_pin:  !PA14
enable_pin: !PA13
microsteps: 16
rotation_distance: 33.500
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: PC7
sensor_type: EPCOS 100K B57560G104F
sensor_pin: PC1
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114
min_temp: -200
max_temp: 400

[heater_bed]
heater_pin: PB12
sensor_type: Generic 3950
sensor_pin: PC0
control: watermark
min_temp: -100
max_temp: 130

[fan]
pin: PC9

#FAN1
#[heater_fan fan1]
#pin: PC8

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
#uart_pin: PB7
#run_current: 0.800
#diag_pin: PB3
#stealthchop_threshold: 999999

#[tmc2209 stepper_y]
#uart_pin: PC3
#run_current: 0.800
#diag_pin: PD2
#stealthchop_threshold: 999999

#[tmc2209 stepper_z]
#uart_pin: PA3
#run_current: 0.800
#diag_pin: PA9
#stealthchop_threshold: 999999

#[tmc2209 stepper_z1]
#uart_pin: PA7
#run_current: 0.800
#diag_pin: PB4
#stealthchop_threshold: 999999

#[tmc2209 stepper_z2]
#uart_pin: PB1
#run_current: 0.800
#stealthchop_threshold: 999999

#[tmc2209 stepper_z3]
#uart_pin: PB6
#run_current: 0.800
#diag_pin: PA9
#stealthchop_threshold: 999999

#[tmc2209 extruder]
#uart_pin: PA10
#run_current: 0.600
#stealthchop_threshold: 999999

########################################
# TMC5160 configuration
########################################

#[tmc5160 stepper_x]
#cs_pin: PB7
#spi_bus: spi1
#run_current: 0.800
#diag1_pin: PB3
#stealthchop_threshold: 999999

#[tmc5160 stepper_y]
#cs_pin: PC3
#spi_bus: spi1
#run_current: 0.800
#diag1_pin: PD2
#stealthchop_threshold: 999999

#[tmc5160 stepper_z]
#cs_pin: PA3
#spi_bus: spi1
#run_current: 0.800
#diag1_pin: PA9
#stealthchop_threshold: 999999

#[tmc5160 stepper_z1]
#cs_pin: PA7
#spi_bus: spi1
#run_current: 0.800
#diag1_pin: PB4
#stealthchop_threshold: 999999

#[tmc5160 stepper_z2]
#cs_pin: PB1
#spi_bus: spi1
#run_current: 0.800
#stealthchop_threshold: 999999

#[tmc5160 stepper_z3]
#cs_pin: PB6
#spi_bus: spi1
#run_current: 0.800
#stealthchop_threshold: 999999

#[tmc5160 extruder]
#cs_pin: PA10
#spi_bus: spi1
#run_current: 0.800
#stealthchop_threshold: 999999


```

