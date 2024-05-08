## 加热容差

Klipper链接:[verify_heater](https://www.klipper3d.org/Config_Reference.html?h=verify_heate#verify_heater)

```
[verify_heater extruder]    # 加热块温度容差配置
max_error: 120                # 最大误差
check_gain_time:120           # 容差时间
hysteresis: 50                # 容差温度
heating_gain: 2               # 加热增益
```

```
[verify_heater heater_bed]      # 加热块温度容差配置
max_error: 120                # 最大误差
check_gain_time:120           # 容差时间
hysteresis: 50                # 容差温度
heating_gain: 2               # 加热增益
```