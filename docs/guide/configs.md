# Klipper配置

## 介绍

* Klipper的配置文件路径由启动参数指定，一般为`~/klipper_config/printer.cfg`
* Klipper配置文件后缀为`.cfg`,格式类似yaml与ini,注释符为`#`
* 配置文件中除注释外的部分不可有全角字符
* 可使用`[include filename.cfg]`来引用其他配置文件，配置文件过大时可分成多个文件，提高配置文件可读性
* Klipper配置采用类似ini的节点格式

```cfg
[j1]
a: 1

[j2]
b: 2
```

* 其中j1为一个节点，j2为一个节点
* 配置赋值使用`:`而不是ini中的=
* 还有很多类似yaml的部分

## 示例配置

* 更多配置请参考Klipper官方文档

English：[Klipper docs](https://www.klipper3d.org/Config_Reference.html)

中文：[Klipper文档](https://www.klipper3d.org/zh/Config_Reference.html)
