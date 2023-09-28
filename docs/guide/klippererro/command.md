## 验证电机

Klipper链接:[STEPPER_BUZZ](https://www.klipper3d.org/G-Codes.html?h=stepper+buzz#stepper_buzz)

使用 STEPPER_BUZZ 命令验证每个步进电机的连通性。 首先将要验证的轴手动挪到到中间点，然后运行`STEPPER_BUZZ STEPPER=stepper_x`。 STEPPER_BUZZ 命令将使X轴向正方向移动一毫米，再返回到其起始位置。 （如果在 position_endstop=0 处定义了限位的位置，则在每次运动开始时，步进器将远离限位。）它将执行这个动作十次。

```
STEPPER_BUZZ STEPPER=stepper_x
STEPPER_BUZZ STEPPER=stepper_x1
STEPPER_BUZZ STEPPER=stepper_y
STEPPER_BUZZ STEPPER=stepper_y1
STEPPER_BUZZ STEPPER=stepper_z
STEPPER_BUZZ STEPPER=stepper_z1
STEPPER_BUZZ STEPPER=stepper_z2
STEPPER_BUZZ STEPPER=stepper_z3
```



## PID校准

Klipper链接:[PID_CALIBRATE](https://www.klipper3d.org/G-Codes.html?h=pid+calibrate#pid_calibrate_1)

挤出机pid校准指令

```
PID_CALIBRATE HEATER=extruder TARGET=245
```

热床pid校准指令

```
PID_CALIBRATE HEATER=heater_bed TARGET=100
```



## 挤出机步进值校准

Klipper链接:[旋转距离](https://www.klipper3d.org/Rotation_Distance.html?h=distance#rotation_distance)

需要先驱动挤出机是否正常工作，然后需要确定`full_steps_per_rotation`与`gear_ratio`是否正确否则无法校准挤出机步进值

* 得到新的`rotation_distance`新的后需要取整到小数点后3位

```
full_steps_per_rotation: 200        # 单圈脉冲数 （200 为 1.8 度, 400 为 0.9 度）
rotation_distance: 22.522         # 主动带轮周长mm
# 校准步进值: rotation_distance = <旧rotation_distance> * <实际挤出长度> / <请求的挤出长度>
gear_ratio: 50:10                   # 减速比（伽利略齿比7.5:1 并且这行注释掉；BMG为50：17，输出轴在前，输入轴在后）
```



## BL-Touch

Klipper链接:[BL-Touch](https://www.klipper3d.org/BLTouch.html)

以下是BL-Touch的参考配置，偏移量需要自行确定

```
# [bltouch]
# sensor_pin: ^PB5             # 信号接口
# control_pin: PA8             # 舵机控制
# x_offset: 0                  # X轴-传感器相对喷嘴偏移量
# y_offset: 25.0               # Y轴-传感器相对喷嘴偏移量
# z_offset: 0                  # Z轴-传感器相对喷嘴偏移量
```

pin_down:探针弹出

pin_up:探针缩回

touch_mode:验证传感器

```
BLTOUCH_DEBUG COMMAND=pin_down
BLTOUCH_DEBUG COMMAND=pin_up
BLTOUCH_DEBUG COMMAND=touch_mode
touch_mode
```



#### FORCE_MOVE

Klipper链接:[FORCE_MOVE](https://www.klipper3d.org/G-Codes.html?h=move#force_move_1)

该命令可以在没有归位情况下控制其中一个电机运行

```
[force_move]
enable_force_move: true
```

