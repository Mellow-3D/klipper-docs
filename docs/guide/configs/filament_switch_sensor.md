## 断料参考配置

```cfg
[filament_switch_sensor 断料监测]
pause_on_runout: True
switch_pin: ^PC2
runout_gcode: 
        PAUSE
        M118 断料，暂停打印
insert_gcode:
        M118 duan料恢复
```

