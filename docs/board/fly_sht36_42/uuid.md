# 5. uuid读取

> 如果是FLY-Gemini系列或FLY-π系列主板可参考:[查看uuid](/advanced/can?id=查看can-uuid "点击即可跳转")

在配置完上位机后，需要读取CAN ID，在SSH输入以下指令

```
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

![uuid](../../images/boards/fly_sht36_42/uuid.png)

出现``Found canbus_uuid=b7c79ec3f948``则查找到设备ID，其中``b7c79ec3f948``为设备UUID。

如果没有出现ID或报错，请认真阅读文档并检查接线。将查找到的ID填入下图所示位置。

```
[mcu sht36]
uuid: b7c79ec3f948     #将读取到的uuid填写到此处
```

?>如果找不到CAN ID，请检查：

* 接线是否正确，例如CANH 和 CANL是否接反或者接触不良
* SHT36 V2板上的120Ω终端电阻跳线帽是否插上
* 是否正确供电，在刷固件时可以只使用TypeC接口供电
* 您的镜像内核是否支持CAN
* 固件编译是否正确

?>已经识别到的CAN ID是不会被查找到的（即已经写入配置文件中的ID，连接成功并正常运行的，是不会被查找到的）
