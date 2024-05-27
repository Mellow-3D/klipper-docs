# 缓冲器使用

## 模型下载链接

[下载链接](https://cdn.mellow.klipper.cn/STEP/%E7%BC%93%E5%86%B2%E5%99%A8%E7%83%AD%E5%A1%91%E8%9E%BA%E6%AF%8D%E6%AC%BE%E5%BC%8F.zip)

## 配置参考

```
[filament_switch_sensor 断料检测]
pause_on_runout: true
switch_pin: ^PG7
runout_gcode:
        PAUSE
        M118 缺料
insert_gcode:
        M118 上料
```

## 接线参考

![buffer](../images\adv\buffer.jpg)

## 安装示意图

```pdf
../images/adv/缓冲器.pdf
```



