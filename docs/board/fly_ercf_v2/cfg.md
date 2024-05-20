# FLY-ERCF 参考配置

> [!TIP]
> 文档中出现的所有`*`包裹的内容需要按照自己实际的修改


## ercf_hardware.cfg

```cfg
## Enraged Rabbit : Carrot Feeder V1.1 hardware config file

# This configuration file is only applicable to FLY ERCF Board

[mcu ercf]
canbus_uuid:  *3251a329e6e3*

# Carrot Feeder 5mm D-cut shaft
[manual_stepper gear_stepper]
step_pin: ercf:gpio7
dir_pin: ercf:gpio8
enable_pin: !ercf:gpio6
rotation_distance: 22.6789511	#Bondtech 5mm Drive Gears
gear_ratio: 80:20
microsteps: 16  # Please do not go higher than 16, this can cause 'MCU Timer too close' issues under Klipper
full_steps_per_rotation: 200	#200 for 1.8 degree, 400 for 0.9 degree
velocity: 35
accel: 150
#Right now no pin is used for the endstop, but we need to define one for klipper. So just use a random, not used pin
endstop_pin: ercf:gpio15

[tmc2209 manual_stepper gear_stepper]
# Adapt accordingly to your setup and desires
# The default values are tested with the BOM NEMA14 motor
# Please adapt those values to the motor you are using
# Example : for NEMA17 motors, you'll usually set the stealthchop_threshold to 0
# and use higher current
uart_pin: ercf:gpio9
interpolate: True
run_current: 0.40
hold_current: 0.1
sense_resistor: 0.110
stealthchop_threshold: 500
# diag_pin: ercf:gpio15

# [tmc5160 manual_stepper gear_stepper]
# cs_pin: ercf:gpio9
#spi_software_sclk_pin: ercf:gpio19
#spi_software_mosi_pin: ercf:gpio18
#spi_software_miso_pin: ercf:gpio16
# interpolate: True
# run_current: 0.40
# hold_current: 0.1
# stealthchop_threshold: 500
# diag0_pin: ercf:gpio15



# Carrot Feeder selector
[manual_stepper selector_stepper]
step_pin: ercf:gpio4
dir_pin: ercf:gpio5
enable_pin: !ercf:gpio5
microsteps: 16    # Please do not go higher than 16, this can cause 'MCU Timer too close' issues under Klipper
rotation_distance: 40
full_steps_per_rotation: 200	#200 for 1.8 degree, 400 for 0.9 degree
velocity: 200
accel: 600
# Select the endstop you want depending if you are using sensorless homing for the selector or not
endstop_pin: ercf:gpio20
#endstop_pin: tmc2209_selector_stepper:virtual_endstop
#endstop_pin: tmc5160_selector_stepper:virtual_endstop

[tmc2209 manual_stepper selector_stepper]
uart_pin: ercf:gpio2
run_current: 0.55
interpolate: True
sense_resistor: 0.110
stealthchop_threshold: 500
# Uncomment the lines below if you want to use sensorless homing for the selector
#diag_pin: ^ercf:gpio20      # Set to MCU pin connected to TMC DIAG pin
#driver_SGTHRS: 75  # 255 is most sensitive value, 0 is least sensitive

# [tmc5160 manual_stepper selector_stepper]
# cs_pin: ercf:gpio2
#spi_software_sclk_pin: ercf:gpio19
#spi_software_mosi_pin: ercf:gpio18
#spi_software_miso_pin: ercf:gpio16
# interpolate: True
# run_current: 0.40
# hold_current: 0.1
# stealthchop_threshold: 500
# diag_pin: ercf:gpio20
# driver_SGT: 75


# Values are for the MG90S servo
[servo ercf_servo]
pin: ercf:gpio21
maximum_servo_angle: 180
minimum_pulse_width: 0.00085
maximum_pulse_width: 0.00215

[duplicate_pin_override]
pins: ercf:gpio15
# Put there the pin used by the encoder and the filament_motion_sensor
# It has to be the same pin for those 3

[filament_motion_sensor encoder_sensor]
switch_pin: ^ercf:gpio21
pause_on_runout: False
detection_length: 10.0
extruder: extruder
# runout_gcode: _ERCF_ENCODER_MOTION_ISSUE

```