# 关于无限归位的配置优化

## 1.  printer.cfg文件修改

> **请找到[homing_override]  此项**
>
> **如果没有请先吧[safe_z_home]   配置屏蔽然后添加[homing_override]** 

```
[homing_override]
axes: xyz
set_position_z: 0
gcode:
   
   BED_MESH_CLEAR
   G1 Z10 

  {% set home_all = 'X' not in params and 'Y' not in params and 'Z' not in params %}

  {% if home_all or 'X' in params %}
    _HOME_X
  {% endif %}
  
  {% if home_all or 'Y' in params %}
    _HOME_Y
  {% endif %}
  
  {% if home_all or 'Z' in params %}
    G90
    G0 Z15 F600
    G0 X150 Y150 Z15 F36000
    G28 Z
    G91
    G1 Z15
  {% endif %}
```



## 2.添加无限位回退与电流配置

> 需要自行创建并且添加此文件

```
[include sensorless.cfg]
# 无限位
```

> sensorless.cfg的内容如下

```
[gcode_macro _HOME_X]
gcode:
    # Always use consistent run_current on A/B steppers during sensorless homing
    {% set RUN_CURRENT_X = printer.configfile.settings['tmc5160 stepper_x'].run_current|float %}
    {% set RUN_CURRENT_Y = printer.configfile.settings['tmc5160 stepper_y'].run_current|float %}
    {% set HOME_CURRENT = 0.8 %}
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={HOME_CURRENT}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={HOME_CURRENT}
                     # 运行检测电流0.8
    # Home
    G28 X
    # Move away
    G91
    G1 X-5 F1200     # x回退5
    
    # Wait just a second… (give StallGuard registers time to clear)
    G4 P1000
    # Set current during print
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={RUN_CURRENT_Y}

[gcode_macro _HOME_Y]
gcode:
    # Set current for sensorless homing
    {% set RUN_CURRENT_X = printer.configfile.settings['tmc5160 stepper_x'].run_current|float %}
    {% set RUN_CURRENT_Y = printer.configfile.settings['tmc5160 stepper_y'].run_current|float %}
    {% set HOME_CURRENT = 0.8 %}
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={HOME_CURRENT}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={HOME_CURRENT}
                     # 运行检测电流0.8
    # Home
    G28 Y
    # Move away
    G91
    G1 Y-5 F1200     #y回退5

    # Wait just a second… (give StallGuard registers time to clear)
    G4 P1000
    # Set current during print
    SET_TMC_CURRENT STEPPER=stepper_x CURRENT={RUN_CURRENT_X}
    SET_TMC_CURRENT STEPPER=stepper_y CURRENT={RUN_CURRENT_Y}
```

