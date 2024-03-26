## 双Z单限位

* 在第二个Z配置无需添加`endstop_pin:`

```cfg
[stepper_z]
step_pin: PA5
dir_pin: PA4
enable_pin: !PA6
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
endstop_pin: ^!PA9
position_endstop: 0
position_max: 300
homing_speed: 50
homing_retract_dist: 5

[stepper_z1]
step_pin: PB10
dir_pin:  PB2
enable_pin: !PB11
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004

```

## 双z双限位

* 在第二个Z配置需要添加`endstop_pin:`

```cfg
[stepper_z]
step_pin: PA5
dir_pin: PA4
enable_pin: !PA6
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
endstop_pin: ^!PA9
position_endstop: 0
position_max: 300
homing_speed: 50
homing_retract_dist: 5
step_pulse_duration: 0.000004

[stepper_z1]
step_pin: PB10
dir_pin:  PB2
enable_pin: !PB11
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
endstop_pin: ^!PA10

```

## 双z使用Probe或者BL Touch

* 在第1个Z配置`endstop_pin:`后面pin修改为`probe:z_virtual_endstop  `
* 需要设置Probe或者BL Touch

```cfg
[stepper_z]
step_pin: PA5
dir_pin: PA4
enable_pin: !PA6
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
endstop_pin: probe:z_virtual_endstop  
position_endstop: 0
position_max: 300
homing_speed: 50
homing_retract_dist: 5
step_pulse_duration: 0.000004

[stepper_z1]
step_pin: PB10
dir_pin:  PB2
enable_pin: !PB11
rotation_distance: 4
full_steps_per_rotation: 200
microsteps: 16
step_pulse_duration: 0.000004
endstop_pin: ^!PA10

[probe]
pin: ^PB4                    # 信号接口
x_offset: 0                  # X轴-传感器相对喷嘴偏移量
y_offset: 0                  # Y轴-传感器相对喷嘴偏移量
#z_offset: 0                 # Z轴-传感器相对喷嘴偏移量
speed: 3.0                   # 调平速度
lift_speed: 5                # 抬起探头速度
samples: 3                   # 采样次数
samples_result: median       # 取值方式（默认median-中位数）
sample_retract_dist: 3.0     # 调平回缩距离
samples_tolerance: 0.075     # 采样公差（注意过小的值可能造成采样次数增加）
samples_tolerance_retries: 3 # 超公差重试次数
activate_gcode:
    {% set PROBE_TEMP = 150 %}
    {% set MAX_TEMP = PROBE_TEMP + 5 %}
    {% set ACTUAL_TEMP = printer.extruder.temperature %}
    {% set TARGET_TEMP = printer.extruder.target %}

    {% if TARGET_TEMP > PROBE_TEMP %}
        { action_respond_info('Extruder temperature target of %.1fC is too high, lowering to %.1fC' % (TARGET_TEMP, PROBE_TEMP)) }
        M106 S255
        M109 S{ PROBE_TEMP }
        M106 S26
    {% else %}
        # Temperature target is already low enough, but nozzle may still be too hot.
        {% if ACTUAL_TEMP > MAX_TEMP %}
            { action_respond_info('Extruder temperature %.1fC is still too high, waiting until below %.1fC' % (ACTUAL_TEMP, MAX_TEMP)) }
            TEMPERATURE_WAIT SENSOR=extruder MAXIMUM={ MAX_TEMP }
        {% endif %}
    {% endif %}

```