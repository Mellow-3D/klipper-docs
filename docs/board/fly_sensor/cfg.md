# Fly_sensor 参考配置



```cfg
[fly_probe]
calibration_pin:2040:PB1          # 舵机口接校准
probe_pwm_pin:2040:PC15           # 限位口接pwm

[probe]
pin:2040:PA1                      # 限位口接zstop
x_offset: -23.2
y_offset: 5
z_offset: 0.00
speed: 10
lift_speed: 5
```